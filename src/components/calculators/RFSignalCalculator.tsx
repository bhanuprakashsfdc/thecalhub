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

export interface RFSignalInput {
  txPowerDbm: number;
  txGain: number;
  cableLoss: number;
  pathLoss: number;
  rxGain: number;
  rxLoss: number;
  sensitivityDbm: number;
  noiseFloorDbm: number;
}

export interface RFSignalResult {
  eirp: number;
  received: number;
  margin: number;
  snr: number;
  linkOk: boolean;
}

const finite = (value: number) => (Number.isFinite(value) ? value : 0);
const asLoss = (value: number) => Math.max(0, finite(value));

/** Free-space path loss in dB: 20*log10(d) + 20*log10(f) + 32.44 (d in km, f in MHz). */
export function computeFSPL(distanceKm: number, frequencyMhz: number): number {
  if (!Number.isFinite(distanceKm) || !Number.isFinite(frequencyMhz)) return 0;
  if (distanceKm <= 0 || frequencyMhz <= 0) return 0;
  const fspl = 20 * Math.log10(distanceKm) + 20 * Math.log10(frequencyMhz) + 32.44;
  return Math.max(0, fspl);
}

/** Pure link budget: received = Tx power + Tx gain - Tx loss - path loss + Rx gain - Rx loss. */
export function computeRFSignal(input: RFSignalInput): RFSignalResult {
  const eirp = finite(input.txPowerDbm) + finite(input.txGain) - asLoss(input.cableLoss);
  const received = eirp + finite(input.rxGain) - asLoss(input.rxLoss) - asLoss(input.pathLoss);
  const margin = received - finite(input.sensitivityDbm);
  const snr = received - finite(input.noiseFloorDbm);

  return { eirp, received, margin, snr, linkOk: margin >= 0 };
}

export function RFSignalCalculator() {
  const [txPowerDbm, setTxPowerDbm] = useState('30');
  const [txGain, setTxGain] = useState('8');
  const [rxGain, setRxGain] = useState('2');
  const [pathLoss, setPathLoss] = useState('100');
  const [cableLoss, setCableLoss] = useState('3');
  const [rxLoss, setRxLoss] = useState('1');
  const [sensitivityDbm, setSensitivityDbm] = useState('-85');
  const [noiseFloorDbm, setNoiseFloorDbm] = useState('-100');
  const [lossMode, setLossMode] = useState('manual');
  const [distanceKm, setDistanceKm] = useState('1');
  const [frequencyMhz, setFrequencyMhz] = useState('2400');

  const pathLossDb =
    lossMode === 'fspl'
      ? computeFSPL(Number(distanceKm) || 0, Number(frequencyMhz) || 0)
      : Number(pathLoss) || 0;

  const result = computeRFSignal({
    txPowerDbm: Number(txPowerDbm) || 0,
    txGain: Number(txGain) || 0,
    cableLoss: Number(cableLoss) || 0,
    pathLoss: pathLossDb,
    rxGain: Number(rxGain) || 0,
    rxLoss: Number(rxLoss) || 0,
    sensitivityDbm: Number(sensitivityDbm) || 0,
    noiseFloorDbm: Number(noiseFloorDbm) || 0,
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
              <NumberField
                label="Receiver cable loss (dB)"
                value={rxLoss}
                onChange={setRxLoss}
                min={0}
                step="0.1"
              />
            </div>
          </div>
          <PanelEyebrow>Path loss</PanelEyebrow>
          <div className="space-y-6">
            <SegmentedControl
              label="Path loss mode"
              value={lossMode}
              onChange={setLossMode}
              options={[
                { value: 'manual', label: 'Manual' },
                { value: 'fspl', label: 'Free-space' },
              ]}
            />
            {lossMode === 'manual' ? (
              <NumberField label="Path loss (dB)" value={pathLoss} onChange={setPathLoss} min={0} step="0.1" />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <NumberField label="Distance (km)" value={distanceKm} onChange={setDistanceKm} min={0} step="0.1" />
                <NumberField
                  label="Frequency (MHz)"
                  value={frequencyMhz}
                  onChange={setFrequencyMhz}
                  min={0}
                  step="1"
                />
              </div>
            )}
          </div>
          <PanelEyebrow>Receiver</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Receive gain (dBi)" value={rxGain} onChange={setRxGain} step="0.1" />
              <NumberField
                label="Receiver sensitivity (dBm)"
                value={sensitivityDbm}
                onChange={setSensitivityDbm}
                step="0.5"
              />
            </div>
            <NumberField label="Noise floor (dBm)" value={noiseFloorDbm} onChange={setNoiseFloorDbm} step="0.5" />
          </div>
          <Hint>
            Link budgets are pure addition in dB: gains add, losses subtract, and the result must stay above the
            receiver sensitivity with a margin for rain, foliage and fading. Free-space mode uses
            20&middot;log10(d km) + 20&middot;log10(f MHz) + 32.44 and never returns NaN for zero or negative
            inputs.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Received power"
            value={`${formatMoney(result.received)} dBm`}
            sub={result.linkOk ? 'Link closes with margin' : 'Link does not close'}
          />
          <ResultRows>
            <ResultRow label="EIRP (dBm)" value={formatMoney(result.eirp)} />
            <ResultRow label="Path loss applied (dB)" value={formatMoney(pathLossDb)} />
            <ResultRow label="Link margin (dB)" value={formatMoney(result.margin)} />
            <ResultRow label="SNR (dB)" value={formatMoney(result.snr)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RFSignalCalculator;
