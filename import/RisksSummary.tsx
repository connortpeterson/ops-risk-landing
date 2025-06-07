import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function RisksSummary() {
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
  
  // Function to determine top risks based on quiz answers
  const getTopRisks = () => {
    if (!answers) return ['No data available', 'No data available']
    
    const risks = []
    
    // Risk based on area of concern
    switch(answers.area) {
      case 'Cybersecurity':
        risks.push('Data breach vulnerability in legacy systems')
        break
      case 'ERP integration':
        risks.push('System incompatibility causing data synchronization failures')
        break
      case 'Supply chain':
        risks.push('Vendor management gaps creating operational bottlenecks')
        break
      default:
        risks.push('Undefined operational risk area')
    }
    
    // Risk based on urgency level
    if (answers.urgency >= 4) {
      risks.push('Critical timeline pressure increasing implementation errors')
    } else if (answers.urgency >= 2) {
      risks.push('Resource allocation inefficiencies')
    } else {
      risks.push('Stakeholder alignment challenges')
    }
    
    return risks
  }
  
  const handleGetFullReport = () => {
    // Navigate back to landing page for email capture
    navigate('/')
  }

  if (!answers) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
        <p>Loading your results...</p>
      </div>
    )
  }
  
  const topRisks = getTopRisks()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <main className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Your Top 2 Execution Risks
          </h1>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <ul className="list-disc pl-5 space-y-4">
            <li className="text-gray-800 text-lg">
              <span className="font-medium">Risk #1:</span> {topRisks[0]}
            </li>
            <li className="text-gray-800 text-lg">
              <span className="font-medium">Risk #2:</span> {topRisks[1]}
            </li>
          </ul>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700">
            This is just a preview of your execution risks. Get our comprehensive analysis to identify all potential issues.
          </p>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleGetFullReport}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
          >
            Get Full Report by Email
          </button>
        </div>
      </main>
    </div>
  )
}

export default RisksSummary
