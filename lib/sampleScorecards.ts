import type { Scorecard } from './computeScorecard'

export const crspScorecard: Scorecard = {
  ticker: 'CRSP',
  total: 11.41,
  categories: [
    {
      name: 'Pipeline Maturity',
      score: 1.75,
      factors: [
        { label: 'Lead candidate stage', score: 3, weight: 1, rationale: 'Stage of the most advanced asset.' },
        { label: 'Breadth of pipeline', score: 0, weight: 0.5, rationale: 'Number of additional active programs.' },
        { label: 'Trial diversity', score: 1, weight: 0.5, rationale: 'Variety of modalities or indications.' }
      ]
    },
    {
      name: 'Financial Health',
      score: 2,
      factors: [
        { label: 'Cash runway', score: 3, weight: 1, rationale: 'Months of operational runway.' },
        { label: 'Debt load', score: 1, weight: 1, rationale: 'Outstanding liabilities and covenants.' }
      ]
    },
    {
      name: 'Market Position',
      score: 1,
      factors: [
        { label: 'Competition intensity', score: 1, weight: 1, rationale: 'Number of similar programs in market.' },
        { label: 'IP strength', score: 1, weight: 1, rationale: 'Patent portfolio and exclusivity.' }
      ]
    },
    {
      name: 'Team Experience',
      score: 0.67,
      factors: [
        { label: 'Leadership track record', score: 1, weight: 1, rationale: 'Past exits or approvals.' },
        { label: 'Scientific advisory', score: 0, weight: 0.5, rationale: 'Credibility of advisors.' }
      ]
    },
    {
      name: 'Operational Risk',
      score: 0,
      factors: [
        { label: 'Manufacturing readiness', score: 0, weight: 1, rationale: 'CMO relationships and scale-up plans.' },
        { label: 'Supply chain complexity', score: 0, weight: 0.5, rationale: 'Reliance on scarce materials.' }
      ]
    },
    {
      name: 'Regulatory Strategy',
      score: 1.33,
      factors: [
        { label: 'FDA interactions', score: 1, weight: 1, rationale: 'Experience with regulatory bodies.' },
        { label: 'Compliance track', score: 2, weight: 0.5, rationale: 'History of clinical holds or warnings.' }
      ]
    },
    {
      name: 'Commercialization Plan',
      score: 2.33,
      factors: [
        { label: 'Partnerships', score: 3, weight: 1, rationale: 'Distribution or co-development deals.' },
        { label: 'Launch readiness', score: 1, weight: 0.5, rationale: 'Internal or outsourced sales capacity.' }
      ]
    },
    {
      name: 'Funding Outlook',
      score: 2.33,
      factors: [
        { label: 'Access to capital', score: 3, weight: 1, rationale: 'Relationships with investors or grants.' },
        { label: 'Burn rate discipline', score: 1, weight: 0.5, rationale: 'Historical cash utilization.' }
      ]
    }
  ],
  comments:
    'This company presents a strong IP moat and disciplined cash burn, but its lead indication faces crowding risk.'
}
