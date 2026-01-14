import TransactionItem from './TransactionItem'

function TransactionList({ transactions, onDeleted }) {
  return (
    <div>
      <h3>📄 Transacciones</h3>

      {transactions.map(tx => (
        <TransactionItem
          key={tx._id}
          tx={tx}
          onDeleted={onDeleted}
        />
      ))}
    </div>
  )
}

export default TransactionList
