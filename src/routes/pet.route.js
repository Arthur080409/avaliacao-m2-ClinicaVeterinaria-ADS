// ROUTE: Mapeia URLs para funções do controller.
// Nada mais, nada menos. Sem lógica, sem processamento.

const router = require('express').Router();
const petController = require('../controllers/pet.controller');

router.get('/', petController.listarPets);
router.get('/:id', petController.buscarPetPorId);
router.post('/', petController.criarPet);
router.put('/:id', petController.atualizarPet);
router.delete('/:id', petController.excluirPet);

module.exports = router;
