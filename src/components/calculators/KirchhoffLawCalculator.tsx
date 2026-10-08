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

export interface KirchhoffInput {
  source1: number;
  source2: number;
  resistance: number;
}

export function computeKirchhoff(input: KirchhoffInput) {
  const netEmf = input.source1 - input.source2;
  const current = input.resistance !== 0 ? netEmf / input.resistance : 0;
  const power = current * current * input.resistance;
  const kvlResidual = input.source1 - input.source2 - current * input.resistance;
  return { netEmf, current, power, kvlResidual };
}

export function KirchhoffLawCalculator() {
  const [source1, setSource1] = useState('12');
  const [source2, setSource2] = useState('5');
  const [resistance, setResistance] = useState('7');

  const result = computeKirchhoff({
    source1: Number(source1) || 0,
    source2: Number(source2) || 0,
    resistance: Number(resistance) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Source V1 (V)" value={source1} onChange={setSource1} step="0.1" />
              <NumberField label="Source V2 (V)" value={source2} onChange={setSource2} step="0.1" />
            </div>
            <NumberField label="Loop resistance (Ω)" value={resistance} onChange={setResistance} min={0} step="0.1" />
          </div>
          <Hint>
            Kirchhoff’s voltage law says the voltages around any closed loop sum to zero: I = (V1 − V2) ÷ R for
            this single-loop circuit.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Loop current"
            value={`${formatMoney(result.current)} A`}
            sub={`${formatMoney(result.netEmf)} V net EMF`
            }
          />
          <ResultRows>
            <ResultRow label="Net EMF (V)" value={formatMoney(result.netEmf)} />
            <ResultRow label="Power dissipated (W)" value={formatMoney(result.power)} />
            <ResultRow label="KVL residual (V)" value={formatMoney(result.kvlResidual)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default KirchhoffLawCalculator;
