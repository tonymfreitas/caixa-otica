import { Component, OnInit } from '@angular/core';
import { LancamentoCaixa } from './lancamento-caixa.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { CaixaService } from './caixa.service';
import { Caixa } from './caixa.model';
import { NotificationService } from '../shared/notification.service';
import { Tipo } from '../shared/tipo.model';
import { Utils } from '../shared/utils.model';

@Component({
  selector: 'app-cadastrar-caixa',
  templateUrl: './cadastrar-caixa.component.html',
  styleUrls: ['./cadastrar-caixa.component.css']
})
export class CadastrarCaixaComponent implements OnInit {

  caixa: Caixa;
  caixaForm: FormGroup;
  descricao: string;
  tipos: Tipo[] = [Tipo.VAZIO , Tipo.DINHEIRO, Tipo.CARTAO, Tipo.CHEQUE];

  constructor(private formBuilder: FormBuilder, private cadastrarCaixaService: CaixaService, private notification: NotificationService) { }

  ngOnInit() {
    this.caixa = new Caixa();
    this.caixaForm = this.formBuilder.group({
      data: this.formBuilder.control(''),
      historico: this.formBuilder.control(''),
      tipo: this.formBuilder.control(''),
      documento: this.formBuilder.control(''),
      entrada: this.formBuilder.control(''),
      saida: this.formBuilder.control('')
    });

  }

  adicionarLancamentoCaixa(): void {
    if (this.isDataValida() && this.idTipoValido()) {
      this.caixa.addLancamento(new LancamentoCaixa(
        this.caixaForm.get('data').value,
        this.caixaForm.get('historico').value,
        this.caixaForm.get('tipo').value,
        this.caixaForm.get('documento').value,
        this.getValueDefaultIsEmpty(this.caixaForm.get('entrada').value),
        this.getValueDefaultIsEmpty(this.caixaForm.get('saida').value)
      ));
      this.caixaForm.reset();

      Utils.ordernarLancamentosCaixa(this.caixa.getLancamentos());

    }
  }

  idTipoValido(): boolean {
    let value: string = this.caixaForm.get('tipo').value;
    let tipoValido: boolean = value !== undefined && value !== '';
    if(!tipoValido) {
      this.notification.notify('Tipo lançamento não selecionado!');
    }
    return tipoValido; 
  }

  isDataValida(): boolean {
    let value: string = this.caixaForm.get('data').value;
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
      this.notification.startLoader(true);
      this.caixa.setDescricao(this.descricao);
      this.cadastrarCaixaService.salvarCaixa(this.caixa).subscribe(response => {
        if (response !== undefined && response !== null) {
          this.notification.notify('Caixa salvo com sucesso!');
          this.limparCadastrado();
        }
        this.notification.startLoader(false);
      });
    }
  }

  limparCadastrado(): void {
    this.caixaForm.reset();
    this.caixa = new Caixa();
    this.descricao = '';
  }

  excluirLancamentoCaixa(lancamento: LancamentoCaixa): void {
    this.caixa.getLancamentos().splice(this.caixa.getLancamentos().indexOf(lancamento), 1);
  }

  getSaldoTotal(): number {
    return this.caixa.getLancamentos().map(lancamento => {
      return Math.round(lancamento.getEntrada() - lancamento.getSaida());
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
    return Math.round(lancamento.getEntrada() - lancamento.getSaida());
  }

}
