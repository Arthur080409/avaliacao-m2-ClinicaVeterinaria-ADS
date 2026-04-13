const consultasService = require('../services/consultas.service');

// GET /consultas — Lista todas as consultas
const listarConsultas = async (req, res) => {
  try {
    const consultas = await consultasService.listarConsultas();
    res.status(200).json({ total: consultas.length, consultas });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar consultas.' });
  }
};

// GET /consultas/:id — Busca consulta por ID
const buscarConsultaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const consulta = await consultasService.buscarConsultaPorId(id);

    if (!consulta) {
      return res
        .status(404)
        .json({ erro: `Consulta ${id} não encontrada no sistema.` });
    }

    res.status(200).json({ consulta });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar consulta.' });
  }
};

// GET /consultas/animal/:animal_id — Lista consultas de um animal
const listarConsultasPorAnimal = async (req, res) => {
  try {
    const { animal_id } = req.params;
    const consultas = await consultasService.listarConsultasPorAnimal(animal_id);

    res.status(200).json({ total: consultas.length, consultas });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar consultas do animal.' });
  }
};

// POST /consultas — Cadastra nova consulta
const cadastrarConsulta = async (req, res) => {
  try {
    const { animal_id, data_consulta, motivo, diagnostico, veterinario } =
      req.body;
    const novaConsulta = await consultasService.cadastrarConsulta({
      animal_id,
      data_consulta,
      motivo,
      diagnostico,
      veterinario,
    });

    res.status(201).json({
      mensagem: 'Consulta cadastrada com sucesso!',
      consulta: novaConsulta,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// PUT /consultas/:id — Atualiza consulta
const atualizarConsulta = async (req, res) => {
  try {
    const { id } = req.params;
    const { animal_id, data_consulta, motivo, diagnostico, veterinario } =
      req.body;
    const consultaAtualizada = await consultasService.atualizarConsulta(id, {
      animal_id,
      data_consulta,
      motivo,
      diagnostico,
      veterinario,
    });

    if (!consultaAtualizada) {
      return res
        .status(404)
        .json({ erro: `Consulta ${id} não encontrada no sistema.` });
    }

    res.status(200).json({
      mensagem: 'Consulta atualizada com sucesso!',
      consulta: consultaAtualizada,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

// DELETE /consultas/:id — Deleta consulta
const deletarConsulta = async (req, res) => {
  try {
    const { id } = req.params;
    const consultaDeletada = await consultasService.deletarConsulta(id);

    if (!consultaDeletada) {
      return res
        .status(404)
        .json({ erro: `Consulta ${id} não encontrada no sistema.` });
    }

    res.status(200).json({
      mensagem: 'Consulta deletada com sucesso!',
      consulta: consultaDeletada,
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

module.exports = {
  listarConsultas,
  buscarConsultaPorId,
  listarConsultasPorAnimal,
  cadastrarConsulta,
  atualizarConsulta,
  deletarConsulta,
};
