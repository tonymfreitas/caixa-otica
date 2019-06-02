import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Url } from '../url';
import { Usuario } from 'src/app/login/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JWTService {

    urlLogin: string = Url.URL_DEFAULT + 'usuario/login';
    urlRegistrar: string = Url.URL_DEFAULT + 'usuario/registrar';

    constructor(private httpClient: HttpClient) { }

    login(usuario: Usuario): Observable<boolean> {
        return this.httpClient.post<boolean>(this.urlLogin, usuario);
    }

    register(usuario: Usuario) {
        return this.httpClient.post<{ access_token: string }>(this.urlRegistrar, usuario).pipe(tap(res => {
            this.login(usuario)
        }))
    }

    public get loggedIn(): boolean {
        return localStorage.getItem('access_token') !== null;
    }

    logout(): void {
        localStorage.removeItem('access_token');
    }

}