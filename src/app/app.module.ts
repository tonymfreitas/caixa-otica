import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CaixaComponent } from './caixa/caixa.component';
import { ROUTES } from './app.route';
import { CadastrarCaixaComponent } from './cadastrar-caixa/cadastrar-caixa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaixaService } from './cadastrar-caixa/caixa.service';
import { ListaCaixasComponent } from './lista-caixas/lista-caixas.component';
import { EditarCaixaComponent } from './editar-caixa/editar-caixa.component';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { NotificationService } from './shared/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackupComponent } from './backup/backup.component';
import { BackupService } from './backup/backup.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioService } from './usuario/usuario.service';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    CaixaComponent,
    CadastrarCaixaComponent,
    ListaCaixasComponent,
    EditarCaixaComponent,
    SnackbarComponent,
    BackupComponent,
    LoginComponent,
    ConfiguracaoComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    Ng4LoadingSpinnerModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['http://localhost:4200/login', 'http://localhost:4200/']
      }
    })
  ],
  providers: [CaixaService, NotificationService, BackupService, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
