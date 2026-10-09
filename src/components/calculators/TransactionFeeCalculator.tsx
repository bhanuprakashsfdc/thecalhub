import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface TransactionFeeInput {
  feeRate: number;
  txSize: number;
  amountUsd: number;
  tokenPrice: number;
}

export interface TransactionFeeResult {
  feeNative: number;
  feeUsd: number;
  feePercentOfAmount: number;
  effectiveRate: number;
}

const nonNegative = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

/**
 * Model: `feeRate` is denominated in NATIVE tokens per unit of transaction
 * size (BTC per byte, ETH per gas unit, ...), so
 *   feeNative = feeRate * txSize  (native tokens)
 *   feeUsd    = feeNative * tokenPrice
 * Non-finite or negative inputs are treated as 0 so results are never NaN.
 */
export function computeTransactionFee(input: TransactionFeeInput): TransactionFeeResult {
  const feeRate = nonNegative(input.feeRate);
  const txSize = nonNegative(input.txSize);
  const amountUsd = nonNegative(input.amountUsd);
  const tokenPrice = nonNegative(input.tokenPrice);

  const feeNative = feeRate * txSize;
  const feeUsd = feeNative * tokenPrice;
  const feePercentOfAmount = amountUsd > 0 ? (feeUsd / amountUsd) * 100 : 0;
  const effectiveRate = txSize > 0 ? feeUsd / txSize : 0;

  return { feeNative, feeUsd, feePercentOfAmount, effectiveRate };
}

interface FeeModel {
  label: string;
  scale: number;
  symbol: string;
  unit: string;
}

const FEE_MODELS: Record<string, FeeModel> = {
  bitcoin: { label: 'Bitcoin — sat/byte', scale: 1e-8, symbol: 'BTC', unit: 'sat/byte' },
  ethereum: { label: 'Ethereum — gwei/gas', scale: 1e-9, symbol: 'ETH', unit: 'gwei/gas' },
  native: { label: 'Native units per size unit', scale: 1, symbol: 'units', unit: 'native/unit' },
};

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export function TransactionFeeCalculator() {
  const [model, setModel] = useState('bitcoin');
  const [feeRate, setFeeRate] = useState('10');
  const [txSize, setTxSize] = useState('250');
  const [amountUsd, setAmountUsd] = useState('1000');
  const [tokenPrice, setTokenPrice] = useState('60000');

  const active = FEE_MODELS[model] ?? FEE_MODELS.native;

  const result = computeTransactionFee({
    feeRate: toNumber(feeRate) * active.scale,
    txSize: toNumber(txSize),
    amountUsd: toNumber(amountUsd),
    tokenPrice: toNumber(tokenPrice),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField
              label="Network / fee model"
              value={model}
              onChange={setModel}
              options={Object.entries(FEE_MODELS).map(([value, m]) => ({ value, label: m.label }))}
            />
            <NumberField
              label="Fee rate"
              value={feeRate}
              onChange={setFeeRate}
              min={0}
              step="0.1"
              hint={`Entered in ${active.unit}; converted to native tokens before pricing.`}
            />
            <NumberField
              label="Transaction size (bytes or gas)"
              value={txSize}
              onChange={setTxSize}
              min={0}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Amount sent (USD)" value={amountUsd} onChange={setAmountUsd} min={0} />
              <NumberField label="Native token price (USD)" value={tokenPrice} onChange={setTokenPrice} min={0} />
            </div>
          </div>
          <Hint>
            The fee rate is treated as native tokens per unit of size: fee = rate × size, then multiplied by
            the token price to get USD. Sat/byte and gwei/gas are scaled by 10⁻⁸ and 10⁻⁹ respectively, so a
            $1 fee on a $1,000 transfer is 0.1% of the amount sent.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Network fee"
            value={`$${formatMoney(result.feeUsd)}`}
            sub={`Amount sent: $${formatMoney(toNumber(amountUsd))} • ${formatMoney(toNumber(feeRate), 4)} ${
              active.unit
            } × ${formatMoney(toNumber(txSize), 0)} units`}
          />
          <ResultRows>
            <ResultRow
              label={`Fee in ${active.symbol}`}
              value={`${formatMoney(result.feeNative, 8)} ${active.symbol}`}
            />
            <ResultRow label="Fee as % of amount" value={`${formatMoney(result.feePercentOfAmount)}%`} />
            <ResultRow
              label="Effective cost per size unit"
              value={`${formatMoney(result.effectiveRate, 4)} USD`}
            />
          </ResultRows>
          <Hint>
            The effective rate divides the USD fee by the transaction size, and the percentage row shows what
            the network fee costs relative to the value you are sending.
          </Hint>
        </Panel>
      }
    />
  );
}

export default TransactionFeeCalculator;
