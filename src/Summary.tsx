import { useNavigate } from 'react-router-dom'
import usePersistentQuizState, { DEFAULT_STATE } from './usePersistentQuizState'

function Summary() {
  const [quizState, setQuizState] = usePersistentQuizState()
  const { answers } = quizState
  const navigate = useNavigate()
  
  const getUrgencyText = (urgency: number) => {
    switch(urgency) {
      case 1: return 'Very Low';
      case 2: return 'Low';
      case 3: return 'Medium';
      case 4: return 'High';
      case 5: return 'Very High';
      default: return 'Medium';
    }
  }
  
  const handleStartOver = () => {
    // Reset stored answers and return to landing page
    setQuizState(DEFAULT_STATE)
    navigate('/')
  }


  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6">
      <main className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Your Risk Assessment Summary
          </h1>
          <p className="prose prose-sm md:prose">
            Based on your responses, here's what we know about your situation:
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-lg shadow-sm space-y-6 mb-8">
          <div>
            <h2 className="text-lg font-medium">Risk Urgency</h2>
            <p>
              Your integration risk urgency is <span className="font-medium">{getUrgencyText(answers.urgency)} ({answers.urgency}/5)</span>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium">Area of Concern</h2>
            <p>
              Your primary concern is <span className="font-medium">{answers.area}</span>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium">Budget Availability</h2>
            <p>
              {answers.canPay
                ? 'You are willing to invest up to $5K for a quick risk check.'
                : 'You are not currently able to invest $5K for a quick risk check.'}
            </p>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="prose prose-sm md:prose">
            Thank you for completing this assessment. Our team will be in touch with you shortly to discuss next steps.
          </p>
        </div>
        
        <div className="flex justify-center md:justify-start">
          <button
            onClick={handleStartOver}
            className="px-6 py-3 mx-auto md:mx-0 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
          >
            Start Over
          </button>
        </div>
      </main>
    </section>
  )
}

export default Summary
