const consultas = [
  {
    id: 1,
    petId: 1,
    tutorId: 1,
    data: '2026-04-20T10:00:00Z',
    procedimento: 'Vacinação',
    status: 'Agendada',
  },
  {
    id: 2,
    petId: 2,
    tutorId: 2,
    data: '2026-04-22T14:30:00Z',
    procedimento: 'Consulta de rotina',
    status: 'Agendada',
  },
];

const listarTodasConsultas = async () => {
  return consultas;
};

const buscarConsultaPorId = async (id) => {
  const consulta = consultas.find((item) => item.id === Number(id));
  return consulta || null;
};

const agendarConsulta = async ({ petId, tutorId, data, procedimento }) => {
  if (!petId || !tutorId || !data || !procedimento) {
    throw new Error('petId, tutorId, data e procedimento são obrigatórios.');
  }

  const novaConsulta = {
    id: consultas.length + 1,
    petId: Number(petId),
    tutorId: Number(tutorId),
    data,
    procedimento,
    status: 'Agendada',
  };

  consultas.push(novaConsulta);
  return novaConsulta;
};

module.exports = { listarTodasConsultas, buscarConsultaPorId, agendarConsulta };