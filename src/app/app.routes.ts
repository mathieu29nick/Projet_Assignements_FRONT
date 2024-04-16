import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfesseurComponent } from './professeur/professeur.component';
import { AddProfesseurComponent } from './professeur/add-professeur/add-professeur.component';
import { MatiereComponent } from './professeur/matiere/matiere.component';
import { AssignementComponent } from './assignement/assignement.component';
import { FicheAssignementComponent } from './assignement/fiche-assignement/fiche-assignement.component';
import { FicheDetailAssignementComponent } from './detail-assignement/fiche-detail-assignement/fiche-detail-assignement.component';
import { AddAssignementComponent } from './assignement/add-assignement/add-assignement.component';
import { ValiderDetailAssignementComponent } from './detail-assignement/valider-detail-assignement/valider-detail-assignement.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'homepage', component: HomepageComponent },
    { path: 'professeurs', component: ProfesseurComponent },
    { path: 'professeur/ajout', component: AddProfesseurComponent },
    { path: 'professeur/matieres', component: MatiereComponent },
    { path: 'assignements', component: AssignementComponent },
    { path: 'assignement', component: FicheAssignementComponent },
    { path: 'detail-assignement', component: FicheDetailAssignementComponent },
    { path: 'assignement/ajout-assignement', component: AddAssignementComponent },
    { path: 'valider-assignements-eleves', component: ValiderDetailAssignementComponent },
    { path: 'profile', component: UtilisateurComponent },
];
