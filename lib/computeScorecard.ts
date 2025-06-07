export interface ScoreFactor {
  label: string
  score: number
  weight: number
  rationale: string
}

export interface ScoreCategory {
  name: string
  score: number
  factors: ScoreFactor[]
}

export interface Scorecard {
  ticker: string
  total: number
  categories: ScoreCategory[]
  comments?: string
}

function pseudoRandom(base: number) {
  const x = Math.sin(base) * 10000
  return x - Math.floor(x)
}

function factorScore(seed: number): number {
  return Math.floor(pseudoRandom(seed) * 4)
}

export function computeScorecard(ticker: string): Scorecard {
  const base = ticker
    .toUpperCase()
    .split('')
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0)

  const categories: ScoreCategory[] = [
    {
      name: 'Pipeline Maturity',
      score: 0,
      factors: [
        {
          label: 'Lead candidate stage',
          score: factorScore(base + 1),
          weight: 1,
          rationale: 'Stage of the most advanced asset.'
        },
        {
          label: 'Breadth of pipeline',
          score: factorScore(base + 2),
          weight: 0.5,
          rationale: 'Number of additional active programs.'
        },
        {
          label: 'Trial diversity',
          score: factorScore(base + 3),
          weight: 0.5,
          rationale: 'Variety of modalities or indications.'
        }
      ]
    },
    {
      name: 'Financial Health',
      score: 0,
      factors: [
        {
          label: 'Cash runway',
          score: factorScore(base + 4),
          weight: 1,
          rationale: 'Months of operational runway.'
        },
        {
          label: 'Debt load',
          score: factorScore(base + 5),
          weight: 1,
          rationale: 'Outstanding liabilities and covenants.'
        }
      ]
    },
    {
      name: 'Market Position',
      score: 0,
      factors: [
        {
          label: 'Competition intensity',
          score: factorScore(base + 6),
          weight: 1,
          rationale: 'Number of similar programs in market.'
        },
        {
          label: 'IP strength',
          score: factorScore(base + 7),
          weight: 1,
          rationale: 'Patent portfolio and exclusivity.'
        }
      ]
    },
    {
      name: 'Team Experience',
      score: 0,
      factors: [
        {
          label: 'Leadership track record',
          score: factorScore(base + 8),
          weight: 1,
          rationale: 'Past exits or approvals.'
        },
        {
          label: 'Scientific advisory',
          score: factorScore(base + 9),
          weight: 0.5,
          rationale: 'Credibility of advisors.'
        }
      ]
    },
    {
      name: 'Operational Risk',
      score: 0,
      factors: [
        {
          label: 'Manufacturing readiness',
          score: factorScore(base + 10),
          weight: 1,
          rationale: 'CMO relationships and scale-up plans.'
        },
        {
          label: 'Supply chain complexity',
          score: factorScore(base + 11),
          weight: 0.5,
          rationale: 'Reliance on scarce materials.'
        }
      ]
    },
    {
      name: 'Regulatory Strategy',
      score: 0,
      factors: [
        {
          label: 'FDA interactions',
          score: factorScore(base + 12),
          weight: 1,
          rationale: 'Experience with regulatory bodies.'
        },
        {
          label: 'Compliance track',
          score: factorScore(base + 13),
          weight: 0.5,
          rationale: 'History of clinical holds or warnings.'
        }
      ]
    },
    {
      name: 'Commercialization Plan',
      score: 0,
      factors: [
        {
          label: 'Partnerships',
          score: factorScore(base + 14),
          weight: 1,
          rationale: 'Distribution or co-development deals.'
        },
        {
          label: 'Launch readiness',
          score: factorScore(base + 15),
          weight: 0.5,
          rationale: 'Internal or outsourced sales capacity.'
        }
      ]
    },
    {
      name: 'Funding Outlook',
      score: 0,
      factors: [
        {
          label: 'Access to capital',
          score: factorScore(base + 16),
          weight: 1,
          rationale: 'Relationships with investors or grants.'
        },
        {
          label: 'Burn rate discipline',
          score: factorScore(base + 17),
          weight: 0.5,
          rationale: 'Historical cash utilization.'
        }
      ]
    }
  ]

  for (const cat of categories) {
    const totalWeight = cat.factors.reduce((acc, f) => acc + f.weight, 0)
    const weighted = cat.factors.reduce((acc, f) => acc + f.score * f.weight, 0)
    cat.score = Number((weighted / totalWeight).toFixed(2))
  }

  const total = Number(
    categories.reduce((acc, c) => acc + c.score, 0).toFixed(2)
  )

  return {
    ticker: ticker.toUpperCase(),
    total,
    categories,
    comments:
      'This company presents a strong IP moat and disciplined cash burn, but its lead indication faces crowding risk.'
  }
}
