import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './api';;
import { Eleve } from '../eleve/eleve.model';
import { Performance } from '../eleve/Perfomance';
import { Observable } from 'rxjs';
import { Utilisateur } from '../utilisateur/utilisateur.model';
import { Assignement } from '../assignement/assignement.model';
import { DetailAssignement } from '../assignement/detailAssignement.model';

@Injectable({
  providedIn: 'root'
})
export class EleveService {
    constructor( private http: HttpClient ) {}

    getAllEleves = () => {
      return this.http.get<Eleve[]>(api("Eleve/"));
    }

    getPerformance = (idEleve: String|undefined, idMatiere: String,idNiveau:String,order:String) => {
        idEleve = idEleve ?? "";
        idMatiere = idMatiere ?? "";
        idNiveau = idNiveau ?? "";
        order=order ?? "";
        let req= "Eleve/performance?idEleve="+idEleve+"&idMatiere="+idMatiere+"&idNiveau="+idNiveau+"&order="+order;
        return this.http.get<Performance[]>(api(req));
    }
    
    getAllElevesWithPagination = (pageNumber: Number, page: Number) => {
        return this.http.get<Utilisateur[]>(api("Eleve/eleves?pageNumber=" + pageNumber + "&page=" + page));
    }

    addEleve (eleve:Utilisateur):Observable<any> {
      return this.http.post<Utilisateur>(api("Eleve"), eleve);
    }

    getALLDevoirOneEleve = (idEleve: String|undefined, idMatiere: String,idNiveau:String,order:String,etat:string,pageNumber: Number, page: Number) => {
      idEleve = idEleve ?? "";
      idMatiere = idMatiere ?? "";
      idNiveau = idNiveau ?? "";
      order=order ?? "";
      etat=etat ?? "";
      let req= "Eleve/listeDetailAssignement?idEleve="+idEleve+"&idMatiere="+idMatiere+"&idNiveau="+idNiveau+"&orderDateRendu="+order+"&etat="+etat+"&pageNumber=" + pageNumber + "&page=" + page;
      return this.http.get<DetailAssignement[]>(api(req));
  }
}
