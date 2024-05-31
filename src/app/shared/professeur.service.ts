import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './api';
import { Professeur } from '../professeur/professeur.model';
import { Observable } from 'rxjs';
import { Matiere } from '../professeur/matiere/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {
    constructor( private http: HttpClient ) {}

    getAllProfesseurs = (pageNumber: Number, page: Number) => {
        return this.http.get<Professeur[]>(api("Professeur/professeurs?pageNumber=" + pageNumber + "&page=" + page));
    }

    addProfesseur (professeur:Professeur):Observable<any> {
      return this.http.post<Professeur>(api("Professeur"), professeur);
    }

    getListeMatieresProf(idProf:string|undefined){
      return this.http.get<Matiere>(api("Professeur/matieres?idProf="+idProf));
    }

    ajoutMatiere(idProf: string | undefined,libelle: string, niveau: string,photo: string): Promise<any> {
      return new Promise((resolve, reject) => {
        if (!libelle || libelle === '') {
          reject(new Error("Veuillez saisir l'intitulé de la matière"));
        } else if (!niveau || niveau === '') {
          reject(new Error("Veuillez choisir le niveau"));
        }else if (!photo || photo === '') {
          reject(new Error("Veuillez saisir l'URL de la photo"));
        } else {
          this.http.put(api("Professeur/matiere/"+idProf), { libelle: libelle, idNiveau: niveau,photo: photo }).toPromise()
            .then((result: any) => {
              resolve(result);
            })
            .catch((error: any) => {
              reject(error);
            });
        }
      });
    }

    ajoutAssignementMatiere(idMatiere: string | null,nomAssignement: string | null, description: string | null,dateRendu: string | null): Promise<any> {
      return new Promise((resolve, reject) => {
        if (!nomAssignement || nomAssignement === '') {
          reject(new Error("Veuillez saisir l'intitulé de l\'assignement!"));
        } else if (!description || description === '') {
          reject(new Error("Veuillez saisir la description de \'assignement!"));
        }else if (!dateRendu || dateRendu === '' || isNaN(Date.parse(dateRendu))) {
          reject(new Error("Veuillez saisir la dateRendu de l\'assignement!"));
        }else if (!idMatiere || idMatiere === '') {
          reject(new Error("Veuillez choisir une matière!"));
        } else {
          this.http.put(api("Professeur/insertionAssigmentMatiere/"+idMatiere), { nomAssignement: nomAssignement, description: description,dateRendu: dateRendu }).toPromise()
            .then((result: any) => {
              resolve(result);
            })
            .catch((error: any) => {
              reject(error);
            });
        }
      });
    }

    ajoutNote(idAss: string | undefined,idEleve: string | undefined, note: string,remarque: string): Promise<any> {
      return new Promise((resolve, reject) => {
        if (!note || note === '' || note ==null) {
          reject(new Error("Veuillez saisir une note"));
        } else {
          this.http.put(api("Professeur/assignementNoteModifier/"+idAss+"/"+idEleve), { note: note, remarque: remarque }).toPromise()
            .then((result: any) => {
              resolve(result);
            })
            .catch((error: any) => {
              reject(error);
            });
        }
      });
    }

    acheverAssignenment(idAss: string | undefined): Promise<any> {
      return new Promise((resolve, reject) => {
          this.http.put(api("Professeur/acheveAssignement/"+idAss),{}).toPromise()
            .then((result: any) => {
              resolve(result);
            })
            .catch((error: any) => {
              reject(error);
            });
      });
    }

    editProf(id:string,nom:string,email:string,mdp:string){
      return new Promise((resolve, reject) => {
        this.http.put(api("Professeur/"+id),
        {
          nom: nom,
          email: email,
          mdp: mdp,
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
