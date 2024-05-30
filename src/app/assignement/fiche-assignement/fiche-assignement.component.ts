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
import { DetailAssignementComponent } from './detail-assignement/detail-assignement.component';
import { DetailAssignement } from '../../detail-assignement/detail-assignement.model';
import { ProfesseurService } from '../../shared/professeur.service';
import { Location } from '@angular/common';
import { AuthService } from '../../shared/auth.service';
import { Utilisateur } from '../../utilisateur/utilisateur.model';
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
    MatProgressSpinnerModule,
    DetailAssignementComponent
  ],
  templateUrl: './fiche-assignement.component.html',
  styleUrl: './fiche-assignement.component.css',
})
export class FicheAssignementComponent {
  assignement: Assignement = {};
  detail: DetailAssignement[] | undefined;
  idAss: string = '';
  loading: Boolean = true;
  voir=false;
  error: string = "";
  role:string="default";
  user : Utilisateur = {};

  constructor(
    private assignementService: AssignementService,
    private route: ActivatedRoute,
    private router: Router,
    private professeurService : ProfesseurService,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit() {
    let user = localStorage.getItem("utilisateur");
    if (user) {
        try {
            this.user = JSON.parse(user);
        } catch (error) {
          this.router.navigate(['/login']);
        }
    }
    this.role = this.authService.getUserRole();
    this.route.queryParams.subscribe((params) => {
      this.idAss = params['idAssignement'];
    });
    this.getAssignementFromService();
  }

  voirMonDevoir(ass : any){
    this.router.navigate(['/detail-assignement'], { queryParams: { 
      idEleve: this.user._id, 
      idAssignement : ass
    } });
  }

  getAssignementFromService() {
    this.assignementService
      .getOneAssignement(this.idAss)
      .subscribe((data: any) => {
        this.assignement = data.data ;
        this.detail=this.assignement.detailAssignementEleve;
        this.loading = false;
      });
  }

  isAfficher(){
    this.voir=!this.voir;
  }

  goliste(){
    this.location.back();
  }

  modifier(assignement: Assignement) {
    this.router.navigate(['/assignement/modification'], { queryParams: { 
      idAssignement : assignement._id
    } });
  }

  achever(assignement: Assignement){
    this.professeurService.acheverAssignenment(assignement._id)
    .then((result: any) => {
      this.error = "";
      this.router.navigate(['/assignement?idAssignement='+assignement._id]);
      this.getAssignementFromService();
    })
    .catch((error: any) => {
      console.log(error.erro)
      this.error = error.error ? (error.status==400 ? error.error.message:"") : error.message ? error.message : error;
    });
  }

}
