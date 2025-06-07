import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Metrics {
  ticker: string
  price: number
  ebitda: string
  ebitdaPeriod?: string
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
    <section className="min-h-screen flex flex-col items-center bg-slate-50 text-slate-800 p-6">
      <main className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center">
          {ticker.toUpperCase()} Snapshot
        </h1>
        {data ? (
          <div className="card space-y-4 text-left">
            <div className="flex justify-between items-baseline">
              <span className="font-medium">Stock Price</span>
              <span className="font-mono text-lg">
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 2,
                }).format(data.price)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">EBITDA ({data.ebitdaPeriod || 'TTM'})</span>
              <span className="font-mono">{data.ebitda}</span>
            </div>
            <p className="text-sm text-slate-600">
              EBITDA represents earnings before interest, taxes, depreciation and
              amortization for the trailing twelve months.
            </p>
            <div className="flex justify-between">
              <span className="font-medium">Market Cap</span>
              <span className="font-mono">{data.marketCap}</span>
            </div>
          </div>
        ) : (
          <p className="text-slate-600 text-center">No data available.</p>
        )}
        <div className="pt-4 text-center">
          <Link to={`/score/${ticker}`} className="btn-primary inline-block">
            Back to Scorecard
          </Link>
        </div>
      </main>
    </section>
  )
}

export default TickerInfo
