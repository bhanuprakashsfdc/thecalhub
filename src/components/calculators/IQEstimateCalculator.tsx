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

export interface IQEstimateInput {
  testScore: number;
  testMean: number;
  testStdDev: number;
  populationMean: number;
  populationStdDev: number;
}

export function computeIQEstimate(input: IQEstimateInput) {
  const z = (input.testScore - input.testMean) / (input.testStdDev || 1);
  const iq = input.populationMean + z * input.populationStdDev;
  return { z, iq };
}

export function IQEstimateCalculator() {
  const [testScore, setTestScore] = useState('115');
  const [testMean, setTestMean] = useState('100');
  const [testStdDev, setTestStdDev] = useState('15');
  const [populationMean, setPopulationMean] = useState('100');
  const [populationStdDev, setPopulationStdDev] = useState('15');

  const result = useMemo(
    () =>
      computeIQEstimate({
        testScore: Number(testScore) || 0,
        testMean: Number(testMean) || 0,
        testStdDev: Number(testStdDev) || 0,
        populationMean: Number(populationMean) || 0,
        populationStdDev: Number(populationStdDev) || 0,
      }),
    [testScore, testMean, testStdDev, populationMean, populationStdDev]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Test score" value={testScore} onChange={setTestScore} step="1" />
            <NumberField label="Test mean" value={testMean} onChange={setTestMean} step="1" />
            <NumberField label="Test std dev" value={testStdDev} onChange={setTestStdDev} min={0} step="1" />
            <NumberField label="Target population mean" value={populationMean} onChange={setPopulationMean} step="1" />
            <NumberField label="Target population std dev" value={populationStdDev} onChange={setPopulationStdDev} min={0} step="1" />
          </div>
          <Hint>
            Convert a score on one test to an IQ-style score on another by matching z-scores: z =
            (score − mean) / std dev, then IQ = target mean + z × target std dev.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Estimated IQ"
            value={`${formatMoney(result.iq)}`}
            sub={`z-score ${formatMoney(result.z)}`}
          />
          <ResultRows>
            <ResultRow label="z-score" value={formatMoney(result.z)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default IQEstimateCalculator;