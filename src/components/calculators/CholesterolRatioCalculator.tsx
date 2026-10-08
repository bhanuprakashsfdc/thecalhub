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

export interface CholesterolRatioInput {
  total: number;
  hdl: number;
  ldl: number;
  triglycerides: number;
}

export function computeCholesterolRatio(input: CholesterolRatioInput) {
  const ratio = safeDiv(input.total, input.hdl);
  const nonHdl = input.total - input.hdl;
  const ldlHdl = safeDiv(input.ldl, input.hdl);
  const tgHdl = safeDiv(input.triglycerides, input.hdl);
  const risk = ratio <= 3.5 ? 'Ideal' : ratio <= 5 ? 'Acceptable' : 'High';
  const ldlRisk = input.ldl < 100 ? 'Optimal' : input.ldl < 130 ? 'Near optimal' : 'Borderline high';
  return { ratio, nonHdl, ldlHdl, tgHdl, risk, ldlRisk };
}

export function CholesterolRatioCalculator() {
  const [total, setTotal] = useState('200');
  const [hdl, setHdl] = useState('50');
  const [ldl, setLdl] = useState('120');
  const [triglycerides, setTriglycerides] = useState('150');

  const result = computeCholesterolRatio({
    total: Number(total) || 0,
    hdl: Number(hdl) || 0,
    ldl: Number(ldl) || 0,
    triglycerides: Number(triglycerides) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total cholesterol (mg/dL)" value={total} onChange={setTotal} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="HDL (mg/dL)" value={hdl} onChange={setHdl} min={0} />
              <NumberField label="LDL (mg/dL)" value={ldl} onChange={setLdl} min={0} />
            </div>
            <NumberField label="Triglycerides (mg/dL)" value={triglycerides} onChange={setTriglycerides} min={0} />
          </div>
          <Hint>
            Ratios are often more informative than raw totals: a high total cholesterol paired with high HDL is
            far less concerning than the same total with low HDL.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total / HDL ratio"
            value={formatMoney(result.ratio)}
            sub={`${result.risk} — LDL: ${result.ldlRisk}`}
          />
          <ResultRows>
            <ResultRow label="Non-HDL cholesterol" value={`${formatMoney(result.nonHdl)} mg/dL`} />
            <ResultRow label="LDL / HDL ratio" value={formatMoney(result.ldlHdl)} />
            <ResultRow label="Triglycerides / HDL ratio" value={formatMoney(result.tgHdl)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CholesterolRatioCalculator;
