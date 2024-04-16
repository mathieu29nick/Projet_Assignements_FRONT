import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { Utilisateur } from './utilisateur.model';

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent {
  utilisateur : Utilisateur = {};
  type_user : string | null = '';

  
  constructor(
    private router: Router
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
}
