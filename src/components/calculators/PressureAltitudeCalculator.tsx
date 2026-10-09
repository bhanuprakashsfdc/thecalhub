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

export interface PressureAltitudeInput {
  altimeterSetting: number;
  unit: 'inHg' | 'hPa';
}

export interface PressureAltitudeResult {
  pressureAltitudeFt: number;
  pressureAltitudeM: number;
  offsetFromStandardFt: number;
  inHg: number;
}

const finite = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

export function computePressureAltitude(input: PressureAltitudeInput): PressureAltitudeResult {
  const raw = finite(input.altimeterSetting);
  const inHg = input.unit === 'hPa' ? raw * 0.0295299830714 : raw;
  if (inHg <= 0) {
    return { pressureAltitudeFt: 0, pressureAltitudeM: 0, offsetFromStandardFt: 0, inHg: 0 };
  }
  const pressureAltitudeFt = 145442.2 * (1 - (inHg / 29.921) ** 0.190284);
  const pressureAltitudeM = pressureAltitudeFt * 0.3048;
  const offsetFromStandardFt = (29.921 - inHg) * 1000;

  return {
    pressureAltitudeFt: Math.max(0, pressureAltitudeFt),
    pressureAltitudeM: Math.max(0, pressureAltitudeM),
    offsetFromStandardFt,
    inHg,
  };
}

export function PressureAltitudeCalculator() {
  const [unit, setUnit] = useState<'inHg' | 'hPa'>('inHg');
  const [setting, setSetting] = useState('29.92');

  const result = computePressureAltitude({
    altimeterSetting: Number(setting) || 0,
    unit,
  });

  const std = unit === 'inHg' ? '29.92 inHg (1013.25 hPa)' : '1013.25 hPa (29.92 inHg)';

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField
              label="Altimeter setting unit"
              value={unit}
              onChange={(v) => setUnit(v === 'hPa' ? 'hPa' : 'inHg')}
              options={[
                { value: 'inHg', label: 'Inches of mercury (inHg)' },
                { value: 'hPa', label: 'Hectopascals (hPa)' },
              ]}
            />
            <NumberField
              label="Altimeter setting (QNH)"
              value={setting}
              onChange={setSetting}
              min={0}
              step="0.01"
              hint={`Standard atmosphere: ${std}.`}
            />
          </div>
          <Hint>
            Pressure altitude is the ISA altitude whose pressure equals the altimeter setting:
            PA = 145442·[1 − (QNH/29.921)^0.190284] feet.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Pressure altitude"
            value={`${formatMoney(result.pressureAltitudeFt, 0)} ft`}
            sub={`${formatMoney(result.pressureAltitudeM, 0)} m · setting ${formatMoney(result.inHg, unit === 'inHg' ? 2 : 1)} ${unit}`}
          />
          <ResultRows>
            <ResultRow label="Pressure altitude (metres)" value={`${formatMoney(result.pressureAltitudeM, 0)} m`} />
            <ResultRow
              label="Offset from standard (1000 ft per inHg)"
              value={`${result.offsetFromStandardFt >= 0 ? '+' : ''}${formatMoney(result.offsetFromStandardFt, 0)} ft`}
            />
            <ResultRow label="Equivalent standard setting" value={std} />
          </ResultRows>
          <Hint>
            When the setting is below 29.92 inHg the aircraft's pressure altitude reads higher than field
            elevation, degrading engine and wing performance — a classic high-and-hot hazard.
          </Hint>
        </Panel>
      }
    />
  );
}

export default PressureAltitudeCalculator;
