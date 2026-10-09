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

export interface PropertyValueAppreciationInput {
  currentValue: number;
  annualRate: number;
  years: number;
}

export function computePropertyValueAppreciation(input: PropertyValueAppreciationInput) {
  const growth = Math.pow(1 + input.annualRate / 100, input.years);
  const futureValue = input.currentValue * growth;
  const gain = futureValue - input.currentValue;
  const totalPct = (growth - 1) * 100;
  const valueAt5Years = input.currentValue * Math.pow(1 + input.annualRate / 100, 5);
  return { futureValue, gain, totalPct, valueAt5Years };
}

export function PropertyValueAppreciationCalculator() {
  const [currentValue, setCurrentValue] = useState('400000');
  const [annualRate, setAnnualRate] = useState('5');
  const [years, setYears] = useState('10');

  const result = computePropertyValueAppreciation({
    currentValue: Number(currentValue) || 0,
    annualRate: Number(annualRate) || 0,
    years: Number(years) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Current property value ($)" value={currentValue} onChange={setCurrentValue} min={0} />
            <NumberField label="Annual appreciation rate (%)" value={annualRate} onChange={setAnnualRate} min={0} step="0.1" />
            <NumberField label="Years held" value={years} onChange={setYears} min={0} step="1" />
          </div>
          <Hint>
            Future value = current value × (1 + rate)^years. Compounded
            annually, ignoring taxes and maintenance.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Future property value"
            value={`$${formatMoney(result.futureValue)}`}
            sub="After the holding period"
          />
          <ResultRows>
            <ResultRow label="Appreciation gain" value={`$${formatMoney(result.gain)}`} />
            <ResultRow label="Total appreciation (%)" value={`${formatMoney(result.totalPct)}%`} />
            <ResultRow label="Value after 5 years" value={`$${formatMoney(result.valueAt5Years)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PropertyValueAppreciationCalculator;
