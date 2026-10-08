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

export interface SocialSecurityInput {
  averageMonthlyEarnings: number;
  claimingAge: number;
}

export function computeSocialSecurity(input: SocialSecurityInput) {
  const aime = Math.max(0, input.averageMonthlyEarnings);
  const pia = Math.min(aime, 1174) * 0.9 + Math.max(0, Math.min(aime, 7078) - 1174) * 0.32 + Math.max(0, aime - 7078) * 0.15;
  const age = Math.min(70, Math.max(62, input.claimingAge));
  let factor = 1;
  if (age < 67) factor = 1 - 0.05 * (67 - age);
  else if (age > 67) factor = 1 + 0.08 * (age - 67);
  const monthlyBenefit = pia * factor;
  return { pia, factor, monthlyBenefit, annualBenefit: monthlyBenefit * 12, age };
}

export function SocialSecurityCalculator() {
  const [averageMonthlyEarnings, setAverageMonthlyEarnings] = useState('6000');
  const [claimingAge, setClaimingAge] = useState('67');

  const result = computeSocialSecurity({
    averageMonthlyEarnings: Number(averageMonthlyEarnings) || 0,
    claimingAge: Number(claimingAge) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Average monthly earnings ($)"
              value={averageMonthlyEarnings}
              onChange={setAverageMonthlyEarnings}
              min={0}
            />
            <NumberField label="Claiming age" value={claimingAge} onChange={setClaimingAge} min={62} max={70} />
          </div>
          <Hint>
            Claiming before your full retirement age permanently reduces the monthly benefit, while delaying past
            it adds credits up to age 70.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Estimated monthly benefit"
            value={`$${formatMoney(result.monthlyBenefit)}`}
            sub={`Claiming at age ${result.age}`}
          />
          <ResultRows>
            <ResultRow label="Primary insurance amount" value={`$${formatMoney(result.pia)}`} />
            <ResultRow label="Claiming adjustment" value={`${formatMoney(result.factor * 100)}%`} />
            <ResultRow label="Annual benefit" value={`$${formatMoney(result.annualBenefit)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SocialSecurityCalculator;
