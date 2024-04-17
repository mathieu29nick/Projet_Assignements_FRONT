import { CommonModule} from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DetailAssignement } from '../../../detail-assignement/detail-assignement.model';
import { Assignement } from '../../assignement.model';

@Component({
  selector: 'app-detail-assignement',
  standalone: true,
  imports: [CommonModule,
    MatIcon,
    MatButtonModule,
    MatCard,
    MatList,
    MatCardModule,
    MatDivider,
    MatListItem,
    MatListModule, 
    MatIconModule,
    MatDividerModule, 
    MatGridListModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  templateUrl: './detail-assignement.component.html',
  styleUrl: './detail-assignement.component.css'
})
export class DetailAssignementComponent {
  loading: Boolean = true;
  displayedColumns: string[] = ['position','eleve','rendu','voir'];
  @Input() detailAssignementEleve: DetailAssignement[] | undefined;
  @Input() assignement: Assignement | undefined;
  dataSource = new MatTableDataSource<DetailAssignement>();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading=false;
  }

  ngOnChanges() {
    if (this.detailAssignementEleve) {
      this.dataSource.data = this.detailAssignementEleve;
    }
  }

  detail(assignement: DetailAssignement) {
    this.router.navigate(['/detail-assignement'], { queryParams: { 
      idEleve: assignement.idEleve, 
      idAssignement : this.assignement?._id
    } });
  }
  
}
