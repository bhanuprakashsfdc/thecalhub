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

export function NauticalMileCalculator() {
  const [nautical, setNautical] = useState('1');
  const [statute, setStatute] = useState('');

  const n = Number(nautical) || 0;
  const s = Number(statute) || 0;
  const nmToMi = n * 1.150779448;
  const miToNm = s / 1.150779448;

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Nautical Miles (NM)" value={nautical} onChange={setNautical} min={0} step="0.01" />
            <NumberField label="Statute Miles (mi)" value={statute} onChange={setStatute} min={0} step="0.01" />
          </div>
          <Hint>1 nautical mile = 1.150779448 statute miles.</Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Conversion" value={`${formatMoney(nmToMi)} mi`} sub={`Or ${formatMoney(miToNm)} NM from statute`} />
          <ResultRows>
            <ResultRow label="Nautical → Statute" value={`${formatMoney(nmToMi)} mi`} />
            <ResultRow label="Statute → Nautical" value={`${formatMoney(miToNm)} NM`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default NauticalMileCalculator;
