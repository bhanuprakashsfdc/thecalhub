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

export interface DeflectionInput {
  loadN: number;
  spanM: number;
  elasticModulusGpa: number;
  momentInertiaCm4: number;
}

export function computeDeflection(input: DeflectionInput) {
  const ePa = input.elasticModulusGpa * 1e9;
  const iM4 = input.momentInertiaCm4 * 1e-8;
  const stiffness = ePa * iM4;
  const delta =
    stiffness > 0
      ? (input.loadN * Math.pow(input.spanM, 3)) / (48 * stiffness)
      : 0;
  const deltaMm = delta * 1000;
  const ratio = delta > 0 ? input.spanM / delta : 0;
  return { delta, deltaMm, ratio, stiffness };
}

export function DeflectionCalculator() {
  const [loadN, setLoadN] = useState('10000');
  const [spanM, setSpanM] = useState('5');
  const [elasticModulusGpa, setElasticModulusGpa] = useState('200');
  const [momentInertiaCm4, setMomentInertiaCm4] = useState('400');

  const result = computeDeflection({
    loadN: Number(loadN) || 0,
    spanM: Number(spanM) || 0,
    elasticModulusGpa: Number(elasticModulusGpa) || 0,
    momentInertiaCm4: Number(momentInertiaCm4) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Load (N)" value={loadN} onChange={setLoadN} min={0} />
            <NumberField label="Span length (m)" value={spanM} onChange={setSpanM} min={0} step="0.1" />
            <NumberField label="Elastic modulus (GPa)" value={elasticModulusGpa} onChange={setElasticModulusGpa} min={0} step="1" />
            <NumberField label="Moment of inertia (cm⁴)" value={momentInertiaCm4} onChange={setMomentInertiaCm4} min={0} step="1" />
          </div>
          <Hint>
            Simply supported beam, point load at centre:
            δ = PL³ ÷ (48EI). Steel is ~200 GPa; typical I-beams run 200–800 cm⁴.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Maximum deflection"
            value={`${formatMoney(result.deltaMm)} mm`}
            sub="At mid-span"
          />
          <ResultRows>
            <ResultRow label="Deflection (m)" value={formatMoney(result.delta)} />
            <ResultRow label={`Deflection ratio (L/${formatMoney(result.ratio)})`} value={formatMoney(result.ratio)} />
            <ResultRow label="Bending stiffness (N·m²)" value={formatMoney(result.stiffness)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DeflectionCalculator;
