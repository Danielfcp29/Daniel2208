import Pais from "../Modelo/pais.js";
import conectar from "./conexao.js";

export default class PaisDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); 
            const sql = `
                CREATE TABLE IF NOT EXISTS pais(
                    pais_codigo INT NOT NULL AUTO_INCREMENT,
                    pais_nome VARCHAR(100) NOT NULL,
                    CONSTRAINT pk_pais PRIMARY KEY(pais_codigo)
                );`;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(pais) {
        if (pais instanceof Pais) {
            const sql = "INSERT INTO pais(pais_nome) VALUES(?)"; 
            const parametros = [pais.nome];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            pais.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(pais) {
        if (pais instanceof Pais) {
            const sql = "UPDATE pais SET pais_nome = ? WHERE pais_codigo = ?"; 
            const parametros = [pais.nome, pais.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros); 
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(pais) {
        if (pais instanceof Pais) {
            const sql = "DELETE FROM pais WHERE pais_codigo = ?"; 
            const parametros = [pais.codigo];
            const conexao = await conectar(); 
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
        
        if (!isNaN(parseInt(parametroConsulta))) {
            
            sql = 'SELECT * FROM pais WHERE pais_codigo = ? ORDER BY pais_nome';
            parametros = [parametroConsulta];
        } else {
           
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM pais WHERE pais_nome LIKE ?";
            parametros = ['%' + parametroConsulta + '%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaPaises = [];
        for (const registro of registros) {
            const pais = new Pais(registro.pais_codigo, registro.pais_nome);
            listaPaises.push(pais);
        }
        return listaPaises;
    }
}
