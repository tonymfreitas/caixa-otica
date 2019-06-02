import { Component, OnInit } from '@angular/core';
import { Caixa } from '../cadastrar-caixa/caixa.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CaixaService } from '../cadastrar-caixa/caixa.service';
import { LancamentoCaixa } from '../cadastrar-caixa/lancamento-caixa.model';
import { NotificationService } from '../shared/notification.service';
import { Tipo } from '../shared/tipo.model';
import { Utils } from '../shared/utils.model';

@Component({
  selector: 'app-editar-caixa',
  templateUrl: './editar-caixa.component.html',
  styleUrls: ['./editar-caixa.component.css']
})
export class EditarCaixaComponent implements OnInit {

  caixa: Caixa;
  editarCaixaForm: FormGroup;
  descricao: string;
  tipos: Tipo[] = [Tipo.VAZIO , Tipo.DINHEIRO, Tipo.CARTAO, Tipo.CHEQUE];

  constructor(private formBuilder: FormBuilder, private caixaService: CaixaService, private notification: NotificationService) {
  }

  ngOnInit() {
    this.caixa = Object.assign(new Caixa(), this.caixaService.getCaixa());

    this.descricao = this.caixa.descricao;
    this.editarCaixaForm = this.formBuilder.group({
      data: this.formBuilder.control(''),
      historico: this.formBuilder.control(''),
      tipo: this.formBuilder.control(''),
      documento: this.formBuilder.control(''),
      entrada: this.formBuilder.control(''),
      saida: this.formBuilder.control('')
    });
  }

  adicionarLancamentoCaixa(): void {
    if (this.isDataValida()) {
      this.caixa.addLancamento(new LancamentoCaixa(
        this.editarCaixaForm.get('data').value,
        this.editarCaixaForm.get('historico').value,
        this.editarCaixaForm.get('tipo').value,
        this.editarCaixaForm.get('documento').value,
        this.getValueDefaultIsEmpty(this.editarCaixaForm.get('entrada').value),
        this.getValueDefaultIsEmpty(this.editarCaixaForm.get('saida').value)
      ));
      this.editarCaixaForm.reset();
      Utils.ordernarLancamentosCaixa(this.caixa.getLancamentos());
    }
  }

  isDataValida(): boolean {
    let value: string = this.editarCaixaForm.get('data').value;
    let dataValida: boolean = value !== '' && value !== null;
    if (!dataValida) {
      this.notification.notify('Data inválida, ajuste para inserir um lançamento');
    }
    return dataValida;
  }

  possuiDescricao(): boolean {
    let possuiDesc: boolean = this.descricao !== '' && this.descricao !== undefined;
    if (!possuiDesc) {
      this.notification.notify('Não foi possível salvar o caixa, preencha a descrição');
    }
    return possuiDesc;
  }

  salvarCaixa(): void {
    if (this.possuiDescricao()) {
      this.caixa.setDescricao(this.descricao);
      this.caixaService.salvarCaixa(this.caixa).subscribe(response => {
        if (response !== undefined && response !== null) {
          this.notification.notify('Caixa salvo com sucesso!');
        }
      });
    }
  }

  excluirLancamentoCaixa(lancamento: LancamentoCaixa): void {
    this.caixa.getLancamentos().splice(this.caixa.getLancamentos().indexOf(lancamento), 1);
  }

  getSaldoTotal(): number {
    return this.caixa.getLancamentos().map(lancamento => {
      return Math.round(lancamento.entrada - lancamento.saida);
    }).reduce((a, b) => a + b, 0);
  }

  getValueDefaultIsEmpty(value: string): number {
    return value === '' || value === null ? 0 : parseFloat(value);
  }

  isCaixaNotEmpty(): boolean {
    return this.caixa.getLancamentos().length > 0;
  }

  getLancamentosCaixa(): LancamentoCaixa[] {
    return this.caixa.getLancamentos();
  }

  getSaldo(lancamento: LancamentoCaixa): number {
    return Math.round(lancamento.entrada - lancamento.saida);
  }
}
