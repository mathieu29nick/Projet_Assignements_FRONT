import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../shared/login.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Roles } from '../shared/roles';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatButtonModule ,MatCardModule, MatInputModule,FormsModule,MatIconModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
    password: string = "";
    error: string = ""; 
    emailFormControl: FormControl;
    passwordFormControl: FormControl;
  
    constructor( private location: Location,private authService: AuthService,private loginService: LoginService,private router: Router) {
      this.emailFormControl = new FormControl('', [Validators.required]);
      this.passwordFormControl = new FormControl('', [Validators.required]);
    }
    
    onInputChange(): void {
      this.error = '';
    }

    onSubmit() {
      this.loginService.log(this.email, this.password)
        .then((result: any) => {
          this.error = "";
          const now = new Date();
          localStorage.setItem('date_expiry', (now.getTime() + 24 * 60 * 60 * 1000).toString());
          this.authService.setUserRole(result.type_user);
          localStorage.setItem('type_user', result.type_user);
          localStorage.setItem('utilisateur', JSON.stringify(result.utilisateur));
          localStorage.setItem('token', result.token);
          // if(this.authService.getUserRole() === Roles.ADMIN){
          //   this.location.go('/performance');
          // }else if(this.authService.getUserRole() === Roles.PROF){
          //   this.location.go('/assignements');
          // }else{
          //   this.location.go('/mes-assignements');
          // }
          // location.reload();
          if(this.authService.getUserRole() === Roles.ADMIN){
            this.router.navigate(['/performance']);
           }else if(this.authService.getUserRole() === Roles.PROF){
            this.router.navigate(['/assignements']);
           }else{
            this.router.navigate(['/mes-assignements']);
           }
        })
        .catch((error: any) => {
          this.error = error.error ? error.error.message : error.message;
        });
    }
}
