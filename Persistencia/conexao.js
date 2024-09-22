import mysql from 'mysql2/promise';

export default async function conectar(){
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root', // Verifique o usuário
            password: '', // Verifique a senha
            database: 'sistema', // Verifique o nome do banco
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
          });
          

          global.poolConexoes = pool;
          return await pool.getConnection();
    }
}