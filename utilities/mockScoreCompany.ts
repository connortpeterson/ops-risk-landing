export interface CompanyScore {
  score: number;
  outOf: number;
}

export function mockScoreCompany(ticker: string): CompanyScore {
  switch (ticker.toUpperCase()) {
    case 'CRSP':
      return { score: 21, outOf: 24 };
    case 'SRPT':
      return { score: 17, outOf: 24 };
    case 'BMRN':
      return { score: 13, outOf: 24 };
    default:
      return { score: 0, outOf: 24 };
  }
}

