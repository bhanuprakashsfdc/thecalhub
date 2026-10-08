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

export interface CompostingInput {
  browns: number;
  greens: number;
  carbonPct: number;
  nitrogenPct: number;
}

export function computeComposting(input: CompostingInput) {
  const carbon = input.browns * (input.carbonPct / 100);
  const nitrogen = input.greens * (input.nitrogenPct / 100);
  const cnRatio = safeDiv(carbon, nitrogen);
  const days = 30 + Math.abs(cnRatio - 30) * 1.5;
  const verdict = cnRatio >= 25 && cnRatio <= 35 ? 'Ideal' : cnRatio > 35 ? 'Too carbon rich' : 'Too nitrogen rich';
  return { carbon, nitrogen, cnRatio, days, verdict };
}

export function CompostingCalculator() {
  const [browns, setBrowns] = useState('60');
  const [greens, setGreens] = useState('10');
  const [carbonPct, setCarbonPct] = useState('45');
  const [nitrogenPct, setNitrogenPct] = useState('4');

  const result = computeComposting({
    browns: Number(browns) || 0,
    greens: Number(greens) || 0,
    carbonPct: Number(carbonPct) || 0,
    nitrogenPct: Number(nitrogenPct) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Browns — carbon material (kg)" value={browns} onChange={setBrowns} min={0} />
              <NumberField label="Greens — nitrogen material (kg)" value={greens} onChange={setGreens} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Carbon in browns (%)"
                value={carbonPct}
                onChange={setCarbonPct}
                min={0}
                max={100}
                step="0.1"
              />
              <NumberField
                label="Nitrogen in greens (%)"
                value={nitrogenPct}
                onChange={setNitrogenPct}
                min={0}
                max={100}
                step="0.1"
              />
            </div>
          </div>
          <Hint>
            A C:N ratio near 30:1 gives microbes the balanced diet they need — too much carbon slows the pile,
            too much nitrogen turns it sour and smelly.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Carbon to nitrogen ratio"
            value={`${formatMoney(result.cnRatio)} : 1`}
            sub={result.verdict}
          />
          <ResultRows>
            <ResultRow label="Carbon contributed (kg)" value={formatMoney(result.carbon)} />
            <ResultRow label="Nitrogen contributed (kg)" value={formatMoney(result.nitrogen)} />
            <ResultRow label="Estimated days to cure" value={formatMoney(result.days)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CompostingCalculator;
