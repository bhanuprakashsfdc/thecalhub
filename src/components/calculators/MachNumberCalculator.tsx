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

export interface MachNumberInput {
  tas: number;
  unit: 'kn' | 'ms';
  oatC: number;
  staticPressureHpa: number;
}

export interface MachNumberResult {
  mach: number;
  soundSpeedMs: number;
  soundSpeedKn: number;
  tasMs: number;
  eas: number;
  regime: string;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const finite = (n: number) => (Number.isFinite(n) ? n : 0);
const P0 = 101325;
const A0_KN = 661.4788;
const KN_PER_MS = 1.943843;

export function computeMachNumber(input: MachNumberInput): MachNumberResult {
  const tasKn = input.unit === 'ms' ? positive(input.tas) * KN_PER_MS : positive(input.tas);
  const oatC = finite(input.oatC);
  const tK = oatC + 273.15;
  const p = positive(input.staticPressureHpa) * 100;

  if (tK <= 1) {
    return { mach: 0, soundSpeedMs: 0, soundSpeedKn: 0, tasMs: 0, eas: 0, regime: '—' };
  }

  const soundSpeedMs = Math.sqrt(1.4 * 287.058 * tK);
  const soundSpeedKn = soundSpeedMs * KN_PER_MS;
  const tasMs = tasKn / KN_PER_MS;
  const mach = soundSpeedKn > 0 ? tasKn / soundSpeedKn : 0;
  const eas = p > 0 ? mach * A0_KN * Math.sqrt(p / P0) : 0;

  const regime =
    mach === 0
      ? '—'
      : mach < 0.8
        ? 'Subsonic'
        : mach < 1.2
          ? 'Transonic'
          : mach < 5
            ? 'Supersonic'
            : 'Hypersonic';

  return { mach, soundSpeedMs, soundSpeedKn, tasMs, eas, regime };
}

export function MachNumberCalculator() {
  const [unit, setUnit] = useState<'kn' | 'ms'>('kn');
  const [tas, setTas] = useState('250');
  const [oat, setOat] = useState('-20');
  const [pressure, setPressure] = useState('300');

  const result = computeMachNumber({
    tas: Number(tas) || 0,
    unit,
    oatC: Number(oat) || 0,
    staticPressureHpa: Number(pressure) || 0,
  });

  const tasDisplay = unit === 'kn' ? `${formatMoney(result.mach > 0 ? Number(tas) || 0 : 0)} kn` : `${formatMoney(Number(tas) || 0)} m/s`;

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
                hint="≈1013 at sea level, ≈300 near FL300."
              />
            </div>
          </div>
          <Hint>
            Speed of sound a = √(γ·R·T) with γ = 1.4 and R = 287.06 J/(kg·K); Mach number M = TAS / a.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Mach number" value={formatMoney(result.mach, 3)} sub={`${result.regime} · TAS ${tasDisplay}`} />
          <ResultRows>
            <ResultRow label="Speed of sound" value={`${formatMoney(result.soundSpeedMs)} m/s`} />
            <ResultRow label="Speed of sound" value={`${formatMoney(result.soundSpeedKn)} kn`} />
            <ResultRow label="True airspeed" value={`${formatMoney(result.tasMs)} m/s`} />
            <ResultRow label="Equivalent airspeed (EAS)" value={`${formatMoney(result.eas)} kn`} />
          </ResultRows>
          <Hint>
            The speed of sound depends only on air temperature: colder air means a lower sound speed and a
            higher Mach for the same true airspeed. EAS ≈ M·a₀·√(p/p₀).
          </Hint>
        </Panel>
      }
    />
  );
}

export default MachNumberCalculator;
