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

export interface StressLevelInput {
  answers: number[];
}

export interface StressLevelResult {
  total: number;
  band: string;
  percentOfMax: number;
  reverseContribution: number;
  highStressItems: number;
}

const ITEMS = [
  'Q1. Upset because of something unexpected',
  'Q2. Unable to control the important things in life',
  'Q3. Nervous and stressed',
  'Q4. Confident about handling personal problems',
  'Q5. Things were going your way',
  'Q6. Could not cope with all you had to do',
  'Q7. Able to control irritations in life',
  'Q8. On top of things',
  'Q9. Angry because of things outside your control',
  'Q10. Difficulties piling up so high you could not overcome them',
];

const REVERSED = new Set([3, 4, 5, 6, 7]);
const ITEM_SCALE = 4;
const MAX_TOTAL = 40;

const clampItem = (raw: number) => (Number.isFinite(raw) ? Math.min(ITEM_SCALE, Math.max(0, raw)) : 0);

const bandFor = (total: number) => {
  if (total >= 27) return 'High stress';
  if (total >= 14) return 'Moderate stress';
  return 'Low stress';
};

export function computeStressLevel(input: StressLevelInput): StressLevelResult {
  const answers = (input.answers ?? []).map(clampItem);
  const scored = answers.map((score, i) => (REVERSED.has(i) ? ITEM_SCALE - score : score));
  const total = scored.reduce((sum, score) => sum + score, 0);

  return {
    total,
    band: bandFor(total),
    percentOfMax: safeDiv(total, MAX_TOTAL) * 100,
    reverseContribution: scored
      .filter((_score, i) => REVERSED.has(i))
      .reduce((sum, score) => sum + score, 0),
    highStressItems: scored.filter((score) => score >= 3).length,
  };
}

export function StressLevelCalculator() {
  const [answers, setAnswers] = useState<string[]>(Array(ITEMS.length).fill('2'));

  const setAnswer = (index: number, value: string) =>
    setAnswers((prev) => prev.map((entry, i) => (i === index ? value : entry)));

  const result = computeStressLevel({
    answers: answers.map((entry) => (entry.trim() === '' ? Number.NaN : Number(entry))),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-4">
            {ITEMS.map((item, i) => (
              <NumberField
                key={item}
                label={item}
                value={answers[i] ?? ''}
                onChange={(value) => setAnswer(i, value)}
                min={0}
                max={4}
              />
            ))}
          </div>
          <Hint>
            Answer 0 (never) to 4 (very often) over the last month. Questions 4 to 8 are worded positively and are
            reversed automatically, which is why they can lower your score.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Perceived Stress Scale"
            value={`${result.total} / ${MAX_TOTAL}`}
            sub={`${result.band} over the last month`}
          />
          <ResultRows>
            <ResultRow label="Stress band" value={result.band} />
            <ResultRow label="Percent of maximum" value={`${formatMoney(result.percentOfMax)}%`} />
            <ResultRow label="Reversed items contribution" value={`${result.reverseContribution} / 20`} />
            <ResultRow label="Items scoring 3 or 4" value={`${result.highStressItems} of ${ITEMS.length}`} />
          </ResultRows>
          <Hint>
            The PSS-10 total runs from 0 to 40: 0 to 13 is low perceived stress, 14 to 26 is moderate, and 27 to
            40 is high. It measures how unpredictable and uncontrollable life has felt lately.
          </Hint>
        </Panel>
      }
    />
  );
}

export default StressLevelCalculator;
