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

export interface OperatingCashFlowInput {
  netIncome: number;
  depreciation: number;
  workingCapitalIncrease: number;
  currentLiabilities: number;
}

export function computeOperatingCashFlow(input: OperatingCashFlowInput) {
  const ocf = input.netIncome + input.depreciation - input.workingCapitalIncrease;
  const ratio =
    input.currentLiabilities > 0 ? ocf / input.currentLiabilities : 0;
  const cashAfter = ocf - input.currentLiabilities;
  return { ocf, ratio, cashAfter };
}

export function OperatingCashFlowCalculator() {
  const [netIncome, setNetIncome] = useState('120000');
  const [depreciation, setDepreciation] = useState('15000');
  const [workingCapitalIncrease, setWorkingCapitalIncrease] = useState('8000');
  const [currentLiabilities, setCurrentLiabilities] = useState('90000');

  const result = computeOperatingCashFlow({
    netIncome: Number(netIncome) || 0,
    depreciation: Number(depreciation) || 0,
    workingCapitalIncrease: Number(workingCapitalIncrease) || 0,
    currentLiabilities: Number(currentLiabilities) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Net income ($)" value={netIncome} onChange={setNetIncome} min={0} />
            <NumberField label="Depreciation ($)" value={depreciation} onChange={setDepreciation} min={0} />
            <NumberField label="Working capital increase ($)" value={workingCapitalIncrease} onChange={setWorkingCapitalIncrease} min={0} />
            <NumberField label="Current liabilities ($)" value={currentLiabilities} onChange={setCurrentLiabilities} min={0} />
          </div>
          <Hint>
            OCF = net income + depreciation − working capital increase.
            Depreciation is added back because it is a non-cash expense.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Operating cash flow"
            value={`$${formatMoney(result.ocf)}`}
            sub="From operations"
          />
          <ResultRows>
            <ResultRow label="OCF ratio" value={formatMoney(result.ratio)} />
            <ResultRow label="Cash after current liabilities" value={`$${formatMoney(result.cashAfter)}`} />
            <ResultRow label="Depreciation add-back" value={`$${formatMoney(Number(depreciation) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default OperatingCashFlowCalculator;
