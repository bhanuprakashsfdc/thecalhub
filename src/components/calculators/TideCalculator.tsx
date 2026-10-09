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

export interface TideInput {
  highTideHeight: number;
  lowTideHeight: number;
  highTideHour: number;
  currentHour: number;
}

export function computeTide(input: TideInput) {
  const mean = (input.highTideHeight + input.lowTideHeight) / 2;
  const amplitude = (input.highTideHeight - input.lowTideHeight) / 2;
  const periodHours = 12.42;
  const phase = ((input.currentHour - input.highTideHour) * 2 * Math.PI) / periodHours;
  const height = mean + amplitude * Math.sin(phase);
  const trend = Math.cos(phase) > 0 ? 'rising' : 'falling';
  const nextHigh = input.highTideHour + periodHours;
  return { height, trend, nextHigh, mean, amplitude };
}

export function TideCalculator() {
  const [highTideHeight, setHighTideHeight] = useState('2.4');
  const [lowTideHeight, setLowTideHeight] = useState('0.6');
  const [highTideHour, setHighTideHour] = useState('14');
  const [currentHour, setCurrentHour] = useState('10');

  const result = useMemo(
    () =>
      computeTide({
        highTideHeight: Number(highTideHeight) || 0,
        lowTideHeight: Number(lowTideHeight) || 0,
        highTideHour: Number(highTideHour) || 0,
        currentHour: Number(currentHour) || 0,
      }),
    [highTideHeight, lowTideHeight, highTideHour, currentHour]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="High tide height (m)" value={highTideHeight} onChange={setHighTideHeight} min={0} step="0.1" />
            <NumberField label="Low tide height (m)" value={lowTideHeight} onChange={setLowTideHeight} min={0} step="0.1" />
            <NumberField label="High tide hour (24h)" value={highTideHour} onChange={setHighTideHour} min={0} max={23} step="1" />
            <NumberField label="Current hour (24h)" value={currentHour} onChange={setCurrentHour} min={0} max={23} step="1" />
          </div>
          <Hint>
            Tides are roughly sinusoidal with a period of about 12.42 hours (the lunar day). The model
            above gives a good approximation for semi-diurnal coasts.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Current tide height"
            value={`${formatMoney(result.height)} m`}
            sub={`Tide is ${result.trend}`}
          />
          <ResultRows>
            <ResultRow label="Tide trend" value={result.trend} />
            <ResultRow label="Next high tide" value={`${formatMoney(result.nextHigh % 24)}:00`} />
            <ResultRow label="Mean sea level" value={`${formatMoney(result.mean)} m`} />
            <ResultRow label="Tidal range" value={`${formatMoney(result.amplitude * 2)} m`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TideCalculator;