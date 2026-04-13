const express = require('express');
const router = express.Router();
const tutoresRoutes = require('./tutores.routes');
const petsRoutes = require('./pets.routes');
const consultasRoutes = require('./consultas.routes');
const usuariosRoutes = require('./usuarios.routes');

// 1. Rotas de Recursos (Coloque SEMPRE antes do 404)
router.use('/tutores', tutoresRoutes);
router.use('/pets', petsRoutes);
router.use('/consultas', consultasRoutes);
router.use('/usuarios', usuariosRoutes);

// 2. Rota Raiz
router.get('/', (req, res) => {
  res.json({ sistema: 'Clínica Veterinária Ralph & Teddy', status: 'Online' });
});

// 3. Rota 404 (A última linha deste arquivo)
router.use((req, res) => {
  res
    .status(404)
    .json({ erro: 'Rota não encontrada na Clínica Veterinária Ralph & Teddy.❌' });
});

module.exports = router;
