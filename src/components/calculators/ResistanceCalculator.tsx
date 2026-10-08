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

export interface ResistanceInput {
  targetReduction: number;
  incomingDamage: number;
}

export function computeResistance(input: ResistanceInput) {
  const target = Math.min(99.9, Math.max(0, input.targetReduction));
  const incoming = Math.max(0, input.incomingDamage);

  const required = 100 / (1 - target / 100) - 100;
  const damageTaken = incoming * (1 - target / 100);
  const damageAbsorbed = incoming - damageTaken;
  const ehpMultiplier = target >= 100 ? 0 : 1 / (1 - target / 100);

  return { required, damageTaken, damageAbsorbed, ehpMultiplier };
}

export function ResistanceCalculator() {
  const [targetReduction, setTargetReduction] = useState('40');
  const [incomingDamage, setIncomingDamage] = useState('800');

  const result = computeResistance({
    targetReduction: Number(targetReduction) || 0,
    incomingDamage: Number(incomingDamage) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Target damage reduction (%)" value={targetReduction} onChange={setTargetReduction} min={0} max={99} />
            <NumberField label="Incoming damage" value={incomingDamage} onChange={setIncomingDamage} min={0} />
          </div>
          <Hint>
            Work backwards from the mitigation you want: resistance = 100 ÷ (1 − reduction) − 100. Reduction
            stacks with heavy diminishing returns past 70%.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Required resistance"
            value={formatMoney(result.required)}
            sub={`To reach ${targetReduction || 0}% damage reduction`}
          />
          <ResultRows>
            <ResultRow label="Damage after reduction" value={formatMoney(result.damageTaken)} />
            <ResultRow label="Damage absorbed" value={formatMoney(result.damageAbsorbed)} />
            <ResultRow label="Effective HP multiplier" value={`${formatMoney(result.ehpMultiplier)}×`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ResistanceCalculator;
