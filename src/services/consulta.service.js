const pool = require('../../db');

const mapConsultaRow = (row) => {
  if (!row) return null;
  const { animal_id, ...rest } = row;
  return { pet_id: animal_id, ...rest };
};

const listarTodasConsultas = async () => {
  const result = await pool.query('SELECT * FROM consultas ORDER BY id');
  return result.rows.map(mapConsultaRow);
};

const buscarConsultaPorId = async (id) => {
  const result = await pool.query('SELECT * FROM consultas WHERE id = $1', [id]);
  return mapConsultaRow(result.rows[0]);
};

const agendarConsulta = async ({ pet_id, data_consulta, motivo, diagnostico, veterinario }) => {
  const registroPetId = pet_id;
  if (!registroPetId || !data_consulta) {
    throw new Error('pet_id e data_consulta são obrigatórios.');
  }

  const result = await pool.query(
    'INSERT INTO consultas (animal_id, data_consulta, motivo, diagnostico, veterinario) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [registroPetId, data_consulta, motivo, diagnostico, veterinario]
  );
  return mapConsultaRow(result.rows[0]);
};

const atualizarConsulta = async (id, { pet_id, data_consulta, motivo, diagnostico, veterinario }) => {
  const campos = [];
  const valores = [];

  if (pet_id !== undefined) {
    campos.push('animal_id = $' + (campos.length + 1));
    valores.push(pet_id);
  }
  if (data_consulta !== undefined) {
    campos.push('data_consulta = $' + (campos.length + 1));
    valores.push(data_consulta);
  }
  if (motivo !== undefined) {
    campos.push('motivo = $' + (campos.length + 1));
    valores.push(motivo);
  }
  if (diagnostico !== undefined) {
    campos.push('diagnostico = $' + (campos.length + 1));
    valores.push(diagnostico);
  }
  if (veterinario !== undefined) {
    campos.push('veterinario = $' + (campos.length + 1));
    valores.push(veterinario);
  }

  if (campos.length === 0) {
    throw new Error('Nenhum campo para atualizar.');
  }

  const query = `UPDATE consultas SET ${campos.join(', ')} WHERE id = $${campos.length + 1} RETURNING *`;
  valores.push(id);

  const result = await pool.query(query, valores);
  return mapConsultaRow(result.rows[0]);
};

const excluirConsulta = async (id) => {
  const result = await pool.query('DELETE FROM consultas WHERE id = $1 RETURNING *', [id]);
  return mapConsultaRow(result.rows[0]);
};

module.exports = { listarTodasConsultas, buscarConsultaPorId, agendarConsulta, atualizarConsulta, excluirConsulta };
