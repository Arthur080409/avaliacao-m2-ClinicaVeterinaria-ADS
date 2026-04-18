const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consulta.controller');

router.get('/', consultaController.listarConsultas);
router.get('/:id', consultaController.buscarConsultaPorId);
router.post('/', consultaController.agendarConsulta);
router.put('/:id', consultaController.atualizarConsulta);
router.delete('/:id', consultaController.excluirConsulta);

module.exports = router;