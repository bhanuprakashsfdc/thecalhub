import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Grid3X3, Percent, Clock, Calendar, Scale } from 'lucide-react';
import { TopBar } from './components/layout/TopBar';
import Footer from './components/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import { CALCULATORS } from './data/data';
import FinancialPage from './pages/FinancialPage';
import FitnessPage from './pages/FitnessPage';

// Lazy load all calculator components for code splitting
const FractionCalculator = lazy(() => import('./components/calculators/FractionCalculator'));
const PercentCalculator = lazy(() => import('./components/calculators/PercentCalculator'));
const PercentageCalculator = lazy(() => import('./components/calculators/PercentageCalculator'));
const BMICalculator = lazy(() => import('./components/calculators/BMICalculator'));
const BMRCalculator = lazy(() => import('./components/calculators/BMRCalculator'));
const CalorieCalculator = lazy(() => import('./components/calculators/CalorieCalculator'));
const TipCalculator = lazy(() => import('./components/calculators/TipCalculator'));
const GSTCalculator = lazy(() => import('./components/calculators/GSTCalculator'));
const AgeCalculator = lazy(() => import('./components/calculators/AgeCalculator'));
const DateCalculator = lazy(() => import('./components/calculators/DateCalculator'));
const MortgageCalculator = lazy(() => import('./components/calculators/MortgageCalculator'));
const LoanCalculator = lazy(() => import('./components/calculators/LoanCalculator'));
const CarLoanCalculator = lazy(() => import('./components/calculators/CarLoanCalculator'));
const PersonalLoanCalculator = lazy(() => import('./components/calculators/PersonalLoanCalculator'));
const TaxCalculator = lazy(() => import('./components/calculators/TaxCalculator'));
const RetirementCalculator = lazy(() => import('./components/calculators/RetirementCalculator'));
const InvestmentCalculator = lazy(() => import('./components/calculators/InvestmentCalculator'));
const CompoundInterestCalc = lazy(() => import('./components/calculators/CompoundInterestCalc'));
const SimpleInterestCalc = lazy(() => import('./components/calculators/SimpleInterestCalc'));
const FDCalculator = lazy(() => import('./components/calculators/FDCalculator'));
const RDCalculator = lazy(() => import('./components/calculators/RDCalculator'));
const SIPCalculator = lazy(() => import('./components/calculators/SIPCalculator'));
const NPSCalculator = lazy(() => import('./components/calculators/NPSCalculator'));
const PPFCalculator = lazy(() => import('./components/calculators/PPFCalculator'));
const HomeLoanCalc = lazy(() => import('./components/calculators/HomeLoanCalc'));
const PaceCalculator = lazy(() => import('./components/calculators/PaceCalculator'));
const TDEECalculator = lazy(() => import('./components/calculators/TDEECalculator'));
const EMICalculator = lazy(() => import('./components/calculators/EMICalculator'));
const FinancialCalc = lazy(() => import('./components/calculators/FinancialCalc'));
const StandardCalc = lazy(() => import('./components/calculators/StandardCalc'));
const ScientificCalc = lazy(() => import('./components/calculators/ScientificCalc'));
const ProgrammingCalc = lazy(() => import('./components/calculators/ProgrammingCalc'));
const ConcreteCalculator = lazy(() => import('./components/calculators/ConcreteCalculator'));
const StairCalculator = lazy(() => import('./components/calculators/StairCalculator'));
const GravelCalculator = lazy(() => import('./components/calculators/GravelCalculator'));
const TileCalculator = lazy(() => import('./components/calculators/TileCalculator'));
const PaintCalculator = lazy(() => import('./components/calculators/PaintCalculator'));
const WoodCalculator = lazy(() => import('./components/calculators/WoodCalculator'));
const CubicYardsCalculator = lazy(() => import('./components/calculators/CubicYardsCalculator'));

// Loading fallback component for Suspense
function CalculatorLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-fixed/30 border-t-primary-fixed rounded-full animate-spin" />
        <p className="text-neutral-500 text-sm font-mono">Loading calculator...</p>
      </div>
    </div>
  );
}

import { CalculatorPageLayout } from './components/CalculatorPageLayout';

// Base URL for SEO
const BASE_URL = 'https://thecalhub.com';

