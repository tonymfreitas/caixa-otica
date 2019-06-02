export class BackupResponse {

    sucesso: boolean;
    erro: string;

    constructor(sucesso: boolean, erro: string) {
        this.sucesso = sucesso;
        this.erro = erro;
    }

    getSucesso(): boolean {
        return this.sucesso;
    }

    getErro(): string {
        return this.erro;
    }

}