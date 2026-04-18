const pool = require('../../db');

const listarTodosTutores = async () => {
  const result = await pool.query('SELECT * FROM tutores ORDER BY id');
  return result.rows;
};

const buscarTutorPorId = async (id) => {
  const result = await pool.query('SELECT * FROM tutores WHERE id = $1', [id]);
  return result.rows[0] || null;
};

const criarTutor = async ({ nome, email, telefone }) => {
  if (!nome || !email || !telefone) {
    throw new Error('Nome, e-mail e telefone são obrigatórios.');
  }

  const result = await pool.query(
    'INSERT INTO tutores (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
    [nome, email, telefone]
  );
  return result.rows[0];
};

const atualizarTutor = async (id, { nome, email, telefone }) => {
  const campos = [];
  const valores = [];

  if (nome !== undefined) {
    campos.push('nome = $' + (campos.length + 1));
    valores.push(nome);
  }
  if (email !== undefined) {
    campos.push('email = $' + (campos.length + 1));
    valores.push(email);
  }
  if (telefone !== undefined) {
    campos.push('telefone = $' + (campos.length + 1));
    valores.push(telefone);
  }

  if (campos.length === 0) {
    throw new Error('Nenhum campo para atualizar.');
  }

  const query = `UPDATE tutores SET ${campos.join(', ')} WHERE id = $${campos.length + 1} RETURNING *`;
  valores.push(id);

  const result = await pool.query(query, valores);
  return result.rows[0];
};

const excluirTutor = async (id) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    
    // Remove todas as consultas dos pets do tutor
    await client.query(
      'DELETE FROM consultas WHERE animal_id IN (SELECT id FROM animais WHERE tutor_id = $1)',
      [id]
    );
    
    // Remove todos os pets do tutor
    await client.query('DELETE FROM animais WHERE tutor_id = $1', [id]);

    // Remove o tutor
    const result = await client.query(
      'DELETE FROM tutores WHERE id = $1 RETURNING *',
      [id]
    );

    await client.query('COMMIT');
    return result.rows[0];
  } catch (erro) {
    await client.query('ROLLBACK');
    throw erro;
  } finally {
    client.release();
  }
};

module.exports = { listarTodosTutores, buscarTutorPorId, criarTutor, atualizarTutor, excluirTutor };
