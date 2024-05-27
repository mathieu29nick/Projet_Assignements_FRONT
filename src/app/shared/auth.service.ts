import { Injectable } from '@angular/core';
import { Roles } from './roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserRole: string;

  constructor() {
    this.currentUserRole = localStorage.getItem("type_user") ?? Roles.DEFAULT;
  }

  getUserRole(): string {
    return this.currentUserRole;
  }

  setUserRole(role: string) {
    this.currentUserRole = role;
  }
}
