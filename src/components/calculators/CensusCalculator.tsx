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

export function CensusCalculator() {
  const [population, setPopulation] = useState('1000');
  const [sample, setSample] = useState('100');
  const [response, setResponse] = useState('95');

  const s = Number(sample) || 0;
  const r = Number(response) || 0;
  const rate = s > 0 ? (r / s) * 100 : 0;

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total Population" value={population} onChange={setPopulation} min={0} step="1" />
            <NumberField label="Sample Size" value={sample} onChange={setSample} min={0} step="1" />
            <NumberField label="Responses" value={response} onChange={setResponse} min={0} step="1" />
          </div>
          <Hint>Response rate and projected figures.</Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Response Rate" value={`${formatMoney(rate)}%`} />
          <ResultRows>
            <ResultRow label="Sample Size" value={sample} />
            <ResultRow label="Responses" value={response} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CensusCalculator;
