// CONTROLLER: Coordena a comunicação entre a Rota e o Service.
// Extrai dados do req, chama o Service e formata a resposta com res.
// Nunca contém regra de negócio — apenas orquestração.

const livroService = require('../services/livro.service');

// GET /livros — Lista todos os livros
const listarLivros = async (req, res) => {
  try {
    const livros = await livroService.listarTodosLivros();
    res.status(200).json({ total: livros.length, livros });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar livros.' });
  }
};

// GET /livros/:id — Busca livro por ID
const buscarLivroPorId = async (req, res) => {
  try {
    // Extrai o parâmetro da URL — essa é a responsabilidade do Controller
    const { id } = req.params;
    const livro = await livroService.buscarLivroPorId(id);

    // Se o Service retornou null, o livro não existe
    if (!livro) {
      return res
        .status(404)
        .json({ erro: `Livro ${id} não encontrado no acervo.` });
    }

    res.status(200).json({ livro });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar livro.' });
  }
};

// POST /livros — Cadastra novo livro
const criarLivro = async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { titulo, autor } = req.body;
    const novoLivro = await livroService.criarLivro({ titulo, autor });

    // 201 = Created — status correto para criação bem-sucedida
    res.status(201).json({
      mensagem: 'Livro cadastrado no acervo com sucesso!',
      livro: novoLivro,
    });
  } catch (erro) {
    // Se o Service lançou um erro de validação, retornamos 400
    res.status(400).json({ erro: erro.message });
  }
};

module.exports = { listarLivros, buscarLivroPorId, criarLivro };
