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

export interface DensityAltitudeInput {
  altimeterSetting: number;
  unit: 'inHg' | 'hPa';
  oatC: number;
  relativeHumidity: number;
}

export interface DensityAltitudeResult {
  pressureAltitudeFt: number;
  density: number;
  densityAltitudeFt: number;
  densityAltitudeM: number;
  isaTempC: number;
  tempOffsetC: number;
}

const finite = (n: number) => (Number.isFinite(n) ? n : 0);
const P0 = 101325;
const RHO0 = 1.225;
const RD = 287.058;

export function computeDensityAltitude(input: DensityAltitudeInput): DensityAltitudeResult {
  const raw = finite(input.altimeterSetting);
  const inHg = input.unit === 'hPa' ? raw * 0.0295299830714 : raw;
  if (inHg <= 0) {
    return { pressureAltitudeFt: 0, density: 0, densityAltitudeFt: 0, densityAltitudeM: 0, isaTempC: 15, tempOffsetC: 0 };
  }
  const p = inHg * 3386.389;
  const oatC = finite(input.oatC);
  const tK = oatC + 273.15;
  if (tK <= 1) {
    return { pressureAltitudeFt: 0, density: 0, densityAltitudeFt: 0, densityAltitudeM: 0, isaTempC: 15, tempOffsetC: 0 };
  }
  const rh = Math.min(Math.max(finite(input.relativeHumidity), 0), 100);
  const eSat = 610.78 * Math.exp((17.27 * oatC) / (oatC + 237.3));
  const vapour = (rh / 100) * eSat;
  const density = (p - 0.378 * vapour) / (RD * tK);

  const pressureAltitudeFt = Math.max(0, 145442.2 * (1 - (inHg / 29.921) ** 0.190284));
  const isaTempC = 15 - 1.98 * (pressureAltitudeFt / 1000);
  const tempOffsetC = oatC - isaTempC;
  const ratio = Math.min(Math.max(density / RHO0, 0), 1);
  const densityAltitudeFt = Math.max(0, 145442.2 * (1 - ratio ** 0.23496));
  const densityAltitudeM = densityAltitudeFt * 0.3048;

  return { pressureAltitudeFt, density, densityAltitudeFt, densityAltitudeM, isaTempC, tempOffsetC };
}

export function DensityAltitudeCalculator() {
  const [unit, setUnit] = useState<'inHg' | 'hPa'>('hPa');
  const [setting, setSetting] = useState('1013.25');
  const [oat, setOat] = useState('35');
  const [rh, setRh] = useState('0');

  const result = computeDensityAltitude({
    altimeterSetting: Number(setting) || 0,
    unit,
    oatC: Number(oat) || 0,
    relativeHumidity: Number(rh) || 0,
  });

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
                { value: 'hPa', label: 'Hectopascals (hPa)' },
                { value: 'inHg', label: 'Inches of mercury (inHg)' },
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Altimeter setting (QNH)" value={setting} onChange={setSetting} min={0} step="0.01" />
              <NumberField label="Outside air temperature (°C)" value={oat} onChange={setOat} step="1" />
            </div>
            <NumberField
              label="Relative humidity (%)"
              value={rh}
              onChange={setRh}
              min={0}
              max={100}
              step="5"
              hint="Moist air is less dense, raising density altitude further."
            />
          </div>
          <Hint>
            Density is computed from QNH, temperature and vapour pressure, then inverted through the ISA
            profile: DA = 145442·[1 − (ρ/1.225)^0.235] ft.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Density altitude"
            value={`${formatMoney(result.densityAltitudeFt, 0)} ft`}
            sub={`${formatMoney(result.densityAltitudeM, 0)} m · ρ = ${formatMoney(result.density, 4)} kg/m³`}
          />
          <ResultRows>
            <ResultRow label="Pressure altitude" value={`${formatMoney(result.pressureAltitudeFt, 0)} ft`} />
            <ResultRow
              label="Temperature vs ISA"
              value={`${result.tempOffsetC >= 0 ? '+' : ''}${formatMoney(result.tempOffsetC)} °C`}
            />
            <ResultRow label="ISA temperature at PA" value={`${formatMoney(result.isaTempC)} °C`} />
            <ResultRow label="Air density" value={`${formatMoney(result.density, 4)} kg/m³`} />
          </ResultRows>
          <Hint>
            High density altitude means thinner air: longer takeoff rolls, reduced climb rates and lower
            engine power. Hot days, high elevations and humidity all push DA up.
          </Hint>
        </Panel>
      }
    />
  );
}

export default DensityAltitudeCalculator;
