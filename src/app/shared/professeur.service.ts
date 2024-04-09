import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './api';
import { Professeur } from '../professeur/professeur.model';
import { Observable } from 'rxjs';
import { Matiere } from '../professeur/matiere/matiere.model';

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

    getListeMatieresProf(idProf:string|undefined){
      return this.http.get<Matiere>(api("Professeur/matieres?idProf="+idProf));
    }

}
