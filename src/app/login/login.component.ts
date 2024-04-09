import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../shared/login.service';
import { RouterLink } from '@angular/router';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatButtonModule ,MatCardModule, MatInputModule,FormsModule,MatIconModule,RouterLink,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
    password: string = "";
    error: string = ""; 
    emailFormControl: FormControl;
    passwordFormControl: FormControl;
  
    constructor(private loginService: LoginService,private router: Router) {
      this.emailFormControl = new FormControl('', [Validators.required]);
      this.passwordFormControl = new FormControl('', [Validators.required]);
    }
    
    onInputChange(): void {
      this.error = '';
    }

    onSubmit() {
      console.log('email:', this.email);
      console.log('Password:', this.password);
      this.loginService.log(this.email, this.password)
        .then((result: any) => {
          this.error = "";
          localStorage.setItem('type_user', result.type_user);
          localStorage.setItem('utilisateur', JSON.stringify(result.utilisateur));
          location.reload();
          //this.router.navigate(['/professeurs']);
        })
        .catch((error: any) => {
          this.error = error.error ? error.error.message : error.message;
        });
    }
}
