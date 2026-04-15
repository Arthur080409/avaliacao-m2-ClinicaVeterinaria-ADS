// CONTROLLER: Coordena a comunicação entre a rota e o service.
// Extrai dados do req, chama o service e formata a resposta com res.
// Nunca contém regra de negócio — apenas orquestração.

const petService = require('../services/pet.service');

// GET /pets — Lista todos os pets
const listarPets = async (req, res) => {
  try {
    const pets = await petService.listarTodosPets();
    res.status(200).json({ total: pets.length, pets });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar pets.' });
  }
};

// GET /pets/:id — Busca pet por ID
const buscarPetPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await petService.buscarPetPorId(id);

    if (!pet) {
      return res
        .status(404)
        .json({ erro: `Pet ${id} não encontrado.` });
    }

    res.status(200).json({ pet });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar pet.' });
  }
};

// POST /pets — Cadastra novo pet
const criarPet = async (req, res) => {
  try {
    const { nome, especie, tutorId } = req.body;

    if (!req.tutorId) {
      return res.status(401).json({
        erro: 'Identidade do tutor não informada. Use o cabeçalho X-Tutor-Id.',
      });
    }

    if (Number(tutorId) !== req.tutorId) {
      return res.status(403).json({
        erro: 'Você só pode cadastrar pets para o seu próprio tutorId.',
      });
    }

    const novoPet = await petService.criarPet({ nome, especie, tutorId });

    res.status(201).json({
      mensagem: 'Pet cadastrado com sucesso!',
      pet: novoPet,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// DELETE /pets/:id — Remove pet por ID
const excluirPet = async (req, res) => {
  try {
    const { id } = req.params;
    const petRemovido = await petService.excluirPet(id);

    if (!petRemovido) {
      return res.status(404).json({ erro: `Pet ${id} não encontrado.` });
    }

    res.status(200).json({ mensagem: 'Pet removido com sucesso.', pet: petRemovido });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao remover pet.' });
  }
};

module.exports = { listarPets, buscarPetPorId, criarPet, excluirPet };
