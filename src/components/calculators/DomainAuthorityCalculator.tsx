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

export interface DomainAuthorityInput {
  referringDomains: number;
  backlinks: number;
  ageYears: number;
}

export function computeDomainAuthority(input: DomainAuthorityInput) {
  const linkEquity =
    Math.log10(input.referringDomains * 10 + 1) * 10 +
    Math.log10(input.backlinks + 1) * 4;
  const ageContribution = input.ageYears * 1.5;
  const authority = Math.min(
    100,
    Math.max(1, Math.round(linkEquity + ageContribution))
  );
  const rangeLow = Math.max(1, authority - 5);
  const rangeHigh = Math.min(100, authority + 5);
  return { linkEquity, ageContribution, authority, rangeLow, rangeHigh };
}

export function DomainAuthorityCalculator() {
  const [referringDomains, setReferringDomains] = useState('120');
  const [backlinks, setBacklinks] = useState('800');
  const [ageYears, setAgeYears] = useState('5');

  const result = computeDomainAuthority({
    referringDomains: Number(referringDomains) || 0,
    backlinks: Number(backlinks) || 0,
    ageYears: Number(ageYears) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Referring domains" value={referringDomains} onChange={setReferringDomains} min={0} step="1" />
            <NumberField label="Total backlinks" value={backlinks} onChange={setBacklinks} min={0} step="1" />
            <NumberField label="Domain age (years)" value={ageYears} onChange={setAgeYears} min={0} step="0.5" />
          </div>
          <Hint>
            Heuristic estimate in the spirit of Moz's DA: logarithmic
            link equity plus a small age bonus, capped at 100.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Estimated domain authority"
            value={String(result.authority)}
            sub="Out of 100"
          />
          <ResultRows>
            <ResultRow label="Link equity score" value={formatMoney(result.linkEquity)} />
            <ResultRow label="Age contribution" value={formatMoney(result.ageContribution)} />
            <ResultRow label="Projected range" value={`${result.rangeLow}–${result.rangeHigh}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DomainAuthorityCalculator;
