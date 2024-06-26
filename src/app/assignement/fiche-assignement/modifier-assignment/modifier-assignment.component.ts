import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Assignement } from '../../assignement.model';
import { AssignementService } from '../../../shared/assignement.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modifier-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule,
    MatInputModule, MatFormFieldModule, MatButtonModule,CommonModule,MatDatepickerModule,MatCardModule,MatProgressSpinnerModule,MatIcon,MatIconModule],
  templateUrl: './modifier-assignment.component.html',
  styleUrl: './modifier-assignment.component.css'
})
export class ModifierAssignmentComponent {
  loading: Boolean = true;
  idAss: string = '';
  assignement: Assignement = {};
  error:string = '';
  date: string | null = null;

  constructor(
    private assignementService: AssignementService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private notification: MatSnackBar,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idAss = params['idAssignement'];
    });
    this.getAssignementFromService()
  }

  getAssignementFromService() {
    this.assignementService
      .getOneAssignement(this.idAss)
      .subscribe((data: any) => {
        this.assignement = data.data ;
        this.loading = false;
      });
  }

  onInputChange(): void {
    this.error = '';
  }

  onSubmit(event: any) {
    const dateString: Date | undefined = this.assignement.dateRendu;
    const date = new Date(dateString || new Date());
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    this.date = formattedDate;
    console.log(this.date);
    this.assignementService.modifierAssignement(this.assignement._id, this.assignement.nomAssignement,this.assignement.description,this.date)
        .then((result: any) => {
          this.error = "";
          this.openNotification();
          this.location.back();
        })
        .catch((error: any) => {
          console.log(error.erro)
          this.error = error.error ? (error.status==400 ? error.error.message:"") : error.message ? error.message : error;
        });
  }

  goBack(){
    this.location.back();
  }

  openNotification() {
    this.notification.open('Assignement modifié avec succè!', 'Fermer', {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 3000
    });
  }
}
