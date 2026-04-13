const { consultas, pets } = require('../../db');

// Lista todas as consultas
const listarConsultas = async () => {
  return consultas;
};

// Busca uma consulta específica pelo ID
const buscarConsultaPorId = async (id) => {
  const consulta = consultas.find((c) => c.id === Number(id));
  return consulta || null;
};

// Lista consultas de um animal específico
const listarConsultasPorAnimal = async (animal_id) => {
  const consultasPorAnimal = consultas.filter(
    (c) => c.animal_id === Number(animal_id)
  );
  return consultasPorAnimal;
};

// Criar uma nova consulta
const cadastrarConsulta = async ({
  animal_id,
  data_consulta,
  motivo,
  diagnostico,
  veterinario,
}) => {
  // Validações de negócio
  if (!animal_id || !data_consulta || !motivo || !veterinario) {
    throw new Error(
      'Animal, data da consulta, motivo e veterinário são obrigatórios! 🏥'
    );
  }

  // Verificar se animal (pet) existe
  const animalExiste = pets.some((p) => p.id === Number(animal_id));
  if (!animalExiste) {
    throw new Error('Animal não encontrado no sistema! ⚠️');
  }

  // Validar data
  const data = new Date(data_consulta);
  if (isNaN(data.getTime())) {
    throw new Error('Data da consulta inválida! 📅');
  }

  const novaConsulta = {
    id: Math.max(...consultas.map((c) => c.id), 0) + 1,
    animal_id: Number(animal_id),
    data_consulta,
    motivo,
    diagnostico: diagnostico || '',
    veterinario,
  };

  consultas.push(novaConsulta);
  return novaConsulta;
};

// Atualizar uma consulta
const atualizarConsulta = async (
  id,
  { animal_id, data_consulta, motivo, diagnostico, veterinario }
) => {
  const consulta = consultas.find((c) => c.id === Number(id));

  if (!consulta) {
    return null;
  }

  // Se animal_id foi modificado, validar
  if (animal_id) {
    const animalExiste = pets.some((p) => p.id === Number(animal_id));
    if (!animalExiste) {
      throw new Error('Animal não encontrado no sistema! ⚠️');
    }
  }

  // Validar data se fornecida
  if (data_consulta) {
    const data = new Date(data_consulta);
    if (isNaN(data.getTime())) {
      throw new Error('Data da consulta inválida! 📅');
    }
  }

  if (animal_id) consulta.animal_id = Number(animal_id);
  if (data_consulta) consulta.data_consulta = data_consulta;
  if (motivo) consulta.motivo = motivo;
  if (diagnostico !== undefined) consulta.diagnostico = diagnostico;
  if (veterinario) consulta.veterinario = veterinario;

  return consulta;
};

// Deletar uma consulta
const deletarConsulta = async (id) => {
  const index = consultas.findIndex((c) => c.id === Number(id));

  if (index === -1) {
    return null;
  }

  const consultaDeletada = consultas.splice(index, 1)[0];
  return consultaDeletada;
};

module.exports = {
  listarConsultas,
  buscarConsultaPorId,
  listarConsultasPorAnimal,
  cadastrarConsulta,
  atualizarConsulta,
  deletarConsulta,
};
