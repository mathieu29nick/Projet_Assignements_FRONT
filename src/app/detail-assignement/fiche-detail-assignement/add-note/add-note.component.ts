import { Component, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfesseurService } from '../../../shared/professeur.service';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {
  isLinear = false;
  remarqueValue = '';
  noteValue = '';
  error:string = '';
  dialogRef !: MatDialogRef<AddNoteComponent>;

  constructor(
    private professeurService: ProfesseurService,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  checkValue(event: any) {
    const value = event.target.value;
    if (value > 20) {
        this.noteValue = "20";
        event.target.value = 20;
    }
    // checker le min value
    if (value < 0) {
      this.noteValue = "0";
      event.target.value = 0;
    }
  }

  onInputChange(): void {
    this.error = '';
  }

  onSubmit(event: any) {
    if (this.noteValue == null || this.remarqueValue === '' || this.noteValue=='') return;

    this.professeurService.ajoutNote(this.data.assignement,this.data.eleve,this.noteValue,this.remarqueValue)
      .then((result: any) => {
        this.error = "";
        this.dialogRef.close();
      })
      .catch((error: any) => {
        console.log(error.erro)
        this.error = error.error ? (error.status==400 ? error.error.message:"") : error.message ? error.message : error;
      });
  }

  setDialogRef(dialogRef: MatDialogRef<AddNoteComponent>) {
    this.dialogRef = dialogRef;
  }


}
