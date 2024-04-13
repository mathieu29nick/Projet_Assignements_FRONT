import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './api';
import { Professeur } from '../professeur/professeur.model';
import { Observable } from 'rxjs';
import { Assignement } from '../assignement/assignement.model';

@Injectable({
  providedIn: 'root',
})
export class DetailAssignementService {
  constructor(private http: HttpClient) {}

  getOneDetailAssignement = (idAss: string, idEleve:string) => {
    return this.http.get<Assignement>(
      api('Eleve/assignement?idAssignement=' + idAss+"&idEleve="+idEleve)
    );
  };
}
