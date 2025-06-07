import type { Scorecard, ScoreCategory } from '../lib/computeScorecard'

interface Props {
  scorecard: Scorecard
  actions?: React.ReactNode
}

function diligenceSignal(total: number): string {
  if (total >= 20) return 'High'
  if (total >= 15) return 'Medium'
  return 'Low'
}

export default function ScorecardRenderer({ scorecard, actions }: Props) {

  return (
    <div className="mx-auto max-w-5xl py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-12">
      <header className="text-center space-y-2 sm:space-y-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{scorecard.ticker}</h1>
        <div className="text-lg sm:text-xl md:text-2xl font-medium">Total Score {scorecard.total}/24</div>
        <div className="text-sm text-slate-600">
          Diligence Signal: {diligenceSignal(scorecard.total)}
        </div>
        {actions && <div className="flex justify-center gap-4 pt-2">{actions}</div>}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {scorecard.categories.map((cat) => (
          <CategoryCard key={cat.name} category={cat} />
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
}

function CategoryCard({ category }: CardProps) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-4 sm:space-y-6">
      <h2 className="font-semibold">
        {category.name} – {category.score}/3
      </h2>
      <ul className="space-y-3 sm:space-y-4">
        {category.factors.map((f) => (
          <li key={f.label}>
            <div className="flex items-baseline justify-between">
              <span className="font-semibold">{f.label}</span>
              <span className="text-sm bg-blue-100 rounded px-2">
                {f.score}/3
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">{f.rationale}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
