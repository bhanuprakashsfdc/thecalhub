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

const RDA = { a: 900, c: 90, d: 20, b12: 2.4 };

export interface VitaminInput {
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminB12: number;
}

export function computeVitamins(input: VitaminInput) {
  const a = Math.max(0, input.vitaminA);
  const c = Math.max(0, input.vitaminC);
  const d = Math.max(0, input.vitaminD);
  const b12 = Math.max(0, input.vitaminB12);

  const aPct = (a / RDA.a) * 100;
  const cPct = (c / RDA.c) * 100;
  const dPct = (d / RDA.d) * 100;
  const b12Pct = (b12 / RDA.b12) * 100;

  const meeting = [aPct, cPct, dPct, b12Pct].filter((p) => p >= 100).length;
  const average = (aPct + cPct + dPct + b12Pct) / 4;

  return { aPct, cPct, dPct, b12Pct, meeting, average };
}

export function VitaminCalculator() {
  const [vitaminA, setVitaminA] = useState('900');
  const [vitaminC, setVitaminC] = useState('45');
  const [vitaminD, setVitaminD] = useState('20');
  const [vitaminB12, setVitaminB12] = useState('2.4');

  const result = computeVitamins({
    vitaminA: Number(vitaminA) || 0,
    vitaminC: Number(vitaminC) || 0,
    vitaminD: Number(vitaminD) || 0,
    vitaminB12: Number(vitaminB12) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Vitamin A (mcg RAE)" value={vitaminA} onChange={setVitaminA} min={0} />
              <NumberField label="Vitamin C (mg)" value={vitaminC} onChange={setVitaminC} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Vitamin D (mcg)" value={vitaminD} onChange={setVitaminD} min={0} step="0.5" />
              <NumberField label="Vitamin B12 (mcg)" value={vitaminB12} onChange={setVitaminB12} min={0} step="0.1" />
            </div>
          </div>
          <Hint>
            Percentages are against adult reference intakes: vitamin A 900 mcg RAE, vitamin C 90 mg, vitamin D
            20 mcg and vitamin B12 2.4 mcg. Supplement megadoses are not advised without medical guidance.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Vitamins at target"
            value={`${result.meeting} of 4`}
            sub={`${formatMoney(result.average, 0)}% of the reference intake on average`}
          />
          <ResultRows>
            <ResultRow label="Vitamin A" value={`${formatMoney(result.aPct, 0)}%`} />
            <ResultRow label="Vitamin C" value={`${formatMoney(result.cPct, 0)}%`} />
            <ResultRow label="Vitamin D" value={`${formatMoney(result.dPct, 0)}%`} />
            <ResultRow label="Vitamin B12" value={`${formatMoney(result.b12Pct, 0)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default VitaminCalculator;
