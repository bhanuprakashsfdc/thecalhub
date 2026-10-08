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

export interface RequiredMinimumDistributionInput {
  accountBalance: number;
  distributionAge: number;
  lifeExpectancyDivisor: number;
}

export function computeRequiredMinimumDistribution(input: RequiredMinimumDistributionInput) {
  const balance = Math.max(0, input.accountBalance);
  const divisor = Math.max(0, input.lifeExpectancyDivisor);
  const rmd = divisor > 0 ? balance / divisor : 0;
  return {
    rmd,
    monthly: rmd / 12,
    balanceAfter: Math.max(0, balance - rmd),
    age: Math.max(0, input.distributionAge),
  };
}

export function RequiredMinimumDistributionCalculator() {
  const [accountBalance, setAccountBalance] = useState('850000');
  const [distributionAge, setDistributionAge] = useState('75');
  const [lifeExpectancyDivisor, setLifeExpectancyDivisor] = useState('24.6');

  const result = computeRequiredMinimumDistribution({
    accountBalance: Number(accountBalance) || 0,
    distributionAge: Number(distributionAge) || 0,
    lifeExpectancyDivisor: Number(lifeExpectancyDivisor) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Retirement account balance ($)" value={accountBalance} onChange={setAccountBalance} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Distribution age" value={distributionAge} onChange={setDistributionAge} min={0} max={120} />
              <NumberField label="Life expectancy divisor" value={lifeExpectancyDivisor} onChange={setLifeExpectancyDivisor} step="0.1" min={1} />
            </div>
          </div>
          <Hint>
            Required distributions are calculated by dividing the year-end balance by the IRS life expectancy
            figure for your age, and start at age 73 for most savers.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Required minimum distribution"
            value={`$${formatMoney(result.rmd)}`}
            sub={`At age ${result.age}`}
          />
          <ResultRows>
            <ResultRow label="Monthly equivalent" value={`$${formatMoney(result.monthly)}`} />
            <ResultRow label="Balance after the distribution" value={`$${formatMoney(result.balanceAfter)}`} />
            <ResultRow label="Account balance" value={`$${formatMoney(Number(accountBalance) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RequiredMinimumDistributionCalculator;
