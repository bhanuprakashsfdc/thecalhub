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
  safeDiv,
} from './kit';

export interface EllipticalDistanceInput {
  strideLengthCm: number;
  stridesPerMinute: number;
  minutes: number;
  bodyWeightKg: number;
}

export interface EllipticalDistanceResult {
  meters: number;
  kilometers: number;
  miles: number;
  speedKmh: number;
  calories: number;
  totalStrides: number;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

const ELLIPTICAL_MET = 5;

export function computeEllipticalDistance(input: EllipticalDistanceInput): EllipticalDistanceResult {
  const stride = positive(input.strideLengthCm);
  const spm = positive(input.stridesPerMinute);
  const minutes = positive(input.minutes);
  const weight = positive(input.bodyWeightKg);

  const meters = (stride / 100) * spm * minutes;
  const kilometers = meters / 1000;

  return {
    meters,
    kilometers,
    miles: meters / 1609.344,
    speedKmh: safeDiv(kilometers, minutes / 60),
    calories: ELLIPTICAL_MET * weight * (minutes / 60),
    totalStrides: spm * minutes,
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

export function EllipticalDistanceCalculator() {
  const [stride, setStride] = useState('50');
  const [spm, setSpm] = useState('60');
  const [minutes, setMinutes] = useState('30');
  const [weight, setWeight] = useState('70');

  const result = computeEllipticalDistance({
    strideLengthCm: toNumber(stride),
    stridesPerMinute: toNumber(spm),
    minutes: toNumber(minutes),
    bodyWeightKg: toNumber(weight),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Stride length (cm)" value={stride} onChange={setStride} min={0} step="0.5" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Strides per minute" value={spm} onChange={setSpm} min={0} />
              <NumberField label="Workout minutes" value={minutes} onChange={setMinutes} min={0} />
            </div>
            <NumberField label="Body weight (kg)" value={weight} onChange={setWeight} min={0} />
          </div>
          <Hint>
            Distance is stride length multiplied by strides per minute and workout time. Calories use a moderate
            elliptical MET of 5 with your body weight, so a 30 minute session at 60 strides per minute covers
            about 900 metres.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Distance travelled"
            value={`${formatMoney(result.kilometers)} km`}
            sub={`${formatMoney(result.meters, 0)} metres over ${formatMoney(result.totalStrides, 0)} strides`}
          />
          <ResultRows>
            <ResultRow label="Distance in miles" value={`${formatMoney(result.miles)} mi`} />
            <ResultRow label="Average speed" value={`${formatMoney(result.speedKmh)} km/h`} />
            <ResultRow label="Calories burned (estimate)" value={`${formatMoney(result.calories, 0)} kcal`} />
            <ResultRow label="Strides completed" value={formatMoney(result.totalStrides, 0)} />
          </ResultRows>
          <Hint>
            Average speed converts the covered distance into kilometres per hour, while the calorie figure is an
            estimate that rises with body weight and session length.
          </Hint>
        </Panel>
      }
    />
  );
}

export default EllipticalDistanceCalculator;
