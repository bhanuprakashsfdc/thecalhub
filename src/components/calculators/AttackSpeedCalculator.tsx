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

export interface AttackSpeedInput {
  baseAttackTime: number;
  attackSpeedBonus: number;
}

export function computeAttackSpeed(input: AttackSpeedInput) {
  const base = Math.max(0, input.baseAttackTime);
  const bonus = Math.max(-99, input.attackSpeedBonus);

  const interval = base / (1 + bonus / 100);
  const perSecond = interval > 0 ? 1 / interval : 0;
  const perMinute = perSecond * 60;
  const perTen = perSecond * 10;

  return { interval, perSecond, perMinute, perTen };
}

export function AttackSpeedCalculator() {
  const [baseAttackTime, setBaseAttackTime] = useState('1.8');
  const [attackSpeedBonus, setAttackSpeedBonus] = useState('35');

  const result = computeAttackSpeed({
    baseAttackTime: Number(baseAttackTime) || 0,
    attackSpeedBonus: Number(attackSpeedBonus) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Base attack time (seconds)" value={baseAttackTime} onChange={setBaseAttackTime} min={0} step="0.05" />
            <NumberField label="Attack speed bonus (%)" value={attackSpeedBonus} onChange={setAttackSpeedBonus} step="1" />
          </div>
          <Hint>
            Attack speed bonus divides the base swing time: interval = base ÷ (1 + bonus ÷ 100). Bonus attack
            speed stacks multiplicatively with haste effects in most games.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Attacks per second"
            value={formatMoney(result.perSecond)}
            sub={`Swing every ${formatMoney(result.interval)} seconds`}
          />
          <ResultRows>
            <ResultRow label="Attack interval" value={`${formatMoney(result.interval)} s`} />
            <ResultRow label="Attacks per 10 seconds" value={formatMoney(result.perTen)} />
            <ResultRow label="Attacks per minute" value={formatMoney(result.perMinute)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AttackSpeedCalculator;
