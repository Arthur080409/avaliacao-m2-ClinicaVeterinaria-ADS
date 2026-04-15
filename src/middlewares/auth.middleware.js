// MIDDLEWARE DE AUTENTICAÇÃO: Verifica se o solicitante tem permissão.
// Funciona como o segurança na porta da biblioteca:
// sem crachá, sem entrada.
//
// ATENÇÃO: Esta é uma implementação SIMPLIFICADA para fins didáticos.
// A partir da Aula 44, utilizaremos JWT (JSON Web Tokens) de verdade.

// Chave de acesso temporária — em produção, isso vem de variável de ambiente
const CHAVE_ACESSO = 'biblioteca-ralph-teddy-2025';

const autenticar = (req, res, next) => {
  // O cliente envia: Authorization: Bearer biblioteca-ralph-teddy-2025
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      erro: 'Acesso negado. Crachá de identificação não encontrado.',
      dica: 'Envie o cabeçalho: Authorization: Bearer <chave>',
    });
  }

  // Extrai apenas o token (remove o prefixo 'Bearer ')
  const token = authHeader.split(' ')[1];

  if (token !== CHAVE_ACESSO) {
    return res.status(403).json({
      erro: 'Acesso proibido. Crachá inválido ou vencido.',
    });
  }

  // Token válido — libera a passagem para o próximo posto
  next();
};

module.exports = autenticar;