const calculatorSeo: Record<string, { title: string; description: string; keywords?: string; category?: any }> = {
  '/bmi-calculator.html': { title: 'BMI Calculator', description: 'Calculate your Body Mass Index (BMI) online for free.', keywords: 'BMI calculator, weight calculator', category: 'health' },
  '/bmr-calculator.html': { title: 'BMR Calculator', description: 'Calculate your Basal Metabolic Rate (BMR) online.', category: 'health' },
  '/calorie-calculator.html': { title: 'Calorie Calculator', description: 'Calculate your daily calorie needs based on your goals.', category: 'health' },
  '/tdee-calculator.html': { title: 'TDEE Calculator', description: 'Calculate your Total Daily Energy Expenditure (TDEE).', category: 'health' },
  '/gst-calculator.html': { title: 'GST Calculator', description: 'Calculate GST amount and final price.', category: 'finance' },
   '/emi-calculator.html': { title: 'EMI Calculator', description: 'Calculate your loan EMI online with reducing balance method.', category: 'finance' },
   '/financial-calculator.html': { title: 'Financial Calculator', description: 'Simple loan EMI calculator with instant results.', category: 'finance' },
   '/compound-interest-calculator.html': { title: 'Compound Interest Calculator', description: 'Calculate compound interest and see investment growth.', category: 'finance' },
  '/simple-interest-calculator.html': { title: 'Simple Interest Calculator', description: 'Calculate simple interest on loans or investments.', category: 'finance' },
  '/tax-calculator.html': { title: 'Tax Calculator', description: 'Estimate your income tax liability.', category: 'finance' },
  '/age-calculator.html': { title: 'Age Calculator', description: 'Calculate your exact age in years, months, and days.', category: 'math' },
  '/date-calculator.html': { title: 'Date Calculator', description: 'Calculate the duration between two dates.', category: 'math' },
  '/retirement-calculator.html': { title: 'Retirement Calculator', description: 'Plan your retirement savings and future wealth.', category: 'finance' },
  '/investment-calculator.html': { title: 'Investment Calculator', description: 'Calculate your investment growth over time.', category: 'finance' },
  '/fd-calculator.html': { title: 'FD Calculator', description: 'Calculate Fixed Deposit returns.', category: 'finance' },
  '/rd-calculator.html': { title: 'RD Calculator', description: 'Calculate Recurring Deposit returns.', category: 'finance' },
  '/sip-calculator.html': { title: 'SIP Calculator', description: 'Calculate SIP returns and plan mutual fund investments.', category: 'finance' },
  '/nps-calculator.html': { title: 'NPS Calculator', description: 'Calculate your National Pension System (NPS) returns.', category: 'finance' },
  '/ppf-calculator.html': { title: 'PPF Calculator', description: 'Calculate Public Provident Fund (PPF) returns.', category: 'finance' },
  '/home-loan-calculator.html': { title: 'Home Loan Calculator', description: 'Calculate home loan EMI and interest.', category: 'finance' },
  '/car-loan-calculator.html': { title: 'Car Loan Calculator', description: 'Calculate car loan EMI and repayment schedule.', category: 'finance' },
  '/personal-loan-calculator.html': { title: 'Personal Loan Calculator', description: 'Calculate personal loan EMI and interest.', category: 'finance' },
  '/mortgage-calculator.html': { title: 'Mortgage Calculator', description: 'Calculate mortgage payments including principal and interest.', category: 'finance' },
  '/loan-calculator.html': { title: 'Loan Calculator', description: 'Calculate loan EMI and payment schedule.', category: 'finance' },
  '/percentage-calculator.html': { title: 'Percentage Calculator', description: 'Calculate percentages easily.', category: 'math' },
  '/fraction-calculator.html': { title: 'Fraction Calculator', description: 'Add, subtract, and simplify fractions.', category: 'math' },
  '/percent-calculator.html': { title: 'Percent Calculator', description: 'Calculate percentage increase/decrease.', category: 'math' },
  '/pace-calculator.html': { title: 'Pace Calculator', description: 'Calculate your running or walking pace.', category: 'health' },
  '/concrete-calculator.html': { title: 'Concrete Calculator', description: 'Calculate concrete needed for slabs and footings.', category: 'construction' },
  '/stair-calculator.html': { title: 'Stair Calculator', description: 'Calculate rise, run, and materials for stairs.', category: 'construction' },
  '/gravel-calculator.html': { title: 'Gravel Calculator', description: 'Calculate gravel for driveways and landscaping.', category: 'construction' },
  '/tile-calculator.html': { title: 'Tile Calculator', description: 'Calculate tiles for flooring and walls.', category: 'construction' },
  '/paint-calculator.html': { title: 'Paint Calculator', description: 'Calculate paint needed for walls and rooms.', category: 'construction' },
  '/wood-calculator.html': { title: 'Wood Calculator', description: 'Calculate lumber board feet.', category: 'construction' },
  '/cubic-yards-calculator.html': { title: 'Cubic Yards Calculator', description: 'Calculate volume in cubic yards.', category: 'construction' },
  '/standard.html': { title: 'Standard Calculator', description: 'Perform basic arithmetic operations.', category: 'math' },
  '/tip-calculator.html': { title: 'Tip Calculator', description: 'Calculate tips and split bills easily.', category: 'finance' },
  '/scientific-calculator.html': { title: 'Scientific Calculator', description: 'Advanced scientific calculations for students and engineers.', category: 'scientific' },
  '/programming-calculator.html': { title: 'Programming Calculator', description: 'Convert between number bases and perform programming calculations.', category: 'programming' },
};

