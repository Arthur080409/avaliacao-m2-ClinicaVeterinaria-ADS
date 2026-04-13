const { pets, tutores } = require('../../db');

// Lista todos os pets
const listarPets = async () => {
  return pets;
};

// Busca um pet específico pelo ID
const buscarPetPorId = async (id) => {
  const pet = pets.find((p) => p.id === Number(id));
  return pet || null;
};

// Lista pets de um tutor específico
const listarPetsPorTutor = async (tutor_id) => {
  const petsPorTutor = pets.filter((p) => p.tutor_id === Number(tutor_id));
  return petsPorTutor;
};

// Criar um novo pet
const cadastrarPet = async ({
  nome,
  especie,
  raca,
  data_nascimento,
  tutor_id,
}) => {
  // Validações de negócio
  if (!nome || !especie || !raca || !tutor_id) {
    throw new Error(
      'Nome, espécie, raça e tutor_id são obrigatórios! 🐾'
    );
  }

  // Verificar se tutor existe
  const tutorExiste = tutores.some((t) => t.id === Number(tutor_id));
  if (!tutorExiste) {
    throw new Error('Tutor não encontrado no sistema! ⚠️');
  }

  // Validar data
  if (data_nascimento) {
    const data = new Date(data_nascimento);
    if (isNaN(data.getTime())) {
      throw new Error('Data de nascimento inválida! 📅');
    }
  }

  const novoPet = {
    id: Math.max(...pets.map((p) => p.id), 0) + 1,
    nome,
    especie,
    raca,
    data_nascimento: data_nascimento || null,
    tutor_id: Number(tutor_id),
  };

  pets.push(novoPet);
  return novoPet;
};

// Atualizar um pet
const atualizarPet = async (
  id,
  { nome, especie, raca, data_nascimento, tutor_id }
) => {
  const pet = pets.find((p) => p.id === Number(id));

  if (!pet) {
    return null;
  }

  // Se tutor_id foi modificado, validar
  if (tutor_id) {
    const tutorExiste = tutores.some((t) => t.id === Number(tutor_id));
    if (!tutorExiste) {
      throw new Error('Tutor não encontrado no sistema! ⚠️');
    }
  }

  // Validar data se fornecida
  if (data_nascimento) {
    const data = new Date(data_nascimento);
    if (isNaN(data.getTime())) {
      throw new Error('Data de nascimento inválida! 📅');
    }
  }

  if (nome) pet.nome = nome;
  if (especie) pet.especie = especie;
  if (raca) pet.raca = raca;
  if (data_nascimento) pet.data_nascimento = data_nascimento;
  if (tutor_id) pet.tutor_id = Number(tutor_id);

  return pet;
};

// Deletar um pet
const deletarPet = async (id) => {
  const index = pets.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    return null;
  }

  const petDeletado = pets.splice(index, 1)[0];
  return petDeletado;
};

module.exports = {
  listarPets,
  buscarPetPorId,
  listarPetsPorTutor,
  cadastrarPet,
  atualizarPet,
  deletarPet,
};
