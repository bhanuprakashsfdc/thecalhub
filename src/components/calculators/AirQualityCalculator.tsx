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

interface AqiBand {
  lo: number;
  hi: number;
  iLo: number;
  iHi: number;
}

const PM25_BANDS: AqiBand[] = [
  { lo: 0, hi: 12, iLo: 0, iHi: 50 },
  { lo: 12.1, hi: 35.4, iLo: 51, iHi: 100 },
  { lo: 35.5, hi: 55.4, iLo: 101, iHi: 150 },
  { lo: 55.5, hi: 150.4, iLo: 151, iHi: 200 },
  { lo: 150.5, hi: 250.4, iLo: 201, iHi: 300 },
  { lo: 250.5, hi: 500.4, iLo: 301, iHi: 500 },
];

const AQI_CATEGORIES = [
  { max: 50, label: 'Good' },
  { max: 100, label: 'Moderate' },
  { max: 150, label: 'Unhealthy for sensitive groups' },
  { max: 200, label: 'Unhealthy' },
  { max: 300, label: 'Very unhealthy' },
  { max: 500, label: 'Hazardous' },
];

export interface AirQualityInput {
  pm25: number;
}

export function computeAirQuality(input: AirQualityInput) {
  const conc = Math.max(0, input.pm25);
  const band = PM25_BANDS.find((b) => conc <= b.hi) ?? PM25_BANDS[PM25_BANDS.length - 1];
  const span = band.hi - band.lo;
  const above = conc - band.lo;
  const contribution = ((band.iHi - band.iLo) / span) * above;
  const raw = band.iLo + contribution;
  const aqi = Math.round(raw);
  const category = AQI_CATEGORIES.find((c) => aqi <= c.max)?.label ?? 'Hazardous';
  return { band, span, above, contribution, raw, aqi, category };
}

export function AirQualityCalculator() {
  const [pm25, setPm25] = useState('20');

  const result = computeAirQuality({ pm25: Number(pm25) || 0 });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="PM2.5 concentration (µg/m³)"
              value={pm25}
              onChange={setPm25}
              min={0}
              step="0.1"
            />
          </div>
          <Hint>
            The US EPA Air Quality Index interpolates PM2.5 across six concentration bands; readings below
            12 µg/m³ are considered healthy over 24 hours.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Air Quality Index" value={`AQI ${formatMoney(result.aqi, 0)}`} sub={result.category} />
          <ResultRows>
            <ResultRow label="Raw AQI (unrounded)" value={formatMoney(result.raw)} />
            <ResultRow label="Index contribution" value={formatMoney(result.contribution)} />
            <ResultRow label="Band lower bound (µg/m³)" value={formatMoney(result.band.lo)} />
            <ResultRow label="Band width (µg/m³)" value={formatMoney(result.span)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AirQualityCalculator;
