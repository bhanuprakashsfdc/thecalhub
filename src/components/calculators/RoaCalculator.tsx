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

export interface RoaInput {
  netIncome: number;
  totalAssets: number;
}

export function computeRoa(input: RoaInput) {
  const roa =
    input.totalAssets > 0 ? (input.netIncome / input.totalAssets) * 100 : 0;
  const incomePerThousand =
    input.totalAssets > 0 ? input.netIncome / (input.totalAssets / 1000) : 0;
  const multiple =
    input.netIncome > 0 ? input.totalAssets / input.netIncome : 0;
  const assessment = roa >= 5 ? 'Strong' : roa >= 1 ? 'Moderate' : 'Weak';
  return { roa, incomePerThousand, multiple, assessment };
}

export function RoaCalculator() {
  const [netIncome, setNetIncome] = useState('45000');
  const [totalAssets, setTotalAssets] = useState('600000');

  const result = computeRoa({
    netIncome: Number(netIncome) || 0,
    totalAssets: Number(totalAssets) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Net income ($)" value={netIncome} onChange={setNetIncome} min={0} />
            <NumberField label="Total assets ($)" value={totalAssets} onChange={setTotalAssets} min={0} />
          </div>
          <Hint>
            Return on assets = net income ÷ total assets × 100. It shows
            how efficiently assets generate profit.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Return on assets"
            value={`${formatMoney(result.roa)}%`}
            sub={result.assessment}
          />
          <ResultRows>
            <ResultRow label="Income per $1,000 of assets" value={`$${formatMoney(result.incomePerThousand)}`} />
            <ResultRow label="Assets-to-income multiple" value={formatMoney(result.multiple)} />
            <ResultRow label="Assessment" value={result.assessment} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RoaCalculator;
