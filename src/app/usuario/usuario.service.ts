import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Url } from '../shared/url';
import { Usuario } from '../login/usuario.model';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService {

    constructor(private http: HttpClient) { }

    urlEditarUsuario: string = Url.URL_DEFAULT + 'usuario/editar';
    urlObterUsuario: string = Url.URL_DEFAULT + 'usuario/listar';

    editarUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.urlEditarUsuario, usuario);
    }

    obterUsuario(): Observable<Usuario> {
        return this.http.get<Usuario>(this.urlObterUsuario);
    }

}