import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfesseurComponent } from './professeur/professeur.component';
import { AddProfesseurComponent } from './professeur/add-professeur/add-professeur.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'homepage', component: HomepageComponent },
    { path: 'professeurs', component: ProfesseurComponent },
    { path: 'professeur/ajout', component: AddProfesseurComponent },
];
