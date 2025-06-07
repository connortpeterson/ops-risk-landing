import type { Scorecard, ScoreCategory } from '../lib/computeScorecard'
import { useState } from 'react'

interface Props {
  scorecard: Scorecard
}

function confidenceLabel(total: number): string {
  if (total >= 16) return 'High'
  if (total >= 8) return 'Moderate'
  return 'Low'
}

function iconFor(score: number): string {
  if (score >= 2) return '✓'
  if (score === 1) return '⚠️'
  return '✕'
}

export default function ScorecardRenderer({ scorecard }: Props) {
  const [showRationale, setShowRationale] = useState(true)
  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{scorecard.ticker}</h1>
        <div className="text-xl font-medium">
          Total Score {scorecard.total}/24
        </div>
        <div className="text-sm text-slate-600">
          {confidenceLabel(scorecard.total)} Diligence Confidence
        </div>
        <div className="flex justify-center gap-4 pt-2">
          <button className="btn-primary">Download PDF</button>
          <button className="btn-secondary" onClick={() => setShowRationale((v) => !v)}>
            {showRationale ? 'Hide Rationale' : 'Explain Score'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {scorecard.categories.map((cat) => (
          <CategoryCard key={cat.name} category={cat} showRationale={showRationale} />
        ))}
      </div>

      {scorecard.comments && (
        <p className="text-center text-sm text-slate-700 pt-4">
          {scorecard.comments}
        </p>
      )}
    </div>
  )
}

interface CardProps {
  category: ScoreCategory
  showRationale: boolean
}

function CategoryCard({ category, showRationale }: CardProps) {
  return (
    <div className="bg-slate-50 p-6 rounded-xl shadow-sm space-y-4">
      <h2 className="font-semibold">
        {category.name} – {category.score}/3
      </h2>
      <ul className="space-y-2 text-sm">
        {category.factors.map((f) => (
          <li key={f.label} className="flex gap-2">
            <span>{iconFor(f.score)}</span>
            <span className="flex-1">
              {f.label} – {f.score}/3
              {showRationale && (
                <span className="block text-slate-600">{f.rationale}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
