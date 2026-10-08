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

export interface RFPowerInput {
  transmitterPower: number;
  cableLossDb: number;
  antennaGainDbi: number;
}

export function computeRFPower(input: RFPowerInput) {
  const power = Math.max(0, input.transmitterPower);
  const gain = Math.max(0, input.antennaGainDbi) - Math.max(0, input.cableLossDb);
  const eirp = power * Math.pow(10, gain / 10);
  const eirpDbm = eirp > 0 ? 10 * Math.log10(eirp * 1000) : 0;
  const powerAtAntenna = power * Math.pow(10, -Math.max(0, input.cableLossDb) / 10);

  return { gain, eirp, eirpDbm, powerAtAntenna };
}

export function RFPowerCalculator() {
  const [transmitterPower, setTransmitterPower] = useState('50');
  const [cableLossDb, setCableLossDb] = useState('3');
  const [antennaGainDbi, setAntennaGainDbi] = useState('6');

  const result = computeRFPower({
    transmitterPower: Number(transmitterPower) || 0,
    cableLossDb: Number(cableLossDb) || 0,
    antennaGainDbi: Number(antennaGainDbi) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Transmitter power (W)" value={transmitterPower} onChange={setTransmitterPower} min={0} step="0.5" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Cable loss (dB)" value={cableLossDb} onChange={setCableLossDb} min={0} step="0.1" />
              <NumberField label="Antenna gain (dBi)" value={antennaGainDbi} onChange={setAntennaGainDbi} step="0.1" />
            </div>
          </div>
          <Hint>
            EIRP is what regulators and link budgets care about: transmitter power, minus cable loss, plus
            antenna gain, expressed as the equivalent isotropic radiated power.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="EIRP"
            value={`${formatMoney(result.eirp)} W`}
            sub={`${formatMoney(result.eirpDbm)} dBm effective`}
          />
          <ResultRows>
            <ResultRow label="Net system gain" value={`${formatMoney(result.gain)} dB`} />
            <ResultRow label="Power at antenna" value={`${formatMoney(result.powerAtAntenna)} W`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RFPowerCalculator;
