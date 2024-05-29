import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './api';
import { Professeur } from '../professeur/professeur.model';
import { Observable } from 'rxjs';
import { Assignement } from '../assignement/assignement.model';
import { DetailAssignement } from '../detail-assignement/detail-assignement.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DetailAssignementService {
  constructor(private http: HttpClient, private router:Router) {}

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
    let user : any = {};
    user = localStorage.getItem("utilisateur");
    if (user) {
        try {
            user = JSON.parse(user);
        } catch (error) {
          this.router.navigate(['/login']);
        }
    }
    const query =
    '&idProf=' + (idProf ?
       idProf : user._id) + (niveau ?
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

  validerOneDetailAssignement = (idAss : string|undefined, idEleve :string|undefined ) => {
    return new Promise((resolve, reject) => {
        this.http.put(api("Professeur/assignement/eleve/validation/"+idAss+"/"+idEleve),{}).toPromise()
          .then((result: any) => {
            resolve(result);
          })
          .catch((error: any) => {
            reject(error);
          });
    });
  }

  rendreDevoir = (idAss : string|undefined) => {
    let idEleve = '';
    let userString = localStorage.getItem("utilisateur");
    let userObject;
    if (userString) {
        try {
            userObject = JSON.parse(userString);
            idEleve=userObject["_id"];
        } catch (error) {
           console.error("Veuillez-vous reconnecter!");
        }
    }
    return new Promise((resolve, reject) => {
        this.http.put(api("Eleve/assignement/"+idAss+"/"+idEleve),{}).toPromise()
          .then((result: any) => {
            resolve(result);
          })
          .catch((error: any) => {
            reject(error);
          });
    });
  }
}
