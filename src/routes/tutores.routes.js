const express = require('express');
const router = express.Router();
const TutoresController = require('../controllers/tutores.controller');
const auth = require('../middlewares/auth.middleware');

// Rotas de tutores
router.get('/', auth, TutoresController.listar);
router.get('/:id', auth, TutoresController.obterPorId);
router.post('/', auth, TutoresController.criar);
router.put('/:id', auth, TutoresController.atualizar);
router.delete('/:id', auth, TutoresController.deletar);

module.exports = router;