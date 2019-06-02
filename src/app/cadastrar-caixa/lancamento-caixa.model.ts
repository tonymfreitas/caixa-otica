export class LancamentoCaixa {

    dataLancamento: Date;
    historico: string;
    tipo: string;
    documento: string;
    entrada: number;
    saida: number;

    constructor(data: Date, historico: string, tipo: string, documento: string, entrada: number, saida: number) {
        this.dataLancamento = data;
        this.historico = historico;
        this.documento = documento;
        this.tipo = tipo;
        this.saida = saida;
        this.entrada = entrada;
    }

    getEntrada(): number {
        return this.entrada;
    }

    getSaida(): number {
        return this.saida;
    }

}