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

export interface FitnessLevelInput {
  pushUps: number;
  restingHr: number;
  age: number;
}

export function computeFitnessLevel(input: FitnessLevelInput) {
  const strengthScore = Math.min(100, input.pushUps * 2.5);
  const cardioScore = Math.min(
    100,
    Math.max(0, (75 - input.restingHr) * 2.5)
  );
  const score = (strengthScore + cardioScore) / 2;
  const level =
    score >= 70 ? 'Advanced' : score >= 40 ? 'Intermediate' : 'Beginner';
  return { strengthScore, cardioScore, score, level };
}

export function FitnessLevelCalculator() {
  const [pushUps, setPushUps] = useState('25');
  const [restingHr, setRestingHr] = useState('65');
  const [age, setAge] = useState('30');

  const result = computeFitnessLevel({
    pushUps: Number(pushUps) || 0,
    restingHr: Number(restingHr) || 0,
    age: Number(age) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Push-ups in one minute" value={pushUps} onChange={setPushUps} min={0} step="1" />
            <NumberField label="Resting heart rate (bpm)" value={restingHr} onChange={setRestingHr} min={0} step="1" />
            <NumberField label="Age" value={age} onChange={setAge} min={0} step="1" />
          </div>
          <Hint>
            Composite of a strength measure (push-ups per
            minute) and a cardio measure (resting heart rate), each scored
            out of 100.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Fitness score"
            value={`${formatMoney(result.score)}/100`}
            sub={result.level}
          />
          <ResultRows>
            <ResultRow label="Strength score" value={formatMoney(result.strengthScore)} />
            <ResultRow label="Cardio score" value={formatMoney(result.cardioScore)} />
            <ResultRow label="Fitness level" value={result.level} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FitnessLevelCalculator;
