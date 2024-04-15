import { Component } from '@angular/core';
import { Matiere } from './matiere.model';
import { ProfesseurService } from '../../shared/professeur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Professeur } from '../professeur.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle} from '@angular/material/dialog';
import { AddMatiereComponent } from './add-matiere/add-matiere.component';
import { AddAssignementComponent } from '../../assignement/add-assignement/add-assignement.component';
import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-matiere',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatTable,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    AddAssignementComponent
  ],
  templateUrl: './matiere.component.html',
  styleUrl: './matiere.component.css',
})
export class MatiereComponent {
  professeur: Professeur = {};
  listeMatiere: Matiere[] = []
  loading: Boolean = true;
  titre: string = 'Liste des matières du prof : ';
  displayedColumns: string[] = ['photo','_id', 'matière', 'niveau','assignement'];
  constructor(
    private professeurService: ProfesseurService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.professeur = params;
    });
    this.getMatiere();
  }

  getMatiere() {
    this.professeurService
      .getListeMatieresProf(this.professeur._id)
      .subscribe((data: any) => {
        this.listeMatiere = data.data;
        this.loading = false;
      });
  }

  ajoutMatiere(){
    this.dialog.open(AddMatiereComponent);
  }

  ajoutAssignement(matiere: Matiere) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { matiere: matiere };
    this.dialog.open(AddAssignementComponent, dialogConfig);
  }
}
