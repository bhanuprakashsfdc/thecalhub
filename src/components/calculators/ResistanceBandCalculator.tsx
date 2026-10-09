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

export interface ResistanceBandInput {
  freeLength: number;
  stretchedLength: number;
  resistancePerInch: number;
}

export function computeResistanceBand(input: ResistanceBandInput) {
  const stretch = Math.max(0, input.stretchedLength - input.freeLength);
  const stretchRatio = input.freeLength > 0 ? input.stretchedLength / input.freeLength : 1;
  const resistance = stretch * input.resistancePerInch;
  const kg = resistance / 2.20462;
  return { stretch, stretchRatio, resistance, kg };
}

export function ResistanceBandCalculator() {
  const [freeLength, setFreeLength] = useState('12');
  const [stretchedLength, setStretchedLength] = useState('20');
  const [resistancePerInch, setResistancePerInch] = useState('1.5');

  const result = useMemo(
    () =>
      computeResistanceBand({
        freeLength: Number(freeLength) || 0,
        stretchedLength: Number(stretchedLength) || 0,
        resistancePerInch: Number(resistancePerInch) || 0,
      }),
    [freeLength, stretchedLength, resistancePerInch]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Free band length (in)" value={freeLength} onChange={setFreeLength} min={0} step="0.5" />
            <NumberField label="Stretched length (in)" value={stretchedLength} onChange={setStretchedLength} min={0} step="0.5" />
            <NumberField label="Resistance per inch (lbs)" value={resistancePerInch} onChange={setResistancePerInch} min={0} step="0.1" />
          </div>
          <Hint>
            Resistance bands are roughly linear springs: the force is proportional to how far they are
            stretched beyond their free length. Multiply the extra inches by the per-inch resistance.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Band resistance"
            value={`${formatMoney(result.resistance)} lbs`}
            sub={`Stretch factor ${formatMoney(result.stretchRatio)}×`}
          />
          <ResultRows>
            <ResultRow label="Stretch (in)" value={formatMoney(result.stretch)} />
            <ResultRow label="Resistance (kg)" value={formatMoney(result.kg)} />
            <ResultRow label="Stretch ratio" value={`${formatMoney(result.stretchRatio)}×`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ResistanceBandCalculator;