import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JWTService } from './shared/jwt/jwt.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'caixa-otica';

  constructor(private router: Router, private jwt: JWTService, private location: Location){}

  logout() {
    this.jwt.logout();
    this.router.navigate(['/login']);
  }

  loggedIn(): boolean {
    return this.jwt.loggedIn;
  }

  goBack() {
    this.location.back();
  }

}
