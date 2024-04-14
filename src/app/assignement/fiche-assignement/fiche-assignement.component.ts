import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { Assignement } from '../assignement.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignementService } from '../../shared/assignement.service';
import { MatCardModule } from '@angular/material/card';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-fiche-assignement',
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
  templateUrl: './fiche-assignement.component.html',
  styleUrl: './fiche-assignement.component.css',
})
export class FicheAssignementComponent {
  assignement: Assignement = {};
  idAss: string = '';
  loading: Boolean = true;
  constructor(
    private assignementService: AssignementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idAss = params['idAssignement'];
    });
    this.getAssignementFromService();
  }

  getAssignementFromService() {
    this.assignementService
      .getOneAssignement(this.idAss)
      .subscribe((data: any) => {
        this.assignement = data.data ;
        this.loading = false;
      });
  }
}