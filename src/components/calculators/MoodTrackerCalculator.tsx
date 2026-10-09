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
  safeDiv,
} from './kit';

export interface MoodTrackerInput {
  scores: number[];
}

export interface MoodTrackerResult {
  average: number;
  trend: number;
  stability: number;
  lowest: number;
  highest: number;
  neutralDays: number;
  neutralShare: number;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const clampScore = (raw: number) => (Number.isFinite(raw) ? Math.min(10, Math.max(1, raw)) : 0);

export function computeMoodTracker(input: MoodTrackerInput): MoodTrackerResult {
  const scores = (input.scores ?? []).map(clampScore);
  const n = scores.length;
  const average = safeDiv(
    scores.reduce((sum, s) => sum + s, 0),
    n
  );
  const meanDay = (n - 1) / 2;
  const denom = scores.reduce((sum, _s, i) => sum + (i - meanDay) ** 2, 0);
  const cov = scores.reduce((sum, s, i) => sum + (i - meanDay) * (s - average), 0);
  const trend = denom > 0 ? cov / denom : 0;
  const variance = safeDiv(
    scores.reduce((sum, s) => sum + (s - average) ** 2, 0),
    n
  );
  const lowest = n > 0 ? Math.min(...scores) : 0;
  const highest = n > 0 ? Math.max(...scores) : 0;
  const neutralDays = scores.filter((s) => s >= 7).length;

  return {
    average,
    trend,
    stability: Math.sqrt(variance),
    lowest,
    highest,
    neutralDays,
    neutralShare: safeDiv(neutralDays, n) * 100,
  };
}

export function MoodTrackerCalculator() {
  const [scores, setScores] = useState<string[]>(['7', '8', '6', '7', '9', '8', '7']);

  const setScore = (index: number, value: string) =>
    setScores((prev) => prev.map((entry, i) => (i === index ? value : entry)));

  const result = computeMoodTracker({
    scores: scores.map((entry) => (entry.trim() === '' ? Number.NaN : Number(entry))),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="grid grid-cols-2 gap-4">
            {DAYS.map((day, i) => (
              <NumberField
                key={day}
                label={`${day} mood (1-10)`}
                value={scores[i] ?? ''}
                onChange={(value) => setScore(i, value)}
                min={1}
                max={10}
              />
            ))}
          </div>
          <Hint>
            Rate every day from 1 (worst) to 10 (best). Blank or out-of-range entries fall back to zero so the
            weekly maths always stays finite.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Average mood"
            value={`${formatMoney(result.average)} / 10`}
            sub={`${result.neutralDays} of ${DAYS.length} days rated 7 or higher`}
          />
          <ResultRows>
            <ResultRow
              label="Weekly trend"
              value={`${result.trend >= 0 ? '+' : ''}${formatMoney(result.trend)} pts/day`}
            />
            <ResultRow label="Mood stability (SD)" value={formatMoney(result.stability)} />
            <ResultRow label="Lowest day" value={`${formatMoney(result.lowest)} / 10`} />
            <ResultRow label="Highest day" value={`${formatMoney(result.highest)} / 10`} />
            <ResultRow
              label="Days at or above neutral"
              value={`${result.neutralDays} of ${DAYS.length} (${formatMoney(result.neutralShare)}%)`}
            />
          </ResultRows>
          <Hint>
            The trend is the least-squares slope of the seven ratings, stability is the population standard
            deviation, and a neutral day counts as a rating of 7 or more.
          </Hint>
        </Panel>
      }
    />
  );
}

export default MoodTrackerCalculator;
