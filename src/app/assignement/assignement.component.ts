import { Component } from '@angular/core';
import { Assignement } from './assignement.model';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AssignementService } from '../shared/assignement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { Matiere } from '../professeur/matiere/matiere.model';
import { MatiereService } from '../shared/matiere.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddAssignementComponent } from './add-assignement/add-assignement.component';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-assignement',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    CommonModule,
    MatButtonModule,
    MatTable,
    MatTableModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatPaginator,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './assignement.component.html',
  styleUrl: './assignement.component.css',
})
export class AssignementComponent {
  assignements: Assignement[] = [];
  loading: Boolean = true;
  page: number = 0;
  limit: number = 10;
  length: number = 0;
  totalPage: number = 0;
  displayedColumns: string[] = ['_id', 'libelle', 'matière', 'prof', 'délai','modif'];
  idProf: string | undefined = undefined;
  idMatiere: string | undefined = undefined;
  matieres: Matiere[]= [];
  role: string = "default";


  constructor(
    private assignementService: AssignementService,
    private matiereService: MatiereService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.role = this.authService.getUserRole();
    if(this.authService.getUserRole() === 'professeur'){
      let user = localStorage.getItem("utilisateur");
      if (user) {
          try {
              this.idProf = JSON.parse(user)._id;
          } catch (error) {
            this.router.navigate(['/login']);
          }
      } 
    }
    this.route.queryParams.subscribe((params) => {
      this.idProf = params['idProf'] ||  this.idProf;
      this.idMatiere = params['idMatiere'] || this.idMatiere;
    });
    this.getAllMatieres();
    this.getAssignementsFromService();
  }

  onInputChange() {
    this.getAssignementsFromService();
  }

  getAllMatieres(){
    this.matiereService
    .getMatieres(this.idProf)
    .subscribe((data: any) => {
      this.matieres = data.data;
    });
  }

  getAssignementsFromService() {
    this.assignementService
      .getAssignements(this.limit, this.page, this.idProf, this.idMatiere)
      .subscribe((data: any) => {
        this.assignements = data.data.data;
        this.totalPage = data.data.totalPage;
        this.page = Number(data.data.page);
        this.limit = Number(data.data.pageNumber);
        this.length = data.data.dataLength;
        this.loading = false;
      });
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getAssignementsFromService();
  }

  goFicheAssignement(ass: Assignement) {
    this.router.navigate(['/assignement'], { queryParams: { idAssignement: ass._id } });
  }

  addAssignement(){
    if(typeof this.idMatiere!=='undefined' && this.idMatiere!=="" && this.idMatiere!==null){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { matiere: {
        _id : this.idMatiere
      } };
      dialogConfig.width='800px';
      const dialog= this.dialog.open(AddAssignementComponent, dialogConfig);
      dialog.componentInstance.setDialogRef(dialog);
    }else{
      this.router.navigate(['/assignement/ajout-assignement'])
    }
  }
}
