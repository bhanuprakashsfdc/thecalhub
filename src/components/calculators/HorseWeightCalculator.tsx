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

export interface HorseWeightInput {
  heartGirth: number;
  bodyLength: number;
  unit: 'metric' | 'imperial';
}

export interface HorseWeightResult {
  kilograms: number;
  pounds: number;
  forageKg: number;
  category: string;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

export function computeHorseWeight(input: HorseWeightInput): HorseWeightResult {
  const factor = input.unit === 'metric' ? 2.54 : 1;
  const girth = positive(input.heartGirth) / factor;
  const length = positive(input.bodyLength) / factor;

  const pounds = (girth * girth * length) / 300;
  const kilograms = pounds * 0.45359237;
  const forageKg = kilograms * 0.02;

  const category =
    kilograms === 0
      ? 'Enter measurements'
      : kilograms < 360
        ? 'Pony or small horse'
        : kilograms <= 600
          ? 'Average riding horse'
          : 'Heavy horse';

  return { kilograms, pounds, forageKg, category };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

const UNIT_OPTIONS = [
  { value: 'metric', label: 'Centimetres' },
  { value: 'imperial', label: 'Inches' },
];

export function HorseWeightCalculator() {
  const [unit, setUnit] = useState('metric');
  const [girth, setGirth] = useState('180');
  const [length, setLength] = useState('170');

  const activeUnit = unit === 'imperial' ? 'imperial' : 'metric';

  const result = computeHorseWeight({
    heartGirth: toNumber(girth),
    bodyLength: toNumber(length),
    unit: activeUnit,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField label="Measurement unit" value={unit} onChange={setUnit} options={UNIT_OPTIONS} />
            <NumberField
              label="Heart girth"
              value={girth}
              onChange={setGirth}
              min={0}
              hint={`Measured around the barrel directly behind the elbows, in ${activeUnit === 'metric' ? 'centimetres' : 'inches'}.`}
            />
            <NumberField
              label="Body length"
              value={length}
              onChange={setLength}
              min={0}
              hint={`From the point of the shoulder to the point of the buttock, in ${activeUnit === 'metric' ? 'centimetres' : 'inches'}.`}
            />
          </div>
          <Hint>
            The standard livestock tape formula is girth squared times body length divided by 300, giving
            pounds when both measurements are taken in inches.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Estimated body weight"
            value={`${formatMoney(result.kilograms, 1)} kg`}
            sub={`${formatMoney(result.pounds, 1)} lb from girth ${formatMoney(toNumber(girth), 0)} × length ${formatMoney(toNumber(length), 0)}`}
          />
          <ResultRows>
            <ResultRow label="Weight in pounds" value={`${formatMoney(result.pounds, 1)} lb`} />
            <ResultRow label="Weight in kilograms" value={`${formatMoney(result.kilograms, 1)} kg`} />
            <ResultRow label="Daily forage at 2% of weight" value={`${formatMoney(result.forageKg, 1)} kg`} />
            <ResultRow label="Size category" value={result.category} />
          </ResultRows>
          <Hint>
            The forage row applies the usual two percent of body weight rule of thumb, and the category simply
            buckets the estimate into pony, riding horse and heavy horse ranges.
          </Hint>
        </Panel>
      }
    />
  );
}

export default HorseWeightCalculator;
