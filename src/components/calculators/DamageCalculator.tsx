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

export interface DamageInput {
  baseDamage: number;
  attackPower: number;
  scaling: number;
  bonusDamage: number;
  enemyReduction: number;
}

export function computeDamage(input: DamageInput) {
  const base = Math.max(0, input.baseDamage);
  const ap = Math.max(0, input.attackPower);
  const scaling = Math.max(0, input.scaling);
  const bonus = Math.max(-99, input.bonusDamage);
  const reduction = Math.min(100, Math.max(0, input.enemyReduction));

  const scalingContribution = (ap * scaling) / 100;
  const raw = (base + scalingContribution) * (1 + bonus / 100);
  const final = raw * (1 - reduction / 100);
  const mitigated = raw - final;

  return { scalingContribution, raw, final, mitigated };
}

export function DamageCalculator() {
  const [baseDamage, setBaseDamage] = useState('150');
  const [attackPower, setAttackPower] = useState('200');
  const [scaling, setScaling] = useState('60');
  const [bonusDamage, setBonusDamage] = useState('10');
  const [enemyReduction, setEnemyReduction] = useState('30');

  const result = computeDamage({
    baseDamage: Number(baseDamage) || 0,
    attackPower: Number(attackPower) || 0,
    scaling: Number(scaling) || 0,
    bonusDamage: Number(bonusDamage) || 0,
    enemyReduction: Number(enemyReduction) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Base damage" value={baseDamage} onChange={setBaseDamage} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Attack power" value={attackPower} onChange={setAttackPower} min={0} />
              <NumberField label="Scaling (%)" value={scaling} onChange={setScaling} min={0} />
            </div>
            <NumberField label="Bonus damage (%)" value={bonusDamage} onChange={setBonusDamage} step="0.5" />
            <NumberField label="Enemy reduction (%)" value={enemyReduction} onChange={setEnemyReduction} min={0} max={100} />
          </div>
          <Hint>
            Damage = (base + attack power × scaling) × (1 + bonus) then reduced by the target's mitigation.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Final damage"
            value={formatMoney(result.final)}
            sub={`After ${enemyReduction || 0}% enemy reduction`}
          />
          <ResultRows>
            <ResultRow label="Raw damage before mitigation" value={formatMoney(result.raw)} />
            <ResultRow label="Mitigated damage" value={formatMoney(result.mitigated)} />
            <ResultRow label="Scaling contribution" value={formatMoney(result.scalingContribution)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DamageCalculator;
