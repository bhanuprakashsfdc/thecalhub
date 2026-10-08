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

export interface PensionInput {
  finalSalary: number;
  yearsOfService: number;
  benefitRate: number;
}

export function computePension(input: PensionInput) {
  const salary = Math.max(0, input.finalSalary);
  const years = Math.max(0, input.yearsOfService);
  const rate = Math.max(0, input.benefitRate) / 100;
  const annualPension = salary * years * rate;
  const monthlyPension = annualPension / 12;
  const replacementRatio = salary > 0 ? (annualPension / salary) * 100 : 0;
  return { annualPension, monthlyPension, replacementRatio, years };
}

export function PensionCalculator() {
  const [finalSalary, setFinalSalary] = useState('90000');
  const [yearsOfService, setYearsOfService] = useState('25');
  const [benefitRate, setBenefitRate] = useState('1.6');

  const result = computePension({
    finalSalary: Number(finalSalary) || 0,
    yearsOfService: Number(yearsOfService) || 0,
    benefitRate: Number(benefitRate) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Final annual salary ($)" value={finalSalary} onChange={setFinalSalary} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Years of service" value={yearsOfService} onChange={setYearsOfService} min={0} max={60} />
              <NumberField label="Benefit rate per year (%)" value={benefitRate} onChange={setBenefitRate} step="0.1" min={0} />
            </div>
          </div>
          <Hint>
            Most defined benefit plans multiply final salary by years of service and a set percentage — the
            replacement ratio shows how close that comes to your working income.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Annual pension"
            value={`$${formatMoney(result.annualPension)}`}
            sub={`$${formatMoney(result.monthlyPension)} per month`}
          />
          <ResultRows>
            <ResultRow label="Monthly pension" value={`$${formatMoney(result.monthlyPension)}`} />
            <ResultRow label="Replacement ratio" value={`${formatMoney(result.replacementRatio)}%`} />
            <ResultRow label="Credited years of service" value={`${formatMoney(result.years, 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PensionCalculator;
