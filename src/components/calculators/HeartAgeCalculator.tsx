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

export interface HeartAgeInput {
  age: number;
  restingHr: number;
  systolic: number;
  hdl: number;
  totalChol: number;
  smoker: boolean;
  diabetic: boolean;
}

export function computeHeartAge(input: HeartAgeInput) {
  const hrPenalty = Math.max(0, (input.restingHr - 60) * 0.15);
  const bpPenalty = Math.max(0, (input.systolic - 115) * 0.08);
  const cholPenalty = Math.max(0, (input.totalChol - 180) * 0.05);
  const hdlPenalty = Math.max(0, (50 - input.hdl) * 0.12);
  const smokerPenalty = input.smoker ? 8 : 0;
  const diabetesPenalty = input.diabetic ? 6 : 0;
  const points =
    hrPenalty + bpPenalty + cholPenalty + hdlPenalty + smokerPenalty + diabetesPenalty;
  const heartAge = input.age + points;
  const riskPercent = Math.min(40, Math.max(1, points * 0.9 + 2));
  const category = points < 4 ? 'Low' : points < 8 ? 'Moderate' : points < 12 ? 'High' : 'Very high';
  return { hrPenalty, bpPenalty, cholPenalty, hdlPenalty, points, heartAge, riskPercent, category };
}

export function HeartAgeCalculator() {
  const [age, setAge] = useState('45');
  const [restingHr, setRestingHr] = useState('75');
  const [systolic, setSystolic] = useState('130');
  const [hdl, setHdl] = useState('45');
  const [totalChol, setTotalChol] = useState('210');
  const [smoker, setSmoker] = useState('no');
  const [diabetic, setDiabetic] = useState('no');

  const result = computeHeartAge({
    age: Number(age) || 0,
    restingHr: Number(restingHr) || 0,
    systolic: Number(systolic) || 0,
    hdl: Number(hdl) || 0,
    totalChol: Number(totalChol) || 0,
    smoker: smoker === 'yes',
    diabetic: diabetic === 'yes',
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Age" value={age} onChange={setAge} min={18} max={120} />
              <NumberField label="Resting heart rate" value={restingHr} onChange={setRestingHr} min={20} max={220} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Systolic BP (mmHg)" value={systolic} onChange={setSystolic} min={50} max={250} />
              <NumberField label="HDL cholesterol (mg/dL)" value={hdl} onChange={setHdl} min={0} />
            </div>
            <NumberField label="Total cholesterol (mg/dL)" value={totalChol} onChange={setTotalChol} min={0} />
            <SegmentedControl
              label="Smoker"
              value={smoker}
              onChange={setSmoker}
              options={[
                { value: 'no', label: 'No' },
                { value: 'yes', label: 'Yes' },
              ]}
            />
            <SegmentedControl
              label="Diabetic"
              value={diabetic}
              onChange={setDiabetic}
              options={[
                { value: 'no', label: 'No' },
                { value: 'yes', label: 'Yes' },
              ]}
            />
          </div>
          <Hint>
            Heart age compares your cardiovascular risk factors with population averages — lowering resting heart
            rate, blood pressure and smoking all bring the estimate back down.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Estimated heart age"
            value={`${formatMoney(result.heartAge)} yrs`}
            sub={`${result.category} risk — ${formatMoney(result.riskPercent)}% indicative 10-year risk`}
          />
          <ResultRows>
            <ResultRow label="Chronological age" value={`${formatMoney(Number(age) || 0)} yrs`} />
            <ResultRow label="Risk points" value={formatMoney(result.points)} />
            <ResultRow label="Resting HR penalty" value={formatMoney(result.hrPenalty)} />
            <ResultRow label="Blood pressure penalty" value={formatMoney(result.bpPenalty)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HeartAgeCalculator;
