const CHAVE_ACESSO = process.env.AUTH_KEY || 'clinica-veterinaria-ralph-teddy';

const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ erro: 'Token de autorização não fornecido' });
  }
  
  const tokenAjustado = token.replace('Bearer ', '');
  
  if (tokenAjustado !== CHAVE_ACESSO) {
    return res.status(403).json({ erro: 'Token inválido ou expirado' });
  }
  
  next();
};

module.exports = auth;