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

export interface EnergyConverterInput {
  value: number;
  from: string;
  to: string;
}

export const ENERGY_UNITS: Record<string, number> = {
  J: 1,
  kJ: 1000,
  cal: 4.184,
  kcal: 4184,
  Wh: 3600,
  kWh: 3600000,
  BTU: 1055.06,
};

export function computeEnergyConverter(input: EnergyConverterInput) {
  const fromFactor = ENERGY_UNITS[input.from] || 1;
  const toFactor = ENERGY_UNITS[input.to] || 1;
  const joules = input.value * fromFactor;
  const converted = joules / toFactor;
  const calories = joules / 4.184;
  const btu = joules / 1055.06;
  return { converted, joules, calories, btu };
}

const UNIT_OPTIONS = Object.keys(ENERGY_UNITS).map((unit) => ({
  value: unit,
  label: unit,
}));

export function EnergyConverterCalculator() {
  const [value, setValue] = useState('1');
  const [from, setFrom] = useState('kWh');
  const [to, setTo] = useState('kJ');

  const result = computeEnergyConverter({
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
            All conversions pass through joules. 1 kWh =
            3.6 million joules = 860.4 kcal.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Converted energy"
            value={`${formatMoney(result.converted)} ${to}`}
            sub={`From ${from}`}
          />
          <ResultRows>
            <ResultRow label="Value in joules" value={formatMoney(result.joules)} />
            <ResultRow label="In calories" value={formatMoney(result.calories)} />
            <ResultRow label="In BTU" value={formatMoney(result.btu)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EnergyConverterCalculator;
