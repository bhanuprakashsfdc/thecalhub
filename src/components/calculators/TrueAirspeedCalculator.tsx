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

export interface TrueAirspeedInput {
  ias: number;
  unit: 'kn' | 'ms';
  oatC: number;
  staticPressureHpa: number;
}

export interface TrueAirspeedResult {
  tas: number;
  tasMs: number;
  mach: number;
  sigma: number;
  soundSpeedKn: number;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const finite = (n: number) => (Number.isFinite(n) ? n : 0);
const RHO0 = 1.225;
const KN_PER_MS = 1.943843;

export function computeTrueAirspeed(input: TrueAirspeedInput): TrueAirspeedResult {
  const iasKn = input.unit === 'ms' ? positive(input.ias) * KN_PER_MS : positive(input.ias);
  const oatC = finite(input.oatC);
  const tK = oatC + 273.15;
  const p = positive(input.staticPressureHpa) * 100;

  if (tK <= 1 || p <= 0) {
    return { tas: 0, tasMs: 0, mach: 0, sigma: 0, soundSpeedKn: 0 };
  }

  const density = p / (287.058 * tK);
  const sigma = density / RHO0;
  const tas = sigma > 0 ? iasKn / Math.sqrt(sigma) : 0;
  const tasMs = tas / KN_PER_MS;
  const soundSpeedKn = Math.sqrt(1.4 * 287.058 * tK) * KN_PER_MS;
  const mach = soundSpeedKn > 0 ? tas / soundSpeedKn : 0;

  return { tas, tasMs, mach, sigma, soundSpeedKn };
}

export function TrueAirspeedCalculator() {
  const [unit, setUnit] = useState<'kn' | 'ms'>('kn');
  const [ias, setIas] = useState('181');
  const [oat, setOat] = useState('5');
  const [pressure, setPressure] = useState('800');

  const result = computeTrueAirspeed({
    ias: Number(ias) || 0,
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
              label="Indicated airspeed unit"
              value={unit}
              onChange={(v) => setUnit(v === 'ms' ? 'ms' : 'kn')}
              options={[
                { value: 'kn', label: 'Knots (kn)' },
                { value: 'ms', label: 'Metres per second (m/s)' },
              ]}
            />
            <NumberField label="Indicated airspeed (IAS)" value={ias} onChange={setIas} min={0} step="1" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Outside air temperature (°C)" value={oat} onChange={setOat} step="1" />
              <NumberField
                label="Static pressure (hPa)"
                value={pressure}
                onChange={setPressure}
                min={0}
                step="10"
                hint="≈1013 hPa at sea level, lower at altitude."
              />
            </div>
          </div>
          <Hint>
            TAS = IAS / √σ where σ is the density ratio ρ/ρ₀, computed from the static pressure and
            temperature at flight level.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="True airspeed"
            value={`${formatMoney(result.tas)} kn`}
            sub={`${formatMoney(result.tasMs)} m/s · σ = ${formatMoney(result.sigma, 4)}`}
          />
          <ResultRows>
            <ResultRow label="True airspeed (m/s)" value={`${formatMoney(result.tasMs)} m/s`} />
            <ResultRow label="Mach number" value={formatMoney(result.mach, 3)} />
            <ResultRow label="Density ratio σ" value={formatMoney(result.sigma, 4)} />
            <ResultRow label="Speed of sound" value={`${formatMoney(result.soundSpeedKn)} kn`} />
          </ResultRows>
          <Hint>
            In thin, cold air the same indicated speed corresponds to a much higher true airspeed — which is
            why cruise TAS rises with altitude even when the gauge is unchanged.
          </Hint>
        </Panel>
      }
    />
  );
}

export default TrueAirspeedCalculator;
