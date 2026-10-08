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

export interface StoppingDistanceInput {
  speed: number;
  reactionTime: number;
  friction: number;
  grade: number;
}

export function computeStoppingDistance(input: StoppingDistanceInput) {
  const reaction = 0.278 * input.speed * input.reactionTime;
  const denominator = 254 * (input.friction + input.grade / 100);
  const braking = denominator > 0 ? (input.speed * input.speed) / denominator : 0;
  const total = reaction + braking;
  const metresPerSecond = input.speed / 3.6;
  return { reaction, braking, total, metresPerSecond };
}

export function StoppingDistanceCalculator() {
  const [speed, setSpeed] = useState('100');
  const [reactionTime, setReactionTime] = useState('2.5');
  const [friction, setFriction] = useState('0.7');
  const [grade, setGrade] = useState('0');

  const result = computeStoppingDistance({
    speed: Number(speed) || 0,
    reactionTime: Number(reactionTime) || 0,
    friction: Number(friction) || 0,
    grade: Number(grade) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Speed (km/h)" value={speed} onChange={setSpeed} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Reaction time (s)"
                value={reactionTime}
                onChange={setReactionTime}
                min={0}
                step="0.1"
              />
              <NumberField
                label="Friction factor"
                value={friction}
                onChange={setFriction}
                min={0}
                step="0.05"
              />
            </div>
            <NumberField
              label="Road grade (%)"
              value={grade}
              onChange={setGrade}
              step="0.5"
              hint="Negative values model a downhill"
            />
          </div>
          <Hint>
            Total stopping distance is perception-reaction distance plus braking distance; wet asphalt roughly
            halves the friction factor used here.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Stopping distance"
            value={`${formatMoney(result.total)} m`}
            sub={`${formatMoney(result.metresPerSecond)} m/s at ${formatMoney(Number(speed) || 0)} km/h`
            }
          />
          <ResultRows>
            <ResultRow label="Reaction distance (m)" value={formatMoney(result.reaction)} />
            <ResultRow label="Braking distance (m)" value={formatMoney(result.braking)} />
            <ResultRow label="Speed (m/s)" value={formatMoney(result.metresPerSecond)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StoppingDistanceCalculator;
