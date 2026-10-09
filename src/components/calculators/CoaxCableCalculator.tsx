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

export interface CoaxCableInput {
  lengthMeters: number;
  lossPer100m: number;
  transmitterPower: number;
  /** Extra fixed loss from the connectors at both ends, in dB. */
  connectorLoss?: number;
}

export function computeCoaxCable(input: CoaxCableInput) {
  const length = Math.max(0, input.lengthMeters);
  const cableLoss = Math.max(0, input.lossPer100m) * (length / 100);
  const connectors = Math.max(0, input.connectorLoss ?? 0);
  const totalLoss = cableLoss + connectors;
  const power = Math.max(0, input.transmitterPower);
  const received = power * Math.pow(10, -totalLoss / 10);
  const lost = power - received;
  const receivedDbm = received > 0 ? 10 * Math.log10(received * 1000) : 0;

  return { cableLoss, connectors, totalLoss, received, lost, receivedDbm };
}

export function CoaxCableCalculator() {
  const [lengthMeters, setLengthMeters] = useState('50');
  const [lossPer100m, setLossPer100m] = useState('6');
  const [transmitterPower, setTransmitterPower] = useState('50');
  const [connectorLoss, setConnectorLoss] = useState('0.5');

  const result = computeCoaxCable({
    lengthMeters: Number(lengthMeters) || 0,
    lossPer100m: Number(lossPer100m) || 0,
    transmitterPower: Number(transmitterPower) || 0,
    connectorLoss: Number(connectorLoss) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Cable length (m)" value={lengthMeters} onChange={setLengthMeters} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Loss per 100 m (dB)" value={lossPer100m} onChange={setLossPer100m} min={0} step="0.1" />
              <NumberField label="Transmitter power (W)" value={transmitterPower} onChange={setTransmitterPower} min={0} step="0.5" />
            </div>
            <NumberField label="Connector loss (dB)" value={connectorLoss} onChange={setConnectorLoss} min={0} step="0.1" />
          </div>
          <Hint>
            Cable loss = attenuation per 100 m × length ÷ 100, plus connector loss. Received power
            follows P × 10^(−total loss ÷ 10): doubling the run doubles the dB loss and deepens the
            power penalty.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Received power"
            value={`${formatMoney(result.received)} W`}
            sub={`${formatMoney(result.totalLoss)} dB total link loss`}
          />
          <ResultRows>
            <ResultRow label="Cable loss" value={`${formatMoney(result.cableLoss)} dB`} />
            <ResultRow label="Connector loss" value={`${formatMoney(result.connectors)} dB`} />
            <ResultRow label="Power lost" value={`${formatMoney(result.lost)} W`} />
            <ResultRow label="Received power in dBm" value={`${formatMoney(result.receivedDbm)} dBm`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CoaxCableCalculator;
