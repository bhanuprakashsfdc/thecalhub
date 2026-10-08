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

export interface ExposureInput {
  aperture: number;
  shutter: number;
  iso: number;
}

export function computeExposure(input: ExposureInput) {
  const aperture = Math.max(1, input.aperture);
  const shutter = Math.max(0.000001, input.shutter);
  const iso = Math.max(1, input.iso);

  const lightValue = (aperture * aperture) / shutter;
  const evAt100 = Math.log2(lightValue);
  const ev = evAt100 - Math.log2(iso / 100);

  return { lightValue, evAt100, ev, fromEv12: ev - 12 };
}

export function ExposureCalculator() {
  const [aperture, setAperture] = useState('8');
  const [shutter, setShutter] = useState('0.008');
  const [iso, setIso] = useState('100');

  const result = computeExposure({
    aperture: Number(aperture) || 0,
    shutter: Number(shutter) || 0,
    iso: Number(iso) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Aperture (f/)" value={aperture} onChange={setAperture} min={1} step="0.1" />
            <NumberField
              label="Shutter speed (seconds)"
              value={shutter}
              onChange={setShutter}
              min={0.000001}
              step="0.001"
              hint="0.008 s is about 1/125 s"
            />
            <NumberField label="ISO" value={iso} onChange={setIso} min={1} step="50" />
          </div>
          <Hint>
            Exposure value EV = log₂(aperture² ÷ shutter) − log₂(ISO ÷ 100). Each whole EV doubles or halves the
            light reaching the sensor.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Exposure value"
            value={formatMoney(result.ev)}
            sub="Relative to a calibrated 18% grey scene"
          />
          <ResultRows>
            <ResultRow label="EV at ISO 100" value={formatMoney(result.evAt100)} />
            <ResultRow label="Light value" value={formatMoney(result.lightValue)} />
            <ResultRow label="Stops from EV 12" value={formatMoney(result.fromEv12)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ExposureCalculator;
