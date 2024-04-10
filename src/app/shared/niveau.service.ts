import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './api';
import { Professeur } from '../professeur/professeur.model';
import { Observable } from 'rxjs';
import { Matiere } from '../professeur/matiere/matiere.model';
import { Niveau } from '../professeur/matiere/niveau.model';


@Injectable({
  providedIn: 'root'
})
export class NiveauService {
    constructor( private http: HttpClient ) {}

      getListeNiveau(){
        return this.http.get<Niveau>(api("Niveau/"));
      }
}
