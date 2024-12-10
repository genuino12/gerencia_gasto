const express = require('express');
const tipoDespesaController = require('../controller/tipoController.js');
const router = express.Router();

// Rota para inserir um novo tipo de despesa
router.post('/', tipoDespesaController.inserir);
router.delete('/:id', tipoDespesaController.Deletar);
router.put('/:id', tipoDespesaController.Atualizar);
router.get('/:id', tipoDespesaController.BuscaPorID);
router.get('/', tipoDespesaController.BuscarPorFiltro);

module.exports = router;
