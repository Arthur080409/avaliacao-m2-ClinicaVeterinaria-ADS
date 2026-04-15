// MIDDLEWARE DE ERRO: Captura todos os erros propagados via next(erro).
// OBRIGATÓRIO: deve ter exatamente 4 parâmetros para o Express
// reconhecê-lo como handler de erros (a assinatura é o que importa).
// DEVE ser o ÚLTIMO middleware registrado no index.js.

const errorHandler = (err, req, res, next) => {
  // Loga o erro completo no servidor (útil para debug)
  console.error(`[ERRO] ${req.method} ${req.url}:`, err.message);

  const status = err.status || 500;

  // NUNCA envie err.stack para o cliente em produção.
  res.status(status).json({
    erro: err.message || 'Erro interno na Clínica Veterinária.',
    caminho: req.url,
  });
};

module.exports = errorHandler;
