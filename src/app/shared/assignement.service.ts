import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './api';
import { Professeur } from '../professeur/professeur.model';
import { Observable } from 'rxjs';
import { Assignement } from '../assignement/assignement.model';

@Injectable({
  providedIn: 'root'
})
export class AssignementService {
    constructor( private http: HttpClient ) {}

    getAssignements = (pageNumber?: Number, page?: Number, idProf?: string, idMatiere?: string ) => {
        let query = idProf ? "&idProf="+idProf : '';
        query = idMatiere ? query + "&matiere="+idMatiere : query;
        console.log("api ass",api("Professeur/assignements?pageNumber=" + pageNumber + "&page=" + page+"&idProf="+idProf+"&matiere="+idMatiere));
        return this.http.get<Assignement[]>(api("Professeur/assignements?pageNumber=" + pageNumber + "&page=" + page+query));
    }
}