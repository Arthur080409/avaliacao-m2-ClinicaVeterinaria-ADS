const pool = require('../../db');

const mapPetRow = (row) => {
  if (!row) return null;
  const { id, tutor_id, ...rest } = row;
  return { pet_id: id, tutor_id, ...rest };
};

const listarTodosPets = async () => {
  const result = await pool.query('SELECT * FROM animais ORDER BY id');
  return result.rows.map(mapPetRow);
};

const buscarPetPorId = async (id) => {
  const result = await pool.query('SELECT * FROM animais WHERE id = $1', [id]);
  return mapPetRow(result.rows[0]);
};

const criarPet = async ({ nome, especie, raca, data_nascimento, tutor_id }) => {
  if (!nome || !especie || !tutor_id) {
    throw new Error('Nome, espécie e tutor_id são obrigatórios.');
  }

  const result = await pool.query(
    'INSERT INTO animais (nome, especie, raca, data_nascimento, tutor_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nome, especie, raca, data_nascimento, tutor_id]
  );
  return mapPetRow(result.rows[0]);
};

const atualizarPet = async (id, { nome, especie, raca, data_nascimento, tutor_id }) => {
  const campos = [];
  const valores = [];

  if (nome !== undefined) {
    campos.push('nome = $' + (campos.length + 1));
    valores.push(nome);
  }
  if (especie !== undefined) {
    campos.push('especie = $' + (campos.length + 1));
    valores.push(especie);
  }
  if (raca !== undefined) {
    campos.push('raca = $' + (campos.length + 1));
    valores.push(raca);
  }
  if (data_nascimento !== undefined) {
    campos.push('data_nascimento = $' + (campos.length + 1));
    valores.push(data_nascimento);
  }
  if (tutor_id !== undefined) {
    campos.push('tutor_id = $' + (campos.length + 1));
    valores.push(tutor_id);
  }

  if (campos.length === 0) {
    throw new Error('Nenhum campo para atualizar.');
  }

  const query = `UPDATE animais SET ${campos.join(', ')} WHERE id = $${campos.length + 1} RETURNING *`;
  valores.push(id);

  const result = await pool.query(query, valores);
  return mapPetRow(result.rows[0]);
};

const excluirPet = async (id) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM consultas WHERE animal_id = $1', [id]);

    const result = await client.query(
      'DELETE FROM animais WHERE id = $1 RETURNING *',
      [id]
    );

    await client.query('COMMIT');
    return mapPetRow(result.rows[0]);
  } catch (erro) {
    await client.query('ROLLBACK');
    throw erro;
  } finally {
    client.release();
  }
};

module.exports = { listarTodosPets, buscarPetPorId, criarPet, atualizarPet, excluirPet };
