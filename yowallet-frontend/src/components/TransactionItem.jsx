import { deleteTransaction } from '../services/api'

function TransactionItem({ tx, onDeleted }) {
  const handleDelete = async () => {
    await deleteTransaction(tx._id)
    onDeleted()
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.5rem'
    }}>
      <span>{tx.description}</span>

      <div>
        <strong style={{ color: tx.type === 'income' ? 'green' : 'red' }}>
          {tx.type === 'income' ? '+' : '-'}${tx.amount}
        </strong>

        <button onClick={handleDelete} style={{ marginLeft: '1rem' }}>
          ❌
        </button>
      </div>
    </div>
  )
}

export default TransactionItem
