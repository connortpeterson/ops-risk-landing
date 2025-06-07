import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { scoreCompany, Scorecard } from '../../lib/scoreCompany'
import ScorecardRenderer from '../../components/ScorecardRenderer'

export default function ScorePage() {
  const router = useRouter()
  const { ticker } = router.query
  const [scorecard, setScorecard] = useState<Scorecard | null>(null)

  useEffect(() => {
    if (typeof ticker === 'string') {
      void scoreCompany(ticker).then(setScorecard)
    }
  }, [ticker])

  if (!ticker) {
    return <p className="p-6">Loading...</p>
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white shadow-md rounded-md p-6 space-y-4 w-full max-w-2xl">
        {scorecard ? <ScorecardRenderer scorecard={scorecard} /> : <p>Scoring...</p>}
      </div>
    </section>
  )
}
