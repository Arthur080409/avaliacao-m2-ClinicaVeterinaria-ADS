const express = require('express');
const routes = require('./src/routes/index.route');
const logger = require('./src/middlewares/logger.middleware');
const errorHandler = require('./src/middlewares/errorHandler.middleware');

const app = express();

// Middlewares
app.use(express.json());
app.use(logger);

// Rotas
app.use(routes);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[SERVIDOR]: Clínica Veterinária Ralph & Teddy online em http://localhost:${PORT}`);
});
