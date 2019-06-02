import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../shared/url';
import { Configuracao } from './configuracao.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackupResponse } from './backup-reponse.model';

@Injectable()
export class BackupService {

    constructor(private http: HttpClient) { }

    urlSalvarConfiguracao: string = Url.URL_DEFAULT + 'configuracao/salvar';
    urlObterConfiguracao: string = Url.URL_DEFAULT + 'configuracao/obterConfiguracao';
    urlGerarBackup: string = Url.URL_DEFAULT + 'configuracao/gerarBackup';

    salvarConfiguracao(configuracao: Configuracao): Observable<Configuracao> {
        return this.http.post<Configuracao>(this.urlSalvarConfiguracao, configuracao);
    }

    obterConfiguracao(): Observable<Configuracao> {
        return this.http.get<Configuracao>(this.urlObterConfiguracao);
    }

    gerarBackup(config: Configuracao): Observable<BackupResponse> {
        return this.http.post<BackupResponse>(this.urlGerarBackup, config);
    }
}
