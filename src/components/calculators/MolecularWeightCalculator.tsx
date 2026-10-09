import { useState, useMemo } from 'react';
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

export interface MolecularWeightInput {
  formula: string;
  molarMass: number;
}

const ATOMIC_MASSES: Record<string, number> = {
  H: 1.008, He: 4.003, Li: 6.94, Be: 9.012, B: 10.81, C: 12.011, N: 14.007, O: 15.999,
  F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06,
  Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078, Fe: 55.845, Cu: 63.546, Zn: 65.38,
  Br: 79.904, Ag: 107.868, I: 126.904, Ba: 137.327, Pb: 207.2,
};

function parseFormula(formula: string): number {
  const cleaned = formula.replace(/[^A-Za-z0-9()]/g, '');
  let total = 0;
  let i = 0;
  const stack: number[] = [];
  while (i < cleaned.length) {
    const start = i;
    if (cleaned[i] === '(') {
      stack.push(0);
      i++;
      continue;
    }
    if (cleaned[i] === ')') {
      i++;
      let count = '';
      while (i < cleaned.length && /\d/.test(cleaned[i])) {
        count += cleaned[i];
        i++;
      }
      const multiplier = count ? Number(count) : 1;
      const groupSum = stack.pop() || 0;
      if (stack.length === 0) {
        total += groupSum * multiplier;
      } else {
        stack[stack.length - 1] += groupSum * multiplier;
      }
      continue;
    }
    let elem = '';
    while (i < cleaned.length && /[A-Z]/.test(cleaned[i])) {
      elem += cleaned[i];
      i++;
    }
    if (elem && ATOMIC_MASSES[elem]) {
      let count = '';
      while (i < cleaned.length && /\d/.test(cleaned[i])) {
        count += cleaned[i];
        i++;
      }
      const multiplier = count ? Number(count) : 1;
      const contribution = ATOMIC_MASSES[elem] * multiplier;
      if (stack.length === 0) {
        total += contribution;
      } else {
        stack[stack.length - 1] += contribution;
      }
    } else {
      i = start + 1;
    }
  }
  return total;
}

export interface MolecularWeightInput2 {
  formula: string;
  atomMassOverride: number;
}

export function computeMolecularWeight(input: MolecularWeightInput2) {
  const parsed = parseFormula(input.formula);
  const mass = parsed > 0 ? parsed : input.atomMassOverride;
  const molesPerGram = mass > 0 ? 1 / mass : 0;
  return { mass, molesPerGram };
}

export function MolecularWeightCalculator() {
  const [formula, setFormula] = useState('H2O');
  const [atomMassOverride, setAtomMassOverride] = useState('18');

  const result = useMemo(
    () =>
      computeMolecularWeight({
        formula,
        atomMassOverride: Number(atomMassOverride) || 0,
      }),
    [formula, atomMassOverride]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Chemical formula</span>
              <input
                aria-label="Chemical formula"
                className="w-full bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white font-mono text-lg outline-none focus:border-primary-fixed/50"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                placeholder="e.g. H2O"
              />
            </div>
            <NumberField label="Override mass (g/mol)" value={atomMassOverride} onChange={setAtomMassOverride} min={0} step="0.01" />
          </div>
          <Hint>
            Parse a chemical formula by summing atomic masses. Parentheses group atoms and are
            followed by a multiplier. If parsing fails, the override is used.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Molecular weight"
            value={`${formatMoney(result.mass)} g/mol`}
          />
          <ResultRows>
            <ResultRow label="Moles per gram" value={formatMoney(result.molesPerGram)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MolecularWeightCalculator;