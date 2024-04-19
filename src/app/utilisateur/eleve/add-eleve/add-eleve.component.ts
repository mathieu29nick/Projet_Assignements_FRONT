import { Component } from '@angular/core';
import { Utilisateur } from '../../utilisateur.model';
import { EleveService } from '../../../shared/eleve.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-eleve',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule,CommonModule],
  templateUrl: './add-eleve.component.html',
  styleUrl: './add-eleve.component.css'
})
export class AddEleveComponent {
  nomEleve = '';
  emailEleve = '';
  prenomEleve = '';
  photoEleve = '';
  error:string = '';

  constructor(
    private eleveService: EleveService,
    private router: Router
  ) {}

  onSubmit(event: any) {
    if (this.nomEleve == '' || this.emailEleve === '') return;

    let nouvelEleve = new Utilisateur();
    nouvelEleve.nom = this.nomEleve;
    nouvelEleve.email = this.emailEleve;
    nouvelEleve.photo = this.photoEleve;
    nouvelEleve.prenom = this.prenomEleve;

    this.eleveService.addEleve(nouvelEleve).subscribe(
      (reponse) => {
        this.router.navigate(['/eleves']);
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
