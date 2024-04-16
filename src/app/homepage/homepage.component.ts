import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatBadgeModule } from '@angular/material/badge';
import { LoginComponent } from '../login/login.component';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatBadgeModule,
    LoginComponent,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  isConnecter = true;
  badgeVisible = false;

  badgeVisibility() {
    this.badgeVisible = true;
  }

  ngOnInit() {
    if(!localStorage.getItem("type_user")){
      this.isConnecter=false
    }
  }

  onDeconnecter(){
    localStorage.clear();
    location.reload();
  }
}
