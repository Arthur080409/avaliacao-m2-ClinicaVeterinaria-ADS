const pool = require('../../db');

class PetsService {
  async listarTodos() {
    try {
      const result = await pool.query('SELECT * FROM pets');
      return result.rows;
    } catch (error) {
      throw new Error(`Erro ao listar pets: ${error.message}`);
    }
  }

  async obterPorId(id) {
    try {
      const result = await pool.query('SELECT * FROM pets WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Erro ao buscar pet: ${error.message}`);
    }
  }

  async criar({ nome, especie, raca, idade, tutor_id }) {
    try {
      if (!nome || !especie || !tutor_id) {
        throw new Error('Nome, espécie e tutor_id são obrigatórios');
      }
      const result = await pool.query(
        'INSERT INTO pets (nome, especie, raca, idade, tutor_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nome, especie, raca, idade, tutor_id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao criar pet: ${error.message}`);
    }
  }

  async atualizar(id, { nome, especie, raca, idade, tutor_id }) {
    try {
      const result = await pool.query(
        'UPDATE pets SET nome = COALESCE($1, nome), especie = COALESCE($2, especie), raca = COALESCE($3, raca), idade = COALESCE($4, idade), tutor_id = COALESCE($5, tutor_id) WHERE id = $6 RETURNING *',
        [nome, especie, raca, idade, tutor_id, id]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Erro ao atualizar pet: ${error.message}`);
    }
  }

  async deletar(id) {
    try {
      const result = await pool.query('DELETE FROM pets WHERE id = $1 RETURNING *', [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Erro ao deletar pet: ${error.message}`);
    }
  }
}

module.exports = new PetsService();