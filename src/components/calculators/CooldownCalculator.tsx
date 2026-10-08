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

export interface CooldownInput {
  baseCooldown: number;
  cooldownReduction: number;
  rotationLength: number;
}

export function computeCooldown(input: CooldownInput) {
  const base = Math.max(0, input.baseCooldown);
  const cdr = Math.min(100, Math.max(0, input.cooldownReduction));
  const rotation = Math.max(0, input.rotationLength);

  const effective = base * (1 - cdr / 100);
  const saved = base - effective;
  const casts = effective > 0 ? Math.floor(rotation / effective) + 1 : 0;
  const perMinute = effective > 0 ? 60 / effective : 0;

  return { effective, saved, casts, perMinute };
}

export function CooldownCalculator() {
  const [baseCooldown, setBaseCooldown] = useState('45');
  const [cooldownReduction, setCooldownReduction] = useState('20');
  const [rotationLength, setRotationLength] = useState('120');

  const result = computeCooldown({
    baseCooldown: Number(baseCooldown) || 0,
    cooldownReduction: Number(cooldownReduction) || 0,
    rotationLength: Number(rotationLength) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Base cooldown (seconds)" value={baseCooldown} onChange={setBaseCooldown} min={0} step="0.1" />
            <NumberField label="Cooldown reduction (%)" value={cooldownReduction} onChange={setCooldownReduction} min={0} max={100} />
            <NumberField label="Rotation length (seconds)" value={rotationLength} onChange={setRotationLength} min={0} />
          </div>
          <Hint>
            Cooldown reduction shortens the wait between casts. The cast count counts the opening use plus every
            recast that fits inside your rotation window.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Effective cooldown"
            value={`${formatMoney(result.effective)} s`}
            sub={`${formatMoney(result.saved)} s faster than the base cooldown`}
          />
          <ResultRows>
            <ResultRow label="Cooldown saved" value={`${formatMoney(result.saved)} s`} />
            <ResultRow label="Casts in rotation" value={formatMoney(result.casts)} />
            <ResultRow label="Casts per minute" value={formatMoney(result.perMinute)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CooldownCalculator;
