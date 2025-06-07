import { Scorecard } from '../lib/scoreCompany'

interface Props {
  scorecard: Scorecard
}

export default function ScorecardRenderer({ scorecard }: Props) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-center">
        {scorecard.ticker.toUpperCase()} - Total Score: {scorecard.score}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {scorecard.breakdown.map((item) => (
          <div key={item.category} className="bg-slate-50 rounded-lg p-4 shadow-sm">
            <h2 className="font-bold mb-2">
              {item.category} - {item.score}/3
            </h2>
            <p>{item.rationale}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
