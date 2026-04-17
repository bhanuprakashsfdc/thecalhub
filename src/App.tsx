import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Grid3X3, Percent, Clock, Calendar, Scale } from 'lucide-react';
import { TopBar } from './components/layout/TopBar';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import FractionCalculator from './components/calculators/FractionCalculator';
import PercentCalculator from './components/calculators/PercentCalculator';
import PercentageCalculator from './components/calculators/PercentageCalculator';
import BMICalculator from './components/calculators/BMICalculator';
import BMRCalculator from './components/calculators/BMRCalculator';
import CalorieCalculator from './components/calculators/CalorieCalculator';
import TipCalculator from './components/calculators/TipCalculator';
import GSTCalculator from './components/calculators/GSTCalculator';
import AgeCalculator from './components/calculators/AgeCalculator';
import DateCalculator from './components/calculators/DateCalculator';
import MortgageCalculator from './components/calculators/MortgageCalculator';
import LoanCalculator from './components/calculators/LoanCalculator';
import CarLoanCalculator from './components/calculators/CarLoanCalculator';
import PersonalLoanCalculator from './components/calculators/PersonalLoanCalculator';
import TaxCalculator from './components/calculators/TaxCalculator';
import RetirementCalculator from './components/calculators/RetirementCalculator';
import InvestmentCalculator from './components/calculators/InvestmentCalculator';
import CompoundInterestCalc from './components/calculators/CompoundInterestCalc';
import SimpleInterestCalc from './components/calculators/SimpleInterestCalc';
import FDCalculator from './components/calculators/FDCalculator';
import RDCalculator from './components/calculators/RDCalculator';
import SIPCalculator from './components/calculators/SIPCalculator';
import NPSCalculator from './components/calculators/NPSCalculator';
import PPFCalculator from './components/calculators/PPFCalculator';
import HomeLoanCalc from './components/calculators/HomeLoanCalc';
import PaceCalculator from './components/calculators/PaceCalculator';
import TDEECalculator from './components/calculators/TDEECalculator';
import { StandardCalc } from './components/calculators/StandardCalc';
import { ScientificCalc } from './components/calculators/ScientificCalc';
import { ProgrammingCalc } from './components/calculators/ProgrammingCalc';

const seoData: Record<string, { title: string; description: string }> = {
  '/': { title: 'TheCalHub - All-in-One Free Online Calculators', description: 'Free online calculators for finance, health, math, and more. Calculate EMI, BMI, interest, taxes, and more with our professional tools.' },
  '/all.html': { title: 'All Calculators - TheCalHub', description: 'Browse all available calculators. Financial, health, math, date & time calculators and more.' },
  '/bmi-calculator.html': { title: 'BMI Calculator - TheCalHub', description: 'Calculate your Body Mass Index (BMI) online for free. Check if your weight is healthy.' },
  '/emi-calculator.html': { title: 'EMI Calculator - TheCalHub', description: 'Calculate your loan EMI online. Free EMI calculator for home loan, car loan, personal loan and more.' },
  '/compound-interest-calculator.html': { title: 'Compound Interest Calculator - TheCalHub', description: 'Calculate compound interest and see your investment growth over time with our free calculator.' },
  '/tax-calculator.html': { title: 'Tax Calculator - TheCalHub', description: 'Estimate your income tax liability with our free online tax calculator.' },
  '/age-calculator.html': { title: 'Age Calculator - TheCalHub', description: 'Calculate your exact age in years, months, and days. Free online age calculator.' },
  '/retirement-calculator.html': { title: 'Retirement Calculator - TheCalHub', description: 'Plan your retirement savings. Calculate how much you need to save for retirement.' },
  '/investment-calculator.html': { title: 'Investment Calculator - TheCalHub', description: 'Calculate your investment growth. See how your investments can grow over time.' },
};

function SEO() {
  const location = useLocation();
  const data = seoData[location.pathname] || seoData['/'];
  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content="calculator, online calculator, free calculator, BMI calculator, EMI calculator, tax calculator" />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}

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
      '/percentage-calculator.html': 'Percentage Calculator',
      '/bmi-calculator.html': 'BMI Calculator',
      '/bmr-calculator.html': 'BMR Calculator',
      '/calorie-calculator.html': 'Calorie Calculator',
      '/gst-calculator.html': 'GST Calculator',
      '/tip-calculator.html': 'Tip Calculator',
      '/pace-calculator.html': 'Pace Calculator',
      '/tdee-calculator.html': 'TDEE Calculator',
      '/age-calculator.html': 'Age Calculator',
      '/date-calculator.html': 'Date Calculator',
      '/compound-interest-calculator.html': 'Compound Interest Calculator',
      '/simple-interest-calculator.html': 'Simple Interest Calculator',
      '/fd-calculator.html': 'FD Calculator',
      '/rd-calculator.html': 'RD Calculator',
      '/sip-calculator.html': 'SIP Calculator',
      '/nps-calculator.html': 'NPS Calculator',
      '/ppf-calculator.html': 'PPF Calculator',
      '/home-loan-calculator.html': 'Home Loan Calculator',
      '/car-loan-calculator.html': 'Car Loan Calculator',
      '/personal-loan-calculator.html': 'Personal Loan Calculator',
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
        <SEO />
        <TopBar title={getTitle()} />
        <main className="pt-14">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/index.html" element={<Dashboard />} />
              <Route path="/all.html" element={<Dashboard />} />
              <Route path="/standard.html" element={<StandardPage />} />
              <Route path="/financial.html" element={<Dashboard />} />
              <Route path="/support.html" element={<About />} />
              <Route path="/fraction-calculator.html" element={<FractionCalculator />} />
              <Route path="/percent-calculator.html" element={<PercentCalculator />} />
              <Route path="/percentage-calculator.html" element={<PercentageCalculator />} />
              <Route path="/bmi-calculator.html" element={<BMICalculator />} />
              <Route path="/bmr-calculator.html" element={<BMRCalculator />} />
              <Route path="/calorie-calculator.html" element={<CalorieCalculator />} />
              <Route path="/gst-calculator.html" element={<GSTCalculator />} />
              <Route path="/tip-calculator.html" element={<TipCalculator />} />
              <Route path="/pace-calculator.html" element={<PaceCalculator />} />
              <Route path="/tdee-calculator.html" element={<TDEECalculator />} />
              <Route path="/age-calculator.html" element={<AgeCalculator />} />
              <Route path="/date-calculator.html" element={<DateCalculator />} />
              <Route path="/compound-interest-calculator.html" element={<CompoundInterestCalc />} />
              <Route path="/simple-interest-calculator.html" element={<SimpleInterestCalc />} />
              <Route path="/fd-calculator.html" element={<FDCalculator />} />
              <Route path="/rd-calculator.html" element={<RDCalculator />} />
              <Route path="/sip-calculator.html" element={<SIPCalculator />} />
              <Route path="/nps-calculator.html" element={<NPSCalculator />} />
              <Route path="/ppf-calculator.html" element={<PPFCalculator />} />
              <Route path="/home-loan-calculator.html" element={<HomeLoanCalc />} />
              <Route path="/car-loan-calculator.html" element={<CarLoanCalculator />} />
              <Route path="/personal-loan-calculator.html" element={<PersonalLoanCalculator />} />
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
          </ErrorBoundary>
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
