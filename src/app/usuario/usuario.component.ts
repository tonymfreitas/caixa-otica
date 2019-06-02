import { Component, OnInit } from '@angular/core';
import { Usuario } from '../login/usuario.model';
import { UsuarioService } from './usuario.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario
  senhaConfirmacao: string

  constructor(private usuarioService: UsuarioService, private notification: NotificationService) { }

  ngOnInit() {
    this.usuario = new Usuario("", "");
    this.obterUsuario();
  }

  obterUsuario(): void {
    this.usuarioService.obterUsuario().subscribe(user => {
      if(user) {
        this.usuario = user;
        this.senhaConfirmacao = user.senha;
      }
    })
  }

  salvarUsuario(): void {
    if(this.senhaConfirmacao == this.usuario.senha) {
      this.usuarioService.editarUsuario(this.usuario).subscribe(response => {
        if(response) {
          this.notification.notify('Usuário salvo com sucesso!');
        }
      });
    } else {
      this.notification.notify('Senhas divergentes, por favor digite novamente');
    }
  }

}
