const petsService = require('../services/pets.service');

// GET /pets — Lista todos os pets
const listarPets = async (req, res) => {
  try {
    const pets = await petsService.listarPets();
    res.status(200).json({ total: pets.length, pets });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar pets.' });
  }
};

// GET /pets/:id — Busca pet por ID
const buscarPetPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await petsService.buscarPetPorId(id);

    if (!pet) {
      return res
        .status(404)
        .json({ erro: `Pet ${id} não encontrado no sistema.` });
    }

    res.status(200).json({ pet });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar pet.' });
  }
};

// GET /pets/tutor/:tutor_id — Lista pets de um tutor
const listarPetsPorTutor = async (req, res) => {
  try {
    const { tutor_id } = req.params;
    const pets = await petsService.listarPetsPorTutor(tutor_id);

    res.status(200).json({ total: pets.length, pets });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar pets do tutor.' });
  }
};

// POST /pets — Cadastra novo pet
const cadastrarPet = async (req, res) => {
  try {
    const { nome, especie, raca, data_nascimento, tutor_id } = req.body;
    const novoPet = await petsService.cadastrarPet({
      nome,
      especie,
      raca,
      data_nascimento,
      tutor_id,
    });

    res.status(201).json({
      mensagem: 'Pet cadastrado com sucesso!',
      pet: novoPet,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// PUT /pets/:id — Atualiza pet
const atualizarPet = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, especie, raca, data_nascimento, tutor_id } = req.body;
    const petAtualizado = await petsService.atualizarPet(id, {
      nome,
      especie,
      raca,
      data_nascimento,
      tutor_id,
    });

    if (!petAtualizado) {
      return res
        .status(404)
        .json({ erro: `Pet ${id} não encontrado no sistema.` });
    }

    res.status(200).json({
      mensagem: 'Pet atualizado com sucesso!',
      pet: petAtualizado,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// DELETE /pets/:id — Deleta pet
const deletarPet = async (req, res) => {
  try {
    const { id } = req.params;
    const petDeletado = await petsService.deletarPet(id);

    if (!petDeletado) {
      return res
        .status(404)
        .json({ erro: `Pet ${id} não encontrado no sistema.` });
    }

    res.status(200).json({
      mensagem: 'Pet deletado com sucesso!',
      pet: petDeletado,
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

module.exports = {
  listarPets,
  buscarPetPorId,
  listarPetsPorTutor,
  cadastrarPet,
  atualizarPet,
  deletarPet,
};
