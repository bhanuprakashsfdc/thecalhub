import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  TextField,
  NumberField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

const ATOMIC_MASSES: Record<string, number> = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011,
  N: 14.007, O: 15.999, F: 18.998, Ne: 20.18, Na: 22.99, Mg: 24.305,
  Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, K: 39.098,
  Ca: 40.078, Fe: 55.845, Cu: 63.546, Zn: 65.38, Ag: 107.868, Au: 196.967,
  I: 126.904, Br: 79.904, Mn: 54.938, Ni: 58.693, Co: 58.933, Pb: 207.2,
  Sn: 118.71, Ti: 47.867, Cr: 51.996, Ba: 137.327, Sr: 87.62, Zr: 91.224,
};

export interface MolarMassInput {
  formula: string;
  sampleMassG: number;
}

export function parseFormula(formula: string): Map<string, number> {
  const counts = new Map<string, number>();
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(formula)) !== null) {
    const element = match[1];
    if (!element || !ATOMIC_MASSES[element]) continue;
    const count = match[2] ? parseInt(match[2], 10) : 1;
    counts.set(element, (counts.get(element) || 0) + count);
  }
  return counts;
}

export function computeMolarMass(input: MolarMassInput) {
  const counts = parseFormula(input.formula);
  let molarMass = 0;
  let atoms = 0;
  for (const [element, count] of counts) {
    molarMass += (ATOMIC_MASSES[element] || 0) * count;
    atoms += count;
  }
  const elements = counts.size;
  const moles = molarMass > 0 ? input.sampleMassG / molarMass : 0;
  return { molarMass, atoms, elements, moles, counts };
}

export function MolarMassCalculator() {
  const [formula, setFormula] = useState('C6H12O6');
  const [sampleMassG, setSampleMassG] = useState('90');

  const result = computeMolarMass({
    formula,
    sampleMassG: Number(sampleMassG) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <TextField
              label="Chemical formula"
              value={formula}
              onChange={setFormula}
              placeholder="e.g. H2SO4"
            />
            <NumberField label="Sample mass (g)" value={sampleMassG} onChange={setSampleMassG} min={0} step="any" />
          </div>
          <Hint>
            Parses standard chemical formulas (C6H12O6, H2SO4, NaCl) and sums
            standard atomic weights. Supports 36 common elements.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Molar mass"
            value={`${formatMoney(result.molarMass)} g/mol`}
            sub={formula || '—'}
          />
          <ResultRows>
            <ResultRow label="Moles in sample" value={formatMoney(result.moles)} />
            <ResultRow label="Atoms per molecule" value={formatMoney(result.atoms)} />
            <ResultRow label="Elements present" value={formatMoney(result.elements)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MolarMassCalculator;
