import { useState, useMemo } from 'react';
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

export interface CumulativeGPAInput {
  totalCredits: number;
  cumulativePoints: number;
  semesterCredits: number;
  semesterPoints: number;
}

export function computeCumulativeGPA(input: CumulativeGPAInput) {
  const cumulativeGpa = input.totalCredits > 0 ? input.cumulativePoints / input.totalCredits : 0;
  const semesterGpa = input.semesterCredits > 0 ? input.semesterPoints / input.semesterCredits : 0;
  const newCredits = input.totalCredits + input.semesterCredits;
  const newPoints = input.cumulativePoints + input.semesterPoints;
  const newCumulativeGpa = newCredits > 0 ? newPoints / newCredits : 0;
  return { cumulativeGpa, semesterGpa, newCredits, newPoints, newCumulativeGpa };
}

export function CumulativeGPACalculator() {
  const [totalCredits, setTotalCredits] = useState('90');
  const [cumulativePoints, setCumulativePoints] = useState('360');
  const [semesterCredits, setSemesterCredits] = useState('15');
  const [semesterPoints, setSemesterPoints] = useState('52.5');

  const result = useMemo(
    () =>
      computeCumulativeGPA({
        totalCredits: Number(totalCredits) || 0,
        cumulativePoints: Number(cumulativePoints) || 0,
        semesterCredits: Number(semesterCredits) || 0,
        semesterPoints: Number(semesterPoints) || 0,
      }),
    [totalCredits, cumulativePoints, semesterCredits, semesterPoints]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total credits earned" value={totalCredits} onChange={setTotalCredits} min={0} step="1" />
            <NumberField label="Cumulative quality points" value={cumulativePoints} onChange={setCumulativePoints} min={0} step="1" />
            <NumberField label="New semester credits" value={semesterCredits} onChange={setSemesterCredits} min={0} step="1" />
            <NumberField label="New semester quality points" value={semesterPoints} onChange={setSemesterPoints} min={0} step="0.5" />
          </div>
          <Hint>
            GPA = quality points ÷ credits. Each letter grade contributes quality points (A = 4.0,
            B = 3.0, etc.) multiplied by the course credits. Adding a semester updates the
            cumulative average.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="New cumulative GPA"
            value={formatMoney(result.newCumulativeGpa)}
            sub={`Current ${formatMoney(result.cumulativeGpa)}`}
          />
          <ResultRows>
            <ResultRow label="Current cumulative GPA" value={formatMoney(result.cumulativeGpa)} />
            <ResultRow label="Semester GPA" value={formatMoney(result.semesterGpa)} />
            <ResultRow label="New total credits" value={`${result.newCredits}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CumulativeGPACalculator;