import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ScorecardRenderer from '../components/ScorecardRenderer'
import { crspScorecard } from '../lib/sampleScorecards'
import { createScorecardPdf } from '../utilities/createScorecardPdf'
import type { Scorecard } from '../lib/computeScorecard'
import useWatchlist from './useWatchlist'

function Score() {
  const { ticker } = useParams<{ ticker: string }>()
  const [scorecard, setScorecard] = useState<Scorecard | null>(null)
  const [, addToWatchlist] = useWatchlist()

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
    if (ticker) addToWatchlist(ticker.toUpperCase())
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    } catch (err) {
      console.warn('Failed to copy link', err)
    }
  }

  const actions = (
    <>
      <button className="btn-primary" onClick={handleDownload}>
        Download PDF
      </button>
      <button
        className="bg-slate-200 text-slate-700 rounded-md px-4 py-3 hover:bg-slate-300"
        onClick={handleShare}
      >
        Share Link
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
        <div className="pt-4 text-center text-sm">
          <Link to="/watchlist" className="text-primary-600 underline">
            View Watchlist
          </Link>
        </div>
      </main>
    </section>
  )
}

export default Score
