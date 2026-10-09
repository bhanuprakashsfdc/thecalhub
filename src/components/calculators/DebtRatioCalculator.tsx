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

export interface DebtRatioInput {
  totalDebt: number;
  totalAssets: number;
  equity: number;
}

export function computeDebtRatio(input: DebtRatioInput) {
  const debtToAssets = input.totalAssets > 0 ? (input.totalDebt / input.totalAssets) * 100 : 0;
  const debtToEquity = input.equity > 0 ? (input.totalDebt / input.equity) * 100 : 0;
  const equityRatio = input.totalAssets > 0 ? (input.equity / input.totalAssets) * 100 : 0;
  return { debtToAssets, debtToEquity, equityRatio };
}

export function DebtRatioCalculator() {
  const [totalDebt, setTotalDebt] = useState('400000');
  const [totalAssets, setTotalAssets] = useState('1000000');
  const [equity, setEquity] = useState('600000');

  const result = useMemo(
    () =>
      computeDebtRatio({
        totalDebt: Number(totalDebt) || 0,
        totalAssets: Number(totalAssets) || 0,
        equity: Number(equity) || 0,
      }),
    [totalDebt, totalAssets, equity]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total debt ($)" value={totalDebt} onChange={setTotalDebt} min={0} step="10000" />
            <NumberField label="Total assets ($)" value={totalAssets} onChange={setTotalAssets} min={0} step="10000" />
            <NumberField label="Equity ($)" value={equity} onChange={setEquity} min={0} step="10000" />
          </div>
          <Hint>
            Debt ratio = debt ÷ assets. Debt-to-equity compares debt to the owner's stake. Higher
            ratios mean more leverage and higher risk, but also higher return potential on equity.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Debt-to-assets"
            value={`${formatMoney(result.debtToAssets)}%`}
            sub={`D/E ${formatMoney(result.debtToEquity)}%`}
          />
          <ResultRows>
            <ResultRow label="Debt-to-equity" value={`${formatMoney(result.debtToEquity)}%`} />
            <ResultRow label="Equity ratio" value={`${formatMoney(result.equityRatio)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DebtRatioCalculator;