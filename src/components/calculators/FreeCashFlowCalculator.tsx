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

export interface FreeCashFlowInput {
  ebitda: number;
  capex: number;
  changeInWorkingCapital: number;
  depreciation: number;
  taxRate: number;
}

export function computeFreeCashFlow(input: FreeCashFlowInput) {
  const nopat = input.ebitda * (1 - input.taxRate / 100);
  const fcf = nopat - input.capex - input.changeInWorkingCapital;
  return { nopat, fcf };
}

export function FreeCashFlowCalculator() {
  const [ebitda, setEbitda] = useState('5000000');
  const [capex, setCapex] = useState('800000');
  const [changeInWorkingCapital, setChangeInWorkingCapital] = useState('50000');
  const [depreciation, setDepreciation] = useState('300000');
  const [taxRate, setTaxRate] = useState('21');

  const result = useMemo(
    () =>
      computeFreeCashFlow({
        ebitda: Number(ebitda) || 0,
        capex: Number(capex) || 0,
        changeInWorkingCapital: Number(changeInWorkingCapital) || 0,
        depreciation: Number(depreciation) || 0,
        taxRate: Number(taxRate) || 0,
      }),
    [ebitda, capex, changeInWorkingCapital, depreciation, taxRate]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="EBITDA ($)" value={ebitda} onChange={setEbitda} min={0} step="100000" />
            <NumberField label="Capital expenditure ($)" value={capex} onChange={setCapex} min={0} step="10000" />
            <NumberField label="Change in working capital ($)" value={changeInWorkingCapital} onChange={setChangeInWorkingCapital} step="10000" />
            <NumberField label="Depreciation ($)" value={depreciation} onChange={setDepreciation} min={0} step="10000" />
            <NumberField label="Tax rate (%)" value={taxRate} onChange={setTaxRate} min={0} max={100} step="1" />
          </div>
          <Hint>
            Free cash flow = EBITDA × (1 − tax rate) − capex − ΔWC. It is the cash the business
            actually generates after maintaining its asset base and working capital.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Free cash flow"
            value={`${formatMoney(result.fcf)}`}
            sub={`NOPAT ${formatMoney(result.nopat)}`}
          />
          <ResultRows>
            <ResultRow label="NOPAT" value={formatMoney(result.nopat)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FreeCashFlowCalculator;