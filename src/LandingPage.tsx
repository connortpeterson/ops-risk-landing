import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'

function LandingPage() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store email if needed
    localStorage.setItem('userEmail', email)
    // Navigate to quiz page
    navigate('/quiz')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white pb-16">
      <main className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Worried your next deal's IT/ops risk is hidden?
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Get a 1-page execution risk snapshot<br />in under 5 minutes.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
            >
              Continue
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
