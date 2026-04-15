const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consulta.controller');

router.get('/', consultaController.listarConsultas);
router.get('/:id', consultaController.buscarConsultaPorId);
router.post('/', consultaController.agendarConsulta);

module.exports = router;