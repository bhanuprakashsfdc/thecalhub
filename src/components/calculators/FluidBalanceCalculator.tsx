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

export interface FluidBalanceInput {
  iv: number;
  oral: number;
  other: number;
  urine: number;
  vomit: number;
  drains: number;
  hours: number;
}

export interface FluidBalanceResult {
  intake: number;
  output: number;
  net: number;
  netPerHour: number;
  outputPerHour: number;
  ratio: number;
  status: string;
}

const nonNegative = (raw: number) => (Number.isFinite(raw) && raw > 0 ? raw : 0);

export function computeFluidBalance(input: FluidBalanceInput): FluidBalanceResult {
  const intake = nonNegative(input.iv) + nonNegative(input.oral) + nonNegative(input.other);
  const output = nonNegative(input.urine) + nonNegative(input.vomit) + nonNegative(input.drains);
  const hours = nonNegative(input.hours);
  const net = intake - output;

  return {
    intake,
    output,
    net,
    netPerHour: safeDiv(net, hours),
    outputPerHour: safeDiv(output, hours),
    ratio: safeDiv(intake, output),
    status: net > 0 ? 'Positive balance' : net < 0 ? 'Negative balance' : 'Even balance',
  };
}

export function FluidBalanceCalculator() {
  const [values, setValues] = useState<Record<string, string>>({
    iv: '1000',
    oral: '500',
    other: '100',
    urine: '800',
    vomit: '100',
    drains: '100',
    hours: '8',
  });

  const set = (key: string, value: string) => setValues((prev) => ({ ...prev, [key]: value }));
  const num = (key: string) => {
    const raw = values[key];
    return raw.trim() === '' ? Number.NaN : Number(raw);
  };

  const result = computeFluidBalance({
    iv: num('iv'),
    oral: num('oral'),
    other: num('other'),
    urine: num('urine'),
    vomit: num('vomit'),
    drains: num('drains'),
    hours: num('hours'),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Intake (mL)</p>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="IV fluids (mL)" value={values.iv} onChange={(v) => set('iv', v)} min={0} />
              <NumberField label="Oral fluids (mL)" value={values.oral} onChange={(v) => set('oral', v)} min={0} />
            </div>
            <NumberField label="Other intake (mL)" value={values.other} onChange={(v) => set('other', v)} min={0} />
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Output (mL)</p>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Urine output (mL)" value={values.urine} onChange={(v) => set('urine', v)} min={0} />
              <NumberField label="Vomit or NG suction (mL)" value={values.vomit} onChange={(v) => set('vomit', v)} min={0} />
            </div>
            <NumberField label="Drain output (mL)" value={values.drains} onChange={(v) => set('drains', v)} min={0} />
            <NumberField
              label="Hours since last check"
              value={values.hours}
              onChange={(v) => set('hours', v)}
              min={0}
              step="0.5"
            />
          </div>
          <Hint>
            Enter everything recorded over one shift or charting period. Blank or negative entries count as zero
            so the totals stay accurate.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Net fluid balance"
            value={`${result.net >= 0 ? '+' : ''}${formatMoney(result.net)} mL`}
            sub={result.status}
          />
          <ResultRows>
            <ResultRow label="Total intake" value={`${formatMoney(result.intake, 0)} mL`} />
            <ResultRow label="Total output" value={`${formatMoney(result.output, 0)} mL`} />
            <ResultRow
              label="Net per hour"
              value={`${result.netPerHour >= 0 ? '+' : ''}${formatMoney(result.netPerHour)} mL/hr`}
            />
            <ResultRow label="Output per hour" value={`${formatMoney(result.outputPerHour)} mL/hr`} />
            <ResultRow label="Intake to output ratio" value={`${formatMoney(result.ratio)} : 1`} />
          </ResultRows>
          <Hint>
            Hourly rates divide the totals by the hours entered, and the ratio divides intake by output, so an
            output of zero reports a ratio of 0 instead of an infinite number.
          </Hint>
        </Panel>
      }
    />
  );
}

export default FluidBalanceCalculator;
