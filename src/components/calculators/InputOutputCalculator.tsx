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

export function InputOutputCalculator() {
  const [input, setInput] = useState('100');
  const [output, setOutput] = useState('80');
  const eff = Number(input) > 0 ? (Number(output) / Number(input)) * 100 : 0;
  const loss = 100 - eff;

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Input" value={input} onChange={setInput} min={0} step="0.01" />
            <NumberField label="Output" value={output} onChange={setOutput} min={0} step="0.01" />
          </div>
          <Hint>Efficiency = (output / input) × 100%.</Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Efficiency" value={`${formatMoney(eff)}%`} />
          <ResultRows>
            <ResultRow label="Loss" value={`${formatMoney(loss)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default InputOutputCalculator;
