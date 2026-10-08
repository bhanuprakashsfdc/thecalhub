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

export interface StarTemperatureInput {
  wavelength: number;
}

const WIEN_B = 2_897_771.955;

export function computeStarTemperature(input: StarTemperatureInput) {
  const wavelength = Math.max(1, input.wavelength);

  const kelvin = WIEN_B / wavelength;
  const celsius = kelvin - 273.15;
  const fahrenheit = (celsius * 9) / 5 + 32;

  return { kelvin, celsius, fahrenheit };
}

export function StarTemperatureCalculator() {
  const [wavelength, setWavelength] = useState('500');

  const result = computeStarTemperature({ wavelength: Number(wavelength) || 0 });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Peak wavelength (nm)" value={wavelength} onChange={setWavelength} min={1} step="1" />
          </div>
          <Hint>
            Wien's law: surface temperature = 2,897,772 ÷ peak wavelength in nanometres. Blue stars peak
            shortward of 500 nm, red giants beyond 1,000 nm.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Surface temperature"
            value={`${formatMoney(result.kelvin)} K`}
            sub={`${formatMoney(result.celsius)} °C`}
          />
          <ResultRows>
            <ResultRow label="Celsius" value={`${formatMoney(result.celsius)} °C`} />
            <ResultRow label="Fahrenheit" value={`${formatMoney(result.fahrenheit)} °F`} />
            <ResultRow label="Wavelength input" value={`${formatMoney(Number(wavelength) || 0)} nm`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StarTemperatureCalculator;
