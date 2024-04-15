import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DetailAssignementService } from '../../shared/detail-assignement.service';
import { DetailAssignement } from '../detail-assignement.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fiche-detail-assignement',
  standalone: true,
  imports: [
    CommonModule,
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
     DatePipe,
     MatGridListModule,
     MatProgressSpinnerModule,
     MatFormFieldModule
  ],
  templateUrl: './fiche-detail-assignement.component.html',
  styleUrl: './fiche-detail-assignement.component.css'
})
export class FicheDetailAssignementComponent {
  detailAssignement: DetailAssignement = {};
  idAss: string = '';
  idEleve: string = '';
  loading: Boolean = true;
  erreur: string = '';
  constructor(
    private detailAssignementService: DetailAssignementService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idAss = params['idAssignement'];
      this.idEleve = params['idEleve'];
    });
    this.getDetailAssignementFromService();
  }

  getDetailAssignementFromService() {
    
    this.detailAssignementService
      .getOneDetailAssignement(this.idAss,this.idEleve)
      .subscribe((data: any) => {
        this.erreur = '';
        this.detailAssignement = data.data ;
        this.loading = false;
      });
  }

  rendreDevoir(){
    this.loading = true;
    this.detailAssignementService.rendreDevoir(this.detailAssignement.idAssignement).then((result: any) => {
      this.getDetailAssignementFromService();
      this.loading = false;
    })
    .catch((error: any) => {
      this.erreur = error.error ? (error.status == 400 ? error.error.message : '') : error.message;
      this.loading = false;
     });
  }

  validerDevoir(){
    this.loading = true;
    this.detailAssignementService.validerOneDetailAssignement(this.detailAssignement.idAssignement,this.detailAssignement.idEleve).then((result: any) => {
      this.getDetailAssignementFromService();
      this.loading = false;
    })
    .catch((error: any) => {
      this.erreur = error.error ? (error.status == 400 ? error.error.message : '') : error.message;
      this.loading = false;
     });
  }

  retourPagePrecedente(): void {
    this.location.back();
  }
}
