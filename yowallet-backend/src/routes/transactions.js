import express from 'express'
import Transaction from '../models/Transaction.js'

const router = express.Router()

// ===============================
// 1️⃣ Obtener todas las transacciones
// ===============================
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction
      .find()
      .sort({ createdAt: -1 })

    res.json(transactions)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener transacciones' })
  }
})

// ===============================
// 2️⃣ Resumen (ingresos, egresos, balance, saldo)
// ===============================
router.get('/summary', async (req, res) => {
  try {
    const transactions = await Transaction.find()

    const ingresos = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0)

    const egresos = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0)

    const balance = ingresos - egresos

    res.json({
      ingresos,
      egresos,
      balance,
      saldo: balance
    })
  } catch (error) {
    res.status(500).json({ message: 'Error al calcular resumen' })
  }
})

// ===============================
// 3️⃣ Crear nueva transacción
// ===============================
router.post('/', async (req, res) => {
  try {
    const { description, amount, type } = req.body

    // Validaciones básicas
    if (!description || !amount || !type) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios'
      })
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({
        message: 'El tipo debe ser income o expense'
      })
    }

    const transaction = new Transaction({
      description,
      amount,
      type
    })

    const savedTransaction = await transaction.save()

    res.status(201).json(savedTransaction)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear transacción' })
  }
})

// ===============================
// 4️⃣ Eliminar transacción
// ===============================
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({
        message: 'Transacción no encontrada'
      })
    }

    res.json({ message: 'Transacción eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar transacción' })
  }
})

export default router
