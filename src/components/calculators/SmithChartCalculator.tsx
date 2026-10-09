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

export interface SmithChartInput {
  impedance: number;
  resistance: number;
  reactance: number;
}

export function computeSmithChart(input: SmithChartInput) {
  const z0 = Number.isFinite(input.impedance) ? Math.max(1, input.impedance) : 50;
  const r = Number.isFinite(input.resistance) ? Math.max(0, input.resistance) : Infinity;
  const x = Number.isFinite(input.reactance) ? input.reactance : Infinity;

  let gamma = 1;
  if (Number.isFinite(r) && Number.isFinite(x)) {
    const numerator = Math.pow(r - z0, 2) + Math.pow(x, 2);
    const denominator = Math.pow(r + z0, 2) + Math.pow(x, 2);
    gamma = denominator > 0 ? Math.min(1, Math.sqrt(numerator / denominator)) : 1;
  }

  const vswr = gamma < 1 ? (1 + gamma) / (1 - gamma) : Infinity;
  const returnLoss = gamma === 0 ? Infinity : gamma >= 1 ? 0 : -20 * Math.log10(gamma);
  const magnitude = Math.hypot(r, x);

  return { gamma, vswr, returnLoss, magnitude };
}

export function SmithChartCalculator() {
  const [impedance, setImpedance] = useState('50');
  const [resistance, setResistance] = useState('75');
  const [reactance, setReactance] = useState('0');

  const result = computeSmithChart({
    impedance: Number(impedance) || 0,
    resistance: Number(resistance) || 0,
    reactance: Number(reactance) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Characteristic impedance (ohm)" value={impedance} onChange={setImpedance} min={1} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Load resistance (ohm)" value={resistance} onChange={setResistance} min={0} />
              <NumberField label="Load reactance (ohm)" value={reactance} onChange={setReactance} step="0.1" />
            </div>
          </div>
          <Hint>
            The reflection coefficient is the distance from the chart centre: a matched load sits at the centre
            (VSWR 1:1), and every step outward means more reflected power.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="VSWR"
            value={Number.isFinite(result.vswr) ? formatMoney(result.vswr) : '∞'}
            sub={`Reflection coefficient ${formatMoney(result.gamma)}`}
          />
          <ResultRows>
            <ResultRow
              label="Return loss (dB)"
              value={Number.isFinite(result.returnLoss) ? `${formatMoney(result.returnLoss)} dB` : '∞ dB'}
            />
            <ResultRow label="Impedance magnitude" value={`${formatMoney(result.magnitude)} ohm`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SmithChartCalculator;
