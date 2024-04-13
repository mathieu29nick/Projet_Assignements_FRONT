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
     MatProgressSpinnerModule
  ],
  templateUrl: './fiche-detail-assignement.component.html',
  styleUrl: './fiche-detail-assignement.component.css'
})
export class FicheDetailAssignementComponent {
  detailAssignement: DetailAssignement = {};
  idAss: string = '';
  idEleve: string = '';
  loading: Boolean = true;
  constructor(
    private detailAssignementService: DetailAssignementService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idAss = params['idAssignement'];
      this.idEleve = params['idEleve'];
    });
    this.getDetailAssignementFromService();
  }

  getDetailAssignementFromService() {
    
    console.log("this.idEleve",this.idEleve);
    this.detailAssignementService
      .getOneDetailAssignement(this.idAss,this.idEleve)
      .subscribe((data: any) => {
        console.log("this.idEleve",this.idEleve);
        
        this.detailAssignement = data.data ;
        this.loading = false;
      });
  }
}
