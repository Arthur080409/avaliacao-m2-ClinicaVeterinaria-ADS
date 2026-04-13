// BASE DE DADOS EM MEMÓRIA - CLÍNICA VETERINÁRIA

// TUTORES (Donos dos animais)
const tutores = [
  {
    id: 1,
    nome: 'João Silva',
    telefone: '(11) 98765-4321',
    email: 'joao@email.com',
  },
  {
    id: 2,
    nome: 'Maria Santos',
    telefone: '(11) 99876-5432',
    email: 'maria@email.com',
  },
  {
    id: 3,
    nome: 'Pedro Oliveira',
    telefone: '(11) 97654-3210',
    email: 'pedro@email.com',
  },
];

// PETS (Animais)
const pets = [
  {
    id: 1,
    nome: 'Rex',
    especie: 'Cão',
    raca: 'Labrador',
    data_nascimento: '2020-05-15',
    tutor_id: 1,
  },
  {
    id: 2,
    nome: 'Miau',
    especie: 'Gato',
    raca: 'Persa',
    data_nascimento: '2019-08-22',
    tutor_id: 2,
  },
  {
    id: 3,
    nome: 'Buddy',
    especie: 'Cão',
    raca: 'Golden Retriever',
    data_nascimento: '2021-03-10',
    tutor_id: 1,
  },
];

// CONSULTAS (Atendimentos)
const consultas = [
  {
    id: 1,
    animal_id: 1,
    data_consulta: '2024-10-20',
    motivo: 'Vacinação anual',
    diagnostico: 'Animal saudável. Vacinado com sucesso.',
    veterinario: 'Dr. Carlos',
  },
  {
    id: 2,
    animal_id: 2,
    data_consulta: '2024-10-18',
    motivo: 'Acompanhamento dental',
    diagnostico: 'Limpeza realizada, sem problemas identificados.',
    veterinario: 'Dra. Ana',
  },
];

module.exports = { tutores, pets, consultas };