import { Router } from "express";
import PaisCtrl from "../Controle/paisCtrl.js";

const paisCtrl = new PaisCtrl();
const rotaPais = new Router();

rotaPais
    .get('/', paisCtrl.consultar)
    .get('/:termo', paisCtrl.consultar)
    .post('/', paisCtrl.gravar)
    .patch('/', paisCtrl.atualizar)
    .put('/', paisCtrl.atualizar)
    .delete('/', paisCtrl.excluir);

export default rotaPais;
