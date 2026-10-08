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

export interface EvapotranspirationInput {
  referenceETo: number;
  cropCoefficient: number;
  areaSqM: number;
  days: number;
}

export function computeEvapotranspiration(input: EvapotranspirationInput) {
  const reference = Math.max(0, input.referenceETo);
  const kc = Math.max(0, input.cropCoefficient);
  const area = Math.max(0, input.areaSqM);
  const days = Math.max(0, input.days);

  const cropETo = reference * kc;
  const dailyLitres = cropETo * area;
  const totalLitres = dailyLitres * days;
  const weeklyLitres = dailyLitres * 7;
  const dailyGallons = dailyLitres / 3.78541;

  return { cropETo, dailyLitres, totalLitres, weeklyLitres, dailyGallons };
}

export function EvapotranspirationCalculator() {
  const [referenceETo, setReferenceETo] = useState('5');
  const [cropCoefficient, setCropCoefficient] = useState('0.8');
  const [areaSqM, setAreaSqM] = useState('200');
  const [days, setDays] = useState('7');

  const result = computeEvapotranspiration({
    referenceETo: Number(referenceETo) || 0,
    cropCoefficient: Number(cropCoefficient) || 0,
    areaSqM: Number(areaSqM) || 0,
    days: Number(days) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Reference ETo (mm/day)"
                value={referenceETo}
                onChange={setReferenceETo}
                min={0}
                step="0.1"
              />
              <NumberField
                label="Crop coefficient Kc"
                value={cropCoefficient}
                onChange={setCropCoefficient}
                min={0}
                step="0.05"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Area (m²)" value={areaSqM} onChange={setAreaSqM} min={0} />
              <NumberField label="Days" value={days} onChange={setDays} min={0} />
            </div>
          </div>
          <Hint>
            Crop evapotranspiration is the reference ETo scaled by the crop coefficient. One millimetre of water
            over one square metre is exactly one litre, so mm × m² gives litres directly.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Water per day"
            value={`${formatMoney(result.dailyLitres)} L`}
            sub={`${formatMoney(result.totalLitres)} L over ${Number(days) || 0} days`}
          />
          <ResultRows>
            <ResultRow label="Crop evapotranspiration" value={`${formatMoney(result.cropETo)} mm/day`} />
            <ResultRow label="Weekly need" value={`${formatMoney(result.weeklyLitres)} L`} />
            <ResultRow label="Gallons per day" value={formatMoney(result.dailyGallons)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EvapotranspirationCalculator;
