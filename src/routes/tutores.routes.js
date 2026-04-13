const express = require('express');
const router = express.Router();
const tutoresController = require('../controllers/tutores.controller');

// GET /tutores — Lista todos os tutores
router.get('/', tutoresController.listarTutores);

// GET /tutores/:id — Busca tutor por ID
router.get('/:id', tutoresController.buscarTutorPorId);

// POST /tutores — Cadastra novo tutor
router.post('/', tutoresController.cadastrarTutor);

// PUT /tutores/:id — Atualiza tutor
router.put('/:id', tutoresController.atualizarTutor);

// DELETE /tutores/:id — Deleta tutor
router.delete('/:id', tutoresController.deletarTutor);

module.exports = router;
