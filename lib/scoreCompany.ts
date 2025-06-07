export interface ScoreBreakdownItem {
  category: string
  score: number
  rationale: string
}

export interface Scorecard {
  ticker: string
  score: number
  breakdown: ScoreBreakdownItem[]
}

export async function scoreCompany(ticker: string): Promise<Scorecard> {
  const categories = [
    'Financial Health',
    'Growth Potential',
    'Operational Risk',
    'Pipeline Strength',
  ]

  const breakdown = categories.map((category) => ({
    category,
    score: Math.floor(Math.random() * 4),
    rationale: 'Placeholder rationale for ' + category,
  }))

  const total = breakdown.reduce((acc, item) => acc + item.score, 0)

  return {
    ticker: ticker.toUpperCase(),
    score: total,
    breakdown,
  }
}
