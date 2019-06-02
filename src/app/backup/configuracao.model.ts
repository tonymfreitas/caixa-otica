export class Configuracao {

    idConfiguracao: number;
    caminhoBancoDados: string;
    caminhoBackup: string;
    emailEmissor: string
    emailDestino: string;
    senhaEmailEmissor: string;

    constructor() {

    }

    getCaminhoBancoDados(): string {
        return this.caminhoBancoDados;
    }

    setCaminhoBancoDados(caminhoBancoDados: string): void {
        this.caminhoBancoDados = caminhoBancoDados;
    }

    getCaminhoBackup(): string {
        return this.caminhoBackup;
    }

    setCaminhoBackup(caminhoBackup: string): void {
        this.caminhoBackup = caminhoBackup;
    }

    getIdConfiguracao(): number {
        return this.idConfiguracao;
    }

    setIdConfiguracao(idConfiguracao: number): void {
        this.idConfiguracao = idConfiguracao;
    }

}