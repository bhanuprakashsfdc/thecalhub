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

export interface CostPerSaleInput {
  campaignCost: number;
  sales: number;
  revenuePerSale: number;
}

export function computeCostPerSale(input: CostPerSaleInput) {
  const cps = input.sales > 0 ? input.campaignCost / input.sales : 0;
  const totalRevenue = input.sales * input.revenuePerSale;
  const profitPerSale = input.revenuePerSale - cps;
  const roas = input.campaignCost > 0 ? (totalRevenue / input.campaignCost) * 100 : 0;
  return { cps, totalRevenue, profitPerSale, roas };
}

export function CostPerSaleCalculator() {
  const [campaignCost, setCampaignCost] = useState('12000');
  const [sales, setSales] = useState('150');
  const [revenuePerSale, setRevenuePerSale] = useState('200');

  const result = computeCostPerSale({
    campaignCost: Number(campaignCost) || 0,
    sales: Number(sales) || 0,
    revenuePerSale: Number(revenuePerSale) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total campaign cost ($)" value={campaignCost} onChange={setCampaignCost} min={0} />
            <NumberField label="Sales generated" value={sales} onChange={setSales} min={0} step="1" />
            <NumberField label="Revenue per sale ($)" value={revenuePerSale} onChange={setRevenuePerSale} min={0} />
          </div>
          <Hint>
            Cost per sale = campaign cost ÷ sales. Compare it against
            revenue per sale to judge whether the campaign is profitable.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Cost per sale"
            value={`$${formatMoney(result.cps)}`}
            sub="Acquisition cost"
          />
          <ResultRows>
            <ResultRow label="Total revenue" value={`$${formatMoney(result.totalRevenue)}`} />
            <ResultRow label="Profit per sale" value={`$${formatMoney(result.profitPerSale)}`} />
            <ResultRow label="Return on ad spend" value={`${formatMoney(result.roas)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CostPerSaleCalculator;
