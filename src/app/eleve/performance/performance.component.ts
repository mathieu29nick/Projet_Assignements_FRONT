import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
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
import { Performance } from '../Perfomance';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTable, MatTableModule } from '@angular/material/table';
import { AuthService } from '../../shared/auth.service';
import { Utilisateur } from '../../utilisateur/utilisateur.model';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css'],
  imports :[
    MatList,
    MatListItem,
    MatListModule,
    MatCard,
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
    MatInputModule,
    MatSlideToggleModule,
    MatTable,
    MatTableModule
  ],
  standalone :true
})
export class PerformanceComponent {

  listeMatiere: Matiere[] = [];
  listeNiveau: Niveau[] = [];
  listeEleve: Eleve[] = [];
  performance: Performance[]=[];
  loading: boolean = true;
  role: string = '';
  utilisateur : Utilisateur = {};
  @Input() data: any;

  /* Form */
  eleveValue: string|undefined="";
  matiereValue: string="";
  niveauValue: string="";
  ordreValue: string="";

  /* Toggle */
  isTB = false;

  idProf: string | undefined ="";
  /* Tableau de bord */
  displayedColumns: string[] = ['_id','moyenne'];

  constructor(
    private matiereService: MatiereService,
    private router: Router,
    private route: ActivatedRoute,
    private niveauService : NiveauService,
    private eleveService : EleveService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    let user = localStorage.getItem("utilisateur");
    if (user) {
        try {
            this.utilisateur = JSON.parse(user);
        } catch (error) {
          this.router.navigate(['/login']);
        }
    }
    this.route.queryParams.subscribe((params) => {
      this.eleveValue = params['idEleve'] ||   this.eleveValue;
    });
    if(this.role === 'etudiant'){
      this.eleveValue = this.utilisateur._id ?? this.utilisateur._id ;
    }
    if(this.role==='professeur'){
      this.idProf = this.utilisateur._id ?? this.utilisateur._id;
    }
    this.getMatiere();
    this.getNiveau();
    this.getEleve();
    this.getPerformance();
    console.log(this.performance[0]._id+"/"+this.performance[0].moyenne)
  }

  getMatiere() {
    this.matiereService
      .getAllMatieres(this.niveauValue,this.idProf)
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

  getEleve() {
    this.eleveService
      .getAllEleves()
      .subscribe((data: any) => {
        this.listeEleve = data.data;
        this.loading = false;
      });
  }

  getPerformance() {
    this.eleveService
      .getPerformance(this.eleveValue,this.matiereValue,this.niveauValue,this.idProf,this.ordreValue)
      .subscribe((data: any) => {
        this.performance = data.data;
        this.loading = false;
        this.updateChartData();
      });
  }

  updateChartData() {
    const labels: String[] = [];
    const data: Number[] = [];

    for (const perf of this.performance) {
      labels.push(perf._id);
      data.push(perf.moyenne);
    }

    this.data = {
      labels: labels,
      datasets: [
        {
          label: 'Note moyenne',
          backgroundColor: '#cc0000',
          borderColor: '#cc0000',
          pointBackgroundColor: '#152e60',
          pointBorderColor: 'white',
          data: data,
        }
      ]
    };
  }

  onChangeNiveau(value:any){
    this.niveauValue=value;
    this.getMatiere();
    this.getPerformance();
  }

  onChangeEleve(value:any){
    this.eleveValue=value;
    this.getPerformance();
  }

  onChangeMatiere(value:any){
    this.matiereValue=value;
    this.getPerformance();
  }

  onChangeOrdre(value:any){
    this.ordreValue=value;
    this.getPerformance();
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      setTimeout(() => {
        $chartRef?.update();
      }, 3000);
    }

  }}
