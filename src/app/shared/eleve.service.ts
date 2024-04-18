import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './api';;
import { Eleve } from '../eleve/eleve.model';
import { Performance } from '../eleve/Perfomance';

@Injectable({
  providedIn: 'root'
})
export class EleveService {
    constructor( private http: HttpClient ) {}

    getAllEleves = () => {
      return this.http.get<Eleve[]>(api("Eleve/"));
    }

    getPerformance = (idEleve: String, idMatiere: String,idNiveau:String,order:String) => {
        idEleve = idEleve ?? "";
        idMatiere = idMatiere ?? "";
        idNiveau = idNiveau ?? "";
        order=order ?? "";
        let req= "Eleve/performance?idEleve="+idEleve+"&idMatiere="+idMatiere+"&idNiveau="+idNiveau+"&order="+order;
        return this.http.get<Performance[]>(api(req));
    }
}
