import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { Utilisateur } from './utilisateur.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditProfileComponent } from '../eleve/edit-profile/edit-profile.component';
import { EditProfileProfesseurComponent } from '../professeur/edit-profile-professeur/edit-profile-professeur.component';

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent {
  utilisateur : Utilisateur = {};
  type_user : string | null = '';

  
  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.type_user = localStorage.getItem("type_user");
    let user = localStorage.getItem("utilisateur");
    if (user) {
        try {
            this.utilisateur = JSON.parse(user);
        } catch (error) {
          this.router.navigate(['/login']);
        }
    }
  }

  editProfile(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.utilisateur;
    dialogConfig.width='800px';
    if(this.type_user === "professeur"){
      const dialog= this.dialog.open(EditProfileProfesseurComponent, dialogConfig);
      dialog.componentInstance.setDialogRef(dialog);
      dialog.afterClosed().subscribe( result => {
        let user = localStorage.getItem("utilisateur");
        if (user) {
            try {
                this.utilisateur = JSON.parse(user);
            } catch (error) {
              this.router.navigate(['/login']);
            }
        }
      });
    }else if(this.type_user === "etudiant"){
      const dialog= this.dialog.open(EditProfileComponent, dialogConfig);
      dialog.componentInstance.setDialogRef(dialog);
      dialog.afterClosed().subscribe( result => {
        let user = localStorage.getItem("utilisateur");
        if (user) {
            try {
                this.utilisateur = JSON.parse(user);
            } catch (error) {
              this.router.navigate(['/login']);
            }
        }
      });
    }
  }
}
