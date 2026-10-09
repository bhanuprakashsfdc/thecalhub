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

export interface IvPumpRateInput {
  volumeMl: number;
  durationHr: number;
  dropFactor: number;
}

export interface IvPumpRateResult {
  flowRateMlHr: number;
  dropRateGttMin: number;
  durationMin: number;
  totalDrops: number;
  mlPer15Min: number;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

export function computeIvPumpRate(input: IvPumpRateInput): IvPumpRateResult {
  const volumeMl = positive(input.volumeMl);
  const durationHr = positive(input.durationHr);
  const dropFactor = positive(input.dropFactor);

  const flowRateMlHr = positive(safeDiv(volumeMl, durationHr));
  const dropRateGttMin = positive((flowRateMlHr * dropFactor) / 60);
  const durationMin = positive(durationHr * 60);
  const totalDrops = positive(volumeMl * dropFactor);
  const mlPer15Min = positive(flowRateMlHr / 4);

  return { flowRateMlHr, dropRateGttMin, durationMin, totalDrops, mlPer15Min };
}

const DROP_FACTORS = [
  { value: '10', label: '10 gtt/mL — blood or large-bore set' },
  { value: '15', label: '15 gtt/mL — standard adult set' },
  { value: '20', label: '20 gtt/mL — standard adult set' },
  { value: '60', label: '60 gtt/mL — pediatric micro drip' },
];

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export function IVPumpRateCalculator() {
  const [volume, setVolume] = useState('1000');
  const [duration, setDuration] = useState('8');
  const [dropFactor, setDropFactor] = useState('20');

  const volumeMl = toNumber(volume);
  const durationHr = toNumber(duration);

  const result = computeIvPumpRate({
    volumeMl,
    durationHr,
    dropFactor: Number(dropFactor) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Volume to infuse (mL)" value={volume} onChange={setVolume} min={0} />
            <NumberField label="Infusion time (hours)" value={duration} onChange={setDuration} min={0} step="0.5" />
            <SelectField
              label="Drop factor (gtt/mL)"
              value={dropFactor}
              onChange={setDropFactor}
              options={DROP_FACTORS}
            />
          </div>
          <Hint>
            Flow rate is volume divided by time. Drop rate is flow rate × drop factor ÷ 60, so a 1,000 mL bag over
            8 hours on a 20 gtt/mL set runs at 125 mL/hr and 41.67 gtt/min.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Pump flow rate"
            value={`${formatMoney(result.flowRateMlHr)} mL/hr`}
            sub={`${formatMoney(volumeMl, 0)} mL over ${formatMoney(durationHr)} hours using the ${dropFactor} gtt/mL set`}
          />
          <ResultRows>
            <ResultRow label="Drop rate" value={`${formatMoney(result.dropRateGttMin)} gtt/min`} />
            <ResultRow label="Infusion time" value={`${formatMoney(result.durationMin, 0)} min`} />
            <ResultRow label="Total drops in the bag" value={formatMoney(result.totalDrops, 0)} />
            <ResultRow label="Volume delivered per 15 min" value={`${formatMoney(result.mlPer15Min)} mL`} />
          </ResultRows>
          <Hint>
            Use the drop rate for gravity infusions: count the drops over one minute and adjust the roller clamp
            until the count matches. Volumes are in mL and time in hours.
          </Hint>
        </Panel>
      }
    />
  );
}

export default IVPumpRateCalculator;
