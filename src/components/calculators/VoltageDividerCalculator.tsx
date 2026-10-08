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

export interface VoltageDividerInput {
  vin: number;
  r1: number;
  r2: number;
}

export function computeVoltageDivider(input: VoltageDividerInput) {
  const total = input.r1 + input.r2;
  const vout = total !== 0 ? (input.vin * input.r2) / total : 0;
  const current = total !== 0 ? input.vin / total : 0;
  const power = input.vin * current;
  return { total, vout, current, power, acrossR1: input.vin - vout };
}

export function VoltageDividerCalculator() {
  const [vin, setVin] = useState('12');
  const [r1, setR1] = useState('1000');
  const [r2, setR2] = useState('2000');

  const result = computeVoltageDivider({
    vin: Number(vin) || 0,
    r1: Number(r1) || 0,
    r2: Number(r2) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Input voltage (V)" value={vin} onChange={setVin} step="0.1" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Top resistor R1 (Ω)" value={r1} onChange={setR1} min={0} />
              <NumberField label="Bottom resistor R2 (Ω)" value={r2} onChange={setR2} min={0} />
            </div>
          </div>
          <Hint>
            Vout = Vin × R2 / (R1 + R2). Load the output carefully — drawing current from the tap changes the
            effective R2 and pulls the voltage down.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Output voltage"
            value={`${formatMoney(result.vout)} V`}
            sub={`${formatMoney(result.current * 1000)} mA drawn from the source`
            }
          />
          <ResultRows>
            <ResultRow label="Total resistance (Ω)" value={formatMoney(result.total)} />
            <ResultRow label="Voltage across R1 (V)" value={formatMoney(result.acrossR1)} />
            <ResultRow label="Source power (W)" value={formatMoney(result.power)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default VoltageDividerCalculator;
