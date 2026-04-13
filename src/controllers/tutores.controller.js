const tutoresService = require('../services/tutores.service');

// GET /tutores — Lista todos os tutores
const listarTutores = async (req, res) => {
  try {
    const tutores = await tutoresService.listarTutores();
    res.status(200).json({ total: tutores.length, tutores });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar tutores.' });
  }
};

// GET /tutores/:id — Busca tutor por ID
const buscarTutorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tutor = await tutoresService.buscarTutorPorId(id);

    if (!tutor) {
      return res
        .status(404)
        .json({ erro: `Tutor ${id} não encontrado no sistema.` });
    }

    res.status(200).json({ tutor });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar tutor.' });
  }
};

// POST /tutores — Cadastra novo tutor
const cadastrarTutor = async (req, res) => {
  try {
    const { nome, telefone, email } = req.body;
    const novoTutor = await tutoresService.cadastrarTutor({
      nome,
      telefone,
      email,
    });

    res.status(201).json({
      mensagem: 'Tutor cadastrado com sucesso!',
      tutor: novoTutor,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// PUT /tutores/:id — Atualiza tutor
const atualizarTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, email } = req.body;
    const tutorAtualizado = await tutoresService.atualizarTutor(id, {
      nome,
      telefone,
      email,
    });

    if (!tutorAtualizado) {
      return res
        .status(404)
        .json({ erro: `Tutor ${id} não encontrado no sistema.` });
    }

    res.status(200).json({
      mensagem: 'Tutor atualizado com sucesso!',
      tutor: tutorAtualizado,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// DELETE /tutores/:id — Deleta tutor
const deletarTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const tutorDeletado = await tutoresService.deletarTutor(id);

    if (!tutorDeletado) {
      return res
        .status(404)
        .json({ erro: `Tutor ${id} não encontrado no sistema.` });
    }

    res.status(200).json({
      mensagem: 'Tutor deletado com sucesso!',
      tutor: tutorDeletado,
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

module.exports = {
  listarTutores,
  buscarTutorPorId,
  cadastrarTutor,
  atualizarTutor,
  deletarTutor,
};
