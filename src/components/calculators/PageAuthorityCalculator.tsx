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

export interface PageAuthorityInput {
  domainAuthority: number;
  backlinks: number;
  referringDomains: number;
  spamScore: number;
}

export function computePageAuthority(input: PageAuthorityInput) {
  const ratio = input.referringDomains > 0 ? input.backlinks / input.referringDomains : 0;
  const authorityScore = input.domainAuthority * (1 - input.spamScore / 100);
  const linkDiversity = Math.min(1, input.referringDomains / Math.max(1, input.backlinks));
  return { ratio, authorityScore, linkDiversity };
}

export function PageAuthorityCalculator() {
  const [domainAuthority, setDomainAuthority] = useState('50');
  const [backlinks, setBacklinks] = useState('500');
  const [referringDomains, setReferringDomains] = useState('120');
  const [spamScore, setSpamScore] = useState('15');

  const result = useMemo(
    () =>
      computePageAuthority({
        domainAuthority: Number(domainAuthority) || 0,
        backlinks: Number(backlinks) || 0,
        referringDomains: Number(referringDomains) || 0,
        spamScore: Number(spamScore) || 0,
      }),
    [domainAuthority, backlinks, referringDomains, spamScore]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Domain authority" value={domainAuthority} onChange={setDomainAuthority} min={0} max={100} step="1" />
            <NumberField label="Backlinks" value={backlinks} onChange={setBacklinks} min={0} step="10" />
            <NumberField label="Referring domains" value={referringDomains} onChange={setReferringDomains} min={0} step="1" />
            <NumberField label="Spam score (%)" value={spamScore} onChange={setSpamScore} min={0} max={100} step="1" />
          </div>
          <Hint>
            Page authority estimates how well a page ranks. Adjust the domain authority by the
            spam score and inspect the ratio of backlinks to referring domains — a healthy
            profile has many referring domains and few duplicate links.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Authority score"
            value={formatMoney(result.authorityScore)}
            sub={`DA ${formatMoney(Number(domainAuthority))}`}
          />
          <ResultRows>
            <ResultRow label="Backlinks per domain" value={formatMoney(result.ratio)} />
            <ResultRow label="Link diversity" value={formatMoney(result.linkDiversity)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PageAuthorityCalculator;