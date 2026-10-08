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

export interface EfficiencyManufacturingInput {
  theoreticalPerHour: number;
  actualOutput: number;
  hoursWorked: number;
}

export function computeEfficiencyManufacturing(input: EfficiencyManufacturingInput) {
  const theoretical = Math.max(0, input.theoreticalPerHour) * Math.max(0, input.hoursWorked);
  const actual = Math.max(0, input.actualOutput);
  const efficiency = theoretical > 0 ? (actual / theoretical) * 100 : 0;
  const unitsShort = Math.max(0, theoretical - actual);

  return { theoretical, actual, efficiency, unitsShort };
}

export function EfficiencyManufacturingCalculator() {
  const [theoreticalPerHour, setTheoreticalPerHour] = useState('60');
  const [actualOutput, setActualOutput] = useState('1350');
  const [hoursWorked, setHoursWorked] = useState('24');

  const result = computeEfficiencyManufacturing({
    theoreticalPerHour: Number(theoreticalPerHour) || 0,
    actualOutput: Number(actualOutput) || 0,
    hoursWorked: Number(hoursWorked) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Theoretical output per hour (units)"
              value={theoreticalPerHour}
              onChange={setTheoreticalPerHour}
              min={0}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Actual output (units)" value={actualOutput} onChange={setActualOutput} min={0} />
              <NumberField label="Hours worked" value={hoursWorked} onChange={setHoursWorked} min={0} />
            </div>
          </div>
          <Hint>
            Labour efficiency compares what the line should have produced with what it did produce; the gap is
            the practical target for shift-level improvement.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Manufacturing efficiency"
            value={`${formatMoney(result.efficiency)}%`}
            sub={`${formatMoney(result.unitsShort)} units short of the target`}
          />
          <ResultRows>
            <ResultRow label="Theoretical output" value={formatMoney(result.theoretical)} />
            <ResultRow label="Actual output" value={formatMoney(result.actual)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EfficiencyManufacturingCalculator;
