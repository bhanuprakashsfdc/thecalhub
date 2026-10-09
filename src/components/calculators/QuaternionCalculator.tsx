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

export function QuaternionCalculator() {
  const [w, setW] = useState('1');
  const [x, setX] = useState('0');
  const [y, setY] = useState('0');
  const [z, setZ] = useState('0');
  const mag = Math.sqrt(Number(w)**2 + Number(x)**2 + Number(y)**2 + Number(z)**2);

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="W" value={w} onChange={setW} step="0.01" />
            <NumberField label="X" value={x} onChange={setX} step="0.01" />
            <NumberField label="Y" value={y} onChange={setY} step="0.01" />
            <NumberField label="Z" value={z} onChange={setZ} step="0.01" />
          </div>
          <Hint>Quaternion magnitude = sqrt(w²+x²+y²+z²).</Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Magnitude" value={formatMoney(mag)} />
          <ResultRows>
            <ResultRow label="Norm" value={formatMoney(mag)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default QuaternionCalculator;
