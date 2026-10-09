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

export interface ReturnOnAdSpendInput {
  adSpend: number;
  revenue: number;
  impressions: number;
  clicks: number;
}

export function computeReturnOnAdSpend(input: ReturnOnAdSpendInput) {
  const roi = input.adSpend > 0 ? (input.revenue / input.adSpend) * 100 : 0;
  const cpc = input.clicks > 0 ? input.adSpend / input.clicks : 0;
  const ctr = input.impressions > 0 ? (input.clicks / input.impressions) * 100 : 0;
  const cpm = input.impressions > 0 ? (input.adSpend / input.impressions) * 1000 : 0;
  return { roi, cpc, ctr, cpm };
}

export function ReturnOnAdSpendCalculator() {
  const [adSpend, setAdSpend] = useState('5000');
  const [revenue, setRevenue] = useState('20000');
  const [impressions, setImpressions] = useState('250000');
  const [clicks, setClicks] = useState('8000');

  const result = useMemo(
    () =>
      computeReturnOnAdSpend({
        adSpend: Number(adSpend) || 0,
        revenue: Number(revenue) || 0,
        impressions: Number(impressions) || 0,
        clicks: Number(clicks) || 0,
      }),
    [adSpend, revenue, impressions, clicks]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Ad spend ($)" value={adSpend} onChange={setAdSpend} min={0} step="100" />
            <NumberField label="Revenue from ads ($)" value={revenue} onChange={setRevenue} min={0} step="100" />
            <NumberField label="Impressions" value={impressions} onChange={setImpressions} min={0} step="1000" />
            <NumberField label="Clicks" value={clicks} onChange={setClicks} min={0} step="100" />
          </div>
          <Hint>
            ROAS = revenue ÷ ad spend × 100. It tells you how many dollars each advertising dollar
            returned. Also compute CPC, CTR and CPM for a full paid-media picture.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="ROAS"
            value={`${formatMoney(result.roi)}%`}
            sub={`Revenue ${formatMoney(Number(revenue))}`}
          />
          <ResultRows>
            <ResultRow label="Cost per click" value={formatMoney(result.cpc)} />
            <ResultRow label="Click-through rate" value={`${formatMoney(result.ctr)}%`} />
            <ResultRow label="CPM" value={formatMoney(result.cpm)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ReturnOnAdSpendCalculator;