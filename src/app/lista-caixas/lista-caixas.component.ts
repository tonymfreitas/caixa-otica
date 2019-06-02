import { Component, OnInit } from '@angular/core';
import { Caixa } from '../cadastrar-caixa/caixa.model';
import { CaixaService } from '../cadastrar-caixa/caixa.service';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-lista-caixas',
  templateUrl: './lista-caixas.component.html',
  styleUrls: ['./lista-caixas.component.css']
})
export class ListaCaixasComponent implements OnInit {

  caixas: Caixa[];

  constructor(private caixaService: CaixaService, private route: Router, private notification: NotificationService) { }

  ngOnInit() {
    this.caixas = new Array<Caixa>();
    this.caixaService.listarCaixas().subscribe(cxs => {
      this.caixas = cxs;
    });
  }

  editarCaixa(caixa: Caixa) {
    this.caixaService.setCaixa(caixa);
    this.route.navigate(['caixa/editar']);
  }

  gerarRelatorio(caixa: Caixa) {
    this.notification.startLoader(true);
    this.caixaService.gerarRelatorio(caixa).subscribe(pdf => {
      this.notification.startLoader(false);
      var fileURL = URL.createObjectURL(pdf);
      window.open(fileURL);
    });
  }

}
