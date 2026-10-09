import { useState, useMemo } from 'react';
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

export interface PowerConverterInput {
  watts: number;
}

export function computePowerConverter(input: PowerConverterInput) {
  const w = input.watts;
  const kw = w / 1000;
  const hp = w * 0.00134102;
  const btu = w * 3.41214;
  const kwhPerHour = kw;
  return { kw, hp, btu, kwhPerHour };
}

export function PowerConverterCalculator() {
  const [watts, setWatts] = useState('1500');

  const result = useMemo(
    () =>
      computePowerConverter({
        watts: Number(watts) || 0,
      }),
    [watts]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Power (W)" value={watts} onChange={setWatts} min={0} step="10" />
          </div>
          <Hint>
            Convert watts to kilowatts, mechanical horsepower and BTU/h. One watt equals one
            joule per second; one kilowatt-hour is 3,600,000 joules.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Power"
            value={`${formatMoney(result.kw)} kW`}
            sub={`${formatMoney(result.hp)} hp`}
          />
          <ResultRows>
            <ResultRow label="Kilowatts" value={formatMoney(result.kw)} />
            <ResultRow label="Horsepower" value={formatMoney(result.hp)} />
            <ResultRow label="BTU/h" value={formatMoney(result.btu)} />
            <ResultRow label="kWh per hour" value={formatMoney(result.kwhPerHour)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PowerConverterCalculator;