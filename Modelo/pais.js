import PaisDAO from "../Persistencia/paisDAO.js";

export default class Pais {
    
    #codigo;
    #nome;

    constructor(codigo = 0, nome = '') {
        this.#codigo = codigo;
        this.#nome = nome;
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

    
    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome
        }
    }

    
    async gravar() {
        const paisDAO = new PaisDAO();
        await paisDAO.gravar(this);
    }

    async excluir() {
        const paisDAO = new PaisDAO();
        await paisDAO.excluir(this);
    }

    async atualizar() {
        const paisDAO = new PaisDAO();
        await paisDAO.atualizar(this);
    }

    async consultar(parametro) {
        const paisDAO = new PaisDAO();
        return await paisDAO.consultar(parametro);
    }
}
