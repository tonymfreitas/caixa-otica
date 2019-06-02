import { Component, OnInit } from '@angular/core';
import { JWTService } from '../shared/jwt/jwt.service';
import { Usuario } from './usuario.model';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  senha: string;

  constructor(private jwt: JWTService, private router: Router, private notification: NotificationService) { }

  ngOnInit() {
    if(this.jwt.loggedIn) {
      this.router.navigate(['home']);
    }
  }

  logar(): void {
    this.jwt.login(new Usuario(this.usuario, this.senha)).subscribe(res => {
      if(res) {
        localStorage.setItem('access_token', "acess_token");
        this.router.navigate(['home']);
      } else {
        this.notification.notify('Usuário ou senha inválidos!');
      }
    });
  }

}
