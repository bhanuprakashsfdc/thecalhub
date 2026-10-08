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

export interface TabletDosageInput {
  weight: number;
  dosePerKg: number;
  strength: number;
  dosesPerDay: number;
  days: number;
}

export function computeTabletDosage(input: TabletDosageInput) {
  const perDose = input.weight * input.dosePerKg;
  const tabletsPerDose = input.strength > 0 ? perDose / input.strength : 0;
  const dosesPerDay = Math.max(0, input.dosesPerDay);
  const days = Math.max(0, input.days);
  const dailyTablets = tabletsPerDose * dosesPerDay;
  const totalTablets = dailyTablets * days;
  const totalDrugG = (perDose * dosesPerDay * days) / 1000;
  return { perDose, tabletsPerDose, dailyTablets, totalTablets, totalDrugG };
}

export function TabletDosageCalculator() {
  const [weight, setWeight] = useState('70');
  const [dosePerKg, setDosePerKg] = useState('10');
  const [strength, setStrength] = useState('500');
  const [dosesPerDay, setDosesPerDay] = useState('3');
  const [days, setDays] = useState('7');

  const result = computeTabletDosage({
    weight: Number(weight) || 0,
    dosePerKg: Number(dosePerKg) || 0,
    strength: Number(strength) || 0,
    dosesPerDay: Number(dosesPerDay) || 0,
    days: Number(days) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Patient weight (kg)" value={weight} onChange={setWeight} min={0} />
              <NumberField label="Dose per kg (mg)" value={dosePerKg} onChange={setDosePerKg} min={0} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Tablet strength (mg)" value={strength} onChange={setStrength} min={0} />
              <NumberField label="Doses per day" value={dosesPerDay} onChange={setDosesPerDay} min={0} />
            </div>
            <NumberField label="Days of treatment" value={days} onChange={setDays} min={0} />
          </div>
          <Hint>
            Enter the prescribed dose per kilogram of body weight; the calculator converts it into tablets, daily
            totals and the full course quantity.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total tablets needed"
            value={formatMoney(result.totalTablets)}
            sub={`Course of ${Number(days) || 0} day(s)`}
          />
          <ResultRows>
            <ResultRow label="Dose per administration (mg)" value={formatMoney(result.perDose)} />
            <ResultRow label="Tablets per dose" value={formatMoney(result.tabletsPerDose)} />
            <ResultRow label="Tablets per day" value={formatMoney(result.dailyTablets)} />
            <ResultRow label="Total drug (g)" value={formatMoney(result.totalDrugG)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TabletDosageCalculator;
