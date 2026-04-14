const pool = require('../../db');

class ConsultasService {
  async listarTodas() {
    try {
      const result = await pool.query('SELECT * FROM consultas');
      return result.rows;
    } catch (error) {
      throw new Error(`Erro ao listar consultas: ${error.message}`);
    }
  }

  async obterPorId(id) {
    try {
      const result = await pool.query('SELECT * FROM consultas WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Erro ao buscar consulta: ${error.message}`);
    }
  }

  async criar({ pet_id, data_consulta, descricao, diagnostico }) {
    try {
      if (!pet_id || !data_consulta) {
        throw new Error('pet_id e data_consulta são obrigatórios');
      }
      const result = await pool.query(
        'INSERT INTO consultas (pet_id, data_consulta, descricao, diagnostico) VALUES ($1, $2, $3, $4) RETURNING *',
        [pet_id, data_consulta, descricao, diagnostico]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao criar consulta: ${error.message}`);
    }
  }

  async atualizar(id, { pet_id, data_consulta, descricao, diagnostico }) {
    try {
      const result = await pool.query(
        'UPDATE consultas SET pet_id = COALESCE($1, pet_id), data_consulta = COALESCE($2, data_consulta), descricao = COALESCE($3, descricao), diagnostico = COALESCE($4, diagnostico) WHERE id = $5 RETURNING *',
        [pet_id, data_consulta, descricao, diagnostico, id]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Erro ao atualizar consulta: ${error.message}`);
    }
  }

  async deletar(id) {
    try {
      const result = await pool.query('DELETE FROM consultas WHERE id = $1 RETURNING *', [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Erro ao deletar consulta: ${error.message}`);
    }
  }
}

module.exports = new ConsultasService();