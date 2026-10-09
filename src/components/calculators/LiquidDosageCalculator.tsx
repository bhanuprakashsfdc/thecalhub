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

export interface LiquidDosageInput {
  doseMg: number;
  concentrationMgMl: number;
  dosesPerDay: number;
  bottleMl: number;
}

export interface LiquidDosageResult {
  volumePerDoseMl: number;
  volumePerDayMl: number;
  daysSupply: number;
  concentrationPer5Ml: number;
  dosesPerBottle: number;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const finite = (n: number) => (Number.isFinite(n) ? n : 0);

export function computeLiquidDosage(input: LiquidDosageInput): LiquidDosageResult {
  const doseMg = positive(input.doseMg);
  const concentrationMgMl = positive(input.concentrationMgMl);
  const dosesPerDay = positive(input.dosesPerDay);
  const bottleMl = positive(input.bottleMl);

  const volumePerDoseMl = finite(safeDiv(doseMg, concentrationMgMl));
  const volumePerDayMl = finite(volumePerDoseMl * dosesPerDay);
  const daysSupply = volumePerDayMl > 0 ? finite(bottleMl / volumePerDayMl) : 0;

  return {
    volumePerDoseMl,
    volumePerDayMl,
    daysSupply,
    concentrationPer5Ml: finite(concentrationMgMl * 5),
    dosesPerBottle: volumePerDoseMl > 0 ? finite(bottleMl / volumePerDoseMl) : 0,
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

export function LiquidDosageCalculator() {
  const [dose, setDose] = useState('250');
  const [concentration, setConcentration] = useState('125');
  const [dosesPerDay, setDosesPerDay] = useState('4');
  const [bottle, setBottle] = useState('200');

  const doseMg = toNumber(dose);
  const concentrationMgMl = toNumber(concentration);
  const result = computeLiquidDosage({
    doseMg,
    concentrationMgMl,
    dosesPerDay: toNumber(dosesPerDay),
    bottleMl: toNumber(bottle),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Prescribed dose (mg)" value={dose} onChange={setDose} min={0} />
            <NumberField
              label="Concentration (mg per mL)"
              value={concentration}
              onChange={setConcentration}
              min={0}
              step="0.5"
              hint="Check the label: a 125 mg/5 mL bottle is 25 mg/mL."
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Doses per day" value={dosesPerDay} onChange={setDosesPerDay} min={0} step="1" />
              <NumberField label="Bottle size (mL)" value={bottle} onChange={setBottle} min={0} />
            </div>
          </div>
          <Hint>
            Volume per dose = prescribed dose ÷ concentration in mg per mL. If the label only gives mg per 5 mL,
            divide that figure by 5 first, then multiply the dose volume by doses per day for the daily volume.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Volume per dose"
            value={`${formatMoney(result.volumePerDoseMl)} mL`}
            sub={`${formatMoney(doseMg, 0)} mg at ${formatMoney(concentrationMgMl)} mg/mL • ${formatMoney(
              result.volumePerDayMl
            )} mL per day`}
          />
          <ResultRows>
            <ResultRow label="Volume per day" value={`${formatMoney(result.volumePerDayMl)} mL`} />
            <ResultRow label="Days supply from one bottle" value={`${formatMoney(result.daysSupply)} days`} />
            <ResultRow label="Concentration per 5 mL" value={`${formatMoney(result.concentrationPer5Ml)} mg`} />
            <ResultRow label="Doses per bottle" value={formatMoney(result.dosesPerBottle, 0)} />
          </ResultRows>
          <Hint>
            Days supply divides the bottle size by the daily volume, so a 200 mL bottle taken at 8 mL a day lasts
            25 days. Use a oral syringe rather than a kitchen spoon for small volumes.
          </Hint>
        </Panel>
      }
    />
  );
}

export default LiquidDosageCalculator;
