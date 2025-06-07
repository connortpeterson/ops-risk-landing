import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ScorecardRenderer from '../components/ScorecardRenderer'
import { scoreCompany } from '../lib/scoreCompany'
import type { Scorecard } from '../lib/scoreCompany'

function Score() {
  const { ticker } = useParams<{ ticker: string }>()
  const [scorecard, setScorecard] = useState<Scorecard | null>(null)

  useEffect(() => {
    if (ticker) {
      void scoreCompany(ticker).then(setScorecard)
    }
  }, [ticker])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6">
      <main className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-2xl font-bold">{ticker?.toUpperCase()} Scorecard</h1>
        {scorecard ? <ScorecardRenderer scorecard={scorecard} /> : <p>Scoring...</p>}
      </main>
    </section>
  )
}

export default Score
