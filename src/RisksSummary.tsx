import { useNavigate } from 'react-router-dom'
import usePersistentQuizState from './usePersistentQuizState'

function RisksSummary() {
  const [quizState] = usePersistentQuizState()
  const { answers } = quizState
  const navigate = useNavigate()
  
  // Function to determine top risks based on quiz answers
  const getTopRisks = () => {
    const risks = [] as string[]
    
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

  
  const topRisks = getTopRisks()

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6">
      <main className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Your Top 2 Execution Risks
          </h1>
        </div>

        <div className="bg-slate-50 p-6 rounded-lg shadow-sm mb-8">
          <ul className="list-disc pl-5 space-y-6">
            <li className="text-lg">
              <span className="font-medium">Risk #1:</span> {topRisks[0]}
            </li>
            <li className="text-lg">
              <span className="font-medium">Risk #2:</span> {topRisks[1]}
            </li>
          </ul>
        </div>

        <div className="text-center mb-8">
          <p className="prose prose-sm md:prose">
            This is just a preview of your execution risks. Get our comprehensive analysis to identify all potential issues.
          </p>
        </div>
        
        <div className="flex justify-center md:justify-start">
          <button
            onClick={handleGetFullReport}
            className="w-full md:w-auto mx-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
          >
            Get Full Report by Email
          </button>
        </div>
      </main>
    </section>
  )
}

export default RisksSummary
