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

export interface HealInput {
  baseHeal: number;
  bonusHeal: number;
  critChance: number;
  critMultiplier: number;
  castTime: number;
}

export function computeHeal(input: HealInput) {
  const base = Math.max(0, input.baseHeal);
  const bonus = Math.max(-99, input.bonusHeal);
  const critChance = Math.min(100, Math.max(0, input.critChance));
  const critMult = Math.max(0, input.critMultiplier);
  const cast = Math.max(0, input.castTime);

  const healWithBonus = base * (1 + bonus / 100);
  const critHeal = healWithBonus * (critMult / 100);
  const expected = healWithBonus + (critChance / 100) * (critHeal - healWithBonus);
  const hps = cast > 0 ? expected / cast : 0;

  return { healWithBonus, critHeal, expected, hps };
}

export function HealCalculator() {
  const [baseHeal, setBaseHeal] = useState('800');
  const [bonusHeal, setBonusHeal] = useState('25');
  const [critChance, setCritChance] = useState('20');
  const [critMultiplier, setCritMultiplier] = useState('150');
  const [castTime, setCastTime] = useState('1.5');

  const result = computeHeal({
    baseHeal: Number(baseHeal) || 0,
    bonusHeal: Number(bonusHeal) || 0,
    critChance: Number(critChance) || 0,
    critMultiplier: Number(critMultiplier) || 0,
    castTime: Number(castTime) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Base heal" value={baseHeal} onChange={setBaseHeal} min={0} />
            <NumberField label="Bonus heal (%)" value={bonusHeal} onChange={setBonusHeal} step="0.5" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Crit heal chance (%)" value={critChance} onChange={setCritChance} min={0} max={100} />
              <NumberField label="Crit heal multiplier (%)" value={critMultiplier} onChange={setCritMultiplier} min={0} />
            </div>
            <NumberField label="Cast time (seconds)" value={castTime} onChange={setCastTime} min={0} step="0.1" />
          </div>
          <Hint>
            Expected healing averages the normal and critical outcomes by crit chance, then divides by cast time
            for healing per second.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Expected heal"
            value={formatMoney(result.expected)}
            sub={`${formatMoney(result.hps)} healing per second`}
          />
          <ResultRows>
            <ResultRow label="Heal before crit" value={formatMoney(result.healWithBonus)} />
            <ResultRow label="Heal on crit" value={formatMoney(result.critHeal)} />
            <ResultRow label="Healing per second" value={formatMoney(result.hps)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HealCalculator;
