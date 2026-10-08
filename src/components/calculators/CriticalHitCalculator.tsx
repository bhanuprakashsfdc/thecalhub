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

export interface CriticalHitInput {
  baseDamage: number;
  critChance: number;
  critMultiplier: number;
}

export function computeCriticalHit(input: CriticalHitInput) {
  const base = Math.max(0, input.baseDamage);
  const chance = Math.min(100, Math.max(0, input.critChance));
  const multiplier = Math.max(0, input.critMultiplier);

  const critDamage = base * (multiplier / 100);
  const average = base + (chance / 100) * (critDamage - base);
  const boost = base > 0 ? (average / base - 1) * 100 : 0;
  const critsPer100 = chance;

  return { critDamage, average, boost, critsPer100 };
}

export function CriticalHitCalculator() {
  const [baseDamage, setBaseDamage] = useState('100');
  const [critChance, setCritChance] = useState('25');
  const [critMultiplier, setCritMultiplier] = useState('200');

  const result = computeCriticalHit({
    baseDamage: Number(baseDamage) || 0,
    critChance: Number(critChance) || 0,
    critMultiplier: Number(critMultiplier) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Base damage" value={baseDamage} onChange={setBaseDamage} min={0} />
            <NumberField label="Crit chance (%)" value={critChance} onChange={setCritChance} min={0} max={100} />
            <NumberField label="Crit multiplier (%)" value={critMultiplier} onChange={setCritMultiplier} min={0} />
          </div>
          <Hint>
            Average damage = base × (1 + crit chance × (crit multiplier ÷ 100 − 1)). A 200% multiplier doubles
            the hit when it fires.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Average damage per hit"
            value={formatMoney(result.average)}
            sub={`${critChance || 0}% chance to deal ${formatMoney(result.critDamage)}`}
          />
          <ResultRows>
            <ResultRow label="Critical hit damage" value={formatMoney(result.critDamage)} />
            <ResultRow label="Expected damage boost" value={`${formatMoney(result.boost)}%`} />
            <ResultRow label="Expected crits per 100 hits" value={formatMoney(result.critsPer100)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CriticalHitCalculator;
