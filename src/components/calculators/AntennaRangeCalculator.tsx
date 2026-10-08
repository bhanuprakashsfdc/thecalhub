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

export interface AntennaRangeInput {
  txPowerDbm: number;
  frequencyGhz: number;
  txGain: number;
  rxGain: number;
  sensitivityDbm: number;
}

export function computeAntennaRange(input: AntennaRangeInput) {
  const linkBudget =
    Math.max(0, input.txPowerDbm) + Math.max(0, input.txGain) + Math.max(0, input.rxGain) - input.sensitivityDbm;
  const frequencyMhz = Math.max(0, input.frequencyGhz) * 1000;
  const constant = 20 * Math.log10(frequencyMhz) + 32.44;
  const exponent = (linkBudget - constant) / 20;
  const distanceKm = Math.pow(10, exponent);
  const distanceMiles = distanceKm * 0.621371;

  return { linkBudget, constant, distanceKm, distanceMiles };
}

export function AntennaRangeCalculator() {
  const [txPowerDbm, setTxPowerDbm] = useState('20');
  const [frequencyGhz, setFrequencyGhz] = useState('2.4');
  const [txGain, setTxGain] = useState('5');
  const [rxGain, setRxGain] = useState('5');
  const [sensitivityDbm, setSensitivityDbm] = useState('-85');

  const result = computeAntennaRange({
    txPowerDbm: Number(txPowerDbm) || 0,
    frequencyGhz: Number(frequencyGhz) || 0,
    txGain: Number(txGain) || 0,
    rxGain: Number(rxGain) || 0,
    sensitivityDbm: Number(sensitivityDbm) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Transmit power (dBm)" value={txPowerDbm} onChange={setTxPowerDbm} step="0.5" />
              <NumberField label="Frequency (GHz)" value={frequencyGhz} onChange={setFrequencyGhz} min={0.01} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Transmit gain (dBi)" value={txGain} onChange={setTxGain} step="0.1" />
              <NumberField label="Receive gain (dBi)" value={rxGain} onChange={setRxGain} step="0.1" />
            </div>
            <NumberField label="Receiver sensitivity (dBm)" value={sensitivityDbm} onChange={setSensitivityDbm} step="0.5" />
          </div>
          <Hint>
            Free-space range grows with every dB of link budget, but higher frequencies lose more over the same
            distance — the 2.4 GHz range is always longer than 5 GHz with identical hardware.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Maximum range"
            value={`${formatMoney(result.distanceKm)} km`}
            sub={`Free-space path loss of ${formatMoney(result.linkBudget)} dB`}
          />
          <ResultRows>
            <ResultRow label="Range in miles" value={`${formatMoney(result.distanceMiles)} mi`} />
            <ResultRow label="Frequency constant" value={formatMoney(result.constant)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AntennaRangeCalculator;
