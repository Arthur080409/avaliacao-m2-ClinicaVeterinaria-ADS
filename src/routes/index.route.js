const express = require('express');
const router = express.Router();
// Importação das Rotas
const petRoute = require('./pet.route');
const tutorRoute = require('./tutor.route');
const consultaRoute = require('./consulta.route');
// Importação Seletiva de Middlewares
const { autenticar, validarContentType } = require('../middlewares/main.middleware');

// 1. Rota Raiz (Totalmente Pública)
router.get('/', (req, res) => {
  res.json({ sistema: 'Clínica Veterinária', status: 'Online' });
});

// 2. Aplicando a "Barreira" de Segurança
// A partir daqui, TUDO exige token e JSON correto
router.use(autenticar);
router.use(validarContentType);

// 3. Rotas Protegidas
router.use('/pets', petRoute);
router.use('/tutores', tutorRoute);
router.use('/consultas', consultaRoute);

// 4. Rota 404 - Caso nenhuma rota acima seja encontrada
router.use((req, res) => {
  res
    .status(404)
    .json({ erro: 'Rota não encontrada na Clínica Veterinária.' });
});

module.exports = router;
