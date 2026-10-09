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
  safeDiv,
} from './kit';

export interface InfusionRateInput {
  volume: number;
  dropFactor: number;
  hours: number;
}

export interface InfusionRateResult {
  gttPerMin: number;
  mLPerHour: number;
  mLPerMin: number;
  totalDrops: number;
  minutes: number;
}

const positive = (raw: number) => (Number.isFinite(raw) && raw > 0 ? raw : 0);

export function computeInfusionRate(input: InfusionRateInput): InfusionRateResult {
  const volume = positive(input.volume);
  const dropFactor = positive(input.dropFactor);
  const hours = positive(input.hours);
  const minutes = hours * 60;

  return {
    gttPerMin: safeDiv(volume * dropFactor, minutes),
    mLPerHour: safeDiv(volume, hours),
    mLPerMin: safeDiv(volume, minutes),
    totalDrops: volume * dropFactor,
    minutes,
  };
}

export function InfusionRateCalculator() {
  const [volume, setVolume] = useState('1000');
  const [dropFactor, setDropFactor] = useState('20');
  const [hours, setHours] = useState('8');

  const toNumber = (raw: string) => (raw.trim() === '' ? Number.NaN : Number(raw));

  const result = computeInfusionRate({
    volume: toNumber(volume),
    dropFactor: toNumber(dropFactor),
    hours: toNumber(hours),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-4">
            <NumberField
              label="Volume to infuse (mL)"
              value={volume}
              onChange={setVolume}
              min={0}
              step="10"
            />
            <SelectField
              label="Drop factor (gtt/mL)"
              value={dropFactor}
              onChange={setDropFactor}
              options={[
                { value: '10', label: '10 gtt/mL — macro drip' },
                { value: '15', label: '15 gtt/mL — macro drip' },
                { value: '20', label: '20 gtt/mL — macro drip' },
                { value: '60', label: '60 gtt/mL — micro drip' },
              ]}
            />
            <NumberField
              label="Infusion time (hours)"
              value={hours}
              onChange={setHours}
              min={0}
              step="0.5"
              hint="Order time for the whole bag, for example 8 hours"
            />
          </div>
          <Hint>
            Drops per minute equals volume in millilitres times the drop factor, divided by the infusion time in
            minutes.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Drip rate"
            value={`${formatMoney(result.gttPerMin, 1)} gtt/min`}
            sub={`${formatMoney(result.mLPerHour)} mL/hr over ${formatMoney(result.minutes, 0)} minutes`}
          />
          <ResultRows>
            <ResultRow label="Rate in mL per hour" value={`${formatMoney(result.mLPerHour)} mL/hr`} />
            <ResultRow label="Rate in mL per minute" value={`${formatMoney(result.mLPerMin)} mL/min`} />
            <ResultRow label="Total drops in bag" value={formatMoney(result.totalDrops, 0)} />
            <ResultRow label="Total infusion time" value={`${formatMoney(result.minutes, 0)} minutes`} />
          </ResultRows>
          <Hint>
            The drip rate is rounded to one decimal place for display, so count the actual drops and adjust if the
            prescribed time has not been met. A zero infusion time reports a rate of zero.
          </Hint>
        </Panel>
      }
    />
  );
}

export default InfusionRateCalculator;
