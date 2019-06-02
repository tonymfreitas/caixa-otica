import { Component, OnInit } from '@angular/core';
import { BackupService } from './backup.service';
import { Configuracao } from './configuracao.model';
import { NotificationService } from '../shared/notification.service';


@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {

  configuracao: Configuracao;

  constructor(private backupService: BackupService, private notification: NotificationService) { }

  ngOnInit() {
    this.configuracao = new Configuracao();
    this.obterConfiguracao();
  }

  obterConfiguracao(): void {
    this.backupService.obterConfiguracao().subscribe((config: Configuracao) => {
      if(config !== null) {
        this.configuracao = config;
      }
    })
  }


  realizarBackup(): void {
    this.notification.startLoader(true);
    this.backupService.gerarBackup(this.configuracao).subscribe(response => {
      console.log(response)
      if(response.sucesso) {
        this.notification.notify('Backup realizado com sucesso!');
      } else {
        this.notification.notify(response.erro);
      }
      this.notification.startLoader(false);
    });
  }

  salvarConfiguracaoBackup() {
    this.backupService.salvarConfiguracao(this.configuracao).subscribe(response => {
      if (response !== undefined && response !== null) {
        this.notification.notify('Configuração realizada com sucesso!');
      }
    })
  }

}
