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

export interface HeatOfReactionInput {
  bondsBroken: number;
  bondsFormed: number;
}

export function computeHeatOfReaction(input: HeatOfReactionInput) {
  const deltaH = input.bondsBroken - input.bondsFormed;
  const balance = safeDiv(input.bondsFormed, input.bondsBroken);
  const sign = deltaH < 0 ? 'Exothermic' : deltaH === 0 ? 'Balanced' : 'Endothermic';
  return { deltaH, balance, sign };
}

export function HeatOfReactionCalculator() {
  const [bondsBroken, setBondsBroken] = useState('1200');
  const [bondsFormed, setBondsFormed] = useState('1450');

  const result = computeHeatOfReaction({
    bondsBroken: Number(bondsBroken) || 0,
    bondsFormed: Number(bondsFormed) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Energy to break bonds (kJ)"
              value={bondsBroken}
              onChange={setBondsBroken}
              min={0}
            />
            <NumberField
              label="Energy released forming bonds (kJ)"
              value={bondsFormed}
              onChange={setBondsFormed}
              min={0}
            />
          </div>
          <Hint>
            Breaking bonds absorbs energy and forming bonds releases it — the net balance decides whether a
            reaction releases heat overall.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Heat of reaction"
            value={`${formatMoney(result.deltaH)} kJ`}
            sub={result.sign}
          />
          <ResultRows>
            <ResultRow label="Formed / broken ratio" value={formatMoney(result.balance)} />
            <ResultRow label="Bond energy balance (kJ)" value={formatMoney(result.deltaH)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HeatOfReactionCalculator;
