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

export interface ZeroBasedBudgetInput {
  income: number;
  rent: number;
  utilities: number;
  groceries: number;
  transport: number;
  debtPayments: number;
  savings: number;
  other: number;
}

export function computeZeroBasedBudget(input: ZeroBasedBudgetInput) {
  const income = Math.max(0, input.income);
  let assigned = 0;
  assigned += Math.max(0, input.rent);
  assigned += Math.max(0, input.utilities);
  assigned += Math.max(0, input.groceries);
  assigned += Math.max(0, input.transport);
  assigned += Math.max(0, input.debtPayments);
  assigned += Math.max(0, input.savings);
  assigned += Math.max(0, input.other);
  const unallocated = income - assigned;
  const assignedPercent = income > 0 ? (assigned / income) * 100 : 0;

  return { assigned, unallocated, assignedPercent };
}

export function ZeroBasedBudgetCalculator() {
  const [income, setIncome] = useState('5000');
  const [rent, setRent] = useState('1500');
  const [utilities, setUtilities] = useState('300');
  const [groceries, setGroceries] = useState('600');
  const [transport, setTransport] = useState('400');
  const [debtPayments, setDebtPayments] = useState('500');
  const [savings, setSavings] = useState('800');
  const [other, setOther] = useState('200');

  const result = computeZeroBasedBudget({
    income: Number(income) || 0,
    rent: Number(rent) || 0,
    utilities: Number(utilities) || 0,
    groceries: Number(groceries) || 0,
    transport: Number(transport) || 0,
    debtPayments: Number(debtPayments) || 0,
    savings: Number(savings) || 0,
    other: Number(other) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Assign every dollar</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Monthly income ($)" value={income} onChange={setIncome} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Rent or mortgage ($)" value={rent} onChange={setRent} min={0} />
              <NumberField label="Utilities ($)" value={utilities} onChange={setUtilities} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Groceries ($)" value={groceries} onChange={setGroceries} min={0} />
              <NumberField label="Transport ($)" value={transport} onChange={setTransport} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Debt payments ($)" value={debtPayments} onChange={setDebtPayments} min={0} />
              <NumberField label="Savings ($)" value={savings} onChange={setSavings} min={0} />
            </div>
            <NumberField label="Other spending ($)" value={other} onChange={setOther} min={0} />
          </div>
          <Hint>
            Zero-based budgeting starts each month at $0: every dollar is assigned to a category, and anything
            unassigned goes to debt or savings rather than vanishing into general spending.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Unassigned income"
            value={`$${formatMoney(result.unallocated)}`}
            sub={result.unallocated >= 0 ? 'Still needs a job' : 'Spending more than you earn'}
          />
          <ResultRows>
            <ResultRow label="Total assigned" value={`$${formatMoney(result.assigned)}`} />
            <ResultRow label="Assigned share of income" value={`${formatMoney(result.assignedPercent)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ZeroBasedBudgetCalculator;
