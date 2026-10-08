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

export interface DecibelWirelessInput {
  powerA: number;
  powerB: number;
  cableLossDb: number;
}

export function computeDecibelWireless(input: DecibelWirelessInput) {
  const a = Math.max(0, input.powerA);
  const b = Math.max(0, input.powerB);
  const ratioDb = b > 0 && a > 0 ? 10 * Math.log10(a / b) : 0;
  const dbmA = a > 0 ? 10 * Math.log10(a) : 0;
  const dbmB = b > 0 ? 10 * Math.log10(b) : 0;
  const receivedDbm = dbmA - Math.max(0, input.cableLossDb);

  return { ratioDb, dbmA, dbmB, receivedDbm };
}

export function DecibelWirelessCalculator() {
  const [powerA, setPowerA] = useState('1000');
  const [powerB, setPowerB] = useState('10');
  const [cableLossDb, setCableLossDb] = useState('3');

  const result = computeDecibelWireless({
    powerA: Number(powerA) || 0,
    powerB: Number(powerB) || 0,
    cableLossDb: Number(cableLossDb) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Power A (mW)" value={powerA} onChange={setPowerA} min={0} />
              <NumberField label="Power B (mW)" value={powerB} onChange={setPowerB} min={0} />
            </div>
            <NumberField label="Cable loss (dB)" value={cableLossDb} onChange={setCableLossDb} min={0} step="0.1" />
          </div>
          <Hint>
            Decibels are logarithmic: a 3 dB change doubles or halves power, and 10 dB is a factor of ten — which
            is why wireless budgets are added and subtracted rather than multiplied.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Power difference"
            value={`${formatMoney(result.ratioDb)} dB`}
            sub="Power A relative to power B"
          />
          <ResultRows>
            <ResultRow label="Power A in dBm" value={`${formatMoney(result.dbmA)} dBm`} />
            <ResultRow label="Power B in dBm" value={`${formatMoney(result.dbmB)} dBm`} />
            <ResultRow label="Power A after cable loss" value={`${formatMoney(result.receivedDbm)} dBm`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DecibelWirelessCalculator;
