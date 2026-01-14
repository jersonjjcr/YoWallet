import { useState } from 'react'
import { createTransaction } from '../services/api'

function TransactionForm({ onCreated }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('income')

  const handleSubmit = async (e) => {
    e.preventDefault()

    await createTransaction({
      description,
      amount: Number(amount),
      type
    })

    setDescription('')
    setAmount('')
    onCreated()
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>➕ Nueva Transacción</h3>

      <input
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Monto"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />

      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="income">Ingreso</option>
        <option value="expense">Egreso</option>
      </select>

      <button type="submit">Guardar</button>
    </form>
  )
}

export default TransactionForm
