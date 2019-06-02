import { LancamentoCaixa } from '../cadastrar-caixa/lancamento-caixa.model';

export class Utils {

    public static ordernarLancamentosCaixa(lancamentos: LancamentoCaixa[]): void {
        lancamentos.sort((lanc1: LancamentoCaixa, lanc2: LancamentoCaixa) => {
            if (new Date(lanc1.dataLancamento).getTime() > new Date(lanc2.dataLancamento).getTime()) return 1;
            if (new Date(lanc1.dataLancamento).getTime() < new Date(lanc2.dataLancamento).getTime()) return -1;
            return 0;
        });
    }

}