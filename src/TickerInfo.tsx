import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Metrics {
  ticker: string
  price: number
  ebitda: string
  marketCap: string
}

function TickerInfo() {
  const { ticker } = useParams<{ ticker: string }>()
  const [data, setData] = useState<Metrics | null>(null)

  useEffect(() => {
    if (!ticker) return
    fetch(`/financials/${ticker.toUpperCase()}.json`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData(null))
  }, [ticker])

  if (!ticker) return null

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6">
      <main className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-2xl font-bold">{ticker.toUpperCase()} Snapshot</h1>
        {data ? (
          <div className="space-y-2">
            <p>Stock Price: ${'{'}data.price{'}'}</p>
            <p>EBITDA: {data.ebitda}</p>
            <p>Market Cap: {data.marketCap}</p>
          </div>
        ) : (
          <p className="text-slate-600">No data available.</p>
        )}
        <div className="pt-4 text-center text-sm">
          <Link to={`/score/${ticker}`} className="text-primary-600 underline">
            Back to Scorecard
          </Link>
        </div>
      </main>
    </section>
  )
}

export default TickerInfo
