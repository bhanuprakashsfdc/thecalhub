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

export interface IsoInput {
  baseIso: number;
  stops: number;
}

export function computeIso(input: IsoInput) {
  const base = Math.max(1, input.baseIso);
  const stops = input.stops;

  const factor = Math.pow(2, -stops);
  const iso = Math.max(1, Math.round(base * factor));

  return { factor, iso, change: iso - base };
}

export function IsoCalculator() {
  const [baseIso, setBaseIso] = useState('400');
  const [stops, setStops] = useState('2');

  const result = computeIso({
    baseIso: Number(baseIso) || 0,
    stops: Number(stops) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Metered ISO" value={baseIso} onChange={setBaseIso} min={1} step="50" />
            <NumberField
              label="Scene stops brighter"
              value={stops}
              onChange={setStops}
              step="0.5"
              hint="Negative values mean a darker scene"
            />
          </div>
          <Hint>
            Every stop doubles or halves the sensor's sensitivity. A scene two stops brighter needs a quarter of
            the ISO to keep the same exposure.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Recommended ISO"
            value={formatMoney(result.iso)}
            sub={`From a metered base of ${baseIso || 0} ISO`}
          />
          <ResultRows>
            <ResultRow label="ISO change factor" value={formatMoney(result.factor)} />
            <ResultRow label="Exposure stops applied" value={formatMoney(Math.max(-99, Math.min(99, Number(stops) || 0)))} />
            <ResultRow label="Change in ISO" value={formatMoney(result.change)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default IsoCalculator;
