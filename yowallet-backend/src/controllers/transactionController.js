import Transaction from '../models/Transaction.js'

export const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find()

    let ingresos = 0
    let egresos = 0

    transactions.forEach(tx => {
      if (tx.type === 'income') ingresos += tx.amount
      if (tx.type === 'expense') egresos += tx.amount
    })

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
}
