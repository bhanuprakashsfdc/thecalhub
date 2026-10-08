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

export interface EWasteInput {
  devices: number;
  weight: number;
  rate: number;
  years: number;
}

export function computeEWaste(input: EWasteInput) {
  const years = Math.max(0, input.years);
  const totalWaste = input.devices * input.weight * years;
  const recycled = totalWaste * (Math.min(100, Math.max(0, input.rate)) / 100);
  const landfill = totalWaste - recycled;
  const metals = recycled * 0.2;
  return { totalWaste, recycled, landfill, metals, years };
}

export function EWasteCalculator() {
  const [devices, setDevices] = useState('50');
  const [weight, setWeight] = useState('1.5');
  const [rate, setRate] = useState('40');
  const [years, setYears] = useState('3');

  const result = computeEWaste({
    devices: Number(devices) || 0,
    weight: Number(weight) || 0,
    rate: Number(rate) || 0,
    years: Number(years) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Devices discarded per year" value={devices} onChange={setDevices} min={0} />
              <NumberField
                label="Average device weight (kg)"
                value={weight}
                onChange={setWeight}
                min={0}
                step="0.1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Recycling rate (%)" value={rate} onChange={setRate} min={0} max={100} />
              <NumberField label="Years" value={years} onChange={setYears} min={0} />
            </div>
          </div>
          <Hint>
            E-waste is the fastest growing waste stream; roughly a fifth of discarded electronics contains
            recoverable metals such as copper, gold and palladium.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="E-waste generated"
            value={`${formatMoney(result.totalWaste)} kg`}
            sub={`Over ${formatMoney(result.years)} year(s)`}
          />
          <ResultRows>
            <ResultRow label="Recycled (kg)" value={formatMoney(result.recycled)} />
            <ResultRow label="Landfilled (kg)" value={formatMoney(result.landfill)} />
            <ResultRow label="Metals recovered (kg)" value={formatMoney(result.metals)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EWasteCalculator;