function SEO() {
  const location = useLocation();
  const path = location.pathname;
  const data = calculatorSeo[path] || { title: 'TheCalHub', description: 'Free Online Calculators' };
  const canonicalUrl = `${BASE_URL}${path === '/' ? '' : path}`;

  return (
    <Helmet>
      <title>{data.title} | TheCalHub</title>
      <meta name="description" content={data.description} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}

function CalculatorWrapper({ component: Component, path }: { component: any, path: string }) {
  const data = calculatorSeo[path] || { title: 'Calculator', description: 'Online tool', category: 'finance' };
  return (
    <CalculatorPageLayout 
      title={data.title} 
      description={data.description} 
      keywords={data.keywords} 
      category={data.category}
    >
      <Component />
    </CalculatorPageLayout>
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







function HealthPage() {
  const healthCalculators = CALCULATORS.health || [];
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Health</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Health Calculators</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Track your health with BMI, BMR, and calorie calculators.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthCalculators.map((calc) => (
          <a key={calc.name} href={calc.path} className="bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center"><Scale className="w-6 h-6 text-primary-fixed" /></div>
            <div><h3 className="text-lg font-bold text-white mb-1">{calc.name}</h3><p className="text-neutral-400 text-sm">{calc.description}</p></div>
          </a>
        ))}
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
    <div className="min-h-screen bg-surface text-on-surface w-full max-w-full overflow-x-hidden flex flex-col">
        <SEO />
        <TopBar title={getTitle()} />
        <main className="pt-14 flex-1">
          <ErrorBoundary>
            <Suspense fallback={<CalculatorLoader />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/index.html" element={<Dashboard />} />
                <Route path="/all.html" element={<Dashboard />} />
                <Route path="/standard.html" element={<CalculatorWrapper component={StandardCalc} path="/standard.html" />} />
                <Route path="/financial.html" element={<Dashboard />} />
                <Route path="/support.html" element={<About />} />
                <Route path="/fraction-calculator.html" element={<CalculatorWrapper component={FractionCalculator} path="/fraction-calculator.html" />} />
                <Route path="/percent-calculator.html" element={<CalculatorWrapper component={PercentCalculator} path="/percent-calculator.html" />} />
                <Route path="/percentage-calculator.html" element={<CalculatorWrapper component={PercentageCalculator} path="/percentage-calculator.html" />} />
                <Route path="/bmi-calculator.html" element={<CalculatorWrapper component={BMICalculator} path="/bmi-calculator.html" />} />
                <Route path="/bmr-calculator.html" element={<CalculatorWrapper component={BMRCalculator} path="/bmr-calculator.html" />} />
                <Route path="/calorie-calculator.html" element={<CalculatorWrapper component={CalorieCalculator} path="/calorie-calculator.html" />} />
                <Route path="/gst-calculator.html" element={<CalculatorWrapper component={GSTCalculator} path="/gst-calculator.html" />} />
                <Route path="/tip-calculator.html" element={<CalculatorWrapper component={TipCalculator} path="/tip-calculator.html" />} />
                <Route path="/pace-calculator.html" element={<CalculatorWrapper component={PaceCalculator} path="/pace-calculator.html" />} />
                <Route path="/tdee-calculator.html" element={<CalculatorWrapper component={TDEECalculator} path="/tdee-calculator.html" />} />
                <Route path="/emi-calculator.html" element={<CalculatorWrapper component={EMICalculator} path="/emi-calculator.html" />} />
                <Route path="/financial-calculator.html" element={<CalculatorWrapper component={FinancialCalc} path="/financial-calculator.html" />} />
                <Route path="/age-calculator.html" element={<CalculatorWrapper component={AgeCalculator} path="/age-calculator.html" />} />
                <Route path="/date-calculator.html" element={<CalculatorWrapper component={DateCalculator} path="/date-calculator.html" />} />
                <Route path="/compound-interest-calculator.html" element={<CalculatorWrapper component={CompoundInterestCalc} path="/compound-interest-calculator.html" />} />
                <Route path="/simple-interest-calculator.html" element={<CalculatorWrapper component={SimpleInterestCalc} path="/simple-interest-calculator.html" />} />
                <Route path="/fd-calculator.html" element={<CalculatorWrapper component={FDCalculator} path="/fd-calculator.html" />} />
                <Route path="/rd-calculator.html" element={<CalculatorWrapper component={RDCalculator} path="/rd-calculator.html" />} />
                <Route path="/sip-calculator.html" element={<CalculatorWrapper component={SIPCalculator} path="/sip-calculator.html" />} />
                <Route path="/nps-calculator.html" element={<CalculatorWrapper component={NPSCalculator} path="/nps-calculator.html" />} />
                <Route path="/ppf-calculator.html" element={<CalculatorWrapper component={PPFCalculator} path="/ppf-calculator.html" />} />
                <Route path="/home-loan-calculator.html" element={<CalculatorWrapper component={HomeLoanCalc} path="/home-loan-calculator.html" />} />
                <Route path="/car-loan-calculator.html" element={<CalculatorWrapper component={CarLoanCalculator} path="/car-loan-calculator.html" />} />
                <Route path="/personal-loan-calculator.html" element={<CalculatorWrapper component={PersonalLoanCalculator} path="/personal-loan-calculator.html" />} />
                <Route path="/mortgage-calculator.html" element={<CalculatorWrapper component={MortgageCalculator} path="/mortgage-calculator.html" />} />
                <Route path="/loan-calculator.html" element={<CalculatorWrapper component={LoanCalculator} path="/loan-calculator.html" />} />
                <Route path="/tax-calculator.html" element={<CalculatorWrapper component={TaxCalculator} path="/tax-calculator.html" />} />
                <Route path="/retirement-calculator.html" element={<CalculatorWrapper component={RetirementCalculator} path="/retirement-calculator.html" />} />
                <Route path="/investment-calculator.html" element={<CalculatorWrapper component={InvestmentCalculator} path="/investment-calculator.html" />} />
                <Route path="/scientific-calculator.html" element={<CalculatorWrapper component={ScientificCalc} path="/scientific-calculator.html" />} />
                <Route path="/programming-calculator.html" element={<CalculatorWrapper component={ProgrammingCalc} path="/programming-calculator.html" />} />
                <Route path="/concrete-calculator.html" element={<CalculatorWrapper component={ConcreteCalculator} path="/concrete-calculator.html" />} />
                <Route path="/stair-calculator.html" element={<CalculatorWrapper component={StairCalculator} path="/stair-calculator.html" />} />
                <Route path="/gravel-calculator.html" element={<CalculatorWrapper component={GravelCalculator} path="/gravel-calculator.html" />} />
                <Route path="/tile-calculator.html" element={<CalculatorWrapper component={TileCalculator} path="/tile-calculator.html" />} />
                <Route path="/paint-calculator.html" element={<CalculatorWrapper component={PaintCalculator} path="/paint-calculator.html" />} />
                <Route path="/wood-calculator.html" element={<CalculatorWrapper component={WoodCalculator} path="/wood-calculator.html" />} />
                <Route path="/cubic-yards-calculator.html" element={<CalculatorWrapper component={CubicYardsCalculator} path="/cubic-yards-calculator.html" />} />
                <Route path="/math.html" element={<MathPage />} />
                <Route path="/datetime.html" element={<DateTimePage />} />
                <Route path="/health.html" element={<HealthPage />} />
                <Route path="/financial.html" element={<FinancialPage />} />
                <Route path="/fitness.html" element={<FitnessPage />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
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
