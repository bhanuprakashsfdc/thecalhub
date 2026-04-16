import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import Dashboard from './pages/Dashboard';
import EMICalculator from './pages/EMICalculator';
import FinancialTools from './pages/FinancialTools';
import About from './pages/About';
import CalculatorSuite from './pages/CalculatorSuite';
import FractionCalculator from './components/calculators/FractionCalculator';
import PercentCalculator from './components/calculators/PercentCalculator';
import BMICalculator from './components/calculators/BMICalculator';
import TipCalculator from './components/calculators/TipCalculator';
import AgeCalculator from './components/calculators/AgeCalculator';
import DateCalculator from './components/calculators/DateCalculator';
import MortgageCalculator from './components/calculators/MortgageCalculator';
import LoanCalculator from './components/calculators/LoanCalculator';
import TaxCalculator from './components/calculators/TaxCalculator';
import RetirementCalculator from './components/calculators/RetirementCalculator';
import InvestmentCalculator from './components/calculators/InvestmentCalculator';
import CompoundInterestCalc from './components/calculators/CompoundInterestCalc';
import SimpleInterestCalc from './components/calculators/SimpleInterestCalc';
import FDCalculator from './components/calculators/FDCalculator';
import SIPCalculator from './components/calculators/SIPCalculator';
import NPSCalculator from './components/calculators/NPSCalculator';
import PPFCalculator from './components/calculators/PPFCalculator';
import HomeLoanCalc from './components/calculators/HomeLoanCalc';

function AppContent() {
  const location = useLocation();
  
  const getTitle = () => {
    const titles: Record<string, string> = {
      '/standard.html': 'Standard Calculators',
      '/financial.html': 'Financial Calculators',
      '/suite.html': 'Calculator Suite',
      '/support.html': 'About & Disclaimer',
      '/fraction.html': 'Fraction Calculator',
      '/percent.html': 'Percent Calculator',
      '/bmi.html': 'BMI Calculator',
      '/tip.html': 'Tip Calculator',
      '/age.html': 'Age Calculator',
      '/date-calc.html': 'Date Calculator',
      '/compound-interest.html': 'Compound Interest',
      '/simple-interest.html': 'Simple Interest',
      '/fd.html': 'Fixed Deposit Calculator',
      '/sip.html': 'SIP Calculator',
      '/nps.html': 'NPS Calculator',
      '/ppf.html': 'PPF Calculator',
      '/home-loan.html': 'Home Loan Calculator',
      '/mortgage.html': 'Mortgage Calculator',
      '/loan.html': 'Loan Calculator',
      '/tax.html': 'Tax Calculator',
      '/retirement.html': 'Retirement Calculator',
      '/investment.html': 'Investment Calculator',
    };
    return titles[location.pathname];
  };

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-on-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative overflow-y-auto">
        <TopBar title={getTitle()} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/index.html" element={<Dashboard />} />
            <Route path="/suite.html" element={<CalculatorSuite />} />
            <Route path="/standard.html" element={<EMICalculator />} />
            <Route path="/financial.html" element={<FinancialTools />} />
            <Route path="/support.html" element={<About />} />
            <Route path="/fraction.html" element={<FractionCalculator />} />
            <Route path="/percent.html" element={<PercentCalculator />} />
            <Route path="/bmi.html" element={<BMICalculator />} />
            <Route path="/tip.html" element={<TipCalculator />} />
            <Route path="/age.html" element={<AgeCalculator />} />
            <Route path="/date-calc.html" element={<DateCalculator />} />
            <Route path="/compound-interest.html" element={<CompoundInterestCalc />} />
            <Route path="/simple-interest.html" element={<SimpleInterestCalc />} />
            <Route path="/fd.html" element={<FDCalculator />} />
            <Route path="/sip.html" element={<SIPCalculator />} />
            <Route path="/nps.html" element={<NPSCalculator />} />
            <Route path="/ppf.html" element={<PPFCalculator />} />
            <Route path="/home-loan.html" element={<HomeLoanCalc />} />
            <Route path="/mortgage.html" element={<MortgageCalculator />} />
            <Route path="/loan.html" element={<LoanCalculator />} />
            <Route path="/tax.html" element={<TaxCalculator />} />
            <Route path="/retirement.html" element={<RetirementCalculator />} />
            <Route path="/investment.html" element={<InvestmentCalculator />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}