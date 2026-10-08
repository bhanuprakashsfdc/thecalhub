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

export interface ParryInput {
  parryChance: number;
  parryReduction: number;
  attacks: number;
  damagePerAttack: number;
}

export function computeParry(input: ParryInput) {
  const chance = Math.min(100, Math.max(0, input.parryChance));
  const reduction = Math.min(100, Math.max(0, input.parryReduction));
  const attacks = Math.max(0, input.attacks);
  const damage = Math.max(0, input.damagePerAttack);

  const parried = (attacks * chance) / 100;
  const hitsTaken = attacks - parried;
  const totalIncoming = attacks * damage;
  const damageTaken = parried * damage * (1 - reduction / 100) + hitsTaken * damage;
  const damageAvoided = totalIncoming - damageTaken;
  const average = attacks > 0 ? damageTaken / attacks : 0;

  return { parried, hitsTaken, damageTaken, damageAvoided, average, totalIncoming };
}

export function ParryCalculator() {
  const [parryChance, setParryChance] = useState('25');
  const [parryReduction, setParryReduction] = useState('50');
  const [attacks, setAttacks] = useState('40');
  const [damagePerAttack, setDamagePerAttack] = useState('120');

  const result = computeParry({
    parryChance: Number(parryChance) || 0,
    parryReduction: Number(parryReduction) || 0,
    attacks: Number(attacks) || 0,
    damagePerAttack: Number(damagePerAttack) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Parry chance (%)" value={parryChance} onChange={setParryChance} min={0} max={100} />
            <NumberField label="Parry damage reduction (%)" value={parryReduction} onChange={setParryReduction} min={0} max={100} />
            <NumberField label="Incoming attacks" value={attacks} onChange={setAttacks} min={0} />
            <NumberField label="Damage per attack" value={damagePerAttack} onChange={setDamagePerAttack} min={0} />
          </div>
          <Hint>
            Parrying blunts an incoming swing by your parry reduction, and the expected result averages that
            over your parry chance across the whole fight.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Expected damage taken"
            value={formatMoney(result.damageTaken)}
            sub={`Out of ${formatMoney(result.totalIncoming)} raw incoming damage`}
          />
          <ResultRows>
            <ResultRow label="Expected parries" value={formatMoney(result.parried)} />
            <ResultRow label="Damage avoided" value={formatMoney(result.damageAvoided)} />
            <ResultRow label="Average damage per attack" value={formatMoney(result.average)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ParryCalculator;
