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
}

export function computeCoaxCable(input: CoaxCableInput) {
  const length = Math.max(0, input.lengthMeters);
  const totalLoss = Math.max(0, input.lossPer100m) * (length / 100);
  const power = Math.max(0, input.transmitterPower);
  const received = power * Math.pow(10, -totalLoss / 10);
  const lost = power - received;
  const receivedDbm = received > 0 ? 10 * Math.log10(received * 1000) : 0;

  return { totalLoss, received, lost, receivedDbm };
}

export function CoaxCableCalculator() {
  const [lengthMeters, setLengthMeters] = useState('50');
  const [lossPer100m, setLossPer100m] = useState('6');
  const [transmitterPower, setTransmitterPower] = useState('50');

  const result = computeCoaxCable({
    lengthMeters: Number(lengthMeters) || 0,
    lossPer100m: Number(lossPer100m) || 0,
    transmitterPower: Number(transmitterPower) || 0,
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
          </div>
          <Hint>
            Cable loss scales with length, and dB loss converts to power with a factor of ten — doubling the run
            doubles the loss in dB, which multiplies the power penalty.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Received power"
            value={`${formatMoney(result.received)} W`}
            sub={`${formatMoney(result.totalLoss)} dB total cable loss`}
          />
          <ResultRows>
            <ResultRow label="Power lost" value={`${formatMoney(result.lost)} W`} />
            <ResultRow label="Received power in dBm" value={`${formatMoney(result.receivedDbm)} dBm`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CoaxCableCalculator;
