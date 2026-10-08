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

export interface DpsInput {
  damagePerHit: number;
  attacksPerSecond: number;
}

export function computeDps(input: DpsInput) {
  const damage = Math.max(0, input.damagePerHit);
  const speed = Math.max(0, input.attacksPerSecond);

  const dps = damage * speed;
  const perMinute = dps * 60;
  const hitsPerMinute = speed * 60;
  const perTen = dps * 10;

  return { dps, perMinute, hitsPerMinute, perTen };
}

export function DpsCalculator() {
  const [damagePerHit, setDamagePerHit] = useState('240');
  const [attacksPerSecond, setAttacksPerSecond] = useState('1.6');

  const result = computeDps({
    damagePerHit: Number(damagePerHit) || 0,
    attacksPerSecond: Number(attacksPerSecond) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Damage per hit" value={damagePerHit} onChange={setDamagePerHit} min={0} />
            <NumberField label="Attacks per second" value={attacksPerSecond} onChange={setAttacksPerSecond} min={0} step="0.05" />
          </div>
          <Hint>
            Sustained DPS is simply damage per hit times attacks per second — before crits, procs or downtime
            are factored in.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Damage per second"
            value={formatMoney(result.dps)}
            sub={`${formatMoney(Number(attacksPerSecond) || 0)} attacks per second`}
          />
          <ResultRows>
            <ResultRow label="Damage per minute" value={formatMoney(result.perMinute)} />
            <ResultRow label="Hits per minute" value={formatMoney(result.hitsPerMinute)} />
            <ResultRow label="Damage per 10 seconds" value={formatMoney(result.perTen)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DpsCalculator;
