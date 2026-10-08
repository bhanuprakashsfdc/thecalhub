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

export interface DodgeInput {
  dodgeChance: number;
  attacks: number;
  damagePerAttack: number;
}

export function computeDodge(input: DodgeInput) {
  const chance = Math.min(100, Math.max(0, input.dodgeChance));
  const attacks = Math.max(0, input.attacks);
  const damage = Math.max(0, input.damagePerAttack);

  const dodged = (attacks * chance) / 100;
  const hitsTaken = attacks - dodged;
  const damageTaken = hitsTaken * damage;
  const damageAvoided = dodged * damage;
  const average = attacks > 0 ? damageTaken / attacks : 0;

  return { dodged, hitsTaken, damageTaken, damageAvoided, average };
}

export function DodgeCalculator() {
  const [dodgeChance, setDodgeChance] = useState('20');
  const [attacks, setAttacks] = useState('50');
  const [damagePerAttack, setDamagePerAttack] = useState('90');

  const result = computeDodge({
    dodgeChance: Number(dodgeChance) || 0,
    attacks: Number(attacks) || 0,
    damagePerAttack: Number(damagePerAttack) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Dodge chance (%)" value={dodgeChance} onChange={setDodgeChance} min={0} max={100} />
            <NumberField label="Incoming attacks" value={attacks} onChange={setAttacks} min={0} />
            <NumberField label="Damage per attack" value={damagePerAttack} onChange={setDamagePerAttack} min={0} />
          </div>
          <Hint>
            Dodge negates the hit completely. Over a long fight the damage you avoid is simply dodge chance
            times the raw incoming damage.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Expected damage taken"
            value={formatMoney(result.damageTaken)}
            sub={`${formatMoney(result.hitsTaken)} of ${attacks || 0} attacks land`}
          />
          <ResultRows>
            <ResultRow label="Attacks dodged" value={formatMoney(result.dodged)} />
            <ResultRow label="Damage avoided" value={formatMoney(result.damageAvoided)} />
            <ResultRow label="Average damage per attack" value={formatMoney(result.average)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DodgeCalculator;
