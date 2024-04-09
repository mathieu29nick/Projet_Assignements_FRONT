import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Professeur } from '../professeur.model';
import { ProfesseurService } from '../../shared/professeur.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-professeur',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule,CommonModule],
  templateUrl: './add-professeur.component.html',
  styleUrl: './add-professeur.component.css',
})
export class AddProfesseurComponent {
  nomProfesseur = '';
  emailProfesseur = '';
  error:string = '';

  constructor(
    private professeurService: ProfesseurService,
    private router: Router
  ) {}

  onSubmit(event: any) {
    if (this.nomProfesseur == '' || this.emailProfesseur === '') return;

    let nouvelProfesseur = new Professeur();
    nouvelProfesseur.nom = this.nomProfesseur;
    nouvelProfesseur.email = this.emailProfesseur;

    this.professeurService.addProfesseur(nouvelProfesseur).subscribe(
      (reponse) => {
        this.router.navigate(['/professeurs']);
      },
      (erreur) => {
        console.error("Une erreur s'est produite :", erreur.status);
        this.error = erreur?.error?.message && erreur.status == 400 ?  erreur.error.message : "Une erreur s\'est produite. Veuillez réessayer ultérieurement";
      }
    );
  }

  onInputChange(): void {
    this.error = '';
  }
}
