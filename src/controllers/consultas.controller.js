const ConsultasService = require('../services/consultas.service');

class ConsultasController {
  async listar(req, res) {
    try {
      const consultas = await ConsultasService.listarTodas();
      res.status(200).json(consultas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async obterPorId(req, res) {
    try {
      const { id } = req.params;
      const consulta = await ConsultasService.obterPorId(id);
      if (!consulta) {
        return res.status(404).json({ erro: 'Consulta não encontrada' });
      }
      res.status(200).json(consulta);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async criar(req, res) {
    try {
      const { pet_id, data_consulta, descricao, diagnostico } = req.body;
      if (!pet_id || !data_consulta) {
        return res.status(400).json({ erro: 'pet_id e data_consulta são obrigatórios' });
      }
      const novaConsulta = await ConsultasService.criar({ pet_id, data_consulta, descricao, diagnostico });
      res.status(201).json(novaConsulta);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { pet_id, data_consulta, descricao, diagnostico } = req.body;
      const consultaAtualizada = await ConsultasService.atualizar(id, { pet_id, data_consulta, descricao, diagnostico });
      if (!consultaAtualizada) {
        return res.status(404).json({ erro: 'Consulta não encontrada' });
      }
      res.status(200).json(consultaAtualizada);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const resultado = await ConsultasService.deletar(id);
      if (!resultado) {
        return res.status(404).json({ erro: 'Consulta não encontrada' });
      }
      res.status(200).json({ mensagem: 'Consulta deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = new ConsultasController();


