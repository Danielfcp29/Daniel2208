import CidadeDAO from "../Persistencia/cidadeDAO.js";

export default class Cidade {
    #codigo;
    #nome;
    #codigoPais;

    constructor(codigo = 0, nome = "", codigoPais = 0) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#codigoPais = codigoPais;
    }

    get codigo() {
        return this.#codigo;
    }
    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get codigoPais() {
        return this.#codigoPais;
    }

    set codigoPais(novoCodigoPais) {
        this.#codigoPais = novoCodigoPais;
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            codigoPais: this.#codigoPais,
        };
    }

    
    async gravar() {
        const cidadeDAO = new CidadeDAO();
        await cidadeDAO.gravar(this);
    }

    async excluir() {
        const cidadeDAO = new CidadeDAO();
        await cidadeDAO.excluir(this);
    }

    async atualizar() {
        const cidadeDAO = new CidadeDAO();
        await cidadeDAO.atualizar(this);
    }

    async consultar(termo) {
        const cidadeDAO = new CidadeDAO();
        return await cidadeDAO.consultar(termo);
    }
}
