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
    const { nome, especie, raca, data_nascimento, tutor_id } = req.body;

    if (!req.tutorId) {
      return res.status(401).json({
        erro: 'Identidade do tutor não informada. Use o cabeçalho X-Tutor-Id.',
      });
    }

    if (tutor_id !== undefined && (Number.isNaN(Number(tutor_id)) || Number(tutor_id) !== req.tutorId)) {
      return res.status(403).json({
        erro: 'Você só pode cadastrar pets para o seu próprio tutor_id.',
      });
    }

    const novoPet = await petService.criarPet({
      nome,
      especie,
      raca,
      data_nascimento,
      tutor_id: Number(tutor_id),
    });

    res.status(201).json({
      mensagem: 'Pet cadastrado com sucesso!',
      pet: novoPet,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// PUT /pets/:id — Atualiza pet por ID
const atualizarPet = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, especie, raca, data_nascimento, tutor_id } = req.body;

    if (!req.tutorId) {
      return res.status(401).json({
        erro: 'Identidade do tutor não informada. Use o cabeçalho X-Tutor-Id.',
      });
    }

    const petExistente = await petService.buscarPetPorId(id);
    if (!petExistente) {
      return res.status(404).json({ erro: `Pet ${id} não encontrado.` });
    }

    if (Number(petExistente.tutor_id) !== req.tutorId) {
      return res.status(403).json({
        erro: 'Você só pode atualizar pets do seu próprio tutor_id.',
      });
    }

    if (tutor_id && Number(tutor_id) !== req.tutorId) {
      return res.status(403).json({
        erro: 'O tutor_id do pet deve ser o mesmo que o X-Tutor-Id.',
      });
    }

    const petAtualizado = await petService.atualizarPet(id, {
      nome,
      especie,
      raca,
      data_nascimento,
      tutor_id: Number(tutor_id || petExistente.tutor_id),
    });

    res.status(200).json({ mensagem: 'Pet atualizado com sucesso!', pet: petAtualizado });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// DELETE /pets/:id — Remove pet por ID
const excluirPet = async (req, res) => {
  try {
    const { id } = req.params;
    const petExistente = await petService.buscarPetPorId(id);

    if (!petExistente) {
      return res.status(404).json({ erro: `Pet ${id} não encontrado.` });
    }

    if (!req.tutorId) {
      return res.status(401).json({
        erro: 'Identidade do tutor não informada. Use o cabeçalho X-Tutor-Id.',
      });
    }

    if (Number(petExistente.tutor_id) !== req.tutorId) {
      return res.status(403).json({
        erro: 'Você só pode remover pets do seu próprio tutor_id.',
      });
    }

    const petRemovido = await petService.excluirPet(id);

    res.status(200).json({ mensagem: 'Pet removido com sucesso.', pet: petRemovido });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao remover pet.' });
  }
};

module.exports = { listarPets, buscarPetPorId, criarPet, atualizarPet, excluirPet };
