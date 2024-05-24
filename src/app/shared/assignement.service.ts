import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './api';
import { Professeur } from '../professeur/professeur.model';
import { Observable } from 'rxjs';
import { Assignement } from '../assignement/assignement.model';

@Injectable({
  providedIn: 'root',
})
export class AssignementService {
  constructor(private http: HttpClient) {}

  getAssignements = (
    pageNumber?: Number,
    page?: Number,
    idProf?: string,
    idMatiere?: string
  ) => {
    let query = idProf ? '&idProf=' + idProf : '';
    query = idMatiere ? query + '&matiere=' + idMatiere : query;
    return this.http.get<Assignement[]>(
      api(
        'Professeur/assignements?pageNumber=' +
          pageNumber +
          '&page=' +
          page +
          query
      )
    );
  };
  getOneAssignement = (idAss: string) => {
    return this.http.get<Assignement>(
      api('Professeur/assignements/assignement?idAssignement=' + idAss)
    );
  };

  modifierAssignement(idAss: string | undefined,libelle: string | undefined, description: string | undefined,dateRendu: string | undefined): Promise<any> { 
    return new Promise((resolve, reject) => {
        this.http.put(api("Professeur/modificationAssigmentMatiere/"+idAss),
        {
          nomAssignement: libelle,
          description: description,
          dateRendu: dateRendu
        }).toPromise()
          .then((result: any) => {
            resolve(result);
          })
          .catch((error: any) => {
            reject(error);
          });
    });
  }
}
