import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailAssignementService } from '../../shared/detail-assignement.service';
import { DetailAssignement } from '../detail-assignement.model';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatListItem, MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-valider-detail-assignement',
  standalone: true,
  imports: [
    DragDropModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    MatDividerModule,
    MatListModule,
    MatListItem,
    CdkVirtualScrollViewport,
    MatIconModule
  ],
  templateUrl: './valider-detail-assignement.component.html',
  styleUrl: './valider-detail-assignement.component.css',
})
export class ValiderDetailAssignementComponent {
  listeNonApprouve: DetailAssignement[] = [];
  listeAAprrouve: DetailAssignement[] = [{}];
  page: Number = 0;
  pagenumber: Number = 10;
  loading: Boolean = true;
  hasNextPage: Boolean = true;
  nextPage: Number = 0;
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
  constructor(
    private detailAssignementService: DetailAssignementService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getDetailAssignementNonApprouve();
    
  }
  ngAfterViewInit() {
    console.log(' ----- after view init ----');
console.log(this.scroller);

    if (!this.scroller) return;

    console.log("hell");
    // on s'abonne à l'évènement scroll du virtual scroller
    this.scroller
      .elementScrolled()
      .pipe(
        tap(() => {
        }),
        map((event) => {
          return this.scroller.measureScrollOffset('bottom');
        }),
        pairwise(),
        filter(([y1, y2]) => {
          return y2 < y1 && y2 < 100;
        }),
        // Pour n'envoyer des requêtes que toutes les 200ms
        throttleTime(200)
      )
      .subscribe(() => {
        // On ne rentre que si on scrolle vers le bas, que si
        // la distance de la scrollbar est < 100 pixels et que
        // toutes les 200 ms
          console.log('On demande de nouveaux assignments');
          // on va faire une requête pour demander les assignments suivants
          // et on va concatener le resultat au tableau des assignments courants
          console.log('je CHARGE DE NOUVELLES DONNEES page = ' + this.page);
          this.ngZone.run(() => {
            if (!this.hasNextPage) return;
            this.page = this.nextPage;
            this.getDetailAssignementNonApprouveScrollInfini();
          });
      });
  }

  getDetailAssignementNonApprouveScrollInfini() {
    this.detailAssignementService
      .getDetailAssignementNonApprouvé(this.page, this.pagenumber)
      .subscribe((data: any) => {
        this.listeNonApprouve = [...this.listeNonApprouve, ...data.data.liste];
        this.nextPage = Number(data.data.page) + 1;
        this.hasNextPage = Number(data.data.page) + 1 > data.data.totalPage ? false : true;
        this.page = Number(data.data.page);
        this.pagenumber = Number(data.data.pageNumber);
        this.loading = false;
      });
  }

  drop(event: CdkDragDrop<DetailAssignement[]>) {
    console.log(
      event.previousIndex,
        event.currentIndex
    );

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const data = this.listeNonApprouve[event.currentIndex];
      this.listeNonApprouve.splice(event.currentIndex, 1);
      this.cdr.detectChanges();
      this.listeAAprrouve.push(data);
    }
  }

  getDetailAssignementNonApprouve() {
    this.detailAssignementService
      .getDetailAssignementNonApprouvé(this.page, this.pagenumber)
      .subscribe((data: any) => {
        this.listeNonApprouve = data.data.liste;
        console.log("listeNonApprouve",this.listeNonApprouve);
        this.nextPage = Number(data.data.page) + 1;
        this.hasNextPage = Number(data.data.page) + 1 > data.data.totalPage ? false : true;
        this.page = Number(data.data.page);
        this.pagenumber = Number(data.data.pageNumber);
        this.loading = false;
      });
  }

  annuler(){
    this.loading =true;
    this.listeAAprrouve = [{}];
    this.page = 0;
    this.getDetailAssignementNonApprouve();
  }

  valider(){
    this.listeAAprrouve.shift();
    this.detailAssignementService.validerMultiple(this.listeAAprrouve).then((result: any) => {
      this.loading =true;
      this.listeAAprrouve = [{}];
      this.page = 0;
      this.getDetailAssignementNonApprouve();
    })
    .catch((error: any) => {
      console.log(error)
     });
  }
}
