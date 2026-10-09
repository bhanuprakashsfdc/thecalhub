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

export interface TubeFeedingInput {
  targetKcal: number;
  kcalPerMl: number;
  hours: number;
  freeWaterPct: number;
}

export interface TubeFeedingResult {
  volume: number;
  rate: number;
  freeWater: number;
  freeWaterPerHour: number;
  waterPer100Kcal: number;
}

const positive = (raw: number) => (Number.isFinite(raw) && raw > 0 ? raw : 0);

export function computeTubeFeeding(input: TubeFeedingInput): TubeFeedingResult {
  const targetKcal = positive(input.targetKcal);
  const kcalPerMl = positive(input.kcalPerMl);
  const hours = positive(input.hours);
  const freeWaterPct = Number.isFinite(input.freeWaterPct)
    ? Math.min(100, Math.max(0, input.freeWaterPct))
    : 0;

  const volume = safeDiv(targetKcal, kcalPerMl);
  const freeWater = (volume * freeWaterPct) / 100;

  return {
    volume,
    rate: safeDiv(volume, hours),
    freeWater,
    freeWaterPerHour: safeDiv(freeWater, hours),
    waterPer100Kcal: safeDiv(freeWater, targetKcal) * 100,
  };
}

export function TubeFeedingCalculator() {
  const [targetKcal, setTargetKcal] = useState('1800');
  const [kcalPerMl, setKcalPerMl] = useState('1.5');
  const [hours, setHours] = useState('20');
  const [freeWaterPct, setFreeWaterPct] = useState('80');

  const toNumber = (raw: string) => (raw.trim() === '' ? Number.NaN : Number(raw));

  const result = computeTubeFeeding({
    targetKcal: toNumber(targetKcal),
    kcalPerMl: toNumber(kcalPerMl),
    hours: toNumber(hours),
    freeWaterPct: toNumber(freeWaterPct),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-4">
            <NumberField
              label="Target calories per day (kcal)"
              value={targetKcal}
              onChange={setTargetKcal}
              min={0}
              step="50"
            />
            <SelectField
              label="Formula energy density (kcal/mL)"
              value={kcalPerMl}
              onChange={setKcalPerMl}
              options={[
                { value: '1.0', label: '1.0 kcal/mL — standard' },
                { value: '1.2', label: '1.2 kcal/mL — concentrated' },
                { value: '1.5', label: '1.5 kcal/mL — high calorie' },
                { value: '2.0', label: '2.0 kcal/mL — very high calorie' },
              ]}
            />
            <NumberField
              label="Feeding hours per day"
              value={hours}
              onChange={setHours}
              min={0}
              max={24}
              step="0.5"
              hint="Continuous feeding usually runs 18 to 24 hours"
            />
            <NumberField
              label="Free water in formula (%)"
              value={freeWaterPct}
              onChange={setFreeWaterPct}
              min={0}
              max={100}
              hint="Typical standard formulas are 70 to 85 percent free water"
            />
          </div>
          <Hint>
            Volume needed is the calorie target divided by the formula strength, and the pump rate is that volume
            spread across the feeding hours.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Pump rate"
            value={`${formatMoney(result.rate)} mL/hr`}
            sub={`${formatMoney(result.volume, 0)} mL of formula delivered per day`}
          />
          <ResultRows>
            <ResultRow label="Formula volume per day" value={`${formatMoney(result.volume, 0)} mL`} />
            <ResultRow label="Free water per day" value={`${formatMoney(result.freeWater, 0)} mL`} />
            <ResultRow label="Free water per hour" value={`${formatMoney(result.freeWaterPerHour)} mL/hr`} />
            <ResultRow label="Water per 100 kcal" value={`${formatMoney(result.waterPer100Kcal)} mL`} />
          </ResultRows>
          <Hint>
            Free water comes from the formula only, so any prescribed flushes are additional. Zero or invalid
            inputs report a rate of zero rather than an infinite value.
          </Hint>
        </Panel>
      }
    />
  );
}

export default TubeFeedingCalculator;
