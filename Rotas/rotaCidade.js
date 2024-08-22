import { Router } from "express";
import CidadeCtrl from "../Controle/cidadeCtrl.js";

const cidadeCtrl = new CidadeCtrl();
const rotaCidade = new Router();

rotaCidade
    .get('/', cidadeCtrl.consultar)
    .get('/:termo', cidadeCtrl.consultar)
    .post('/', cidadeCtrl.gravar)
    .patch('/', cidadeCtrl.atualizar)
    .put('/', cidadeCtrl.atualizar)
    .delete('/', cidadeCtrl.excluir);

export default rotaCidade;