export class Usuario {

    idUsuario: number;
    usuario: string;
    senha: string;

    constructor(usuario: string, senha: string) {
        this.usuario = usuario;
        this.senha = senha;
    }

    getUsuario(): string {
        return this.usuario;
    }

    getSenha(): string {
        return this.senha;
    }

    getIdUsuario(): number {
        return this.idUsuario;
    }
}