// SERVICE: Aqui mora a lógica de negócio da aplicação.
// Esta camada não conhece Express, não conhece req, não conhece res.
// Simulação do acervo — em breve será uma query no Postgres
const acervo = [
  {
    id: 1,
    titulo: 'O Senhor dos Anéis',
    autor: 'J.R.R. Tolkien',
    disponivel: true,
  },
  {
    id: 2,
    titulo: 'Altered Carbon',
    autor: 'Richard K. Morgan',
    disponivel: false,
  },
  {
    id: 3,
    titulo: "Assassin's Creed",
    autor: 'Oliver Bowden',
    disponivel: true,
  },
];

// Lista todos os livros do acervo
const listarTodosLivros = async () => {
  return acervo;
};

// Busca um livro específico pelo ID
const buscarLivroPorId = async (id) => {
  const livro = acervo.find((item) => item.id === Number(id));
  // Regra de negócio: se não existe, retorna null.
  // O Controller decide o que fazer com o null.
  return livro || null;
};

// Criar um novo livro no acervo
const criarLivro = async ({ titulo, autor }) => {
  // Regra de negócio: título e autor são obrigatórios
  if (!titulo || !autor) {
    throw new Error('Título e autor são obrigatórios.');
  }
  const novoLivro = {
    id: acervo.length + 1,
    titulo,
    autor,
    disponivel: true,
  };
  acervo.push(novoLivro);
  return novoLivro;
};

module.exports = { listarTodosLivros, buscarLivroPorId, criarLivro };
