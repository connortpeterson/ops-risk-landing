import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
// src/App.tsx
import React from "react";
import LandingPage from "./LandingPage";
import Quiz from "./Quiz";
// ... any other imports  // If you want to simply show LandingPage by default:
  return <LandingPage />;
}


import Summary from './Summary'
import RisksSummary from './RisksSummary'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/risks" element={<RisksSummary />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
