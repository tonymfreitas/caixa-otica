import { LancamentoCaixa } from './lancamento-caixa.model';

export class Caixa {

     lancamentos : Array<LancamentoCaixa>
     dataCaixa: Date
     idCaixa: string
     descricao: string

     constructor() {
         this.lancamentos = new Array<LancamentoCaixa>();
         this.dataCaixa = new Date();
     }

     getCaixa(): Caixa {
         return this;
     }

     setLancamentos(lancamentos: LancamentoCaixa[]): void {
        this.lancamentos = lancamentos;
     }

     getLancamentos(): LancamentoCaixa[] {
         return this.lancamentos;
     }

     addLancamento(lancamento: LancamentoCaixa) {
         this.lancamentos.push(lancamento);
     }

     getDescricao(): string {
         return this.descricao;
     }

     setDescricao(descricao: string): void {
         this.descricao = descricao;
     }

}