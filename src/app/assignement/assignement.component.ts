import { Component } from '@angular/core';
import { Assignement } from './assignement.model';
import { CommonModule } from '@angular/common';
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
  displayedColumns: string[] = ['_id', 'libelle', 'matière', 'prof', 'délai'];
  idProf: string | undefined = undefined;
  idMatiere: string | undefined = undefined;
  matieres: Matiere[]= [];

  constructor(
    private assignementService: AssignementService,
    private matiereService: MatiereService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idProf = params['idProf'] ||  this.idProf;
      this.idMatiere = params['idMatiere'] || this.idMatiere;
    });
    this.getAllMatieres();
    this.getAssignementsFromService();
  }

  onInputChange() {
    console.log("hello");
    
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
    // this.router.navigate(['/assignement'], { queryParams: ass });
  }
}
