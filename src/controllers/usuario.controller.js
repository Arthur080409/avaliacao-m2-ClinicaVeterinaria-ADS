const usuarioService = require('../services/usuario.service');

// GET /usuarios
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.listarTodosUsuarios();
    res.status(200).json({ total: usuarios.length, usuarios });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar usuarios.' });
  }
};

// GET /usuarios/:id — Busca usuario por ID
const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioService.buscarUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({ erro: `Usuário ${id} não encontrado.` });
    }

    res.status(200).json({ usuario });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar usuário.' });
  }
};

// POST /usuarios — Cadastra novo usuario
const criarUsuario = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const novoUsuario = await usuarioService.criarUsuario({ nome, email });

    // 201 = Created — status correto para criação bem-sucedida
    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      usuario: novoUsuario,
    });
  } catch (erro) {
    // Se o Service lançou um erro de validação, retornamos 400
    res.status(400).json({ erro: erro.message });
  }
};

module.exports = { listarUsuarios, buscarUsuarioPorId, criarUsuario };
