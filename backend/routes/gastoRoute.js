const express = require('express');
const gastoController = require('../controller/gastoController.js');
const router = express.Router();


router.post('/', gastoController.inserir);
router.delete('/:id', gastoController.Deletar);
router.put('/:id', gastoController.Atualizar);
router.get('/:id', gastoController.BuscaPorID);
router.get('/', gastoController.BuscarPorFiltro);

module.exports = router;
