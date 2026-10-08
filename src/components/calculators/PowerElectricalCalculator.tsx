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

export interface PowerElectricalInput {
  voltage: number;
  current: number;
  powerFactor: number;
  phases: number;
}

export function computePowerElectrical(input: PowerElectricalInput) {
  const sqrt3 = Math.sqrt(3);
  const apparent =
    input.phases === 3 ? sqrt3 * input.voltage * input.current : input.voltage * input.current;
  const real = apparent * input.powerFactor;
  const reactive = Math.sqrt(Math.max(0, apparent * apparent - real * real));
  const energy8h = (real * 8) / 1000;
  return { apparent, real, reactive, energy8h };
}

export function PowerElectricalCalculator() {
  const [voltage, setVoltage] = useState('230');
  const [current, setCurrent] = useState('10');
  const [powerFactor, setPowerFactor] = useState('0.9');
  const [phases, setPhases] = useState('1');

  const result = computePowerElectrical({
    voltage: Number(voltage) || 0,
    current: Number(current) || 0,
    powerFactor: Number(powerFactor) || 0,
    phases: Number(phases) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Voltage (V)" value={voltage} onChange={setVoltage} min={0} />
              <NumberField label="Current (A)" value={current} onChange={setCurrent} min={0} step="0.1" />
            </div>
            <NumberField
              label="Power factor"
              value={powerFactor}
              onChange={setPowerFactor}
              min={0}
              max={1}
              step="0.01"
            />
            <SegmentedControl
              label="Phases"
              value={phases}
              onChange={setPhases}
              options={[
                { value: '1', label: 'Single phase' },
                { value: '3', label: 'Three phase' },
              ]}
            />
          </div>
          <Hint>
            Real power P = S × pf, with apparent power S = V·I for single phase and √3·V·I for three phase;
            reactive power is the part that does no useful work.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Real power"
            value={`${formatMoney(result.real)} W`}
            sub={`${formatMoney(result.energy8h)} kWh over an 8 hour run`
            }
          />
          <ResultRows>
            <ResultRow label="Apparent power (VA)" value={formatMoney(result.apparent)} />
            <ResultRow label="Reactive power (VAR)" value={formatMoney(result.reactive)} />
            <ResultRow label="Power factor used" value={formatMoney(Number(powerFactor) || 0)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PowerElectricalCalculator;
