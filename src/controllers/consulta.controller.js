const consultaService = require('../services/consulta.service');
const petService = require('../services/pet.service');

const listarConsultas = async (req, res) => {
  try {
    const consultas = await consultaService.listarTodasConsultas();
    res.status(200).json({ total: consultas.length, consultas });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar consultas.' });
  }
};

const buscarConsultaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const consulta = await consultaService.buscarConsultaPorId(id);

    if (!consulta) {
      return res
        .status(404)
        .json({ erro: `Consulta ${id} não encontrada.` });
    }

    res.status(200).json({ consulta });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar consulta.' });
  }
};

const agendarConsulta = async (req, res) => {
  try {
    const { petId, tutorId, data, procedimento } = req.body;

    if (!req.tutorId) {
      return res.status(401).json({
        erro: 'Identidade do tutor não informada. Use o cabeçalho X-Tutor-Id.',
      });
    }

    if (Number(tutorId) !== req.tutorId) {
      return res.status(403).json({
        erro: 'Você só pode agendar consultas para seu próprio tutorId.',
      });
    }

    const pet = await petService.buscarPetPorId(petId);
    if (!pet) {
      return res.status(404).json({ erro: `Pet ${petId} não encontrado.` });
    }

    if (pet.tutorId !== req.tutorId) {
      return res.status(403).json({
        erro: 'Você só pode agendar consultas para seus próprios pets.',
      });
    }

    const novaConsulta = await consultaService.agendarConsulta({
      petId,
      tutorId,
      data,
      procedimento,
    });

    res.status(201).json({
      mensagem: 'Consulta agendada com sucesso!',
      consulta: novaConsulta,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

module.exports = { listarConsultas, buscarConsultaPorId, agendarConsulta };