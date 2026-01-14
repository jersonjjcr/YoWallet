function Card({ title, value, color }) {
  const formatMoney = (value) =>
    value.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })

  return (
    <div
      style={{
        background: color,
        padding: '1rem',
        borderRadius: '10px',
        color: '#fff',
        width: '200px'
      }}
    >
      <h4>{title}</h4>
      <h2>{formatMoney(value)}</h2>
    </div>
  )
}

function SummaryCards({ summary }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}
    >
      <Card title="Ingresos" value={summary.ingresos} color="#2ecc71" />
      <Card title="Egresos" value={summary.egresos} color="#e74c3c" />
      <Card title="Balance" value={summary.balance} color="#3498db" />
      <Card title="Saldo" value={summary.saldo} color="#9b59b6" />
    </div>
  )
}

export default SummaryCards
