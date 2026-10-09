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

export interface CompatibilityInput {
  doseA: number;
  doseB: number;
  limitA: number;
  limitB: number;
  volumeMl: number;
}

export interface CompatibilityResult {
  finalA: number;
  finalB: number;
  utilization: number;
  requiredVolume: number;
  margin: number;
  verdict: string;
}

const nonNegative = (n: number) => (Number.isFinite(n) && n >= 0 ? n : 0);
const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const finite = (n: number) => (Number.isFinite(n) ? n : 0);

export function computeCompatibility(input: CompatibilityInput): CompatibilityResult {
  const doseA = nonNegative(input.doseA);
  const doseB = nonNegative(input.doseB);
  const limitA = positive(input.limitA);
  const limitB = positive(input.limitB);
  const volumeMl = positive(input.volumeMl);

  const finalA = finite(safeDiv(doseA, volumeMl));
  const finalB = finite(safeDiv(doseB, volumeMl));
  const ratioA = finite(safeDiv(finalA, limitA));
  const ratioB = finite(safeDiv(finalB, limitB));
  const utilization = Math.max(ratioA, ratioB);
  const requiredVolume = finite(Math.max(safeDiv(doseA, limitA), safeDiv(doseB, limitB)));
  const margin = finite(volumeMl - requiredVolume);

  let verdict = 'Compatible';
  if (volumeMl <= 0 || limitA <= 0 || limitB <= 0 || (doseA <= 0 && doseB <= 0)) {
    verdict = 'Awaiting inputs';
  } else if (utilization > 1) {
    verdict = 'Incompatible';
  } else if (utilization > 0.8) {
    verdict = 'Monitor closely';
  }

  return { finalA, finalB, utilization, requiredVolume, margin, verdict };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

export function CompatibilityCalculator() {
  const [doseA, setDoseA] = useState('500');
  const [limitA, setLimitA] = useState('10');
  const [doseB, setDoseB] = useState('200');
  const [limitB, setLimitB] = useState('4');
  const [volume, setVolume] = useState('100');

  const volumeMl = toNumber(volume);
  const result = computeCompatibility({
    doseA: toNumber(doseA),
    doseB: toNumber(doseB),
    limitA: toNumber(limitA),
    limitB: toNumber(limitB),
    volumeMl,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Drug A dose (mg)" value={doseA} onChange={setDoseA} min={0} />
              <NumberField label="Drug A limit (mg/mL)" value={limitA} onChange={setLimitA} min={0} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Drug B dose (mg)" value={doseB} onChange={setDoseB} min={0} />
              <NumberField label="Drug B limit (mg/mL)" value={limitB} onChange={setLimitB} min={0} step="0.1" />
            </div>
            <NumberField
              label="Admixture volume (mL)"
              value={volume}
              onChange={setVolume}
              min={0}
              hint="Total volume both drugs share, typically the IV bag or syringe."
            />
          </div>
          <Hint>
            Final concentration = dose ÷ volume. Each drug is compared with its own maximum safe concentration and
            the tighter of the two ratios decides the verdict: at or below 80% compatible, up to 100% monitor
            closely, above 100% incompatible.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Compatibility verdict"
            value={result.verdict}
            sub={`${formatMoney(result.utilization * 100)}% of the tighter concentration limit in ${formatMoney(
              volumeMl,
              0
            )} mL`}
          />
          <ResultRows>
            <ResultRow label="Final concentration A" value={`${formatMoney(result.finalA)} mg/mL`} />
            <ResultRow label="Final concentration B" value={`${formatMoney(result.finalB)} mg/mL`} />
            <ResultRow label="Minimum volume needed" value={`${formatMoney(result.requiredVolume)} mL`} />
            <ResultRow label="Volume margin" value={`${formatMoney(result.margin)} mL`} />
          </ResultRows>
          <Hint>
            The minimum volume is the larger of dose ÷ limit for the two drugs, so both stay inside their limits.
            A negative margin means the admixture is too concentrated for the bag you entered.
          </Hint>
        </Panel>
      }
    />
  );
}

export default CompatibilityCalculator;
