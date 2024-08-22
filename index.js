import express from 'express';
import cors from 'cors';
import rotaPais from './Rotas/rotaPais.js';
import rotaCidade from './Rotas/rotaCidade.js';

const host = 'localhost';
const porta = 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/pais', rotaPais);
app.use('/cidade', rotaCidade);

app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
