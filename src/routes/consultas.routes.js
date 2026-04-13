const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultas.controller');

// GET /consultas — Lista todas as consultas
router.get('/', consultasController.listarConsultas);

// GET /consultas/:id — Busca consulta por ID
router.get('/:id', consultasController.buscarConsultaPorId);

// GET /consultas/animal/:animal_id — Lista consultas de um animal
router.get('/animal/:animal_id', consultasController.listarConsultasPorAnimal);

// POST /consultas — Cadastra nova consulta
router.post('/', consultasController.cadastrarConsulta);

// PUT /consultas/:id — Atualiza consulta
router.put('/:id', consultasController.atualizarConsulta);

// DELETE /consultas/:id — Deleta consulta
router.delete('/:id', consultasController.deletarConsulta);

module.exports = router;
