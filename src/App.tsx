import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './LandingPage'
import Quiz from './Quiz'
import Summary from './Summary'
import RisksSummary from './RisksSummary'
import SecurityPolicy from './SecurityPolicy'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/risks" element={<RisksSummary />} />
        <Route path="/security-policy" element={<SecurityPolicy />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
