import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function LandingPage() {
  const [ticker, setTicker] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = ticker.trim().toUpperCase()
    if (trimmed) {
      navigate(`/score/${trimmed}`)
    }
  }

  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto text-center space-y-6 py-16 px-6">
        <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-slate-900">
          Discover Overlooked Biotech Winners
        </h1>
        <p className="text-slate-700 leading-relaxed">
          Run a complete investor-grade scorecard on any ticker in 30 seconds.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <input
            type="text"
            placeholder="Enter ticker (e.g. CRSP)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            required
            className="flex-1 border border-slate-300 rounded-md px-4 py-3"
          />
          <button type="submit" className="btn-primary sm:w-auto w-full">
            Run Scorecard
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm pt-8">
          <div className="space-y-2">
            <div className="text-2xl">🧬</div>
            <p>Evidence-Based Scoring</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">📊</div>
            <p>24-Point Diligence Rubric</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">🔬</div>
            <p>Built for Asymmetric Alpha</p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 pt-6">
          We follow basic cybersecurity hygiene including rate limiting and no
          third-party sharing.
        </p>
      </div>

      {/* Mobile CTA Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white shadow-md p-4 z-50 sm:hidden">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            required
            className="flex-1 border border-slate-300 rounded-md px-3 py-2"
          />
          <button type="submit" className="btn-primary">
            Run
          </button>
        </form>
      </div>
    </section>
  )
}

export default LandingPage
