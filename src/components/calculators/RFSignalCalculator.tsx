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

export interface RFSignalInput {
  txPowerDbm: number;
  txGain: number;
  rxGain: number;
  pathLoss: number;
  cableLoss: number;
  sensitivityDbm: number;
}

export function computeRFSignal(input: RFSignalInput) {
  const atAntenna = Math.max(0, input.txPowerDbm) + Math.max(0, input.txGain) - Math.max(0, input.cableLoss);
  const received = atAntenna + Math.max(0, input.rxGain) - Math.max(0, input.pathLoss);
  const margin = received - input.sensitivityDbm;
  const marginOk = margin >= 0;

  return { atAntenna, received, margin, marginOk };
}

export function RFSignalCalculator() {
  const [txPowerDbm, setTxPowerDbm] = useState('30');
  const [txGain, setTxGain] = useState('2');
  const [rxGain, setRxGain] = useState('2');
  const [pathLoss, setPathLoss] = useState('100');
  const [cableLoss, setCableLoss] = useState('3');
  const [sensitivityDbm, setSensitivityDbm] = useState('-85');

  const result = computeRFSignal({
    txPowerDbm: Number(txPowerDbm) || 0,
    txGain: Number(txGain) || 0,
    rxGain: Number(rxGain) || 0,
    pathLoss: Number(pathLoss) || 0,
    cableLoss: Number(cableLoss) || 0,
    sensitivityDbm: Number(sensitivityDbm) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Transmitter</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Transmit power (dBm)" value={txPowerDbm} onChange={setTxPowerDbm} step="0.5" />
              <NumberField label="Transmit gain (dBi)" value={txGain} onChange={setTxGain} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Cable loss (dB)" value={cableLoss} onChange={setCableLoss} min={0} step="0.1" />
              <NumberField label="Path loss (dB)" value={pathLoss} onChange={setPathLoss} min={0} step="0.1" />
            </div>
          </div>
          <PanelEyebrow>Receiver</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Receive gain (dBi)" value={rxGain} onChange={setRxGain} step="0.1" />
              <NumberField label="Receiver sensitivity (dBm)" value={sensitivityDbm} onChange={setSensitivityDbm} step="0.5" />
            </div>
          </div>
          <Hint>
            Link budgets are pure addition in dB: gains add, losses subtract, and the result must stay above the
            receiver sensitivity with a margin for rain, foliage and fading.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Received power"
            value={`${formatMoney(result.received)} dBm`}
            sub={result.marginOk ? 'Link closes with margin' : 'Link does not close'}
          />
          <ResultRows>
            <ResultRow label="Power at transmitter antenna" value={`${formatMoney(result.atAntenna)} dBm`} />
            <ResultRow label="Link margin (dB)" value={formatMoney(result.margin)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RFSignalCalculator;
