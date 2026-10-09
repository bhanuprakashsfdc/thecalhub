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

export interface DepressionScoreInput {
  answers: number[];
}

export interface DepressionScoreResult {
  total: number;
  severity: string;
  percentOfMax: number;
  highItems: number;
  aboveCutoff: boolean;
}

const ITEMS = [
  'Q1. Little interest or pleasure',
  'Q2. Feeling down, depressed or hopeless',
  'Q3. Trouble sleeping or sleeping too much',
  'Q4. Feeling tired or little energy',
  'Q5. Poor appetite or overeating',
  'Q6. Feeling bad about yourself',
  'Q7. Trouble concentrating',
  'Q8. Moving slowly or fidgety and restless',
  'Q9. Thoughts of self-harm',
];

const MAX_TOTAL = 27;
const CUTOFF = 10;

const clampItem = (raw: number) => (Number.isFinite(raw) ? Math.min(3, Math.max(0, raw)) : 0);

const severityFor = (total: number) => {
  if (total >= 20) return 'Severe';
  if (total >= 15) return 'Moderately severe';
  if (total >= 10) return 'Moderate';
  if (total >= 5) return 'Mild';
  return 'Minimal';
};

export function computeDepressionScore(input: DepressionScoreInput): DepressionScoreResult {
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

export function DepressionScoreCalculator() {
  const [answers, setAnswers] = useState<string[]>(['1', '2', '1', '2', '1', '1', '1', '1', '0']);

  const setAnswer = (index: number, value: string) =>
    setAnswers((prev) => prev.map((entry, i) => (i === index ? value : entry)));

  const result = computeDepressionScore({
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
            Score each PHQ-9 statement from 0 (not at all) to 3 (nearly every day) for the last two weeks.
            Out-of-range entries are clamped so the total never leaves 0 to 27.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="PHQ-9 total score"
            value={`${result.total} / ${MAX_TOTAL}`}
            sub={`${result.severity} depression range`}
          />
          <ResultRows>
            <ResultRow label="Severity band" value={result.severity} />
            <ResultRow label="Percent of maximum" value={`${formatMoney(result.percentOfMax)}%`} />
            <ResultRow label="Items scored 2 or 3" value={`${result.highItems} of ${ITEMS.length}`} />
            <ResultRow label="At or above cutoff (10)" value={result.aboveCutoff ? 'Yes' : 'No'} />
          </ResultRows>
          <Hint>
            A total of 10 or more is the usual screening cutoff for further assessment. This tool only scores the
            questionnaire and is not a diagnosis.
          </Hint>
        </Panel>
      }
    />
  );
}

export default DepressionScoreCalculator;
