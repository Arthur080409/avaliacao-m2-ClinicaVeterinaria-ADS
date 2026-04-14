const TutoresService = require('../services/tutores.service');

class TutoresController {
  async listar(req, res) {
    try {
      const tutores = await TutoresService.listarTodos();
      res.status(200).json(tutores);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async obterPorId(req, res) {
    try {
      const { id } = req.params;
      const tutor = await TutoresService.obterPorId(id);
      if (!tutor) {
        return res.status(404).json({ erro: 'Tutor não encontrado' });
      }
      res.status(200).json(tutor);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async criar(req, res) {
    try {
      const { nome, email, telefone, endereco } = req.body;
      if (!nome || !email || !telefone) {
        return res.status(400).json({ erro: 'Nome, email e telefone são obrigatórios' });
      }
      const novoTutor = await TutoresService.criar({ nome, email, telefone, endereco });
      res.status(201).json(novoTutor);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, telefone, endereco } = req.body;
      const tutorAtualizado = await TutoresService.atualizar(id, { nome, email, telefone, endereco });
      if (!tutorAtualizado) {
        return res.status(404).json({ erro: 'Tutor não encontrado' });
      }
      res.status(200).json(tutorAtualizado);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const resultado = await TutoresService.deletar(id);
      if (!resultado) {
        return res.status(404).json({ erro: 'Tutor não encontrado' });
      }
      res.status(200).json({ mensagem: 'Tutor deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = new TutoresController();