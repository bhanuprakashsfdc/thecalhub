import React from 'react';
import { TrendingUp, CreditCard, Calculator } from 'lucide-react';

const financialCalculators = [
  { name: 'EMI Calculator', path: '/emi-calculator.html', description: 'Calculate monthly installments' },
  { name: 'Compound Interest Calculator', path: '/compound-interest-calculator.html', description: 'Calculate CI with compounding' },
  { name: 'Simple Interest Calculator', path: '/simple-interest-calculator.html', description: 'Calculate simple interest' },
  { name: 'FD Calculator', path: '/fd-calculator.html', description: 'Fixed deposit returns' },
  { name: 'RD Calculator', path: '/rd-calculator.html', description: 'Recurring deposit returns' },
  { name: 'PPF Calculator', path: '/ppf-calculator.html', description: 'Public provident fund' },
  { name: 'NPS Calculator', path: '/nps-calculator.html', description: 'National pension scheme' },
  { name: 'SIP Calculator', path: '/sip-calculator.html', description: 'Systematic investment plan' },
  { name: 'Home Loan Calculator', path: '/home-loan-calculator.html', description: 'Housing loan EMI' },
  { name: 'Car Loan Calculator', path: '/car-loan-calculator.html', description: 'Vehicle loan EMI' },
  { name: 'Personal Loan Calculator', path: '/personal-loan-calculator.html', description: 'Unsecured loan EMI' },
  { name: 'Tax Calculator', path: '/tax-calculator.html', description: 'Income tax estimation' },
  { name: 'Mortgage Calculator', path: '/mortgage-calculator.html', description: 'Calculate mortgage payments' },
  { name: 'Loan Calculator', path: '/loan-calculator.html', description: 'General loan calculator' },
  { name: 'Retirement Calculator', path: '/retirement-calculator.html', description: 'Plan retirement savings' },
  { name: 'Investment Calculator', path: '/investment-calculator.html', description: 'Investment growth' },
];

export default function FinancialPage() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <CreditCard className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Financial Calculators</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate loans, investments, interest, and plan your financial future with our comprehensive financial tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialCalculators.map((calc) => (
          <a
            key={calc.name}
            href={calc.path}
            className="bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-fixed" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{calc.name}</h3>
              <p className="text-neutral-400 text-sm">{calc.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
