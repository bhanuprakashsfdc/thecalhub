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

export interface LevelUpInput {
  baseXp: number;
  growth: number;
  currentLevel: number;
  targetLevel: number;
}

export function totalXpTo(baseXp: number, growth: number, level: number) {
  const target = Math.min(500, Math.max(0, Math.floor(level)));
  const g = 1 + growth / 100;
  let total = 0;
  for (let i = 0; i < target - 1; i += 1) {
    total += baseXp * Math.pow(g, i);
  }
  return total;
}

export function computeLevelUp(input: LevelUpInput) {
  const base = Math.max(0, input.baseXp);
  const growth = Math.max(-99, input.growth);
  const current = Math.max(0, Math.floor(input.currentLevel));
  const target = Math.max(0, Math.floor(input.targetLevel));

  const toCurrent = totalXpTo(base, growth, current);
  const toTarget = totalXpTo(base, growth, target);
  const remaining = Math.max(0, toTarget - toCurrent);
  const nextLevelCost = base * Math.pow(1 + growth / 100, Math.max(0, current - 1));

  return { toCurrent, toTarget, remaining, nextLevelCost, levels: Math.max(0, target - current) };
}

export function LevelUpCalculator() {
  const [baseXp, setBaseXp] = useState('100');
  const [growth, setGrowth] = useState('15');
  const [currentLevel, setCurrentLevel] = useState('10');
  const [targetLevel, setTargetLevel] = useState('20');

  const result = computeLevelUp({
    baseXp: Number(baseXp) || 0,
    growth: Number(growth) || 0,
    currentLevel: Number(currentLevel) || 0,
    targetLevel: Number(targetLevel) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="XP for level 2" value={baseXp} onChange={setBaseXp} min={0} />
            <NumberField label="XP growth per level (%)" value={growth} onChange={setGrowth} step="0.5" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Current level" value={currentLevel} onChange={setCurrentLevel} min={0} />
              <NumberField label="Target level" value={targetLevel} onChange={setTargetLevel} min={0} />
            </div>
          </div>
          <Hint>
            Each level costs more than the last: level n costs base XP × (1 + growth)ⁿ⁻¹. The calculator sums
            every step between your current and target level.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="XP needed"
            value={formatMoney(result.remaining)}
            sub={`${result.levels} level(s) from ${currentLevel || 0} to ${targetLevel || 0}`}
          />
          <ResultRows>
            <ResultRow label="XP for next level" value={formatMoney(result.nextLevelCost)} />
            <ResultRow label="Total XP at target" value={formatMoney(result.toTarget)} />
            <ResultRow label="Total XP earned so far" value={formatMoney(result.toCurrent)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default LevelUpCalculator;
