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

export interface RfPowerInput {
  /** Input power in dBm (dB re 1 mW); negative values are valid. */
  powerDbm: number;
  /** Gain added along the chain, in dB. Defaults to 0. */
  gainDb?: number;
  /** Loss subtracted along the chain, in dB. Defaults to 0. */
  lossDb?: number;
  /** Load impedance in ohms; negative values are clamped to 0. */
  impedance: number;
}

export interface RfPowerResult {
  /** P_out in dBm: P_in + gain - loss. */
  outputDbm: number;
  /** P_out in dBW: dBm - 30. */
  outputDbW: number;
  watts: number;
  milliwatts: number;
  /** RMS voltage across the load, sqrt(P x R). */
  voltage: number;
}

const finite = (n: number | undefined) => (typeof n === 'number' && Number.isFinite(n) ? n : 0);

export function computeRfPower(input: RfPowerInput): RfPowerResult {
  const powerDbm = finite(input.powerDbm);
  const gainDb = finite(input.gainDb);
  const lossDb = finite(input.lossDb);
  const impedance = Math.max(0, finite(input.impedance));

  const outputDbm = powerDbm + gainDb - lossDb;
  const outputDbW = outputDbm - 30;
  const watts = Math.pow(10, outputDbW / 10);
  const milliwatts = watts * 1000;
  const voltage = Math.sqrt(watts * impedance);

  return { outputDbm, outputDbW, watts, milliwatts, voltage };
}

export function RfPowerCalculator() {
  const [powerDbm, setPowerDbm] = useState('20');
  const [gainDb, setGainDb] = useState('0');
  const [lossDb, setLossDb] = useState('0');
  const [impedance, setImpedance] = useState('50');

  const result = computeRfPower({
    powerDbm: Number(powerDbm),
    gainDb: Number(gainDb),
    lossDb: Number(lossDb),
    impedance: Number(impedance),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Input power (dBm)" value={powerDbm} onChange={setPowerDbm} step="0.1" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Gain (dB)" value={gainDb} onChange={setGainDb} step="0.1" />
              <NumberField label="Loss (dB)" value={lossDb} onChange={setLossDb} min={0} step="0.1" />
            </div>
            <NumberField label="Impedance (Ω)" value={impedance} onChange={setImpedance} min={0} step="1" />
          </div>
          <Hint>
            Link budgets add in dB: P_out = P_in + gain - loss. dBW is dBm minus 30, and linear power
            follows P(W) = 10^(dBW / 10). The load voltage is the RMS value sqrt(P x R).
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Output power"
            value={`${formatMoney(result.watts)} W`}
            sub={`${formatMoney(result.outputDbm)} dBm at the load`}
          />
          <ResultRows>
            <ResultRow label="Power (dBm)" value={formatMoney(result.outputDbm)} />
            <ResultRow label="Power (dBW)" value={formatMoney(result.outputDbW)} />
            <ResultRow label="Power (mW)" value={formatMoney(result.milliwatts)} />
            <ResultRow label="Voltage across load (V)" value={formatMoney(result.voltage)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RfPowerCalculator;
