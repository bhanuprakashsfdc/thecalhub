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

export interface SightDistanceInput {
  speed: number;
  reactionTime: number;
  friction: number;
  available: number;
}

export function computeSightDistance(input: SightDistanceInput) {
  const reaction = 0.278 * input.speed * input.reactionTime;
  const braking = input.friction > 0 ? (input.speed * input.speed) / (254 * input.friction) : 0;
  const required = reaction + braking;
  const margin = input.available - required;
  const adequate = margin >= 0 ? 1 : 0;
  return { reaction, braking, required, margin, adequate };
}

export function SightDistanceCalculator() {
  const [speed, setSpeed] = useState('80');
  const [reactionTime, setReactionTime] = useState('2.5');
  const [friction, setFriction] = useState('0.6');
  const [available, setAvailable] = useState('120');

  const result = computeSightDistance({
    speed: Number(speed) || 0,
    reactionTime: Number(reactionTime) || 0,
    friction: Number(friction) || 0,
    available: Number(available) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Design speed (km/h)" value={speed} onChange={setSpeed} min={0} />
              <NumberField
                label="Reaction time (s)"
                value={reactionTime}
                onChange={setReactionTime}
                min={0}
                step="0.1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Friction factor"
                value={friction}
                onChange={setFriction}
                min={0}
                step="0.05"
              />
              <NumberField
                label="Available sight distance (m)"
                value={available}
                onChange={setAvailable}
                min={0}
              />
            </div>
          </div>
          <Hint>
            Sight distance must cover the distance travelled during reaction plus braking; compare it with what
            the horizontal or vertical alignment actually reveals.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Required sight distance"
            value={`${formatMoney(result.required)} m`}
            sub={result.adequate === 1 ? 'Adequate for the design speed' : 'Shortfall — improve alignment'}
          />
          <ResultRows>
            <ResultRow label="Sight distance on offer (m)" value={formatMoney(Number(available) || 0)} />
            <ResultRow label="Margin (m)" value={formatMoney(result.margin)} />
            <ResultRow label="Adequate (1 = yes)" value={formatMoney(result.adequate)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SightDistanceCalculator;
