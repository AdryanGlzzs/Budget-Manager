import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando!' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})