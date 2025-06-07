import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Quiz() {
  const [urgency, setUrgency] = useState(3)
  const [area, setArea] = useState('')
  const [canPay, setCanPay] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const navigate = useNavigate()

  // Load draft answers on mount
  useEffect(() => {
    const draft = localStorage.getItem('quiz-draft')
    if (draft) {
      try {
        const parsed = JSON.parse(draft)
        if (typeof parsed.urgency === 'number') setUrgency(parsed.urgency)
        if (typeof parsed.area === 'string') setArea(parsed.area)
        if (typeof parsed.canPay === 'boolean') setCanPay(parsed.canPay)
        setShowResume(true)
      } catch {
        // ignore invalid draft
      }
    }
  }, [])

  const saveDraft = (u: number, a: string, c: boolean) => {
    localStorage.setItem(
      'quiz-draft',
      JSON.stringify({ urgency: u, area: a, canPay: c })
    )
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store the quiz answers in localStorage to retrieve on risks summary page
    localStorage.setItem('quizAnswers', JSON.stringify({
      urgency,
      area,
      canPay
    }))
    // Clear any saved draft once the quiz is completed
    localStorage.removeItem('quiz-draft')
    // Navigate to risks summary page
    navigate('/risks')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <main className="max-w-md w-full">
        {showResume && (
          <div className="mb-4 text-center text-green-700 text-sm">
            Resume where you left off
          </div>
        )}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            IT/Ops Risk Assessment
          </h1>
          <p className="text-lg text-gray-700">
            Please answer these questions to help us understand your needs.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Question 1: Urgency Slider */}
          <div className="space-y-3">
            <label className="block text-lg font-medium text-gray-900">
              How urgent is your integration risk?
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Low</span>
              <input
                type="range"
                min="1"
                max="5"
                value={urgency}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  setUrgency(val)
                  saveDraft(val, area, canPay)
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-500">High</span>
            </div>
            <div className="text-center text-lg font-medium">
              {urgency}
            </div>
          </div>
          
          {/* Question 2: Area Radio Buttons */}
          <div className="space-y-3">
            <label className="block text-lg font-medium text-gray-900">
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
                  onChange={(e) => {
                    const val = e.target.value
                    setArea(val)
                    saveDraft(urgency, val, canPay)
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="cybersecurity" className="ml-2 text-gray-700">
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
                  onChange={(e) => {
                    const val = e.target.value
                    setArea(val)
                    saveDraft(urgency, val, canPay)
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="erp" className="ml-2 text-gray-700">
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
                  onChange={(e) => {
                    const val = e.target.value
                    setArea(val)
                    saveDraft(urgency, val, canPay)
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="supply" className="ml-2 text-gray-700">
                  Supply chain
                </label>
              </div>
            </div>
          </div>
          
          {/* Question 3: Yes/No Toggle */}
          <div className="space-y-3">
            <label className="block text-lg font-medium text-gray-900">
              Can you pay up to $5K for a quick risk check?
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => {
                  setCanPay(false)
                  saveDraft(urgency, area, false)
                }}
                className={`px-4 py-2 rounded-md ${
                  !canPay 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => {
                  setCanPay(true)
                  saveDraft(urgency, area, true)
                }}
                className={`px-4 py-2 rounded-md ${
                  canPay 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Yes
              </button>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!area}
              className={`w-full py-3 px-4 rounded-md transition duration-200 ${
                area 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white font-medium' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Quiz
