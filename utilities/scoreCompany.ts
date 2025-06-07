export interface CategoryScore {
  name: string;
  score: number;
  rationale: string;
}

export interface ScoreBreakdown {
  total: number;
  categories: CategoryScore[];
}

// Placeholder scoring function
export function scoreCompany(ticker: string): ScoreBreakdown {
  const seed = ticker.toUpperCase().charCodeAt(0) % 10;
  const categories: CategoryScore[] = [
    {
      name: 'Financial Health',
      score: 50 + seed,
      rationale: 'Based on recent financial filings.'
    },
    {
      name: 'Growth Potential',
      score: 40 + seed,
      rationale: 'Projected market expansion and revenue.'
    },
    {
      name: 'Operational Risk',
      score: 30 + seed,
      rationale: 'Supply chain and execution considerations.'
    }
  ];

  const total = Math.round(
    categories.reduce((acc, cat) => acc + cat.score, 0) / categories.length
  );

  return { total, categories };
}
