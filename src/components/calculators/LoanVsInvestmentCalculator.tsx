import { useState, useMemo } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface LoanVsInvestmentInput {
  // Loan details
  loanAmount: number;
  loanInterestRate: number;
  loanTenureYears: number;
  downPayment: number;
  
  // Car ownership costs (annual)
  annualMaintenance: number;
  annualInsurance: number;
  annualPetrol: number;
  annualPetrolIncrease: number; // percentage increase per year
  
  // Investment comparison
  investmentReturnRate: number;
  investmentFrequency: 'monthly' | 'quarterly' | 'yearly';
}

export function computeLoanVsInvestment(input: LoanVsInvestmentInput) {
  // Loan calculations
  const loanPrincipal = Math.max(0, input.loanAmount - input.downPayment);
  const monthlyRate = input.loanInterestRate / 100 / 12;
  const totalMonths = input.loanTenureYears * 12;
  
  let monthlyEMI = 0;
  if (monthlyRate > 0) {
    monthlyEMI = (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                 (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyEMI = loanPrincipal / totalMonths;
  }
  
  const totalLoanPayment = monthlyEMI * totalMonths;
  const totalLoanInterest = totalLoanPayment - loanPrincipal;
  
  // Ownership costs over loan tenure
  let totalMaintenance = 0;
  let totalInsurance = 0;
  let totalPetrol = 0;
  
  let currentPetrol = input.annualPetrol;
  for (let year = 1; year <= input.loanTenureYears; year++) {
    totalMaintenance += input.annualMaintenance;
    totalInsurance += input.annualInsurance;
    totalPetrol += currentPetrol;
    currentPetrol *= (1 + input.annualPetrolIncrease / 100);
  }
  
  const totalOwnershipCost = totalLoanPayment + totalMaintenance + totalInsurance + totalPetrol;
  
  // Investment comparison: What if we invested the down payment + EMI + ownership costs?
  // Scenario: Invest the down payment upfront, then invest monthly EMI + monthly ownership costs
  
  const monthlyOwnershipCost = (input.annualMaintenance + input.annualInsurance + input.annualPetrol) / 12;
  const monthlyInvestment = monthlyEMI + monthlyOwnershipCost;
  
  // Investment growth calculation
  const invRate = input.investmentReturnRate / 100;
  let invPeriods: number;
  let invRatePerPeriod: number;
  
  switch (input.investmentFrequency) {
    case 'monthly':
      invPeriods = input.loanTenureYears * 12;
      invRatePerPeriod = invRate / 12;
      break;
    case 'quarterly':
      invPeriods = input.loanTenureYears * 4;
      invRatePerPeriod = invRate / 4;
      break;
    case 'yearly':
    default:
      invPeriods = input.loanTenureYears;
      invRatePerPeriod = invRate;
      break;
  }
  
  // Future value of down payment (lump sum)
  const downPaymentFV = input.downPayment * Math.pow(1 + invRatePerPeriod, invPeriods);
  
  // Future value of monthly investments (annuity)
  let monthlyInvestmentFV = 0;
  if (invRatePerPeriod > 0) {
    monthlyInvestmentFV = monthlyInvestment * 
      (Math.pow(1 + invRatePerPeriod, invPeriods) - 1) / invRatePerPeriod;
  } else {
    monthlyInvestmentFV = monthlyInvestment * invPeriods;
  }
  
  const totalInvestmentValue = downPaymentFV + monthlyInvestmentFV;
  const totalInvestedAmount = input.downPayment + monthlyInvestment * invPeriods;
  const investmentGains = totalInvestmentValue - totalInvestedAmount;
  
  // Opportunity cost
  const opportunityCost = totalInvestmentValue - totalOwnershipCost;
  
  // Car value after loan tenure (depreciation)
  const carValueAfterLoan = input.loanAmount * Math.pow(1 - 0.15, input.loanTenureYears); // 15% annual depreciation
  const netCostOfOwnership = totalOwnershipCost - carValueAfterLoan;
  const netInvestmentBenefit = totalInvestmentValue - totalInvestedAmount;
  
  return {
    // Loan
    loanPrincipal,
    monthlyEMI,
    totalLoanPayment,
    totalLoanInterest,
    
    // Ownership costs
    totalMaintenance,
    totalInsurance,
    totalPetrol,
    totalOwnershipCost,
    
    // Investment
    downPaymentFV,
    monthlyInvestmentFV,
    totalInvestmentValue,
    totalInvestedAmount,
    investmentGains,
    
    // Comparison
    opportunityCost,
    carValueAfterLoan,
    netCostOfOwnership,
    netInvestmentBenefit,
    
    // Monthly breakdown
    monthlyOwnershipCost,
    monthlyInvestment,
  };
}

export function LoanVsInvestmentCalculator() {
  const [loanAmount, setLoanAmount] = useState('800000');
  const [loanInterestRate, setLoanInterestRate] = useState('9.5');
  const [loanTenureYears, setLoanTenureYears] = useState('5');
  const [downPayment, setDownPayment] = useState('200000');
  
  const [annualMaintenance, setAnnualMaintenance] = useState('15000');
  const [annualInsurance, setAnnualInsurance] = useState('25000');
  const [annualPetrol, setAnnualPetrol] = useState('60000');
  const [annualPetrolIncrease, setAnnualPetrolIncrease] = useState('5');
  
  const [investmentReturnRate, setInvestmentReturnRate] = useState('12');
  const [investmentFrequency, setInvestmentFrequency] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const result = useMemo(() => computeLoanVsInvestment({
    loanAmount: Number(loanAmount) || 0,
    loanInterestRate: Number(loanInterestRate) || 0,
    loanTenureYears: Number(loanTenureYears) || 0,
    downPayment: Number(downPayment) || 0,
    annualMaintenance: Number(annualMaintenance) || 0,
    annualInsurance: Number(annualInsurance) || 0,
    annualPetrol: Number(annualPetrol) || 0,
    annualPetrolIncrease: Number(annualPetrolIncrease) || 0,
    investmentReturnRate: Number(investmentReturnRate) || 0,
    investmentFrequency,
  }), [loanAmount, loanInterestRate, loanTenureYears, downPayment, annualMaintenance, annualInsurance, annualPetrol, annualPetrolIncrease, investmentReturnRate, investmentFrequency]);

  const frequencyOptions = [
    { value: 'monthly', label: 'Monthly (SIP)' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <span className="w-4 h-4">⚖️</span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Loan vs Investment Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Compare the true cost of car ownership (loan + maintenance + insurance + petrol) vs investing the same amount. See the opportunity cost of buying vs investing.</p>
      </div>

      <CalcGrid
        inputs={
          <Panel>
            <PanelEyebrow>Loan Details</PanelEyebrow>
            <div className="space-y-6">
              <NumberField label="Car On-Road Price (₹)" value={loanAmount} onChange={setLoanAmount} min={0} />
              <NumberField label="Down Payment (₹)" value={downPayment} onChange={setDownPayment} min={0} hint="Upfront payment" />
              <div className="grid grid-cols-2 gap-4">
                <NumberField label="Loan Interest Rate (%)" value={loanInterestRate} onChange={setLoanInterestRate} min={0} max={20} step="0.1" />
                <NumberField label="Loan Tenure (Years)" value={loanTenureYears} onChange={setLoanTenureYears} min={1} max={10} />
              </div>
            </div>
            
            <div className="mt-8">
              <PanelEyebrow>Annual Ownership Costs</PanelEyebrow>
              <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <NumberField label="Annual Maintenance (₹)" value={annualMaintenance} onChange={setAnnualMaintenance} min={0} />
                <NumberField label="Annual Insurance (₹)" value={annualInsurance} onChange={setAnnualInsurance} min={0} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <NumberField label="Annual Petrol (₹)" value={annualPetrol} onChange={setAnnualPetrol} min={0} />
                <NumberField label="Petrol Price Increase (%/yr)" value={annualPetrolIncrease} onChange={setAnnualPetrolIncrease} min={0} max={20} step="0.1" />
              </div>
            </div>
              </div>

            <div className="mt-8">
              <PanelEyebrow>Investment Comparison</PanelEyebrow>
              <div className="space-y-6 mt-4">
              <NumberField label="Expected Investment Return (%)" value={investmentReturnRate} onChange={setInvestmentReturnRate} min={0} max={30} step="0.1" hint="e.g., 12% for equity mutual funds" />
              <SelectField
                label="Investment Frequency"
                value={investmentFrequency}
                onChange={(v) => setInvestmentFrequency(v as 'monthly' | 'quarterly' | 'yearly')}
                options={frequencyOptions}
              />
            </div>
              </div>

            <Hint>
              This calculator compares: (1) Total cost of car ownership including loan EMI, maintenance, insurance, and petrol over the loan tenure vs (2) Investing the down payment + monthly EMI + ownership costs at your expected return rate. The opportunity cost shows how much more you'd have by investing instead.
            </Hint>
          </Panel>
        }
        results={
          <Panel>
            <PanelEyebrow>Comparison Results</PanelEyebrow>
            
            <ResultHero
              label="Opportunity Cost (Lost Investment Gains)"
              value={`₹${formatMoney(result.opportunityCost)}`}
              sub={result.opportunityCost > 0 ? 'Investing would have earned this much more' : 'Car ownership costs less than investing'}
            />
            
            <div className="mt-6 space-y-4">
              <div className="bg-surface-container-highest p-6 rounded-xl">
                <h4 className="text-white font-medium mb-4">🚗 Car Ownership Cost (${loanTenureYears} Years)</h4>
                <ResultRows>
                  <ResultRow label="Loan Principal" value={`₹${formatMoney(result.loanPrincipal)}`} />
                  <ResultRow label="Total Loan Payment (EMI × ${loanTenureYears * 12})" value={`₹${formatMoney(result.totalLoanPayment)}`} />
                  <ResultRow label="Total Loan Interest" value={`₹${formatMoney(result.totalLoanInterest)}`} />
                  <ResultRow label="Total Maintenance" value={`₹${formatMoney(result.totalMaintenance)}`} />
                  <ResultRow label="Total Insurance" value={`₹${formatMoney(result.totalInsurance)}`} />
                  <ResultRow label="Total Petrol (with ${annualPetrolIncrease}% annual increase)" value={`₹${formatMoney(result.totalPetrol)}`} />
                  <ResultRow label="Est. Car Value After ${loanTenureYears} Years" value={`₹${formatMoney(result.carValueAfterLoan)}`} />
                  <ResultRow label="Net Cost of Ownership" value={`₹${formatMoney(result.netCostOfOwnership)}`} />
                </ResultRows>
              </div>
              
              <div className="bg-surface-container-highest p-6 rounded-xl">
                <h4 className="text-white font-medium mb-4">📈 Investment Alternative (${loanTenureYears} Years)</h4>
                <ResultRows>
                  <ResultRow label="Down Payment Invested" value={`₹${formatMoney(Number(downPayment))}`} />
                  <ResultRow label="Monthly Investment (EMI + Ownership)" value={`₹${formatMoney(result.monthlyInvestment)}`} />
                  <ResultRow label="Total Amount Invested" value={`₹${formatMoney(result.totalInvestedAmount)}`} />
                  <ResultRow label="Future Value of Down Payment" value={`₹${formatMoney(result.downPaymentFV)}`} />
                  <ResultRow label="Future Value of Monthly Investments" value={`₹${formatMoney(result.monthlyInvestmentFV)}`} />
                  <ResultRow label="Total Investment Value" value={`₹${formatMoney(result.totalInvestmentValue)}`} />
                  <ResultRow label="Investment Gains" value={`₹${formatMoney(result.investmentGains)}`} />
                </ResultRows>
              </div>
            </div>
            
            <ResultRows>
              <ResultRow label="Total Cost of Car Ownership" value={`₹${formatMoney(result.totalOwnershipCost)}`} />
              <ResultRow label="Total Investment Value" value={`₹${formatMoney(result.totalInvestmentValue)}`} />
              <ResultRow label="Opportunity Cost" value={`₹${formatMoney(result.opportunityCost)}`} />
            </ResultRows>
          </Panel>
        }
      />
    </div>
  );
}

export default LoanVsInvestmentCalculator;