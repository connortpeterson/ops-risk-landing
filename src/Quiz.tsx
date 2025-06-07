import { useNavigate } from 'react-router-dom'
import usePersistentQuizState from './usePersistentQuizState'

function Quiz() {
  const [quizState, setQuizState] = usePersistentQuizState()
  const { urgency, area, canPay } = quizState.answers
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to risks summary page
    navigate('/risks')
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6">
      <main className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            IT/Ops Risk Assessment
          </h1>
          <p className="text-lg">
            Please answer these questions to help us understand your needs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question 1: Urgency Slider */}
          <div className="space-y-6">
            <label className="block text-lg font-medium">
              How urgent is your integration risk?
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Low</span>
              <input
                type="range"
                min="1"
                max="5"
                value={urgency}
                onChange={(e) =>
                  setQuizState((prev) => ({
                    ...prev,
                    answers: { ...prev.answers, urgency: parseInt(e.target.value) },
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm">High</span>
            </div>
            <div className="text-center text-lg font-medium">
              {urgency}
            </div>
          </div>

          {/* Question 2: Area Radio Buttons */}
          <div className="space-y-6">
            <label className="block text-lg font-medium">
              Which area worries you most?
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cybersecurity"
                  name="area"
                  value="Cybersecurity"
                  checked={area === 'Cybersecurity'}
                  onChange={(e) =>
                    setQuizState((prev) => ({
                      ...prev,
                      answers: { ...prev.answers, area: e.target.value },
                    }))
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="cybersecurity" className="ml-2">
                  Cybersecurity
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="erp"
                  name="area"
                  value="ERP integration"
                  checked={area === 'ERP integration'}
                  onChange={(e) =>
                    setQuizState((prev) => ({
                      ...prev,
                      answers: { ...prev.answers, area: e.target.value },
                    }))
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="erp" className="ml-2">
                  ERP integration
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="supply"
                  name="area"
                  value="Supply chain"
                  checked={area === 'Supply chain'}
                  onChange={(e) =>
                    setQuizState((prev) => ({
                      ...prev,
                      answers: { ...prev.answers, area: e.target.value },
                    }))
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="supply" className="ml-2">
                  Supply chain
                </label>
              </div>
            </div>
          </div>

          {/* Question 3: Yes/No Toggle */}
          <div className="space-y-6">
            <label className="block text-lg font-medium">
              Can you pay up to $5K for a quick risk check?
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() =>
                  setQuizState((prev) => ({
                    ...prev,
                    answers: { ...prev.answers, canPay: false },
                  }))
                }
                className={`px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${
                  !canPay
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-slate-800'
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() =>
                  setQuizState((prev) => ({
                    ...prev,
                    answers: { ...prev.answers, canPay: true },
                  }))
                }
                className={`px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${
                  canPay
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-slate-800'
                }`}
              >
                Yes
              </button>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-4 text-center md:text-left">
            <button
              type="submit"
              disabled={!area}
              className={`w-full md:w-auto mx-auto py-3 px-4 rounded-md transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${
                area
                  ? 'bg-primary-600 hover:bg-primary-700 text-white font-medium'
                  : 'bg-gray-300 text-slate-800 cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </section>
  )
}

export default Quiz
