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

export interface ArmorInput {
  armor: number;
  incomingDamage: number;
}

export function computeArmor(input: ArmorInput) {
  const armor = Math.max(-99, input.armor);
  const incoming = Math.max(0, input.incomingDamage);

  const factor = 100 / (100 + armor);
  const damageTaken = incoming * factor;
  const damageReduced = incoming - damageTaken;
  const reductionPct = incoming > 0 ? (damageReduced / incoming) * 100 : 0;
  const ehpMultiplier = 1 + armor / 100;

  return { factor, damageTaken, damageReduced, reductionPct, ehpMultiplier };
}

export function ArmorCalculator() {
  const [armor, setArmor] = useState('80');
  const [incomingDamage, setIncomingDamage] = useState('1000');

  const result = computeArmor({
    armor: Number(armor) || 0,
    incomingDamage: Number(incomingDamage) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Armor" value={armor} onChange={setArmor} step="1" />
            <NumberField label="Incoming physical damage" value={incomingDamage} onChange={setIncomingDamage} min={0} />
          </div>
          <Hint>
            Physical mitigation follows damage taken = 100 ÷ (100 + armor). Each point of armor adds one percent
            of your base health as extra physical effective HP.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Damage after armor"
            value={formatMoney(result.damageTaken)}
            sub={`From ${incomingDamage || 0} incoming physical damage`}
          />
          <ResultRows>
            <ResultRow label="Damage reduced" value={formatMoney(result.damageReduced)} />
            <ResultRow label="Damage reduction" value={`${formatMoney(result.reductionPct)}%`} />
            <ResultRow label="Effective HP multiplier" value={`${formatMoney(result.ehpMultiplier)}×`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ArmorCalculator;
