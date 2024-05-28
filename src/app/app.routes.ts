import { RouterModule, Routes } from '@angular/router';
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
import { PerformanceComponent } from './eleve/performance/performance.component';
import { EleveComponent } from './utilisateur/eleve/eleve.component';
import { AddEleveComponent } from './utilisateur/eleve/add-eleve/add-eleve.component';
import { DevoirTriComponent } from './eleve/devoir-tri/devoir-tri.component';
import { ModifierAssignmentComponent } from './assignement/fiche-assignement/modifier-assignment/modifier-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { NgModule } from '@angular/core';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'unauthorized', component: UnauthorizedComponent },
    {
        path: '',
        component: HomepageComponent,
        canActivate: [AuthGuard],
        children: [
    { path: 'professeurs', component: ProfesseurComponent , canActivate: [AuthGuard]},
    { path: 'professeur/ajout', component: AddProfesseurComponent , canActivate: [AuthGuard]},
    { path: 'professeur/matieres', component: MatiereComponent , canActivate: [AuthGuard]},
    { path: 'assignements', component: AssignementComponent , canActivate: [AuthGuard]},
    { path: 'assignement', component: FicheAssignementComponent , canActivate: [AuthGuard]},
    { path: 'detail-assignement', component: FicheDetailAssignementComponent , canActivate: [AuthGuard]},
    { path: 'assignement/ajout-assignement', component: AddAssignementComponent , canActivate: [AuthGuard]},
    { path: 'valider-assignements-eleves', component: ValiderDetailAssignementComponent , canActivate: [AuthGuard]},
    { path: 'profile', component: UtilisateurComponent , canActivate: [AuthGuard]},
    { path: 'performance', component: PerformanceComponent , canActivate: [AuthGuard]},
    { path: 'eleves', component: EleveComponent , canActivate: [AuthGuard]},
    { path: 'eleve/ajout', component: AddEleveComponent , canActivate: [AuthGuard]},
    { path: 'mes-assignements', component: DevoirTriComponent , canActivate: [AuthGuard]},
    { path : 'assignement/modification', component : ModifierAssignmentComponent, canActivate: [AuthGuard]} ]
},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }