const express = require('express');
const routes = require('./src/routes/index.routes');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Utilizando as rotas
app.use(routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`[SERVIDOR]: Clínica Veterinária Ralph & Teddy online em http://localhost:${PORT}`);
});
