import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Utilisateur } from '../utilisateur.model';
import { EleveService } from '../../shared/eleve.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-eleve',
  standalone: true,
  imports: [  CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSliderModule,
    MatIconModule,
  RouterLink],
  templateUrl: './eleve.component.html',
  styleUrl: './eleve.component.css'
})
export class EleveComponent {
  limit = 3;
  page: number = 0;
  eleves: Utilisateur[] = [];
  totalPage: number = 0;
  loading: Boolean = true;
  length: number = 0;

  displayedColumns: string[] = ['photo','_id', 'nom', 'email'];

  constructor(
    private eleveService: EleveService,
  ) {}

  ngOnInit() {
    this.getProfesseursFromService();
  }

  getProfesseursFromService() {
    this.eleveService
      .getAllEleves(this.limit, this.page)
      .subscribe((data: any) => {
        this.eleves = data.data.data;
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
    this.getProfesseursFromService();
  }

}
