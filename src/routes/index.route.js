const express = require('express');
const router = express.Router();
// Importação das Rotas
const livroRoute = require('./livro.route');
const usuarioRoute = require('./usuario.route');
// Importação Seletiva de Middlewares
const { autenticar, validarContentType } = require('../middlewares/main.middleware');

// 1. Rota Raiz (Totalmente Pública)
router.get('/', (req, res) => {
  res.json({ sistema: 'Biblioteca Ralph & Teddy', status: 'Online' });
});

// 2. Aplicando a "Barreira" de Segurança
// A partir daqui, TUDO exige token e JSON correto
router.use(autenticar);
router.use(validarContentType);

// 3. Rotas Protegidas
router.use('/livros', livroRoute);
router.use('/usuarios', usuarioRoute);

// 4. Rota 404 - Caso nenhuma rota acima seja encontrada
router.use((req, res) => {
  res
    .status(404)
    .json({ erro: 'Rota não encontrada na Biblioteca Ralph & Teddy.' });
});

module.exports = router;
