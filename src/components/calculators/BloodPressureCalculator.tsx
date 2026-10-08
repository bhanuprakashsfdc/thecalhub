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
} from './kit';

export interface BloodPressureInput {
  systolic: number;
  diastolic: number;
  restingHr: number;
}

export function computeBloodPressure(input: BloodPressureInput) {
  const pulsePressure = input.systolic - input.diastolic;
  const map = input.diastolic + pulsePressure / 3;
  const stage =
    input.systolic >= 180 || input.diastolic >= 120
      ? 4
      : input.systolic >= 140 || input.diastolic >= 90
        ? 3
        : input.systolic >= 130 || input.diastolic >= 80
          ? 2
          : input.systolic >= 120 && input.diastolic < 80
            ? 1
            : 0;
  const categories = [
    'Normal',
    'Elevated',
    'Stage 1 hypertension',
    'Stage 2 hypertension',
    'Hypertensive crisis',
  ];
  const ratePressureProduct = input.systolic * input.restingHr;
  const diastolicShare = map > 0 ? (input.diastolic / map) * 100 : 0;
  return {
    pulsePressure,
    map,
    stage,
    category: categories[stage],
    ratePressureProduct,
    diastolicShare,
  };
}

export function BloodPressureCalculator() {
  const [systolic, setSystolic] = useState('120');
  const [diastolic, setDiastolic] = useState('80');
  const [restingHr, setRestingHr] = useState('70');

  const result = computeBloodPressure({
    systolic: Number(systolic) || 0,
    diastolic: Number(diastolic) || 0,
    restingHr: Number(restingHr) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Systolic (mmHg)" value={systolic} onChange={setSystolic} min={0} max={300} />
              <NumberField label="Diastolic (mmHg)" value={diastolic} onChange={setDiastolic} min={0} max={200} />
            </div>
            <NumberField label="Resting heart rate" value={restingHr} onChange={setRestingHr} min={20} max={220} />
          </div>
          <Hint>
            Systolic is the top number and diastolic the bottom number. Mean arterial pressure approximates the
            average pressure your arteries see across one cardiac cycle.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Mean arterial pressure"
            value={`${formatMoney(result.map)} mmHg`}
            sub={result.category}
          />
          <ResultRows>
            <ResultRow label="Pulse pressure" value={`${formatMoney(result.pulsePressure)} mmHg`} />
            <ResultRow label="Rate pressure product" value={formatMoney(result.ratePressureProduct)} />
            <ResultRow label="Diastolic share of MAP (%)" value={formatMoney(result.diastolicShare)} />
            <ResultRow label="Hypertension stage (0-4)" value={formatMoney(result.stage)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default BloodPressureCalculator;
