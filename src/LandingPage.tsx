import { useNavigate } from 'react-router-dom'
import usePersistentQuizState from './usePersistentQuizState'

function LandingPage() {
  const [quizState, setQuizState] = usePersistentQuizState()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = quizState.ticker.trim().toUpperCase()
    if (trimmed) {
      navigate(`/score/${trimmed}`)
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6">
      <main className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-6xl font-bold mb-6">
            Find Overlooked Biotech Winners Before Wall Street Does
          </h1>
          <p className="prose prose-sm md:prose mb-8 mx-auto">
            Get a complete risk-adjusted diligence score on any biotech in 30 seconds. Built for investors, scouts, and founders.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">
              Enter a Biotech Ticker (e.g. SRPT, CRSP)
            </label>
            <input
              type="text"
              value={quizState.ticker}
              onChange={(e) =>
                setQuizState((prev) => ({ ...prev, ticker: e.target.value }))
              }
              placeholder="Enter Ticker"
              required
              className="w-full max-w-sm p-3 border rounded-md"
            />
            <p className="text-sm mt-2 text-center text-gray-600">
              Don’t know a ticker? Try CRSP
            </p>
          </div>
          <div className="text-center md:text-left">
            <button
              type="submit"
              className="w-full md:w-auto mx-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
            >
              Run Scorecard
            </button>
          </div>
        </form>
        <p className="text-center text-sm mt-4">
          We follow basic cybersecurity hygiene including rate limiting,
          spam protection, and no third-party sharing.
        </p>
      </main>
    </section>
  )
}

export default LandingPage
