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

export interface MagicResistanceInput {
  resistance: number;
  incomingDamage: number;
}

export function computeMagicResistance(input: MagicResistanceInput) {
  const resistance = Math.max(-99, input.resistance);
  const incoming = Math.max(0, input.incomingDamage);

  const factor = 100 / (100 + resistance);
  const damageTaken = incoming * factor;
  const damageReduced = incoming - damageTaken;
  const reductionPct = incoming > 0 ? (damageReduced / incoming) * 100 : 0;
  const ehpMultiplier = 1 + resistance / 100;

  return { factor, damageTaken, damageReduced, reductionPct, ehpMultiplier };
}

export function MagicResistanceCalculator() {
  const [resistance, setResistance] = useState('40');
  const [incomingDamage, setIncomingDamage] = useState('500');

  const result = computeMagicResistance({
    resistance: Number(resistance) || 0,
    incomingDamage: Number(incomingDamage) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Magic resistance (%)" value={resistance} onChange={setResistance} step="1" />
            <NumberField label="Incoming magic damage" value={incomingDamage} onChange={setIncomingDamage} min={0} />
          </div>
          <Hint>
            Magic resistance uses the diminishing formula: damage taken = 100 ÷ (100 + resistance). Forty
            resistance means you take about 71% of the spell's damage.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Damage taken"
            value={formatMoney(result.damageTaken)}
            sub={`From ${incomingDamage || 0} incoming magic damage`}
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

export default MagicResistanceCalculator;
