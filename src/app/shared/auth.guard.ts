import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { RolePages, Roles } from './roles';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = this.authService.getUserRole();
    const allowedPages = RolePages[userRole];
    
    if (allowedPages && allowedPages.includes(state.url.split('?')[0])) {
      return true;
    } else {
      let redirection = '/unauthorized';
      if(this.authService.getUserRole() === Roles.DEFAULT){
        redirection='/login';
      }
      this.router.navigate([redirection]);
      return false;
    }
  }
}
