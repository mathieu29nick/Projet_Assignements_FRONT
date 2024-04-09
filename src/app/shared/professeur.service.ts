import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './api';
import { Professeur } from '../professeur/professeur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {
    constructor( private http: HttpClient ) {}

    getAllProfesseurs = (pageNumber: Number, page: Number) => {
        return this.http.get<Professeur[]>(api("Professeur/professeurs?pageNumber=" + pageNumber + "&page=" + page));
    }

    addProfesseur (professeur:Professeur):Observable<any> {
      return this.http.post<Professeur>(api("Professeur"), professeur);
    }
}
