import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './api';
import { Observable } from 'rxjs';
import { Utilisateur } from '../utilisateur/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class EleveService {
    constructor( private http: HttpClient ) {}

    getAllEleves = (pageNumber: Number, page: Number) => {
        return this.http.get<Utilisateur[]>(api("Eleve/eleves?pageNumber=" + pageNumber + "&page=" + page));
    }

    addEleve (eleve:Utilisateur):Observable<any> {
      return this.http.post<Utilisateur>(api("Eleve"), eleve);
    }
}
