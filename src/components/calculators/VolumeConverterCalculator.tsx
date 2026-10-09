import { useState, useMemo } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  ResultHero,
  Hint,
  formatMoney,
} from './kit';

export interface VolumeConverterInput {
  value: number;
  fromUnit: string;
  toUnit: string;
}

const TO_LITERS: Record<string, number> = {
  liters: 1,
  milliliters: 0.001,
  gallons: 3.78541,
  quarts: 0.946353,
  pints: 0.473176,
  cups: 0.236588,
  'cubic meters': 1000,
  'cubic feet': 28.3168,
  'cubic inches': 0.0163871,
};

export function computeVolumeConverter(input: VolumeConverterInput) {
  const liters = input.value * (TO_LITERS[input.fromUnit] || 1);
  const converted = liters / (TO_LITERS[input.toUnit] || 1);
  return { liters, converted };
}

export function VolumeConverterCalculator() {
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('gallons');
  const [toUnit, setToUnit] = useState('liters');

  const result = useMemo(
    () =>
      computeVolumeConverter({
        value: Number(value) || 0,
        fromUnit,
        toUnit,
      }),
    [value, fromUnit, toUnit]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Volume" value={value} onChange={setValue} min={0} step="0.1" />
            <div className="grid grid-cols-2 gap-4">
              <div className="block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">From</span>
                <select aria-label="From" className="w-full bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white text-lg outline-none focus:border-primary-fixed/50" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                  {Object.keys(TO_LITERS).map((u) => (<option key={u} value={u}>{u}</option>))}
                </select>
              </div>
              <div className="block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">To</span>
                <select aria-label="To" className="w-full bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white text-lg outline-none focus:border-primary-fixed/50" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                  {Object.keys(TO_LITERS).map((u) => (<option key={u} value={u}>{u}</option>))}
                </select>
              </div>
            </div>
          </div>
          <Hint>
            Convert between metric and imperial volumes. All conversions route through litres as
            the canonical unit, so adding a new unit only needs its litre equivalent.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Converted volume"
            value={formatMoney(result.converted)}
            sub={`${formatMoney(result.liters)} L`}
          />
        </Panel>
      }
    />
  );
}

export default VolumeConverterCalculator;