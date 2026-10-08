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

export interface PavementDesignInput {
  esals: number;
  thickness: number;
  cbr: number;
}

export function computePavementDesign(input: PavementDesignInput) {
  const esals = Math.max(1, input.esals);
  const cbrTerm = input.cbr > 0 ? 150 / input.cbr : 0;
  const required = 10 + 5 * Math.log10(esals) + cbrTerm;
  const margin = input.thickness - required;
  const structuralIndex = input.thickness * Math.max(0, input.cbr);
  return { required, margin, structuralIndex, esals };
}

export function PavementDesignCalculator() {
  const [esals, setEsals] = useState('10');
  const [thickness, setThickness] = useState('25');
  const [cbr, setCbr] = useState('5');

  const result = computePavementDesign({
    esals: Number(esals) || 0,
    thickness: Number(thickness) || 0,
    cbr: Number(cbr) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Design traffic (million ESALs)"
              value={esals}
              onChange={setEsals}
              min={0}
              step="0.1"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Pavement thickness (cm)"
                value={thickness}
                onChange={setThickness}
                min={0}
                step="0.5"
              />
              <NumberField label="Subgrade CBR (%)" value={cbr} onChange={setCbr} min={0} step="0.5" />
            </div>
          </div>
          <Hint>
            Simplified design aid relating traffic loading, thickness and subgrade CBR — always confirm with a
            full AASHTO or local authority pavement design.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Required thickness"
            value={`${formatMoney(result.required)} cm`}
            sub={`${formatMoney(result.margin)} cm against the provided slab`
            }
          />
          <ResultRows>
            <ResultRow label="Provided thickness (cm)" value={formatMoney(Number(thickness) || 0)} />
            <ResultRow label="Thickness margin (cm)" value={formatMoney(result.margin)} />
            <ResultRow label="Structural index" value={formatMoney(result.structuralIndex)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PavementDesignCalculator;
