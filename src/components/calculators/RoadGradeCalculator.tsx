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
  safeDiv,
} from './kit';

export interface RoadGradeInput {
  rise: number;
  run: number;
}

export function computeRoadGrade(input: RoadGradeInput) {
  const grade = safeDiv(input.rise, input.run) * 100;
  const angle = (Math.atan2(input.rise, input.run) * 180) / Math.PI;
  const ratio = input.rise !== 0 ? input.run / input.rise : 0;
  const slope = 1 / Math.sqrt(1 + Math.pow(grade / 100, 2));
  return { grade, angle, ratio, slope };
}

export function RoadGradeCalculator() {
  const [rise, setRise] = useState('5');
  const [run, setRun] = useState('100');

  const result = computeRoadGrade({
    rise: Number(rise) || 0,
    run: Number(run) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Rise (m)" value={rise} onChange={setRise} step="0.1" />
              <NumberField label="Run (m)" value={run} onChange={setRun} min={0} step="0.1" />
            </div>
          </div>
          <Hint>
            Grade is rise divided by run, expressed as a percentage — a 5 % grade climbs 5 m for every 100 m
            travelled horizontally.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Road grade"
            value={`${formatMoney(result.grade)} %`}
            sub={`${formatMoney(result.angle)}° from horizontal`
            }
          />
          <ResultRows>
            <ResultRow label="Angle (degrees)" value={formatMoney(result.angle)} />
            <ResultRow label="Run : rise ratio" value={formatMoney(result.ratio)} />
            <ResultRow label="Cosine of grade" value={formatMoney(result.slope)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RoadGradeCalculator;
