import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { RolePages } from './roles';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = this.authService.getUserRole();
    const allowedPages = RolePages[userRole];
    if (allowedPages.includes(state.url.split('?')[0])) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']); // Redirige vers une page non autorisée
      return false;
    }
  }
}
