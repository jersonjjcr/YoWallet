// ===============================
// 1️⃣ Importaciones
// ===============================
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

// ===============================
// 2️⃣ Variables de entorno
// ===============================
dotenv.config()

// ===============================
// 3️⃣ Inicializar app
// ===============================
const app = express()

// ===============================
// 4️⃣ Middlewares globales
// ===============================
app.use(cors())
app.use(express.json()) // Leer JSON del body

// ===============================
// 5️⃣ Conexión a MongoDB
// ===============================
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  console.error('❌ MONGO_URI no está definida en el archivo .env')
  process.exit(1)
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('🟢 MongoDB conectado correctamente'))
  .catch((error) => {
    console.error('🔴 Error conectando a MongoDB:', error.message)
    process.exit(1)
  })

// ===============================
// 6️⃣ Rutas base
// ===============================
app.get('/', (req, res) => {
  res.json({
    app: 'Yowallet API',
    status: 'running',
    version: '1.0.0'
  })
})

// ===============================
// 7️⃣ Rutas de la API
// ===============================
import transactionRoutes from './routes/transactions.js'

app.use('/api/transactions', transactionRoutes)

// ===============================
// 8️⃣ Levantar servidor
// ===============================
const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
  console.log(`🚀 Yowallet API corriendo en puerto ${PORT}`)
})
