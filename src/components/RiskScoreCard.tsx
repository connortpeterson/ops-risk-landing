import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CategoryScore {
  name: string;
  score: number;
}

interface RiskScoreCardProps {
  overallScore: number;
  categoryScores: CategoryScore[];
}

function getColor(score: number): string {
  if (score >= 80) return '#16a34a'; // green-600
  if (score >= 60) return '#facc15'; // yellow-400
  return '#dc2626'; // red-600
}

function RiskScoreCard({ overallScore, categoryScores }: RiskScoreCardProps) {
  return (
    <div className="scorecard bg-slate-50 rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md mx-auto">
      <div className="flex items-center justify-center">
        <div className="w-32 h-32">
          <CircularProgressbar
            value={overallScore}
            text={`${overallScore}%`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: getColor(overallScore),
              textColor: '#4b5563',
              trailColor: '#e5e7eb',
            })}
          />
        </div>
      </div>
      <div className="space-y-4">
        {categoryScores.map((cat) => (
          <div key={cat.name}>
            <div className="flex justify-between mb-1 text-sm">
              <span>{cat.name}</span>
              <span>{cat.score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-md h-3">
              <div
                className="h-3 rounded-md"
                style={{ width: `${cat.score}%`, backgroundColor: getColor(cat.score) }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RiskScoreCard;
