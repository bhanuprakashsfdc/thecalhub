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
  safeDiv,
} from './kit';

export interface CryptoMiningInput {
  hashrateMh: number;
  networkHashrateTh: number;
  blockReward: number;
  blocksPerDay: number;
  coinPrice: number;
  powerWatts: number;
  electricityRate: number;
  poolFeePercent: number;
}

export interface CryptoMiningResult {
  dailyCoins: number;
  dailyRevenue: number;
  poolFee: number;
  powerCost: number;
  dailyProfit: number;
  monthlyProfit: number;
  costPerCoin: number;
  breakEvenPrice: number;
}

const pos = (n: number) => {
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

export function computeCryptoMining(input: CryptoMiningInput): CryptoMiningResult {
  const hashrateMh = pos(input.hashrateMh);
  const networkHashrateTh = pos(input.networkHashrateTh);
  const blockReward = pos(input.blockReward);
  const blocksPerDay = pos(input.blocksPerDay);
  const coinPrice = pos(input.coinPrice);
  const powerWatts = pos(input.powerWatts);
  const electricityRate = pos(input.electricityRate);
  const poolFeePercent = Math.min(100, pos(input.poolFeePercent));

  const share = networkHashrateTh > 0 ? (hashrateMh * 1e6) / (networkHashrateTh * 1e12) : 0;
  const dailyCoins = share * blocksPerDay * blockReward;
  const dailyRevenue = dailyCoins * coinPrice;
  const poolFee = dailyRevenue * poolFeePercent * 0.01;
  const powerCost = (powerWatts / 1000) * 24 * electricityRate;
  const dailyProfit = dailyRevenue - poolFee - powerCost;
  const monthlyProfit = dailyProfit * 30;
  const costPerCoin = dailyCoins > 0 ? powerCost / dailyCoins : 0;
  const breakEvenPrice =
    dailyCoins > 0 && poolFeePercent < 100
      ? powerCost / (dailyCoins * (1 - poolFeePercent * 0.01))
      : 0;

  return {
    dailyCoins,
    dailyRevenue,
    poolFee,
    powerCost,
    dailyProfit,
    monthlyProfit,
    costPerCoin,
    breakEvenPrice,
  };
}

export function CryptoMiningCalculator() {
  const [hashrateMh, setHashrateMh] = useState('100');
  const [networkHashrateTh, setNetworkHashrateTh] = useState('100');
  const [blockReward, setBlockReward] = useState('3.125');
  const [coinPrice, setCoinPrice] = useState('60000');
  const [powerWatts, setPowerWatts] = useState('1500');
  const [electricityRate, setElectricityRate] = useState('0.10');
  const [poolFeePercent, setPoolFeePercent] = useState('2');

  const result = computeCryptoMining({
    hashrateMh: Number(hashrateMh) || 0,
    networkHashrateTh: Number(networkHashrateTh) || 0,
    blockReward: Number(blockReward) || 0,
    blocksPerDay: 144,
    coinPrice: Number(coinPrice) || 0,
    powerWatts: Number(powerWatts) || 0,
    electricityRate: Number(electricityRate) || 0,
    poolFeePercent: Number(poolFeePercent) || 0,
  });

  const coinPriceNum = Number(coinPrice) || 0;

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Your hashrate (MH/s)" value={hashrateMh} onChange={setHashrateMh} min={0} />
              <NumberField
                label="Network hashrate (TH/s)"
                value={networkHashrateTh}
                onChange={setNetworkHashrateTh}
                min={0}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Block reward (coins)" value={blockReward} onChange={setBlockReward} min={0} step="0.001" />
              <NumberField label="Coin price ($)" value={coinPrice} onChange={setCoinPrice} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Power draw (W)" value={powerWatts} onChange={setPowerWatts} min={0} />
              <NumberField
                label="Electricity ($/kWh)"
                value={electricityRate}
                onChange={setElectricityRate}
                min={0}
                step="0.01"
              />
            </div>
            <NumberField label="Pool fee (%)" value={poolFeePercent} onChange={setPoolFeePercent} min={0} step="0.1" />
          </div>
          <Hint>
            Your share of the network is hashrate ÷ network hashrate, multiplied by 144 blocks a day and the
            block reward. Revenue is then reduced by the pool fee and 24-hour electricity cost.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Daily net profit"
            value={`$${formatMoney(result.dailyProfit)}`}
            sub={`$${formatMoney(result.dailyRevenue)} revenue − $${formatMoney(result.poolFee)} pool fee − $${formatMoney(
              result.powerCost
            )} power`}
          />
          <ResultRows>
            <ResultRow label="Daily coins mined" value={formatMoney(result.dailyCoins, 6)} />
            <ResultRow label="Monthly net profit" value={`$${formatMoney(result.monthlyProfit)}`} />
            <ResultRow label="Electricity cost per coin" value={`$${formatMoney(result.costPerCoin)}`} />
            <ResultRow
              label="Break-even coin price"
              value={result.breakEvenPrice > 0 ? `$${formatMoney(result.breakEvenPrice)}` : '—'}
            />
            <ResultRow
              label="Profit margin"
              value={`${formatMoney(safeDiv(result.dailyProfit, result.dailyRevenue) * 100)}%`}
            />
          </ResultRows>
          <Hint>
            Margin compares the daily profit to gross revenue, while the break-even price is the coin value
            where mining exactly covers electricity after the pool fee.
          </Hint>
        </Panel>
      }
    />
  );
}

export default CryptoMiningCalculator;
