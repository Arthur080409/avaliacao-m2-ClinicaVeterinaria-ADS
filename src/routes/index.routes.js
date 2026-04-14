const express = require('express');
const router = express.Router();

// Importar rotas
const tutoresRoutes = require('./tutores.routes');
const petsRoutes = require('./pets.routes');
const consultasRoutes = require('./consultas.routes');

// Registrar rotas
router.use('/tutores', tutoresRoutes);
router.use('/pets', petsRoutes);
router.use('/consultas', consultasRoutes);

module.exports = router;