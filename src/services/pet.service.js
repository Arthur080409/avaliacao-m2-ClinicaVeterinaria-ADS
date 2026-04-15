// SERVICE: Aqui mora a lógica de negócio da aplicação.
// Esta camada não conhece Express, não conhece req, não conhece res.
// Simulação do cadastro — em breve será uma query em banco de dados.
const pets = [
  {
    id: 1,
    nome: 'Rex',
    especie: 'Cachorro',
    tutorId: 1,
    ativo: true,
  },
  {
    id: 2,
    nome: 'Mia',
    especie: 'Gato',
    tutorId: 2,
    ativo: true,
  },
  {
    id: 3,
    nome: 'Billy',
    especie: 'Coelho',
    tutorId: 3,
    ativo: true,
  },
];

const listarTodosPets = async () => {
  return pets;
};

const buscarPetPorId = async (id) => {
  const pet = pets.find((item) => item.id === Number(id));
  return pet || null;
};

const criarPet = async ({ nome, especie, tutorId }) => {
  if (!nome || !especie || !tutorId) {
    throw new Error('Nome, espécie e tutorId são obrigatórios.');
  }

  const novoPet = {
    id: pets.length + 1,
    nome,
    especie,
    tutorId: Number(tutorId),
    ativo: true,
  };

  pets.push(novoPet);
  return novoPet;
};

const excluirPet = async (id) => {
  const index = pets.findIndex((item) => item.id === Number(id));
  if (index === -1) {
    return null;
  }

  const [petRemovido] = pets.splice(index, 1);
  return petRemovido;
};

module.exports = { listarTodosPets, buscarPetPorId, criarPet, excluirPet };
