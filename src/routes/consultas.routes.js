const express = require('express');
const router = express.Router();
const ConsultasController = require('../controllers/consultas.controller');
const auth = require('../middlewares/auth.middleware');

// Rotas de consultas
router.get('/', auth, ConsultasController.listar);
router.get('/:id', auth, ConsultasController.obterPorId);
router.post('/', auth, ConsultasController.criar);
router.put('/:id', auth, ConsultasController.atualizar);
router.delete('/:id', auth, ConsultasController.deletar);

module.exports = router;