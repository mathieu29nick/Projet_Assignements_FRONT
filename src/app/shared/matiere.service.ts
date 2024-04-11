import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './api';;
import { Matiere } from '../professeur/matiere/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
    constructor( private http: HttpClient ) {}

    getMatieres = (idProf?: string) => {
        return this.http.get<Matiere[]>(api("Professeur/matieres"+ (idProf ? "?idProf="+idProf : "")));
    }
}
