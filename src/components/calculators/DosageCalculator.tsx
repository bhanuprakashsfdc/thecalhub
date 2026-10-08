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

export interface DosageInput {
  weight: number;
  dosePerKg: number;
  concentration: number;
  dosesPerDay: number;
}

export function computeDosage(input: DosageInput) {
  const dosePerAdministration = input.weight * input.dosePerKg;
  const volumePerDose = input.concentration > 0 ? dosePerAdministration / input.concentration : 0;
  const dailyDose = dosePerAdministration * Math.max(0, input.dosesPerDay);
  const weeklyDose = dailyDose * 7;
  return { dosePerAdministration, volumePerDose, dailyDose, weeklyDose };
}

export function DosageCalculator() {
  const [weight, setWeight] = useState('70');
  const [dosePerKg, setDosePerKg] = useState('5');
  const [concentration, setConcentration] = useState('100');
  const [dosesPerDay, setDosesPerDay] = useState('2');

  const result = computeDosage({
    weight: Number(weight) || 0,
    dosePerKg: Number(dosePerKg) || 0,
    concentration: Number(concentration) || 0,
    dosesPerDay: Number(dosesPerDay) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Body weight (kg)" value={weight} onChange={setWeight} min={0} />
              <NumberField
                label="Dose per kg (mg)"
                value={dosePerKg}
                onChange={setDosePerKg}
                min={0}
                step="0.1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Concentration (mg/mL)"
                value={concentration}
                onChange={setConcentration}
                min={0}
                step="0.1"
              />
              <NumberField label="Doses per day" value={dosesPerDay} onChange={setDosesPerDay} min={0} />
            </div>
          </div>
          <Hint>
            Always confirm the prescribed dose per kilogram against the product label before administering; this
            calculator only performs the arithmetic.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Volume per dose"
            value={`${formatMoney(result.volumePerDose)} mL`}
            sub={`${formatMoney(result.dosePerAdministration)} mg per administration`}
          />
          <ResultRows>
            <ResultRow label="Dose per administration (mg)" value={formatMoney(result.dosePerAdministration)} />
            <ResultRow label="Daily dose (mg)" value={formatMoney(result.dailyDose)} />
            <ResultRow label="Weekly dose (mg)" value={formatMoney(result.weeklyDose)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DosageCalculator;
