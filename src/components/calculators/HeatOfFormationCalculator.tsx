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

export interface HeatOfFormationInput {
  products: number;
  reactants: number;
  moles: number;
}

export function computeHeatOfFormation(input: HeatOfFormationInput) {
  const deltaH = input.products - input.reactants;
  const perMole = input.moles > 0 ? safeDiv(deltaH, input.moles) : 0;
  const sign = deltaH < 0 ? 'Exothermic' : deltaH === 0 ? 'Balanced' : 'Endothermic';
  return { deltaH, perMole, sign };
}

export function HeatOfFormationCalculator() {
  const [products, setProducts] = useState('-600');
  const [reactants, setReactants] = useState('-450');
  const [moles, setMoles] = useState('1');

  const result = computeHeatOfFormation({
    products: Number(products) || 0,
    reactants: Number(reactants) || 0,
    moles: Number(moles) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Σ ΔHf of products (kJ)"
              value={products}
              onChange={setProducts}
              step="0.1"
            />
            <NumberField
              label="Σ ΔHf of reactants (kJ)"
              value={reactants}
              onChange={setReactants}
              step="0.1"
            />
            <NumberField label="Moles of reaction" value={moles} onChange={setMoles} min={0} step="0.1" />
          </div>
          <Hint>
            Standard enthalpies of formation come from tables at 298 K: subtract the reactant total from the
            product total to get the reaction enthalpy.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Enthalpy of formation"
            value={`${formatMoney(result.deltaH)} kJ`}
            sub={result.sign}
          />
          <ResultRows>
            <ResultRow label="Per mole of reaction (kJ)" value={formatMoney(result.perMole)} />
            <ResultRow label="Products minus reactants (kJ)" value={formatMoney(result.deltaH)} />
            <ResultRow label="Moles of reaction" value={formatMoney(Number(moles) || 0)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HeatOfFormationCalculator;
