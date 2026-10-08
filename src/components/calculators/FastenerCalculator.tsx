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
} from './kit';

const whole = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

export interface FastenerInput {
  runLengthFt: number;
  spacingIn: number;
  wastePercent: number;
  packSize: number;
}

export function computeFastener(input: FastenerInput) {
  const lengthIn = Math.max(0, input.runLengthFt) * 12;
  const spacing = Math.max(0.1, input.spacingIn);
  const waste = Math.max(0, input.wastePercent);
  const packSize = Math.max(1, Math.floor(input.packSize));

  const baseCount = Math.floor(lengthIn / spacing) + 1;
  const withWaste = Math.ceil(baseCount * (1 + waste / 100));
  const packs = Math.ceil(withWaste / packSize);

  return { baseCount, withWaste, packs };
}

export function FastenerCalculator() {
  const [runLengthFt, setRunLengthFt] = useState('10');
  const [spacingIn, setSpacingIn] = useState('16');
  const [wastePercent, setWastePercent] = useState('10');
  const [packSize, setPackSize] = useState('100');

  const result = computeFastener({
    runLengthFt: Number(runLengthFt) || 0,
    spacingIn: Number(spacingIn) || 0,
    wastePercent: Number(wastePercent) || 0,
    packSize: Number(packSize) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Run length (ft)" value={runLengthFt} onChange={setRunLengthFt} min={0} step="0.5" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Spacing (in)" value={spacingIn} onChange={setSpacingIn} min={0.5} />
              <NumberField label="Waste (%)" value={wastePercent} onChange={setWastePercent} min={0} />
            </div>
            <NumberField label="Fasteners per pack" value={packSize} onChange={setPackSize} min={1} />
          </div>
          <Hint>
            Spacing is measured centre to centre. Framing nails typically sit 16 in apart; a fastener is also
            needed at the very start of the run.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Fasteners needed"
            value={whole(result.withWaste)}
            sub={`${result.packs} pack(s) at ${Number(packSize) || 0} per pack`}
          />
          <ResultRows>
            <ResultRow label="Before waste" value={whole(result.baseCount)} />
            <ResultRow label="Spacing" value={`${Number(spacingIn) || 0} in`} />
            <ResultRow label="Run length" value={`${Number(runLengthFt) || 0} ft`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FastenerCalculator;
