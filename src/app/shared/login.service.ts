import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import api from './api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    constructor( private http: HttpClient ) { 
        }

        log(email: string, mdp: string): Promise<any> {
            return new Promise((resolve, reject) => {
              if (!email || email === '') {
                reject(new Error("Veuillez saisir un email"));
              } else if (!mdp || mdp === '') {
                reject(new Error("Veuillez saisir un mot de passe"));
              } else {
                this.http.post(api('Utilisateur/login'), { email: email, mdp: mdp }).toPromise()
                  .then((result: any) => {
                    resolve(result);
                  })
                  .catch((error: any) => {
                    reject(error);
                  });
              }
            });
          }
}
