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

export interface LiverFunctionInput {
  ast: number;
  alt: number;
  albumin: number;
  bilirubin: number;
}

export function computeLiverFunction(input: LiverFunctionInput) {
  const deritis = safeDiv(input.ast, input.alt);
  const astElev = Math.max(0, input.ast - 40);
  const altElev = Math.max(0, input.alt - 40);
  const albuminDeficit = Math.max(0, 4 - input.albumin);
  const bilirubinElev = Math.max(0, input.bilirubin - 1.2);
  const score = Math.max(
    0,
    100 - astElev * 0.5 - altElev * 0.5 - albuminDeficit * 25 - bilirubinElev * 15
  );
  const marker = score >= 80 ? 'Healthy' : score >= 60 ? 'Mild stress' : score >= 40 ? 'Moderate' : 'Severe';
  return { deritis, astElev, altElev, albuminDeficit, bilirubinElev, score, marker };
}

export function LiverFunctionCalculator() {
  const [ast, setAst] = useState('30');
  const [alt, setAlt] = useState('35');
  const [albumin, setAlbumin] = useState('4.2');
  const [bilirubin, setBilirubin] = useState('0.9');

  const result = computeLiverFunction({
    ast: Number(ast) || 0,
    alt: Number(alt) || 0,
    albumin: Number(albumin) || 0,
    bilirubin: Number(bilirubin) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="AST (U/L)" value={ast} onChange={setAst} min={0} />
              <NumberField label="ALT (U/L)" value={alt} onChange={setAlt} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Albumin (g/dL)"
                value={albumin}
                onChange={setAlbumin}
                min={0}
                step="0.1"
              />
              <NumberField
                label="Bilirubin (mg/dL)"
                value={bilirubin}
                onChange={setBilirubin}
                min={0}
                step="0.1"
              />
            </div>
          </div>
          <Hint>
            AST and ALT are liver enzymes released when cells are damaged; albumin and bilirubin show how well the
            liver is still making proteins and clearing waste.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Liver health score"
            value={formatMoney(result.score)}
            sub={`${result.marker} — De Ritis ratio ${formatMoney(result.deritis)}`}
          />
          <ResultRows>
            <ResultRow label="De Ritis ratio (AST/ALT)" value={formatMoney(result.deritis)} />
            <ResultRow label="Elevated enzymes (U/L)" value={formatMoney(result.astElev + result.altElev)} />
            <ResultRow label="Bilirubin excess (mg/dL)" value={formatMoney(result.bilirubinElev)} />
            <ResultRow label="Albumin deficit (g/dL)" value={formatMoney(result.albuminDeficit)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default LiverFunctionCalculator;
