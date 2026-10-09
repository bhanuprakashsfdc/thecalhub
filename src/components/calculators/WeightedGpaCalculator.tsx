import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface WeightedGpaInput {
  credits: number[];
  gradePoints: number[];
}

const GRADE_POINTS: Record<string, number> = {
  A: 4.0, 'A-': 3.7, 'B+': 3.3, B: 3.0, 'B-': 2.7,
  'C+': 2.3, C: 2.0, 'C-': 1.7, D: 1.0, F: 0.0,
};

const GRADE_OPTIONS = Object.keys(GRADE_POINTS).map((grade) => ({
  value: grade,
  label: `${grade} (${GRADE_POINTS[grade].toFixed(1)})`,
}));

export function computeWeightedGpa(input: WeightedGpaInput) {
  let totalCredits = 0;
  let totalPoints = 0;
  for (let i = 0; i < input.credits.length; i++) {
    totalCredits += input.credits[i];
    totalPoints += input.credits[i] * input.gradePoints[i];
  }
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  const letter =
    gpa >= 3.85 ? 'A' : gpa >= 3.5 ? 'A-' : gpa >= 3.15 ? 'B+' : gpa >= 2.85 ? 'B'
      : gpa >= 2.55 ? 'B-' : gpa >= 2.15 ? 'C+' : gpa >= 1.85 ? 'C'
        : gpa >= 1.55 ? 'C-' : gpa >= 0.5 ? 'D' : 'F';
  return { gpa, totalCredits, totalPoints, letter };
}

export function WeightedGpaCalculator() {
  const [credits1, setCredits1] = useState('4');
  const [grade1, setGrade1] = useState('A');
  const [credits2, setCredits2] = useState('3');
  const [grade2, setGrade2] = useState('B+');
  const [credits3, setCredits3] = useState('3');
  const [grade3, setGrade3] = useState('A-');

  const credits = [Number(credits1) || 0, Number(credits2) || 0, Number(credits3) || 0];
  const gradePoints = [
    GRADE_POINTS[grade1] || 0,
    GRADE_POINTS[grade2] || 0,
    GRADE_POINTS[grade3] || 0,
  ];
  const result = computeWeightedGpa({ credits, gradePoints });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Course 1 credits" value={credits1} onChange={setCredits1} min={0} step="0.5" />
              <SelectField label="Course 1 grade" value={grade1} onChange={setGrade1} options={GRADE_OPTIONS} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Course 2 credits" value={credits2} onChange={setCredits2} min={0} step="0.5" />
              <SelectField label="Course 2 grade" value={grade2} onChange={setGrade2} options={GRADE_OPTIONS} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Course 3 credits" value={credits3} onChange={setCredits3} min={0} step="0.5" />
              <SelectField label="Course 3 grade" value={grade3} onChange={setGrade3} options={GRADE_OPTIONS} />
            </div>
          </div>
          <Hint>
            Weighted GPA = Σ(credits × grade points) ÷ Σ credits on a
            4.0 scale.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Weighted GPA" value={formatMoney(result.gpa)} sub="On a 4.0 scale" />
          <ResultRows>
            <ResultRow label="Total credits" value={String(result.totalCredits)} />
            <ResultRow label="Total grade points" value={formatMoney(result.totalPoints)} />
            <ResultRow label="Letter equivalent" value={result.letter} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WeightedGpaCalculator;
