import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface AreaConverterInput {
  value: number;
  from: string;
  to: string;
}

export const AREA_UNITS: Record<string, number> = {
  'm²': 1,
  'km²': 1e6,
  'cm²': 1e-4,
  'mm²': 1e-6,
  'ft²': 0.092903,
  'in²': 0.00064516,
  acre: 4046.86,
  hectare: 10000,
};

export function computeAreaConverter(input: AreaConverterInput) {
  const fromFactor = AREA_UNITS[input.from] || 1;
  const toFactor = AREA_UNITS[input.to] || 1;
  const squareMetres = input.value * fromFactor;
  const converted = squareMetres / toFactor;
  const squareFeet = squareMetres / 0.092903;
  const hectares = squareMetres / 10000;
  const acres = squareMetres / 4046.86;
  return { converted, squareMetres, squareFeet, hectares, acres };
}

const UNIT_OPTIONS = Object.keys(AREA_UNITS).map((unit) => ({
  value: unit,
  label: unit,
}));

export function AreaConverterCalculator() {
  const [value, setValue] = useState('1');
  const [from, setFrom] = useState('acre');
  const [to, setTo] = useState('m²');

  const result = computeAreaConverter({
    value: Number(value) || 0,
    from,
    to,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Value" value={value} onChange={setValue} min={0} step="any" />
            <SelectField label="From unit" value={from} onChange={setFrom} options={UNIT_OPTIONS} />
            <SelectField label="To unit" value={to} onChange={setTo} options={UNIT_OPTIONS} />
          </div>
          <Hint>
            All conversions pass through square metres. One
            acre is 4,046.86 m²; one hectare is 10,000 m².
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Converted area"
            value={`${formatMoney(result.converted)} m²`}
            sub={`From ${from}`}
          />
          <ResultRows>
            <ResultRow label="In square feet" value={formatMoney(result.squareFeet)} />
            <ResultRow label="In hectares" value={formatMoney(result.hectares)} />
            <ResultRow label="In acres" value={formatMoney(result.acres)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AreaConverterCalculator;
