import { Routes } from '@angular/router'
import { CaixaComponent } from './caixa/caixa.component';
import { CadastrarCaixaComponent } from './cadastrar-caixa/cadastrar-caixa.component';
import { ListaCaixasComponent } from './lista-caixas/lista-caixas.component';
import { EditarCaixaComponent } from './editar-caixa/editar-caixa.component';
import { BackupComponent } from './backup/backup.component';
import { LoginComponent } from './login/login.component';
import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { UsuarioComponent } from './usuario/usuario.component';

export const ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: CaixaComponent },
    { path: 'caixa/cadastrar', component: CadastrarCaixaComponent },
    { path: 'caixa/editar', component: EditarCaixaComponent },
    { path: 'configuracao/backup', component: BackupComponent },
    { path: 'caixas', component: ListaCaixasComponent },
    { path: 'configuracao', component: ConfiguracaoComponent },
    { path: 'configuracao/usuario', component: UsuarioComponent }
]