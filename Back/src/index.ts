import express from 'express'
import { Request, Response } from 'express'
import { routes } from './routes/routes'

const app = express()
app.use(express.json)
app.use(routes)

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando!"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});