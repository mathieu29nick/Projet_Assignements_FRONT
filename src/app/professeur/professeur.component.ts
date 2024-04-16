import { Component } from '@angular/core';
import { Professeur } from './professeur.model';
import { ProfesseurService } from '../shared/professeur.service';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddProfesseurComponent } from './add-professeur/add-professeur.component';

@Component({
  selector: 'app-professeur',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatTable,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSliderModule,
    MatIconModule,
  ],
  templateUrl: './professeur.component.html',
  styleUrl: './professeur.component.css',
})
export class ProfesseurComponent {
  titre = 'Liste des professeurs';
  limit = 3;
  page: number = 0;
  professeurs: Professeur[] = [];
  totalPage: number = 0;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
  loading: Boolean = true;
  length: number = 0;

  displayedColumns: string[] = ['photo','_id', 'nom', 'email', 'matières'];

  constructor(
    private professeurService: ProfesseurService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProfesseursFromService();
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(AddProfesseurComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  getProfesseursFromService() {
    this.professeurService
      .getAllProfesseurs(this.limit, this.page)
      .subscribe((data: any) => {
        this.professeurs = data.data.data;
        this.totalPage = data.data.totalPage;
        this.page = Number(data.data.page);
        this.limit = Number(data.data.pageNumber);
        // this.nextPage = Number(data.data.page) + 1;
        // this.prevPage = Number(data.data.page) - 1;
        this.length = data.data.dataLength;
        // if (Number(data.data.page) - 1 < 0) {
        //   this.hasPrevPage = false;
        // } else {
        //   this.hasPrevPage = true;
        // }
        // if (Number(data.data.page) + 1 >= data.data.totalPage) {
        //   this.hasNextPage = false;
        // } else {
        //   this.hasNextPage = true;
        // }
        this.loading = false;
      });
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getProfesseursFromService();
  }

  goListeMatiere(prof: Professeur) {
    this.router.navigate(['/professeur/matieres'], { queryParams: prof });
  }
}
