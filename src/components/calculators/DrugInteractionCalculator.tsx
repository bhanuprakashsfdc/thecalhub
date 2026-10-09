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

export interface DrugInteractionInput {
  doseA: number;
  doseB: number;
  effectiveA: number;
  effectiveB: number;
}

export interface DrugInteractionResult {
  fractionA: number;
  fractionB: number;
  combinationIndex: number;
  effectPercent: number;
  classification: string;
  dominant: string;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

export function computeDrugInteraction(input: DrugInteractionInput): DrugInteractionResult {
  const doseA = positive(input.doseA);
  const doseB = positive(input.doseB);
  const effectiveA = positive(input.effectiveA);
  const effectiveB = positive(input.effectiveB);

  const fractionA = effectiveA > 0 ? doseA / effectiveA : 0;
  const fractionB = effectiveB > 0 ? doseB / effectiveB : 0;
  const combinationIndex = Number.isFinite(fractionA + fractionB) ? fractionA + fractionB : 0;
  const effectPercent = combinationIndex * 100;

  let classification = 'Additive';
  if (combinationIndex < 0.9) classification = 'Synergy';
  else if (combinationIndex > 1.1) classification = 'Antagonism';

  return {
    fractionA: Number.isFinite(fractionA) ? fractionA : 0,
    fractionB: Number.isFinite(fractionB) ? fractionB : 0,
    combinationIndex,
    effectPercent: Number.isFinite(effectPercent) ? effectPercent : 0,
    classification,
    dominant: fractionA >= fractionB ? 'Drug A' : 'Drug B',
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export function DrugInteractionCalculator() {
  const [doseA, setDoseA] = useState('50');
  const [doseB, setDoseB] = useState('45');
  const [effectiveA, setEffectiveA] = useState('100');
  const [effectiveB, setEffectiveB] = useState('150');

  const result = computeDrugInteraction({
    doseA: toNumber(doseA),
    doseB: toNumber(doseB),
    effectiveA: toNumber(effectiveA),
    effectiveB: toNumber(effectiveB),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Drug A dose (mg)" value={doseA} onChange={setDoseA} min={0} />
              <NumberField label="Drug B dose (mg)" value={doseB} onChange={setDoseB} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Effective dose of A alone (mg)"
                value={effectiveA}
                onChange={setEffectiveA}
                min={0}
              />
              <NumberField
                label="Effective dose of B alone (mg)"
                value={effectiveB}
                onChange={setEffectiveB}
                min={0}
              />
            </div>
          </div>
          <Hint>
            The combination index sums each drug's fraction of the dose that works on its own: CI = doseA ÷
            effectiveA + doseB ÷ effectiveB. Below 0.9 the pair is synergistic, 0.9 to 1.1 is additive and above
            1.1 is antagonistic.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Combination index"
            value={formatMoney(result.combinationIndex, 2)}
            sub={`${result.classification} • strongest contribution from ${result.dominant}`}
          />
          <ResultRows>
            <ResultRow label="Fraction from drug A" value={`${formatMoney(result.fractionA, 3)} ×`} />
            <ResultRow label="Fraction from drug B" value={`${formatMoney(result.fractionB, 3)} ×`} />
            <ResultRow label="Classification" value={result.classification} />
            <ResultRow label="Effect vs single agent" value={`${formatMoney(result.effectPercent)}%`} />
          </ResultRows>
          <Hint>
            Effect versus a single agent is the index expressed as a percentage: 100% matches what one full
            effective dose would do, so 183% means the combination is far stronger than either drug alone.
          </Hint>
        </Panel>
      }
    />
  );
}

export default DrugInteractionCalculator;
