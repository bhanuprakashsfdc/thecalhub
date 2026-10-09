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
  safeDiv,
} from './kit';

const FPM_PER_MS = 196.85;

export interface ClimbRateInput {
  thrust: number;
  drag: number;
  weight: number;
  speed: number;
}

export function computeClimbRate(input: ClimbRateInput) {
  const excessPower = Math.max(0, input.thrust - input.drag);
  const climbRateMs = safeDiv(excessPower * input.speed, input.weight);
  const climbRateFpm = climbRateMs * FPM_PER_MS;
  const climbAngle = (Math.asin(Math.min(1, safeDiv(climbRateMs, input.speed))) * 180) / Math.PI;
  return { climbRateMs, climbRateFpm, climbAngle, excessPower };
}

export function ClimbRateCalculator() {
  const [thrust, setThrust] = useState('50000');
  const [drag, setDrag] = useState('20000');
  const [weight, setWeight] = useState('70000');
  const [speed, setSpeed] = useState('80');

  const result = useMemo(
    () =>
      computeClimbRate({
        thrust: Number(thrust) || 0,
        drag: Number(drag) || 0,
        weight: Number(weight) || 0,
        speed: Number(speed) || 0,
      }),
    [thrust, drag, weight, speed]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Thrust (N)" value={thrust} onChange={setThrust} min={0} step="100" />
            <NumberField label="Drag (N)" value={drag} onChange={setDrag} min={0} step="100" />
            <NumberField label="Weight (N)" value={weight} onChange={setWeight} min={0} step="100" />
            <NumberField label="True airspeed (m/s)" value={speed} onChange={setSpeed} min={0} step="1" />
          </div>
          <Hint>
            Rate of climb = (Thrust − Drag) × Speed ÷ Weight. Excess thrust becomes excess power, which
            is converted into potential energy — altitude gain per unit time.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Rate of climb"
            value={`${formatMoney(result.climbRateMs)} m/s`}
            sub={`${formatMoney(result.climbRateFpm)} ft/min`}
          />
          <ResultRows>
            <ResultRow label="Climb angle" value={`${formatMoney(result.climbAngle)}°`} />
            <ResultRow label="Excess thrust" value={`${formatMoney(result.excessPower)} N`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ClimbRateCalculator;