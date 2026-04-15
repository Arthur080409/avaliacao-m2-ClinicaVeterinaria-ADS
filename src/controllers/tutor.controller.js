const tutorService = require('../services/tutor.service');

// GET /tutores
const listarTutores = async (req, res) => {
  try {
    const tutores = await tutorService.listarTodosTutores();
    res.status(200).json({ total: tutores.length, tutores });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar tutores.' });
  }
};

// GET /tutores/:id — Busca tutor por ID
const buscarTutorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tutor = await tutorService.buscarTutorPorId(id);

    if (!tutor) {
      return res.status(404).json({ erro: `Tutor ${id} não encontrado.` });
    }

    res.status(200).json({ tutor });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar tutor.' });
  }
};

// POST /tutores — Cadastra novo tutor
const criarTutor = async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;
    const novoTutor = await tutorService.criarTutor({ nome, email, telefone });

    res.status(201).json({
      mensagem: 'Tutor cadastrado com sucesso!',
      tutor: novoTutor,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// DELETE /tutores/:id — Remove tutor por ID
const excluirTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const tutorRemovido = await tutorService.excluirTutor(id);

    if (!tutorRemovido) {
      return res.status(404).json({ erro: `Tutor ${id} não encontrado.` });
    }

    res.status(200).json({ mensagem: 'Tutor removido com sucesso.', tutor: tutorRemovido });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao remover tutor.' });
  }
};

module.exports = { listarTutores, buscarTutorPorId, criarTutor, excluirTutor };
