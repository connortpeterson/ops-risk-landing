import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { Scorecard } from '../lib/scoreCompany'
import 'react-circular-progressbar/dist/styles.css'

interface Props {
  scorecard: Scorecard
}

export default function ScorecardRenderer({ scorecard }: Props) {
  const totalPossible = scorecard.breakdown.length * 3
  const percent = Math.round((scorecard.score / totalPossible) * 100)

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-24 h-24">
          <CircularProgressbar
            value={percent}
            text={`${percent}%`}
            styles={buildStyles({
              pathColor: '#10b981',
              textColor: '#0f172a',
              trailColor: '#e2e8f0',
            })}
          />
        </div>
        <h1 className="text-3xl font-bold">
          {scorecard.ticker.toUpperCase()}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {scorecard.breakdown.map((item) => (
          <div
            key={item.category}
            className="scorecard bg-slate-50 p-4 rounded-lg shadow-sm flex justify-between items-start"
          >
            <div>
              <h2 className="font-bold">{item.category}</h2>
              <p className="text-sm text-slate-700">{item.rationale}</p>
            </div>
            <span className="font-semibold">{item.score}/3</span>
          </div>
        ))}
      </div>
    </div>
  )
}
