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

export interface IndicatedAirspeedInput {
  tas: number;
  unit: 'kn' | 'ms';
  oatC: number;
  staticPressureHpa: number;
}

export interface IndicatedAirspeedResult {
  indicated: number;
  equivalent: number;
  mach: number;
  sigma: number;
  soundSpeedKn: number;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const finite = (n: number) => (Number.isFinite(n) ? n : 0);
const RHO0 = 1.225;
const KN_PER_MS = 1.943843;

export function computeIndicatedAirspeed(input: IndicatedAirspeedInput): IndicatedAirspeedResult {
  const tasKn = input.unit === 'ms' ? positive(input.tas) * KN_PER_MS : positive(input.tas);
  const oatC = finite(input.oatC);
  const tK = oatC + 273.15;
  const p = positive(input.staticPressureHpa) * 100;

  if (tK <= 1 || p <= 0) {
    return { indicated: 0, equivalent: 0, mach: 0, sigma: 0, soundSpeedKn: 0 };
  }

  const density = p / (287.058 * tK);
  const sigma = density / RHO0;
  const indicated = tasKn * Math.sqrt(sigma);
  const equivalent = indicated;
  const soundSpeedKn = Math.sqrt(1.4 * 287.058 * tK) * KN_PER_MS;
  const mach = soundSpeedKn > 0 ? tasKn / soundSpeedKn : 0;

  return { indicated, equivalent, mach, sigma, soundSpeedKn };
}

export function IndicatedAirspeedCalculator() {
  const [unit, setUnit] = useState<'kn' | 'ms'>('kn');
  const [tas, setTas] = useState('200');
  const [oat, setOat] = useState('5');
  const [pressure, setPressure] = useState('800');

  const result = computeIndicatedAirspeed({
    tas: Number(tas) || 0,
    unit,
    oatC: Number(oat) || 0,
    staticPressureHpa: Number(pressure) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField
              label="True airspeed unit"
              value={unit}
              onChange={(v) => setUnit(v === 'ms' ? 'ms' : 'kn')}
              options={[
                { value: 'kn', label: 'Knots (kn)' },
                { value: 'ms', label: 'Metres per second (m/s)' },
              ]}
            />
            <NumberField label="True airspeed (TAS)" value={tas} onChange={setTas} min={0} step="1" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Outside air temperature (°C)" value={oat} onChange={setOat} step="1" />
              <NumberField
                label="Static pressure (hPa)"
                value={pressure}
                onChange={setPressure}
                min={0}
                step="10"
                hint="Use station QNH or the pressure for your altitude."
              />
            </div>
          </div>
          <Hint>
            Subsonically, calibrated and equivalent airspeed both scale with the square root of the density
            ratio: CAS ≈ EAS = TAS·√σ, with σ = ρ/1.225.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Indicated airspeed"
            value={`${formatMoney(result.indicated)} kn`}
            sub={`σ = ${formatMoney(result.sigma, 4)} · Mach ${formatMoney(result.mach, 3)}`}
          />
          <ResultRows>
            <ResultRow label="Equivalent airspeed (EAS)" value={`${formatMoney(result.equivalent)} kn`} />
            <ResultRow label="Mach number" value={formatMoney(result.mach, 3)} />
            <ResultRow label="Density ratio σ" value={formatMoney(result.sigma, 4)} />
            <ResultRow label="Speed of sound" value={`${formatMoney(result.soundSpeedKn)} kn`} />
          </ResultRows>
          <Hint>
            The pitot-static system responds to dynamic pressure, so as air thins the needle reads lower than
            the actual speed through the air — the gap TAS − IAS grows with altitude.
          </Hint>
        </Panel>
      }
    />
  );
}

export default IndicatedAirspeedCalculator;
