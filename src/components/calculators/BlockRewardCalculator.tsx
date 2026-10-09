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

export interface BlockRewardInput {
  blockNumber: number;
  feePerBlock: number;
}

export function computeBlockReward(input: BlockRewardInput) {
  const halvings = Math.floor(input.blockNumber / 210000);
  const baseReward = 50 / Math.pow(2, halvings);
  const totalReward = baseReward + input.feePerBlock;
  return { baseReward, totalReward, halvings, feePerBlock: input.feePerBlock };
}

export function BlockRewardCalculator() {
  const [blockNumber, setBlockNumber] = useState('840000');
  const [feePerBlock, setFeePerBlock] = useState('1.5');

  const result = computeBlockReward({
    blockNumber: Number(blockNumber) || 0,
    feePerBlock: Number(feePerBlock) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Block number" value={blockNumber} onChange={setBlockNumber} min={0} step="1" />
            <NumberField label="Transaction fees per block (BTC)" value={feePerBlock} onChange={setFeePerBlock} min={0} step="0.1" />
          </div>
          <Hint>
            Bitcoin block rewards start at 50 BTC and halve every 210,000 blocks. The current block number
            determines how many halvings have occurred, and the block reward is the halved base plus
            whatever transaction fees are included in that block.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total block reward"
            value={`${formatMoney(result.totalReward)} BTC`}
            sub={`Halving epoch ${result.halvings}`}
          />
          <ResultRows>
            <ResultRow label="Base block reward" value={`${formatMoney(result.baseReward)} BTC`} />
            <ResultRow label="Transaction fees" value={`${formatMoney(result.feePerBlock)} BTC`} />
            <ResultRow label="Halvings so far" value={`${result.halvings}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default BlockRewardCalculator;