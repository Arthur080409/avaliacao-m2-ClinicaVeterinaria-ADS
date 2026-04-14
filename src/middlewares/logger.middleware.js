const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const metodo = req.method;
  const url = req.url;

  console.log(`[CLÍNICA VETERINÁRIA] ${timestamp} | ${metodo} ${url}`);

  next();
};

module.exports = logger;