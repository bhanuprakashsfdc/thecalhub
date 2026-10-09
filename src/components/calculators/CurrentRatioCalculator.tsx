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

export interface CurrentRatioInput {
  currentAssets: number;
  currentLiabilities: number;
}

export function computeCurrentRatio(input: CurrentRatioInput) {
  const ratio =
    input.currentLiabilities > 0 ? input.currentAssets / input.currentLiabilities : 0;
  const workingCapital = input.currentAssets - input.currentLiabilities;
  const liabilitiesShare =
    input.currentAssets > 0 ? (input.currentLiabilities / input.currentAssets) * 100 : 0;
  const interpretation =
    ratio >= 1.5 ? 'Healthy' : ratio >= 1 ? 'Adequate' : 'Weak';
  return { ratio, workingCapital, liabilitiesShare, interpretation };
}

export function CurrentRatioCalculator() {
  const [currentAssets, setCurrentAssets] = useState('180000');
  const [currentLiabilities, setCurrentLiabilities] = useState('90000');

  const result = computeCurrentRatio({
    currentAssets: Number(currentAssets) || 0,
    currentLiabilities: Number(currentLiabilities) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Current assets ($)" value={currentAssets} onChange={setCurrentAssets} min={0} />
            <NumberField label="Current liabilities ($)" value={currentLiabilities} onChange={setCurrentLiabilities} min={0} />
          </div>
          <Hint>
            Current ratio = current assets ÷ current liabilities. Above
            1.5 is generally healthy; below 1 signals liquidity risk.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Current ratio" value={formatMoney(result.ratio)} sub="Liquidity measure" />
          <ResultRows>
            <ResultRow label="Working capital" value={`$${formatMoney(result.workingCapital)}`} />
            <ResultRow label="Ratio interpretation" value={result.interpretation} />
            <ResultRow label="Liabilities as share of assets" value={`${formatMoney(result.liabilitiesShare)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CurrentRatioCalculator;
