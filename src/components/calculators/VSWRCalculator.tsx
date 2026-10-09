import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SegmentedControl,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

/** Which quantity the user typed in; the other three are derived. */
export type VSWRSource = 'vswr' | 'gamma' | 'returnLoss';

export interface VSWRInput {
  /** Standing wave ratio, must be 1 or higher (lower values are treated as 1). */
  vswr?: number;
  /** Reflection coefficient magnitude |Γ|, clamped to [0, 1]. */
  gamma?: number;
  /** Return loss in dB; |Γ| = 10^(−RL/20). */
  returnLoss?: number;
  /** Characteristic impedance of the line in ohms (defaults to 50). */
  impedance?: number;
}

export interface VSWRResult {
  vswr: number;
  gamma: number;
  returnLoss: number;
  mismatchLoss: number;
  load: number;
}

/** First finite supplied quantity wins: vswr, then gamma, then returnLoss. */
function normaliseGamma(input: VSWRInput): number {
  if (input.vswr !== undefined && Number.isFinite(input.vswr)) {
    const vswr = Math.max(1, input.vswr);
    return (vswr - 1) / (vswr + 1);
  }
  if (input.gamma !== undefined && Number.isFinite(input.gamma)) {
    return Math.min(1, Math.max(0, input.gamma));
  }
  if (input.returnLoss !== undefined && Number.isFinite(input.returnLoss)) {
    return Math.min(1, Math.max(0, Math.pow(10, -input.returnLoss / 20)));
  }
  return 0;
}

/** Maps −0 onto +0 so a perfect match never renders as "-0.00". */
const clean = (value: number) => (value === 0 ? 0 : value);

export function computeVSWR(input: VSWRInput): VSWRResult {
  const gamma = normaliseGamma(input);
  const vswr = gamma < 1 ? (1 + gamma) / (1 - gamma) : Infinity;
  const returnLoss = gamma > 0 ? clean(-20 * Math.log10(gamma)) : Infinity;
  const mismatchLoss = gamma < 1 ? clean(-10 * Math.log10(1 - gamma * gamma)) : Infinity;
  const z0 =
    input.impedance !== undefined && Number.isFinite(input.impedance) && input.impedance > 0
      ? input.impedance
      : 50;
  const load = gamma < 1 ? (z0 * (1 + gamma)) / (1 - gamma) : Infinity;

  return { vswr, gamma, returnLoss, mismatchLoss, load };
}

const db = (value: number) => (Number.isFinite(value) ? `${formatMoney(value)} dB` : 'Infinite');
const ohm = (value: number) => (Number.isFinite(value) ? `${formatMoney(value)} ohm` : 'Infinite');

export function VSWRCalculator() {
  const [source, setSource] = useState<VSWRSource>('vswr');
  const [vswr, setVswr] = useState('1.5');
  const [gamma, setGamma] = useState('0.2');
  const [returnLoss, setReturnLoss] = useState('14');
  const [impedance, setImpedance] = useState('50');

  const input: VSWRInput = { impedance: Number(impedance) };
  if (source === 'vswr') input.vswr = Number(vswr);
  else if (source === 'gamma') input.gamma = Number(gamma);
  else input.returnLoss = Number(returnLoss);

  const result = computeVSWR(input);

  const valueField =
    source === 'vswr' ? (
      <NumberField
        label="VSWR"
        value={vswr}
        onChange={setVswr}
        min={1}
        step="0.01"
        hint="1.00 is a perfect match; anything under 1.5:1 is healthy."
      />
    ) : source === 'gamma' ? (
      <NumberField
        label="Reflection coefficient |Γ|"
        value={gamma}
        onChange={setGamma}
        min={0}
        max={1}
        step="0.01"
        hint="Share of the wave that bounces back, from 0 (none) to 1 (all)."
      />
    ) : (
      <NumberField
        label="Return loss (dB)"
        value={returnLoss}
        onChange={setReturnLoss}
        min={0}
        step="0.1"
        hint="Higher is better: how many dB the reflected wave is attenuated."
      />
    );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SegmentedControl
              label="Input type"
              value={source}
              onChange={(value) => setSource(value as VSWRSource)}
              options={[
                { value: 'vswr', label: 'VSWR' },
                { value: 'gamma', label: 'Reflection coefficient' },
                { value: 'returnLoss', label: 'Return loss' },
              ]}
            />
            {valueField}
            <NumberField label="System impedance (ohm)" value={impedance} onChange={setImpedance} min={1} />
          </div>
          <Hint>
            VSWR = (1 + |Γ|) / (1 − |Γ|), return loss = −20·log10(|Γ|) and mismatch loss =
            −10·log10(1 − |Γ|²). Anything under 1.5:1 is usually fine for antennas; a rising VSWR
            often means a damaged cable or connector.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="VSWR"
            value={Number.isFinite(result.vswr) ? formatMoney(result.vswr) : 'Infinite'}
            sub={`Reflected power ${formatMoney(result.gamma * result.gamma * 100)}% of forward`}
          />
          <ResultRows>
            <ResultRow label="Reflection coefficient |Γ|" value={formatMoney(result.gamma)} />
            <ResultRow label="Return loss (dB)" value={db(result.returnLoss)} />
            <ResultRow label="Mismatch loss (dB)" value={db(result.mismatchLoss)} />
            <ResultRow label="Load impedance (ohm)" value={ohm(result.load)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default VSWRCalculator;
