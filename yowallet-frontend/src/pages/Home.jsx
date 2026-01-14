import { useEffect, useState } from 'react'
import { getSummary, getTransactions } from '../services/api'
import SummaryCards from '../components/SummaryCards'
import TransactionList from '../components/TransactionList'
import TransactionForm from '../components/TransactionForm'

function Home() {
  const [transactions, setTransactions] = useState([])
  const [summary, setSummary] = useState({
    ingresos: 0,
    egresos: 0,
    balance: 0,
    saldo: 0
  })

  const loadData = async () => {
    const txs = await getTransactions()
    const sum = await getSummary()
    setTransactions(txs)
    setSummary(sum)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <SummaryCards summary={summary} />

      <TransactionForm onCreated={loadData} />

      <TransactionList
        transactions={transactions}
        onDeleted={loadData}
      />
    </>
  )
}

export default Home
