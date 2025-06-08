export interface BiotechInput {
  evToRnpvRatio: number;
  insiderBuysLast90d: boolean;
  cashMonths: number;
  fundingClarity: boolean;
  analystCount: number;
  institutionalOwnershipPct: number;
  institutionalConcentration: boolean;

  pipelinePrograms: number;
  preclinicalPrograms: number;
  singleAsset: boolean;
  maxProgramRnpvShare: number;

  modalityLoA: number; // Phase-weighted probability
  ipStrengthScore: number; // 0–3, based on claim breadth and citation family
  upcomingCatalystIn6to18mo: boolean;
  trialComplexityScore: number; // 0–3

  redFlags: {
    lowCashRunway: boolean;
    noPhIToIII: boolean;
    execTurnover: boolean;
    undisclosedTrialPartner: boolean;
  };

  yellowFlags: {
    heavyGrantFunding: boolean;
    trialGeoConcentration: boolean;
    legacySponsorBias: boolean;
  };
}

export interface ScorecardV1 {
  ticker: string;
  layers: {
    layer1Score: number;
    layer2ScoreRaw: number;
    layer2Penalty: number;
    layer2Final: number;
  };
  totalScore: number;
  disqualified: boolean;
  investmentTag: '✅ High Conviction' | '⚖️ Watchlist' | '⚠️ Fragile' | '❌ Likely Trap';
  rationale: {
    category: string;
    score: number;
    notes: string;
  }[];
}

function pushRationale(
  arr: { category: string; score: number; notes: string }[],
  category: string,
  score: number,
  notes: string,
): number {
  arr.push({ category, score, notes });
  return score;
}

export function computeScorecardV1(ticker: string, data: BiotechInput): ScorecardV1 {
  const redFlagTriggered = Object.entries(data.redFlags)
    .filter(([, v]) => v)
    .map(([k]) => k);

  if (redFlagTriggered.length > 0) {
    return {
      ticker,
      disqualified: true,
      investmentTag: '❌ Likely Trap',
      layers: { layer1Score: 0, layer2ScoreRaw: 0, layer2Penalty: 0, layer2Final: 0 },
      totalScore: 0,
      rationale: [
        {
          category: 'Red Flags',
          score: 0,
          notes: `Disqualified due to: ${redFlagTriggered.join(', ')}`,
        },
      ],
    };
  }

  const rationale: { category: string; score: number; notes: string }[] = [];
  let layer1 = 0;
  let layer2 = 0;

  // Layer 1: Market Oversight
  const evScore = pushRationale(
    rationale,
    'EV Mispricing',
    data.evToRnpvRatio < 0.7 ? 3 : data.evToRnpvRatio < 1 ? 2 : data.evToRnpvRatio < 1.5 ? 1 : 0,
    `EV/rNPV ratio ${data.evToRnpvRatio}`,
  );
  layer1 += evScore;

  const insiderScore = pushRationale(
    rationale,
    'Insider Buys Cluster',
    data.insiderBuysLast90d ? 3 : 0,
    data.insiderBuysLast90d ? 'Recent insider buys' : 'No recent buys',
  );
  layer1 += insiderScore;

  const cashScore = pushRationale(
    rationale,
    'Cash + Source',
    data.cashMonths >= 12 && data.fundingClarity
      ? 3
      : data.cashMonths >= 12
        ? 2
        : data.cashMonths >= 6
          ? 1
          : 0,
    `${data.cashMonths}mo runway${data.fundingClarity ? ' with funding clarity' : ''}`,
  );
  layer1 += cashScore;

  const analystScore = pushRationale(
    rationale,
    'Analyst Coverage',
    data.analystCount <= 3 ? 3 : data.analystCount <= 6 ? 2 : data.analystCount <= 9 ? 1 : 0,
    `${data.analystCount} analysts`,
  );
  layer1 += analystScore;

  const instScore = pushRationale(
    rationale,
    'Institutional Ownership',
    data.institutionalOwnershipPct < 30 && !data.institutionalConcentration
      ? 3
      : data.institutionalOwnershipPct < 30
        ? 2
        : data.institutionalOwnershipPct < 60
          ? 1
          : 0,
    `${data.institutionalOwnershipPct}% owned${data.institutionalConcentration ? ' (concentrated)' : ''}`,
  );
  layer1 += instScore;

  // Layer 2: Scientific Viability
  const pipelineScore = pushRationale(
    rationale,
    'Pipeline Optionality',
    data.pipelinePrograms >= 2 || (data.pipelinePrograms >= 1 && data.preclinicalPrograms > 0)
      ? 3
      : data.pipelinePrograms >= 1
        ? 2
        : data.preclinicalPrograms > 0
          ? 1
          : 0,
    `${data.pipelinePrograms} clinical / ${data.preclinicalPrograms} preclinical`,
  );
  layer2 += pipelineScore;

  const concentrationScore = pushRationale(
    rationale,
    'Program Concentration',
    data.singleAsset
      ? 0
      : data.maxProgramRnpvShare <= 0.7
        ? 3
        : data.maxProgramRnpvShare <= 0.85
          ? 2
          : 1,
    data.singleAsset ? 'Single asset' : `Max rNPV share ${data.maxProgramRnpvShare}`,
  );
  layer2 += concentrationScore;

  const loaScore = pushRationale(
    rationale,
    'Modality LoA',
    data.modalityLoA > 0.5 ? 3 : data.modalityLoA > 0.3 ? 2 : data.modalityLoA > 0.1 ? 1 : 0,
    `LoA ${data.modalityLoA}`,
  );
  layer2 += loaScore;

  const ipScore = pushRationale(
    rationale,
    'IP Strength',
    Math.max(0, Math.min(3, data.ipStrengthScore)),
    `Score ${data.ipStrengthScore}`,
  );
  layer2 += ipScore;

  const catalystScore = pushRationale(
    rationale,
    'Catalyst',
    data.upcomingCatalystIn6to18mo ? 3 : 0,
    data.upcomingCatalystIn6to18mo ? 'Milestone in 6-18mo' : 'No known catalyst',
  );
  layer2 += catalystScore;

  const trialScore = pushRationale(
    rationale,
    'Trial Complexity',
    Math.max(0, Math.min(3, data.trialComplexityScore)),
    `Complexity ${data.trialComplexityScore}`,
  );
  layer2 += trialScore;

  const yellowFlags = Object.entries(data.yellowFlags)
    .filter(([, v]) => v)
    .map(([k]) => k);
  const penalty = yellowFlags.length;
  const layer2Final = Math.max(0, layer2 - penalty);

  const total = layer1 + layer2Final;

  const tag = total >= 28
    ? '✅ High Conviction'
    : total >= 24
      ? '⚖️ Watchlist'
      : total >= 20
        ? '⚠️ Fragile'
        : '❌ Likely Trap';

  if (penalty > 0) {
    rationale.push({ category: 'Yellow Flags', score: -penalty, notes: yellowFlags.join(', ') });
  }

  return {
    ticker,
    disqualified: false,
    layers: {
      layer1Score: layer1,
      layer2ScoreRaw: layer2,
      layer2Penalty: penalty,
      layer2Final,
    },
    totalScore: total,
    investmentTag: tag,
    rationale,
  };
}
