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
    const { pet_id, animal_id, data_consulta, motivo, diagnostico, veterinario, pet: petBody } = req.body;
    const registroPetId = pet_id || animal_id || petBody?.id || petBody?.animal_id;

    if (!req.tutorId) {
      return res.status(401).json({
        erro: 'Identidade do tutor não informada. Use o cabeçalho X-Tutor-Id.',
      });
    }

    const pet = await petService.buscarPetPorId(registroPetId);
    if (!pet) {
      return res.status(404).json({ erro: `Pet ${registroPetId} não encontrado.` });
    }

    if (Number(pet.tutor_id) !== req.tutorId) {
      return res.status(403).json({
        erro: 'Você só pode agendar consultas para seus próprios pets.',
      });
    }

    const novaConsulta = await consultaService.agendarConsulta({
      pet_id: registroPetId,
      data_consulta,
      motivo,
      diagnostico,
      veterinario,
    });

    res.status(201).json({
      mensagem: 'Consulta agendada com sucesso!',
      consulta: novaConsulta,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

const atualizarConsulta = async (req, res) => {
  try {
    const { id } = req.params;
    const { pet_id, animal_id, data_consulta, motivo, diagnostico, veterinario, pet: petBody } = req.body;
    const novoPetId = pet_id || animal_id || petBody?.id || petBody?.animal_id;

    if (!req.tutorId) {
      return res.status(401).json({
        erro: 'Identidade do tutor não informada. Use o cabeçalho X-Tutor-Id.',
      });
    }

    const consultaExistente = await consultaService.buscarConsultaPorId(id);
    if (!consultaExistente) {
      return res.status(404).json({ erro: `Consulta ${id} não encontrada.` });
    }

    const petAtual = await petService.buscarPetPorId(consultaExistente.pet_id);
    if (!petAtual || Number(petAtual.tutor_id) !== req.tutorId) {
      return res.status(403).json({
        erro: 'Você só pode atualizar consultas para seus próprios pets.',
      });
    }

    if (novoPetId && novoPetId !== consultaExistente.pet_id) {
      const novoPet = await petService.buscarPetPorId(novoPetId);
      if (!novoPet) {
        return res.status(404).json({ erro: `Pet ${novoPetId} não encontrado.` });
      }
      if (Number(novoPet.tutor_id) !== req.tutorId) {
        return res.status(403).json({
          erro: 'Você só pode mover consultas para seus próprios pets.',
        });
      }
    }

    const consultaAtualizada = await consultaService.atualizarConsulta(id, {
      pet_id: novoPetId,
      data_consulta,
      motivo,
      diagnostico,
      veterinario,
    });

    res.status(200).json({
      mensagem: 'Consulta atualizada com sucesso!',
      consulta: consultaAtualizada,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

const excluirConsulta = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.tutorId) {
      return res.status(401).json({
        erro: 'Identidade do tutor não informada. Use o cabeçalho X-Tutor-Id.',
      });
    }

    const consultaExistente = await consultaService.buscarConsultaPorId(id);
    if (!consultaExistente) {
      return res.status(404).json({ erro: `Consulta ${id} não encontrada.` });
    }

    const petAtual = await petService.buscarPetPorId(consultaExistente.pet_id);
    if (!petAtual || Number(petAtual.tutor_id) !== req.tutorId) {
      return res.status(403).json({
        erro: 'Você só pode remover consultas dos seus próprios pets.',
      });
    }

    const consultaRemovida = await consultaService.excluirConsulta(id);
    res.status(200).json({ mensagem: 'Consulta removida com sucesso.', consulta: consultaRemovida });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao remover consulta.' });
  }
};

module.exports = { listarConsultas, buscarConsultaPorId, agendarConsulta, atualizarConsulta, excluirConsulta };