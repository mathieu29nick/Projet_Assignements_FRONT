import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle} from '@angular/material/dialog';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Professeur } from '../../professeur.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NiveauService } from '../../../shared/niveau.service';
import { Niveau } from '../niveau.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfesseurService } from '../../../shared/professeur.service';

@Component({
  selector: 'app-add-matiere',
  standalone: true,
  imports: [MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    AddMatiereComponent,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './add-matiere.component.html',
  styleUrl: './add-matiere.component.css'
})
export class AddMatiereComponent {
  error: string = "";
  professeur: Professeur = {};
  listeNiveau: Niveau[] = [];
  loading: Boolean = true;
  niveau: string = "";
  libelle: string = "";
  photo: string = "";
  niveauFormControl: FormControl;
  libelleFormControl: FormControl;
  photoFormControl: FormControl;

  constructor(
    private niveauService: NiveauService,
    private professeurService : ProfesseurService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.niveauFormControl = new FormControl('', [Validators.required]);
    this.photoFormControl = new FormControl('', [Validators.required]);
    this.libelleFormControl = new FormControl('', [Validators.required]);
  }

  onInputChange(): void {
    this.error = '';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.professeur = params;
    });
    this.getNiveau();
  }

  getNiveau() {
    this.niveauService
      .getListeNiveau()
      .subscribe((data: any) => {
        this.listeNiveau = data.data;
        this.loading = false;
      });
  }

  onSubmit() {
    this.professeurService.ajoutMatiere(this.professeur._id, this.libelle,this.niveau,this.photo)
      .then((result: any) => {
        this.error = "";
        location.reload();
        this.router.navigate(['/professeur/matieres'], { queryParams: this.professeur });
      })
      .catch((error: any) => {
        console.log(error.erro)
        this.error = error.error ? (error.status==400 ? error.error.message:"") : error.message ? error.message : error;
      });
  }

}
