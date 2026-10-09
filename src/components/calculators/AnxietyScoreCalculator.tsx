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

export interface AnxietyScoreInput {
  answers: number[];
}

export interface AnxietyScoreResult {
  total: number;
  severity: string;
  percentOfMax: number;
  highItems: number;
  aboveCutoff: boolean;
}

const ITEMS = [
  'Q1. Feeling nervous, anxious or on edge',
  'Q2. Not being able to stop or control worrying',
  'Q3. Worrying too much about different things',
  'Q4. Trouble relaxing',
  'Q5. Being so restless it is hard to sit still',
  'Q6. Becoming easily annoyed or irritable',
  'Q7. Feeling afraid as if something awful might happen',
];

const MAX_TOTAL = 21;
const CUTOFF = 10;

const clampItem = (raw: number) => (Number.isFinite(raw) ? Math.min(3, Math.max(0, raw)) : 0);

const severityFor = (total: number) => {
  if (total >= 15) return 'Severe';
  if (total >= 10) return 'Moderate';
  if (total >= 5) return 'Mild';
  return 'Minimal';
};

export function computeAnxietyScore(input: AnxietyScoreInput): AnxietyScoreResult {
  const answers = (input.answers ?? []).map(clampItem);
  const total = answers.reduce((sum, score) => sum + score, 0);

  return {
    total,
    severity: severityFor(total),
    percentOfMax: safeDiv(total, MAX_TOTAL) * 100,
    highItems: answers.filter((score) => score >= 2).length,
    aboveCutoff: total >= CUTOFF,
  };
}

export function AnxietyScoreCalculator() {
  const [answers, setAnswers] = useState<string[]>(['2', '2', '2', '1', '1', '1', '1']);

  const setAnswer = (index: number, value: string) =>
    setAnswers((prev) => prev.map((entry, i) => (i === index ? value : entry)));

  const result = computeAnxietyScore({
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
                max={3}
              />
            ))}
          </div>
          <Hint>
            Score each GAD-7 statement from 0 (not at all) to 3 (nearly every day) for the last two weeks. Every
            answer is clamped to the 0 to 3 range before the total is added up.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="GAD-7 total score"
            value={`${result.total} / ${MAX_TOTAL}`}
            sub={`${result.severity} anxiety range`}
          />
          <ResultRows>
            <ResultRow label="Severity band" value={result.severity} />
            <ResultRow label="Percent of maximum" value={`${formatMoney(result.percentOfMax)}%`} />
            <ResultRow label="Items scored 2 or 3" value={`${result.highItems} of ${ITEMS.length}`} />
            <ResultRow label="At or above cutoff (10)" value={result.aboveCutoff ? 'Yes' : 'No'} />
          </ResultRows>
          <Hint>
            Scores of 10 or more are the usual screening threshold for generalized anxiety and a drop of 5 points
            is often read as meaningful improvement. This is a screening score, not a diagnosis.
          </Hint>
        </Panel>
      }
    />
  );
}

export default AnxietyScoreCalculator;
