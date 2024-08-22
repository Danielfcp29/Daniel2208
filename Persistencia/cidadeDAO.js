import Cidade from '../Modelo/cidade.js';
import conectar from './conexao.js';

export default class CidadeDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
            CREATE TABLE IF NOT EXISTS cidade(
                cidade_codigo INT NOT NULL AUTO_INCREMENT,
                cidade_nome VARCHAR(100) NOT NULL,
                pais_codigo INT NOT NULL,
                CONSTRAINT pk_cidade PRIMARY KEY(cidade_codigo),
                CONSTRAINT fk_cidade_pais FOREIGN KEY(pais_codigo)
                    REFERENCES pais(pais_codigo)
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(cidade) {
        if (cidade instanceof Cidade) {
            const sql = `INSERT INTO cidade(cidade_nome, pais_codigo)
                         VALUES(?, ?)`;
            const parametros = [cidade.nome, cidade.codigoPais];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            cidade.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(cidade) {
        if (cidade instanceof Cidade) {
            const sql = `UPDATE cidade SET cidade_nome = ?, pais_codigo = ?
                         WHERE cidade_codigo = ?`;
            const parametros = [cidade.nome, cidade.codigoPais, cidade.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cidade) {
        if (cidade instanceof Cidade) {
            const sql = `DELETE FROM cidade WHERE cidade_codigo = ?`;
            const parametros = [cidade.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo) {
            termo = "";
        }

        const conexao = await conectar();
        let listaCidades = [];
        if (!isNaN(parseInt(termo))) {
           
            const sql = `SELECT c.cidade_codigo, c.cidade_nome, c.pais_codigo
                         FROM cidade c 
                         WHERE c.cidade_codigo = ?
                         ORDER BY c.cidade_nome`;
            const parametros = [termo];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const cidade = new Cidade(registro.cidade_codigo, registro.cidade_nome, registro.pais_codigo);
                listaCidades.push(cidade);
            }
        } else {
           
            const sql = `SELECT c.cidade_codigo, c.cidade_nome, c.pais_codigo
                         FROM cidade c 
                         WHERE c.cidade_nome LIKE ?
                         ORDER BY c.cidade_nome`;
            const parametros = ['%' + termo + '%'];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const cidade = new Cidade(registro.cidade_codigo, registro.cidade_nome, registro.pais_codigo);
                listaCidades.push(cidade);
            }
        }

        return listaCidades;
    }
}
