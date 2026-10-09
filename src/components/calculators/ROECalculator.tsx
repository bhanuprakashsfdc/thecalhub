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

export interface ROEInput {
  netIncome: number;
  equity: number;
  revenue: number;
  assets: number;
}

export function computeROE(input: ROEInput) {
  const roe = input.equity > 0 ? (input.netIncome / input.equity) * 100 : 0;
  const roa = input.assets > 0 ? (input.netIncome / input.assets) * 100 : 0;
  const netMargin = input.revenue > 0 ? (input.netIncome / input.revenue) * 100 : 0;
  const equityMultiplier = input.equity > 0 ? input.assets / input.equity : 0;
  return { roe, roa, netMargin, equityMultiplier };
}

export function ROECalculator() {
  const [netIncome, setNetIncome] = useState('120000');
  const [equity, setEquity] = useState('600000');
  const [revenue, setRevenue] = useState('1200000');
  const [assets, setAssets] = useState('900000');

  const result = useMemo(
    () =>
      computeROE({
        netIncome: Number(netIncome) || 0,
        equity: Number(equity) || 0,
        revenue: Number(revenue) || 0,
        assets: Number(assets) || 0,
      }),
    [netIncome, equity, revenue, assets]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Net income ($)" value={netIncome} onChange={setNetIncome} min={0} step="10000" />
            <NumberField label="Shareholders' equity ($)" value={equity} onChange={setEquity} min={0} step="10000" />
            <NumberField label="Revenue ($)" value={revenue} onChange={setRevenue} min={0} step="10000" />
            <NumberField label="Total assets ($)" value={assets} onChange={setAssets} min={0} step="10000" />
          </div>
          <Hint>
            ROE = net income ÷ equity. Under DuPont analysis it decomposes into net margin × asset
            turnover × equity multiplier, showing whether returns come from profitability or
            leverage.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="ROE"
            value={`${formatMoney(result.roe)}%`}
            sub={`ROA ${formatMoney(result.roa)}%`}
          />
          <ResultRows>
            <ResultRow label="ROA" value={`${formatMoney(result.roa)}%`} />
            <ResultRow label="Net margin" value={`${formatMoney(result.netMargin)}%`} />
            <ResultRow label="Equity multiplier" value={formatMoney(result.equityMultiplier)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ROECalculator;