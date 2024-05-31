import { Component, Inject, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { EleveService } from '../../shared/eleve.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatButtonModule,MatError,CommonModule,MatInputModule,FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
  dialogRef !: MatDialogRef<EditProfileComponent>;

  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  photo: string = '';
  error:string='';

  constructor(private eleveService: EleveService, @Optional() @Inject(MAT_DIALOG_DATA) public data: any,){
  }

  ngOnInit(): void {
    this.nom = this.data.nom;
    this.prenom = this.data.prenom;
    this.email = this.data.email;
    this.photo = this.data.photo;
  }

  isValidEmail(email: string): boolean {
    // Ajoutez votre logique de validation d'email ici
    return /\S+@\S+\.\S+/.test(email);
  }

  onSubmit(): void {
    this.eleveService.editEleve(this.data._id, this.nom,this.prenom,this.email,this.password,this.photo)
    .then((result: any) => {
      this.error = "";
      this.data.nom = this.nom;
      this.data.prenom = this.prenom;
      this.data.email = this.email;
      this.data.photo = this.photo;
      localStorage.setItem("utilisateur",JSON.stringify(this.data));
      this.dialogRef.close()
    })
    .catch((error: any) => {
      console.log(error.erro)
      this.error = error.error ? (error.status==400 ? error.error.message:"") : error.message ? error.message : error;
    });
    
  }

  setDialogRef(dialogRef: MatDialogRef<EditProfileComponent>) {
    this.dialogRef = dialogRef;
  }

  fermer(){
    this.dialogRef.close()
  }

}

