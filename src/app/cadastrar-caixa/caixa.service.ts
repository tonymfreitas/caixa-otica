import { Injectable } from '@angular/core';
import { Caixa } from './caixa.model';
import { HttpClient } from '@angular/common/http';
import { Url } from '../shared/url';
import { Observable } from 'rxjs';

@Injectable()
export class CaixaService {

    private caixa: Caixa;

    constructor(private http: HttpClient) { }

    urlSalvarCaixa: string = Url.URL_DEFAULT + 'caixa/salvar';
    urlListarCaixa: string = Url.URL_DEFAULT + 'caixa/listarCaixas';
    urlEditarCaixa: string = Url.URL_DEFAULT + 'caixa/editar';
    urlGerarRelatorio: string = Url.URL_DEFAULT + 'caixa/gerarRelatorio';

    salvarCaixa(caixa: Caixa) {
        return this.http.post<Caixa>(this.urlSalvarCaixa, caixa);
    }

    editarCaixa(caixa: Caixa) {
        return this.http.post<Caixa>(this.urlEditarCaixa, caixa);
    }

    gerarRelatorio(caixa: Caixa) {
        return this.http.post(this.urlGerarRelatorio, caixa,  {responseType: 'blob'});
    }

    listarCaixas(): Observable<Caixa[]> {
        return this.http.get<Caixa[]>(this.urlListarCaixa);
    }

    setCaixa(caixa: Caixa) {
        this.caixa = caixa;
    }

    getCaixa(): Caixa {
        return this.caixa;
    }
}