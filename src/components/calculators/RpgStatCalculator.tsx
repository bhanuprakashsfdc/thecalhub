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

export interface RpgStatInput {
  baseStat: number;
  statPoints: number;
  growthPerLevel: number;
  level: number;
}

export function computeRpgStat(input: RpgStatInput) {
  const base = Math.max(0, input.baseStat);
  const points = Math.max(0, input.statPoints);
  const growth = Math.max(-99, input.growthPerLevel);
  const level = Math.max(0, Math.floor(input.level));

  const leveled = base * Math.pow(1 + growth / 100, level);
  const pointBonus = (leveled * points) / 100;
  const effective = leveled + pointBonus;

  return { leveled, pointBonus, effective, growthFromBase: base > 0 ? (effective / base - 1) * 100 : 0 };
}

export function RpgStatCalculator() {
  const [baseStat, setBaseStat] = useState('10');
  const [statPoints, setStatPoints] = useState('20');
  const [growthPerLevel, setGrowthPerLevel] = useState('4');
  const [level, setLevel] = useState('15');

  const result = computeRpgStat({
    baseStat: Number(baseStat) || 0,
    statPoints: Number(statPoints) || 0,
    growthPerLevel: Number(growthPerLevel) || 0,
    level: Number(level) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Base stat" value={baseStat} onChange={setBaseStat} min={0} />
            <NumberField label="Stat points invested (%)" value={statPoints} onChange={setStatPoints} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Growth per level (%)" value={growthPerLevel} onChange={setGrowthPerLevel} step="0.5" />
              <NumberField label="Character level" value={level} onChange={setLevel} min={0} />
            </div>
          </div>
          <Hint>
            The stat grows multiplicatively each level, then invested points add a percentage bonus on top of
            the levelled value.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Effective stat"
            value={formatMoney(result.effective)}
            sub={`At level ${level || 0} with ${statPoints || 0}% invested points`}
          />
          <ResultRows>
            <ResultRow label="Stat from levels" value={formatMoney(result.leveled)} />
            <ResultRow label="Stat point bonus" value={formatMoney(result.pointBonus)} />
            <ResultRow label="Growth from base" value={`${formatMoney(result.growthFromBase)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RpgStatCalculator;
