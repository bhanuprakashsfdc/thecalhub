import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sparkles, Grid3X3, Percent, Clock, Calendar, Scale } from 'lucide-react';
import { TopBar } from './components/layout/TopBar';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
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
import { StandardCalc } from './components/calculators/StandardCalc';
import { ScientificCalc } from './components/calculators/ScientificCalc';
import { ProgrammingCalc } from './components/calculators/ProgrammingCalc';

function MathPage() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Math Calculators</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">All math calculators in one place.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <a href="/fraction-calculator.html" className="bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center"><Grid3X3 className="w-6 h-6 text-primary-fixed" /></div>
          <div><h3 className="text-lg font-bold text-white mb-1">Fraction Calculator</h3><p className="text-neutral-400 text-sm">Perform arithmetic on fractions</p></div>
        </a>
        <a href="/percent-calculator.html" className="bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center"><Percent className="w-6 h-6 text-primary-fixed" /></div>
          <div><h3 className="text-lg font-bold text-white mb-1">Percent Calculator</h3><p className="text-neutral-400 text-sm">Calculate percentages</p></div>
        </a>
      </div>
    </div>
  );
}

function DateTimePage() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Date & Time Calculators</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Calculate age, date differences, and more.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <a href="/age-calculator.html" className="bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center"><Clock className="w-6 h-6 text-primary-fixed" /></div>
          <div><h3 className="text-lg font-bold text-white mb-1">Age Calculator</h3><p className="text-neutral-400 text-sm">Calculate your exact age</p></div>
        </a>
        <a href="/date-calculator.html" className="bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center"><Calendar className="w-6 h-6 text-primary-fixed" /></div>
          <div><h3 className="text-lg font-bold text-white mb-1">Date Calculator</h3><p className="text-neutral-400 text-sm">Calculate difference between dates</p></div>
        </a>
      </div>
    </div>
  );
}

function ScientificPage() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scientific</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Scientific Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Perform advanced mathematical calculations.</p>
      </div>
      <div className="max-w-md mx-auto">
        <ScientificCalc />
      </div>
    </div>
  );
}

function ProgrammingPage() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Programming</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Programming Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Convert between number bases.</p>
      </div>
      <div className="max-w-md mx-auto">
        <ProgrammingCalc />
      </div>
    </div>
  );
}

function StandardPage() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Standard</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Standard Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Perform basic arithmetic operations.</p>
      </div>
      <div className="max-w-md mx-auto">
        <StandardCalc />
      </div>
    </div>
  );
}

function HealthPage() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Health</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Health Calculators</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Calculate BMI and other health metrics.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <a href="/bmi-calculator.html" className="bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center"><Scale className="w-6 h-6 text-primary-fixed" /></div>
          <div><h3 className="text-lg font-bold text-white mb-1">BMI Calculator</h3><p className="text-neutral-400 text-sm">Calculate your Body Mass Index</p></div>
        </a>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  
  const getTitle = () => {
    const titles: Record<string, string> = {
      '/': 'Dashboard',
      '/index.html': 'Dashboard',
      '/all.html': 'All Calculators',
      '/standard.html': 'Standard Calculator',
      '/financial.html': 'Financial Calculators',
      '/support.html': 'About & Disclaimer',
      '/fraction-calculator.html': 'Fraction Calculator',
      '/percent-calculator.html': 'Percent Calculator',
      '/bmi-calculator.html': 'BMI Calculator',
      '/tip-calculator.html': 'Tip Calculator',
      '/age-calculator.html': 'Age Calculator',
      '/date-calculator.html': 'Date Calculator',
      '/compound-interest-calculator.html': 'Compound Interest Calculator',
      '/simple-interest-calculator.html': 'Simple Interest Calculator',
      '/fd-calculator.html': 'FD Calculator',
      '/sip-calculator.html': 'SIP Calculator',
      '/nps-calculator.html': 'NPS Calculator',
      '/ppf-calculator.html': 'PPF Calculator',
      '/home-loan-calculator.html': 'Home Loan Calculator',
      '/mortgage-calculator.html': 'Mortgage Calculator',
      '/loan-calculator.html': 'Loan Calculator',
      '/tax-calculator.html': 'Tax Calculator',
      '/retirement-calculator.html': 'Retirement Calculator',
      '/investment-calculator.html': 'Investment Calculator',
      '/scientific-calculator.html': 'Scientific Calculator',
      '/programming-calculator.html': 'Programming Calculator',
      '/math.html': 'Math Calculators',
      '/datetime.html': 'Date & Time Calculators',
      '/health.html': 'Health Calculators',
    };
    return titles[location.pathname] || 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface">
        <TopBar title={getTitle()} />
        <main className="pt-14">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/index.html" element={<Dashboard />} />
            <Route path="/all.html" element={<Dashboard />} />
            <Route path="/standard.html" element={<StandardPage />} />
            <Route path="/financial.html" element={<Dashboard />} />
            <Route path="/support.html" element={<About />} />
            <Route path="/fraction-calculator.html" element={<FractionCalculator />} />
            <Route path="/percent-calculator.html" element={<PercentCalculator />} />
            <Route path="/bmi-calculator.html" element={<BMICalculator />} />
            <Route path="/tip-calculator.html" element={<TipCalculator />} />
            <Route path="/age-calculator.html" element={<AgeCalculator />} />
            <Route path="/date-calculator.html" element={<DateCalculator />} />
            <Route path="/compound-interest-calculator.html" element={<CompoundInterestCalc />} />
            <Route path="/simple-interest-calculator.html" element={<SimpleInterestCalc />} />
            <Route path="/fd-calculator.html" element={<FDCalculator />} />
            <Route path="/sip-calculator.html" element={<SIPCalculator />} />
            <Route path="/nps-calculator.html" element={<NPSCalculator />} />
            <Route path="/ppf-calculator.html" element={<PPFCalculator />} />
            <Route path="/home-loan-calculator.html" element={<HomeLoanCalc />} />
            <Route path="/mortgage-calculator.html" element={<MortgageCalculator />} />
            <Route path="/loan-calculator.html" element={<LoanCalculator />} />
            <Route path="/tax-calculator.html" element={<TaxCalculator />} />
            <Route path="/retirement-calculator.html" element={<RetirementCalculator />} />
            <Route path="/investment-calculator.html" element={<InvestmentCalculator />} />
            <Route path="/scientific-calculator.html" element={<ScientificPage />} />
            <Route path="/programming-calculator.html" element={<ProgrammingPage />} />
            <Route path="/math.html" element={<MathPage />} />
            <Route path="/datetime.html" element={<DateTimePage />} />
            <Route path="/health.html" element={<HealthPage />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
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
