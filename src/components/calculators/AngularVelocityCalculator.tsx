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

export interface AngularVelocityInput {
  rpm: number;
  radius: number;
  mass: number;
}

export function computeAngularVelocity(input: AngularVelocityInput) {
  const omega = (input.rpm * 2 * Math.PI) / 60;
  const tangential = omega * input.radius;
  const centripetal = (tangential * tangential) / (input.radius || 1);
  const moment = input.mass * input.radius * input.radius;
  const ke = 0.5 * moment * omega * omega;
  return { omega, tangential, centripetal, moment, ke };
}

export function AngularVelocityCalculator() {
  const [rpm, setRpm] = useState('3600');
  const [radius, setRadius] = useState('0.5');
  const [mass, setMass] = useState('2');

  const result = useMemo(
    () =>
      computeAngularVelocity({
        rpm: Number(rpm) || 0,
        radius: Number(radius) || 0,
        mass: Number(mass) || 0,
      }),
    [rpm, radius, mass]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Rotational speed (rpm)" value={rpm} onChange={setRpm} min={0} step="10" />
            <NumberField label="Radius (m)" value={radius} onChange={setRadius} min={0} step="0.1" />
            <NumberField label="Mass (kg)" value={mass} onChange={setMass} min={0} step="0.1" />
          </div>
          <Hint>
            ω = rpm × 2π ÷ 60 gives angular velocity in rad/s. Tangential speed is ωr, centripetal
            acceleration is v²/r, and rotational kinetic energy is ½Iω².
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Angular velocity"
            value={`${formatMoney(result.omega)} rad/s`}
            sub={`Tangential ${formatMoney(result.tangential)} m/s`}
          />
          <ResultRows>
            <ResultRow label="Tangential speed" value={`${formatMoney(result.tangential)} m/s`} />
            <ResultRow label="Centripetal acceleration" value={`${formatMoney(result.centripetal)} m/s²`} />
            <ResultRow label="Moment of inertia" value={`${formatMoney(result.moment)} kg·m²`} />
            <ResultRow label="Rotational KE" value={`${formatMoney(result.ke)} J`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AngularVelocityCalculator;