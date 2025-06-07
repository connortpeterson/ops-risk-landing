import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ScorecardRenderer from '../components/ScorecardRenderer'
import { crspScorecard } from '../lib/sampleScorecards'
import { createScorecardPdf } from '../utilities/createScorecardPdf'
import type { Scorecard } from '../lib/computeScorecard'

function Score() {
  const { ticker } = useParams<{ ticker: string }>()
  const [scorecard, setScorecard] = useState<Scorecard | null>(null)

  useEffect(() => {
    if (!ticker) return
    if (ticker.toUpperCase() === 'CRSP') {
      setScorecard(crspScorecard)
    } else {
      // Placeholder until live scoring is implemented
      setScorecard(null)
    }
  }, [ticker])

  async function handleDownload() {
    if (!scorecard) return
    const bytes = await createScorecardPdf(scorecard)
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${scorecard.ticker}-scorecard.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleWatchlist() {
    if (scorecard) console.log('add to watchlist', scorecard.ticker)
  }

  const actions = (
    <>
      <button className="btn-primary" onClick={handleDownload}>
        Download PDF
      </button>
      <button
        className="bg-slate-200 text-slate-700 rounded-md px-4 py-3 hover:bg-slate-300"
        onClick={handleWatchlist}
      >
        Watchlist
      </button>
    </>
  )

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6">
      <main className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-2xl font-bold">{ticker?.toUpperCase()} Scorecard</h1>
        {scorecard ? (
          <ScorecardRenderer scorecard={scorecard} actions={actions} />
        ) : (
          <p className="text-slate-600">Scorecard coming soon.</p>
        )}
      </main>
    </section>
  )
}

export default Score
