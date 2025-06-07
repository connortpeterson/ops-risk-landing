import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Summary() {
  const [answers, setAnswers] = useState<{
    urgency: number;
    area: string;
    canPay: boolean;
  } | null>(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    // Retrieve quiz answers from localStorage
    const storedAnswers = localStorage.getItem('quizAnswers')
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers))
    }
  }, [])
  
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
    // Clear stored answers and return to landing page
    localStorage.removeItem('quizAnswers')
    navigate('/')
  }

  if (!answers) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
        <p>Loading your results...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <main className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Your Risk Assessment Summary
          </h1>
          <p className="text-lg text-gray-700">
            Based on your responses, here's what we know about your situation:
          </p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-4 mb-8">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Risk Urgency</h2>
            <p className="text-gray-700">
              Your integration risk urgency is <span className="font-medium">{getUrgencyText(answers.urgency)} ({answers.urgency}/5)</span>
            </p>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-gray-900">Area of Concern</h2>
            <p className="text-gray-700">
              Your primary concern is <span className="font-medium">{answers.area}</span>
            </p>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-gray-900">Budget Availability</h2>
            <p className="text-gray-700">
              {answers.canPay 
                ? 'You are willing to invest up to $5K for a quick risk check.'
                : 'You are not currently able to invest $5K for a quick risk check.'}
            </p>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700">
            Thank you for completing this assessment. Our team will be in touch with you shortly to discuss next steps.
          </p>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleStartOver}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
          >
            Start Over
          </button>
        </div>
      </main>
    </div>
  )
}

export default Summary
