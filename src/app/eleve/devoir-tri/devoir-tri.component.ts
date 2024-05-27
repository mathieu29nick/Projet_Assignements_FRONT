import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import {  FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { MatiereService } from '../../shared/matiere.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from '../../professeur/matiere/matiere.model';
import { NiveauService } from '../../shared/niveau.service';
import { Niveau } from '../../professeur/matiere/niveau.model';
import { Eleve } from '../eleve.model';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { EleveService } from '../../shared/eleve.service';
import { MatCard } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Utilisateur } from '../../utilisateur/utilisateur.model';
import { MatTable, MatTableModule } from '@angular/material/table';
import { DetailAssignement } from '../../assignement/detailAssignement.model';
import { PageEvent,MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-devoir-tri',
  standalone: true,
  imports :[
    MatTable,
    MatTableModule,
    MatList,
    MatListItem,
    MatListModule,
    MatCard,
    MatPaginatorModule,
    MatCardModule,
    ChartjsComponent,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './devoir-tri.component.html',
  styleUrl: './devoir-tri.component.css'
})
export class DevoirTriComponent {
  listeMatiere: Matiere[] = [];
  listeNiveau: Niveau[] = [];
  listeEleve: Eleve[] = [];
  data: DetailAssignement[]=[];
  loading: boolean = true;
  utilisateur : Utilisateur = {};
  asc: string="asc";
  desc:string="desc";
  limit = 3;
  page: number = 0;
  length: number = 0;
  totalPage: number = 0;

  /* Form */
  matiereValue: string="";
  niveauValue: string="";
  ordreValue: string="";
  etatValue: string="";

  displayedColumns: string[] = ['_id','eleve','nomAssignement', 'matiere','dateRenduEleve','niveau','statut'];

  constructor(
    private matiereService: MatiereService,
    private router: Router,
    private route: ActivatedRoute,
    private niveauService : NiveauService,
    private eleveService : EleveService
  ) {}

  ngOnInit(): void {
    let user = localStorage.getItem("utilisateur");
    if (user) {
        try {
            this.utilisateur = JSON.parse(user);
        } catch (error) {
          this.router.navigate(['/login']);
        }
    }
    this.getMatiere();
    this.getNiveau();
    this.getDevoirs();
  }

  getMatiere() {
    this.matiereService
      .getAllMatieres()
      .subscribe((data: any) => {
        this.listeMatiere = data.data.liste;
        this.loading = false;
      });
  }

  getNiveau() {
    this.niveauService
      .getListeNiveau()
      .subscribe((data: any) => {
        this.listeNiveau = data.data;
        this.loading = false;
      });
  }

  onChangeNiveau(value:any){
    this.niveauValue=value;
    this.getDevoirs();
  }

  onChangeMatiere(value:any){
    this.matiereValue=value;
    this.getDevoirs();
  }

  onChangeOrdre(value:any){
    this.ordreValue=value;
    this.getDevoirs();
  }

  onChangeEtat(value:any){
    this.etatValue=value;
    this.getDevoirs();
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getDevoirs();
  }
  
  getDevoirs() {
    this.eleveService
      .getALLDevoirOneEleve(this.utilisateur._id,this.matiereValue,this.niveauValue,this.ordreValue,this.etatValue,this.limit,this.page)
      .subscribe((data: any) => {
        this.data = data.data.liste;
        this.totalPage = data.data.totalPage;
        this.length = data.data.dataLength;
        this.page = Number(data.data.page);
        this.limit = Number(data.data.pageNumber);
        this.loading = false;
      });
  }
}
