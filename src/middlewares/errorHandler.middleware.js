const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';
  
  console.error(`[ERRO] ${new Date().toISOString()} | Status: ${status} | Mensagem: ${message}`);
  
  res.status(status).json({
    erro: message,
    status,
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorHandler;