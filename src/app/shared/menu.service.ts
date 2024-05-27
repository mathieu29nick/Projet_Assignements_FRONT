import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { MenuItems } from './menu-items';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private authService: AuthService) {}

  getMenuItems() {
    const role = this.authService.getUserRole();
    return MenuItems[role] || [];
  }
}
