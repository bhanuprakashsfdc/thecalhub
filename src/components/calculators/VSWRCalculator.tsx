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

export interface VSWRInput {
  forwardPower: number;
  reflectedPower: number;
  impedance: number;
}

export function computeVSWR(input: VSWRInput) {
  const forward = Math.max(0, input.forwardPower);
  const reflected = Math.max(0, input.reflectedPower);
  const gamma = forward > 0 ? Math.sqrt(Math.min(1, reflected / forward)) : 1;
  const vswr = gamma < 1 ? (1 + gamma) / (1 - gamma) : Infinity;
  const returnLoss = reflected > 0 && forward > 0 ? 10 * Math.log10(forward / reflected) : Infinity;
  const z0 = Math.max(1, input.impedance);
  const load = gamma < 1 ? (z0 * (1 + gamma)) / (1 - gamma) : Infinity;

  return { gamma, vswr, returnLoss, load };
}

export function VSWRCalculator() {
  const [forwardPower, setForwardPower] = useState('100');
  const [reflectedPower, setReflectedPower] = useState('4');
  const [impedance, setImpedance] = useState('50');

  const result = computeVSWR({
    forwardPower: Number(forwardPower) || 0,
    reflectedPower: Number(reflectedPower) || 0,
    impedance: Number(impedance) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Forward power (W)" value={forwardPower} onChange={setForwardPower} min={0} step="0.5" />
              <NumberField label="Reflected power (W)" value={reflectedPower} onChange={setReflectedPower} min={0} step="0.1" />
            </div>
            <NumberField label="System impedance (ohm)" value={impedance} onChange={setImpedance} min={1} />
          </div>
          <Hint>
            VSWR measures how much energy bounces back to the transmitter. Anything under 1.5:1 is usually fine
            for antennas; a rising VSWR often means a damaged cable or connector.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="VSWR"
            value={Number.isFinite(result.vswr) ? formatMoney(result.vswr) : 'Infinite'}
            sub={`Reflection coefficient ${formatMoney(result.gamma)}`}
          />
          <ResultRows>
            <ResultRow
              label="Return loss (dB)"
              value={Number.isFinite(result.returnLoss) ? `${formatMoney(result.returnLoss)} dB` : '0 dB'}
            />
            <ResultRow
              label="Reflected impedance"
              value={Number.isFinite(result.load) ? `${formatMoney(result.load)} ohm` : 'Infinite'}
            />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default VSWRCalculator;
