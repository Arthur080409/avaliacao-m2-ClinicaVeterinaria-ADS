const validarContentType = (req, res, next) => {
  // Filtramos apenas métodos que enviam corpo (body)
  const metodosComBody = ['POST', 'PUT'];

  if (metodosComBody.includes(req.method)) {
    const contentType = req.headers['content-type'];

    // Verifica se o header existe e se contém 'application/json'
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(415).json({
        erro: 'Tipo de mídia não suportado',
        mensagem:
          'A Clínica Veterinária exige Content-Type: application/json para esta operação.',
      });
    }
  }

  next();
};

module.exports = validarContentType;
