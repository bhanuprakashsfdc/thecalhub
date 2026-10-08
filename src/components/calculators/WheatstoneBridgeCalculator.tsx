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
  safeDiv,
} from './kit';

export interface WheatstoneInput {
  r1: number;
  r2: number;
  r3: number;
  r4: number;
  supply: number;
}

export function computeWheatstone(input: WheatstoneInput) {
  const ratio1 = safeDiv(input.r1, input.r2);
  const ratio2 = safeDiv(input.r3, input.r4);
  const output =
    input.supply * (safeDiv(input.r4, input.r3 + input.r4) - safeDiv(input.r2, input.r1 + input.r2));
  const imbalance = ratio1 - ratio2;
  const balanced = Math.abs(output) < 1e-9 ? 1 : 0;
  return { ratio1, ratio2, output, imbalance, balanced };
}

export function WheatstoneBridgeCalculator() {
  const [r1, setR1] = useState('120');
  const [r2, setR2] = useState('180');
  const [r3, setR3] = useState('220');
  const [r4, setR4] = useState('200');
  const [supply, setSupply] = useState('10');

  const result = computeWheatstone({
    r1: Number(r1) || 0,
    r2: Number(r2) || 0,
    r3: Number(r3) || 0,
    r4: Number(r4) || 0,
    supply: Number(supply) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Resistor R1 (Ω)" value={r1} onChange={setR1} min={0} />
              <NumberField label="Resistor R2 (Ω)" value={r2} onChange={setR2} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Resistor R3 (Ω)" value={r3} onChange={setR3} min={0} />
              <NumberField label="Resistor R4 (Ω)" value={r4} onChange={setR4} min={0} />
            </div>
            <NumberField label="Supply voltage (V)" value={supply} onChange={setSupply} min={0} step="0.5" />
          </div>
          <Hint>
            The bridge balances when R1/R2 equals R3/R4 — then the output reads zero, which is how strain gauges
            and resistance thermometers are measured.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Bridge output"
            value={`${formatMoney(result.output)} V`}
            sub={result.balanced === 1 ? 'Bridge balanced' : 'Bridge unbalanced'}
          />
          <ResultRows>
            <ResultRow label="R1 / R2 ratio" value={formatMoney(result.ratio1)} />
            <ResultRow label="R3 / R4 ratio" value={formatMoney(result.ratio2)} />
            <ResultRow label="Ratio imbalance" value={formatMoney(result.imbalance)} />
            <ResultRow label="Balanced (1 = yes)" value={formatMoney(result.balanced)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WheatstoneBridgeCalculator;
