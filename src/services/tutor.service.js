const tutores = [
  {
    id: 1,
    nome: 'Anderson Dutra',
    telefone: '(11) 99999-0001',
    email: 'anderson@gmail.com',
  },
  {
    id: 2,
    nome: 'Ralph Dutra',
    telefone: '(11) 99999-0002',
    email: 'ralph@gmail.com',
  },
  {
    id: 3,
    nome: 'Teddy Dutra',
    telefone: '(11) 99999-0003',
    email: 'teddy@gmail.com',
  },
];

const listarTodosTutores = async () => {
  return tutores;
};

const buscarTutorPorId = async (id) => {
  const tutor = tutores.find((item) => item.id === Number(id));
  return tutor || null;
};

const criarTutor = async ({ nome, email, telefone }) => {
  if (!nome || !email || !telefone) {
    throw new Error('Nome, e-mail e telefone são obrigatórios.');
  }

  const novoTutor = {
    id: tutores.length + 1,
    nome,
    email,
    telefone,
  };

  tutores.push(novoTutor);
  return novoTutor;
};

const excluirTutor = async (id) => {
  const index = tutores.findIndex((item) => item.id === Number(id));
  if (index === -1) {
    return null;
  }

  const [tutorRemovido] = tutores.splice(index, 1);
  return tutorRemovido;
};

module.exports = { listarTodosTutores, buscarTutorPorId, criarTutor, excluirTutor };
