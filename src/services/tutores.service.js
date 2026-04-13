const { tutores } = require('../../db');

// Lista todos os tutores
const listarTutores = async () => {
  return tutores;
};

// Busca um tutor específico pelo ID
const buscarTutorPorId = async (id) => {
  const tutor = tutores.find((t) => t.id === Number(id));
  return tutor || null;
};

// Criar um novo tutor
const cadastrarTutor = async ({ nome, telefone, email }) => {
  // Regra de negócio: nome e email são obrigatórios
  if (!nome || !email) {
    throw new Error('Nome e email são obrigatórios! 📋');
  }

  // Validar formato de email básico
  if (!email.includes('@')) {
    throw new Error('Email inválido! 📧');
  }

  // Verificar se email já existe
  const emailJaExiste = tutores.some((t) => t.email === email);
  if (emailJaExiste) {
    throw new Error('Email já cadastrado no sistema! ⚠️');
  }

  const novoTutor = {
    id: Math.max(...tutores.map((t) => t.id), 0) + 1,
    nome,
    telefone: telefone || '',
    email,
  };

  tutores.push(novoTutor);
  return novoTutor;
};

// Atualizar um tutor
const atualizarTutor = async (id, { nome, telefone, email }) => {
  const tutor = tutores.find((t) => t.id === Number(id));

  if (!tutor) {
    return null;
  }

  // Se email foi modificado, validar
  if (email && email !== tutor.email) {
    if (!email.includes('@')) {
      throw new Error('Email inválido! 📧');
    }
    const emailJaExiste = tutores.some((t) => t.email === email && t.id !== Number(id));
    if (emailJaExiste) {
      throw new Error('Email já cadastrado no sistema! ⚠️');
    }
  }

  if (nome) tutor.nome = nome;
  if (telefone) tutor.telefone = telefone;
  if (email) tutor.email = email;

  return tutor;
};

// Deletar um tutor
const deletarTutor = async (id) => {
  const index = tutores.findIndex((t) => t.id === Number(id));

  if (index === -1) {
    return null;
  }

  const tutorDeletado = tutores.splice(index, 1)[0];
  return tutorDeletado;
};

module.exports = {
  listarTutores,
  buscarTutorPorId,
  cadastrarTutor,
  atualizarTutor,
  deletarTutor,
};
