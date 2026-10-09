import { useState, useMemo } from 'react';
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

export interface TestScoreInput {
  correct: number;
  total: number;
  wrongPenalty: number;
}

export function computeTestScore(input: TestScoreInput) {
  const raw = input.correct - input.wrongPenalty * (input.total - input.correct);
  const percent = (raw / (input.total || 1)) * 100;
  const scaled = (raw / (input.total || 1)) * 100;
  return { raw, percent, scaled };
}

export function TestScoreCalculator() {
  const [correct, setCorrect] = useState('18');
  const [total, setTotal] = useState('20');
  const [wrongPenalty, setWrongPenalty] = useState('0.25');

  const result = useMemo(
    () =>
      computeTestScore({
        correct: Number(correct) || 0,
        total: Number(total) || 0,
        wrongPenalty: Number(wrongPenalty) || 0,
      }),
    [correct, total, wrongPenalty]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Correct answers" value={correct} onChange={setCorrect} min={0} step="1" />
            <NumberField label="Total questions" value={total} onChange={setTotal} min={1} step="1" />
            <NumberField label="Wrong penalty" value={wrongPenalty} onChange={setWrongPenalty} min={0} step="0.05" />
          </div>
          <Hint>
            With a guessing penalty, each wrong answer reduces your raw score by the penalty
            amount. Raw score = correct − penalty × wrong. Percentage = raw ÷ total × 100.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Scaled score"
            value={`${formatMoney(result.scaled)}%`}
            sub={`Raw ${formatMoney(result.raw)}`}
          />
          <ResultRows>
            <ResultRow label="Raw score" value={formatMoney(result.raw)} />
            <ResultRow label="Percent correct" value={`${formatMoney(result.percent)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TestScoreCalculator;