import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { scoreCompany, ScoreBreakdown } from '../../utilities/scoreCompany';

export default function ScorePage() {
  const router = useRouter();
  const { ticker } = router.query;
  const [breakdown, setBreakdown] = useState<ScoreBreakdown | null>(null);

  useEffect(() => {
    if (typeof ticker === 'string') {
      setBreakdown(scoreCompany(ticker));
    }
  }, [ticker]);

  if (!ticker) return <p>Loading...</p>;

  if (!breakdown) return <p>Scoring...</p>;

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        {ticker.toUpperCase()} - Total Score: {breakdown.total}
      </h1>
      <ul style={{ marginTop: '1rem' }}>
        {breakdown.categories.map((cat) => (
          <li key={cat.name} style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontWeight: 'bold' }}>{cat.name} - {cat.score}</h2>
            <p>{cat.rationale}</p>
          </li>
        ))}
      </ul>
      <button style={{ marginTop: '2rem' }}>
        Download PDF
      </button>
    </main>
  );
}
