const express = require('express');
const router = express.Router();
const PetsController = require('../controllers/pets.controller');
const auth = require('../middlewares/auth.middleware');

// Rotas de pets
router.get('/', auth, PetsController.listar);
router.get('/:id', auth, PetsController.obterPorId);
router.post('/', auth, PetsController.criar);
router.put('/:id', auth, PetsController.atualizar);
router.delete('/:id', auth, PetsController.deletar);

module.exports = router;