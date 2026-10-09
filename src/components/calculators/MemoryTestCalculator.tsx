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

export interface MemoryTestInput {
  itemsShown: number;
  itemsRecalled: number;
  trialsAttempted: number;
  trialsCorrect: number;
}

export function computeMemoryTest(input: MemoryTestInput) {
  const accuracy =
    input.itemsShown > 0 ? (input.itemsRecalled / input.itemsShown) * 100 : 0;
  const trialRate =
    input.trialsAttempted > 0 ? (input.trialsCorrect / input.trialsAttempted) * 100 : 0;
  const score = (accuracy + trialRate) / 2;
  return { accuracy, trialRate, score };
}

export function MemoryTestCalculator() {
  const [itemsShown, setItemsShown] = useState('10');
  const [itemsRecalled, setItemsRecalled] = useState('8');
  const [trialsAttempted, setTrialsAttempted] = useState('5');
  const [trialsCorrect, setTrialsCorrect] = useState('4');

  const result = computeMemoryTest({
    itemsShown: Number(itemsShown) || 0,
    itemsRecalled: Number(itemsRecalled) || 0,
    trialsAttempted: Number(trialsAttempted) || 0,
    trialsCorrect: Number(trialsCorrect) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Items shown" value={itemsShown} onChange={setItemsShown} min={0} />
              <NumberField label="Items recalled" value={itemsRecalled} onChange={setItemsRecalled} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Trials attempted" value={trialsAttempted} onChange={setTrialsAttempted} min={0} />
              <NumberField label="Trials correct" value={trialsCorrect} onChange={setTrialsCorrect} min={0} />
            </div>
          </div>
          <Hint>
            The memory score averages recall accuracy (items remembered) with trial
            success rate (trials passed), giving a 0–100 benchmark.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Memory score"
            value={`${formatMoney(result.score)}%`}
            sub="Average of both rates"
          />
          <ResultRows>
            <ResultRow label="Recall accuracy" value={`${formatMoney(result.accuracy)}%`} />
            <ResultRow label="Trial success rate" value={`${formatMoney(result.trialRate)}%`} />
            <ResultRow label="Items missed" value={formatMoney(Math.max(0, (Number(itemsShown) || 0) - (Number(itemsRecalled) || 0)))} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MemoryTestCalculator;
