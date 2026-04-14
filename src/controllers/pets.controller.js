const PetsService = require('../services/pets.service');

class PetsController {
  async listar(req, res) {
    try {
      const pets = await PetsService.listarTodos();
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async obterPorId(req, res) {
    try {
      const { id } = req.params;
      const pet = await PetsService.obterPorId(id);
      if (!pet) {
        return res.status(404).json({ erro: 'Pet não encontrado' });
      }
      res.status(200).json(pet);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async criar(req, res) {
    try {
      const { nome, especie, raca, idade, tutor_id } = req.body;
      if (!nome || !especie || !tutor_id) {
        return res.status(400).json({ erro: 'Nome, espécie e tutor_id são obrigatórios' });
      }
      const novoPet = await PetsService.criar({ nome, especie, raca, idade, tutor_id });
      res.status(201).json(novoPet);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, especie, raca, idade, tutor_id } = req.body;
      const petAtualizado = await PetsService.atualizar(id, { nome, especie, raca, idade, tutor_id });
      if (!petAtualizado) {
        return res.status(404).json({ erro: 'Pet não encontrado' });
      }
      res.status(200).json(petAtualizado);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const resultado = await PetsService.deletar(id);
      if (!resultado) {
        return res.status(404).json({ erro: 'Pet não encontrado' });
      }
      res.status(200).json({ mensagem: 'Pet deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = new PetsController();