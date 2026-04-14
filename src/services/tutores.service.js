const pool = require('../../db');

class TutoresService {
  async listarTodos() {
    try {
      const result = await pool.query('SELECT * FROM tutores');
      return result.rows;
    } catch (error) {
      throw new Error(`Erro ao listar tutores: ${error.message}`);
    }
  }

  async obterPorId(id) {
    try {
      const result = await pool.query('SELECT * FROM tutores WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Erro ao buscar tutor: ${error.message}`);
    }
  }

  async criar({ nome, email, telefone, endereco }) {
    try {
      if (!nome || !email) {
        throw new Error('Nome e email são obrigatórios');
      }
      const result = await pool.query(
        'INSERT INTO tutores (nome, email, telefone, endereco) VALUES ($1, $2, $3, $4) RETURNING *',
        [nome, email, telefone, endereco]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao criar tutor: ${error.message}`);
    }
  }

  async atualizar(id, { nome, email, telefone, endereco }) {
    try {
      const result = await pool.query(
        'UPDATE tutores SET nome = COALESCE($1, nome), email = COALESCE($2, email), telefone = COALESCE($3, telefone), endereco = COALESCE($4, endereco) WHERE id = $5 RETURNING *',
        [nome, email, telefone, endereco, id]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Erro ao atualizar tutor: ${error.message}`);
    }
  }

  async deletar(id) {
    try {
      const result = await pool.query('DELETE FROM tutores WHERE id = $1 RETURNING *', [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Erro ao deletar tutor: ${error.message}`);
    }
  }
}

module.exports = new TutoresService();
