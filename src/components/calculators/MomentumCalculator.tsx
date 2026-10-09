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

export interface MomentumInput {
  mass: number;
  velocity: number;
}

export function computeMomentum(input: MomentumInput) {
  const p = input.mass * input.velocity;
  const ke = 0.5 * input.mass * input.velocity * input.velocity;
  return { p, ke };
}

export function MomentumCalculator() {
  const [mass, setMass] = useState('5');
  const [velocity, setVelocity] = useState('10');

  const result = useMemo(
    () =>
      computeMomentum({
        mass: Number(mass) || 0,
        velocity: Number(velocity) || 0,
      }),
    [mass, velocity]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Mass (kg)" value={mass} onChange={setMass} min={0} step="0.1" />
            <NumberField label="Velocity (m/s)" value={velocity} onChange={setVelocity} step="0.1" />
          </div>
          <Hint>
            Linear momentum is mass times velocity: p = m·v. It is conserved in isolated systems,
            which is why collisions and rocket thrust are analysed with momentum.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Momentum"
            value={`${formatMoney(result.p)} kg·m/s`}
          />
          <ResultRows>
            <ResultRow label="Kinetic energy" value={`${formatMoney(result.ke)} J`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MomentumCalculator;