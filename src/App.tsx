import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './LandingPage'
import Quiz from './Quiz'
import Summary from './Summary'
import RisksSummary from './RisksSummary'
import Score from './Score'
import Watchlist from './Watchlist'
import TrustFooter from './components/TrustFooter'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/risks" element={<RisksSummary />} />
        <Route path="/score/:ticker" element={<Score />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <TrustFooter />
    </Router>
  )
}

export default App
