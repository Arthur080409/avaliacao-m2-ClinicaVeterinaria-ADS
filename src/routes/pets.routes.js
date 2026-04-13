const express = require('express');
const router = express.Router();
const petsController = require('../controllers/pets.controller');

// GET /pets — Lista todos os pets
router.get('/', petsController.listarPets);

// GET /pets/:id — Busca pet por ID
router.get('/:id', petsController.buscarPetPorId);

// GET /pets/tutor/:tutor_id — Lista pets de um tutor
router.get('/tutor/:tutor_id', petsController.listarPetsPorTutor);

// POST /pets — Cadastra novo pet
router.post('/', petsController.cadastrarPet);

// PUT /pets/:id — Atualiza pet
router.put('/:id', petsController.atualizarPet);

// DELETE /pets/:id — Deleta pet
router.delete('/:id', petsController.deletarPet);

module.exports = router;
