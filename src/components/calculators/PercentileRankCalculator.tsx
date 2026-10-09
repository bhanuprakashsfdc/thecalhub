import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface PercentileRankInput {
  yourScore: number;
  scoresBelow: number;
  totalScores: number;
}

export function computePercentileRank(input: PercentileRankInput) {
  const percentile =
    input.totalScores > 0 ? (input.scoresBelow / input.totalScores) * 100 : 0;
  const atOrBelow =
    input.totalScores > 0
      ? ((input.scoresBelow + 1) / input.totalScores) * 100
      : 0;
  const scoresAbove = Math.max(0, input.totalScores - input.scoresBelow - 1);
  const rankFromTop = Math.max(1, input.totalScores - input.scoresBelow);
  return { percentile, atOrBelow, scoresAbove, rankFromTop };
}

export function PercentileRankCalculator() {
  const [yourScore, setYourScore] = useState('85');
  const [scoresBelow, setScoresBelow] = useState('68');
  const [totalScores, setTotalScores] = useState('80');

  const result = computePercentileRank({
    yourScore: Number(yourScore) || 0,
    scoresBelow: Number(scoresBelow) || 0,
    totalScores: Number(totalScores) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Your score" value={yourScore} onChange={setYourScore} step="any" />
            <NumberField label="Scores below yours" value={scoresBelow} onChange={setScoresBelow} min={0} step="1" />
            <NumberField label="Total scores" value={totalScores} onChange={setTotalScores} min={0} step="1" />
          </div>
          <Hint>
            Percentile rank = (scores below ÷ total) × 100. A score at
            the 85th percentile beat 85% of the group.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Percentile rank"
            value={formatMoney(result.percentile)}
            sub="Percent of scores below"
          />
          <ResultRows>
            <ResultRow label="Scores above yours" value={String(result.scoresAbove)} />
            <ResultRow label="Percentage at or below" value={`${formatMoney(result.atOrBelow)}%`} />
            <ResultRow label="Rank from top" value={String(result.rankFromTop)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PercentileRankCalculator;
