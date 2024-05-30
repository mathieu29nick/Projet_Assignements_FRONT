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

    getAllMatieres = (niveau?: string,idProf?: string) => {
      let niv = "";
      let prof="";
      if(niveau){
        niv = "&niveau="+niveau;
      }
      if(idProf){
        prof= "&idProf="+idProf;
      }
      return this.http.get<Matiere[]>(api("Professeur/allmatieres?page=0&pageNumber=60"+niv+prof));
  }
}
