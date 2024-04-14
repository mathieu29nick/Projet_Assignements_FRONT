import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './api';
import { Professeur } from '../professeur/professeur.model';
import { Observable } from 'rxjs';
import { Assignement } from '../assignement/assignement.model';
import { DetailAssignement } from '../detail-assignement/detail-assignement.model';

@Injectable({
  providedIn: 'root',
})
export class DetailAssignementService {
  constructor(private http: HttpClient) {}

  getOneDetailAssignement = (idAss: string, idEleve: string) => {
    return this.http.get<Assignement>(
      api('Eleve/assignement?idAssignement=' + idAss + '&idEleve=' + idEleve)
    );
  };

  getDetailAssignementNonApprouvé = (
    page: Number,
    pageNumber: Number,
    idProf?: string,
    niveau?: string,
    matiere?: string,
  ) => {
    const query =
      '' + (idProf ?
      '&idProf=' + idProf : '') + (niveau ?
      '&idNiveau=' + niveau : '') + (matiere ?
      '&idMatiere=' + matiere : '');
    return this.http.get<Assignement>(
      api(
        'Professeur/assignementsEleveNonApprouve?page=' +
          page +
          '&pageNumber=' +
          pageNumber +
          query
      )
    );
  };

  validerMultiple = (detailAss:DetailAssignement[]) => {
    return new Promise((resolve, reject) => {
      
        this.http.put(api("Professeur/assignements/eleves/validations"), { detailAssignements: detailAss}).toPromise()
          .then((result: any) => {
            resolve(result);
          })
          .catch((error: any) => {
            reject(error);
          });
    });
  }
}
