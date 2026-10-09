import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SegmentedControl,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface AttorneyFeeInput {
  retainer: number;
  hourlyRate: number;
  hours: number;
  flatFee: number;
  settlement: number;
  contingencyPct: number;
  feeStructure: 'hourly' | 'flat' | 'contingency';
}

export function computeAttorneyFee(input: AttorneyFeeInput) {
  const hourlyTotal = input.retainer + input.hourlyRate * input.hours;
  const contingencyTotal = input.settlement * (input.contingencyPct / 100);
  const total =
    input.feeStructure === 'flat'
      ? input.flatFee
      : input.feeStructure === 'contingency'
        ? contingencyTotal
        : hourlyTotal;
  const effectivePerHour = input.hours > 0 ? total / input.hours : 0;
  const retainerRemaining = Math.max(0, input.retainer - input.hourlyRate * input.hours);
  const shareOfSettlement =
    input.settlement > 0 ? (total / input.settlement) * 100 : 0;
  return { total, effectivePerHour, retainerRemaining, shareOfSettlement };
}

export function AttorneyFeeCalculator() {
  const [feeStructure, setFeeStructure] = useState('hourly');
  const [retainer, setRetainer] = useState('5000');
  const [hourlyRate, setHourlyRate] = useState('350');
  const [hours, setHours] = useState('20');
  const [flatFee, setFlatFee] = useState('8000');
  const [settlement, setSettlement] = useState('100000');
  const [contingencyPct, setContingencyPct] = useState('33');

  const result = computeAttorneyFee({
    retainer: Number(retainer) || 0,
    hourlyRate: Number(hourlyRate) || 0,
    hours: Number(hours) || 0,
    flatFee: Number(flatFee) || 0,
    settlement: Number(settlement) || 0,
    contingencyPct: Number(contingencyPct) || 0,
    feeStructure:
      feeStructure === 'flat'
        ? 'flat'
        : feeStructure === 'contingency'
          ? 'contingency'
          : 'hourly',
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SegmentedControl
              label="Fee structure"
              value={feeStructure}
              onChange={setFeeStructure}
              options={[
                { value: 'hourly', label: 'Hourly' },
                { value: 'flat', label: 'Flat fee' },
                { value: 'contingency', label: 'Contingency' },
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Retainer ($)" value={retainer} onChange={setRetainer} min={0} />
              <NumberField label="Hourly rate ($)" value={hourlyRate} onChange={setHourlyRate} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Hours worked" value={hours} onChange={setHours} min={0} />
              <NumberField label="Flat fee ($)" value={flatFee} onChange={setFlatFee} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Settlement amount ($)" value={settlement} onChange={setSettlement} min={0} />
              <NumberField label="Contingency percentage (%)" value={contingencyPct} onChange={setContingencyPct} min={0} max={100} step="1" />
            </div>
          </div>
          <Hint>
            Hourly fees bill against the retainer; flat fees are fixed;
            contingency fees are a percentage of the settlement.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total attorney fee"
            value={`$${formatMoney(result.total)}`}
            sub={feeStructure === 'flat' ? 'Flat fee' : feeStructure === 'contingency' ? 'Contingency fee' : 'Retainer + hourly'}
          />
          <ResultRows>
            <ResultRow label="Effective cost per hour" value={`$${formatMoney(result.effectivePerHour)}`} />
            <ResultRow label="Retainer remaining" value={`$${formatMoney(result.retainerRemaining)}`} />
            <ResultRow label="Fee as share of settlement" value={`${formatMoney(result.shareOfSettlement)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AttorneyFeeCalculator;
