import { Component,Inject,Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle} from '@angular/material/dialog';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Professeur } from '../../professeur/professeur.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfesseurService } from '../../shared/professeur.service';
import { Matiere } from '../../professeur/matiere/matiere.model';
import { MatDialogRef} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormBuilder,ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-assignement',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-assignement.component.html',
  styleUrl: './add-assignement.component.css'
})
export class AddAssignementComponent {
  error: string = "";
  loading: Boolean = true;
  idProf:string="";
  isPopUP=false;

  matiere: string | null = null;
  dateRendu: string | null = null;
  nom: string | null = null;
  description: string | null = null;
  listeMatiere: Matiere[] = [];

  matiereFormControl: FormControl;
  nomFormControl: FormControl;
  descFormControl: FormControl;
  dateFormControl: FormControl;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fourFormGroup = this._formBuilder.group({
    fourCtrl: ['', Validators.required],
  });

  isLinear = false;

  constructor(
    private professeurService : ProfesseurService,
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.matiereFormControl = new FormControl('', [Validators.required]);
    this.descFormControl = new FormControl('', [Validators.required]);
    this.nomFormControl = new FormControl('', [Validators.required]);
    this.dateFormControl=new FormControl('',[Validators.required]);
  }

  onInputChange(): void {
    this.error = '';
  }

  ngOnInit(): void {
    //console.log(this.data.matiere.libelle)
    if(this.data){
      this.isPopUP=true;
    }
    let userString = localStorage.getItem("utilisateur");
    let userObject;
    if (userString) {
        try {
            userObject = JSON.parse(userString);
            this.idProf=userObject["_id"];
            this.getMatiere();
        } catch (error) {
            console.error("Veuillez-vous reconnecter!");
        }
    }
  }

  onSubmit() {
    if (
        this.firstFormGroup &&
        this.firstFormGroup.get('firstCtrl') &&
        this.secondFormGroup &&
        this.secondFormGroup.get('secondCtrl') &&
        this.thirdFormGroup &&
        this.thirdFormGroup.get('thirdCtrl') &&
        this.fourFormGroup &&
        this.fourFormGroup.get('fourCtrl')
    ) {
        const firstCtrl = this.firstFormGroup.get('firstCtrl');
        if (firstCtrl) {
            this.nom = firstCtrl.value;
        }
        
        const secondCtrl = this.secondFormGroup.get('secondCtrl');
        if (secondCtrl) {
            this.description = secondCtrl.value;
        }
        
        const thirdCtrl = this.thirdFormGroup.get('thirdCtrl');
        if (thirdCtrl) {
          const dateString: string | Date = thirdCtrl.value ? thirdCtrl.value.toString() : '';
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = ('0' + (date.getMonth() + 1)).slice(-2);
          const day = ('0' + date.getDate()).slice(-2);
          const formattedDate = `${year}/${month}/${day}`;
          this.dateRendu=formattedDate;
        }
        
        const fourCtrl = this.fourFormGroup.get('fourCtrl');
        if (fourCtrl) {
            if(this.isPopUP){
              this.matiere=this.data.matiere._id;
            }else{
              this.matiere = fourCtrl.value;
            }
        }

        this.professeurService.ajoutAssignementMatiere(this.matiere, this.nom,this.description,this.dateRendu)
        .then((result: any) => {
          this.error = "";
          location.reload();
          this.router.navigate(['/professeurs']);
        })
        .catch((error: any) => {
          console.log(error.erro)
          this.error = error.error ? (error.status==400 ? error.error.message:"") : error.message ? error.message : error;
        });
    }
}


  getMatiere() {
    this.professeurService
      .getListeMatieresProf(this.idProf)
      .subscribe((data: any) => {
        this.listeMatiere = data.data;
        this.loading = false;
      });
  }
}
