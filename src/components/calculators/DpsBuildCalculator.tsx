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

export interface DpsBuildInput {
  damageA: number;
  speedA: number;
  critChanceA: number;
  critMultA: number;
  damageB: number;
  speedB: number;
  critChanceB: number;
  critMultB: number;
}

export function computeBuildDps(damage: number, speed: number, critChance: number, critMult: number) {
  const critBonus = (critChance / 100) * (critMult / 100 - 1);
  return damage * speed * (1 + critBonus);
}

export function computeDpsBuild(input: DpsBuildInput) {
  const dpsA = computeBuildDps(input.damageA, input.speedA, input.critChanceA, input.critMultA);
  const dpsB = computeBuildDps(input.damageB, input.speedB, input.critChanceB, input.critMultB);
  const gain = dpsB - dpsA;
  const pct = dpsA !== 0 ? (gain / dpsA) * 100 : 0;

  return { dpsA, dpsB, gain, pct };
}

export function DpsBuildCalculator() {
  const [damageA, setDamageA] = useState('120');
  const [speedA, setSpeedA] = useState('1.5');
  const [critChanceA, setCritChanceA] = useState('25');
  const [critMultA, setCritMultA] = useState('150');
  const [damageB, setDamageB] = useState('100');
  const [speedB, setSpeedB] = useState('1.8');
  const [critChanceB, setCritChanceB] = useState('40');
  const [critMultB, setCritMultB] = useState('180');

  const result = computeDpsBuild({
    damageA: Number(damageA) || 0,
    speedA: Number(speedA) || 0,
    critChanceA: Number(critChanceA) || 0,
    critMultA: Number(critMultA) || 0,
    damageB: Number(damageB) || 0,
    speedB: Number(speedB) || 0,
    critChanceB: Number(critChanceB) || 0,
    critMultB: Number(critMultB) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Build A</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Damage per hit (A)" value={damageA} onChange={setDamageA} min={0} />
              <NumberField label="Attacks per second (A)" value={speedA} onChange={setSpeedA} min={0} step="0.01" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Crit chance % (A)" value={critChanceA} onChange={setCritChanceA} min={0} max={100} />
              <NumberField label="Crit multiplier % (A)" value={critMultA} onChange={setCritMultA} min={0} />
            </div>
          </div>
          <PanelEyebrow>Build B</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Damage per hit (B)" value={damageB} onChange={setDamageB} min={0} />
              <NumberField label="Attacks per second (B)" value={speedB} onChange={setSpeedB} min={0} step="0.01" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Crit chance % (B)" value={critChanceB} onChange={setCritChanceB} min={0} max={100} />
              <NumberField label="Crit multiplier % (B)" value={critMultB} onChange={setCritMultB} min={0} />
            </div>
          </div>
          <Hint>
            Compare two loadouts side by side. DPS = damage × attacks per second × (1 + crit chance × (crit
            multiplier − 1)).
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="DPS gain of build B"
            value={`${formatMoney(result.pct)}%`}
            sub={`Build A ${formatMoney(result.dpsA)} DPS vs build B ${formatMoney(result.dpsB)} DPS`}
          />
          <ResultRows>
            <ResultRow label="Build A DPS" value={formatMoney(result.dpsA)} />
            <ResultRow label="Build B DPS" value={formatMoney(result.dpsB)} />
            <ResultRow label="Absolute DPS difference" value={formatMoney(result.gain)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DpsBuildCalculator;
