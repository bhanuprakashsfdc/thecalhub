import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Grid3X3, Percent, Clock, Calendar, Scale } from 'lucide-react';
import { TopBar } from './components/layout/TopBar';
import Footer from './components/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import About from './pages/About';

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
const EMICalculator = lazy(() => import('./pages/EMICalculator'));
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

const BASE_URL = 'https://thecalhub.com';

const seoData: Record<string, { title: string; description: string; keywords?: string }> = {
  '/': { title: 'TheCalHub - All-in-One Free Online Calculators', description: 'Free online calculators for finance, health, math, and more. Calculate EMI, BMI, interest, taxes, and more with our professional tools.', keywords: 'online calculator, free calculator, BMI calculator, EMI calculator, tax calculator, compound interest' },
  '/all.html': { title: 'All Calculators - TheCalHub', description: 'Browse all available calculators. Financial, health, math, date & time calculators and more.', keywords: 'all calculators, calculator list' },
  '/bmi-calculator.html': { title: 'BMI Calculator - TheCalHub', description: 'Calculate your Body Mass Index (BMI) online for free. Check if your weight is healthy.', keywords: 'BMI calculator, body mass index, weight calculator, health calculator' },
  '/bmr-calculator.html': { title: 'BMR Calculator - TheCalHub', description: 'Calculate your Basal Metabolic Rate (BMR) online. Know how many calories your body needs.', keywords: 'BMR calculator, basal metabolic rate, metabolism calculator' },
  '/calorie-calculator.html': { title: 'Calorie Calculator - TheCalHub', description: 'Calculate your daily calorie needs based on your activity level and goals.', keywords: 'calorie calculator, daily calories, nutrition calculator' },
  '/tdee-calculator.html': { title: 'TDEE Calculator - TheCalHub', description: 'Calculate your Total Daily Energy Expenditure (TDEE) to plan your nutrition.', keywords: 'TDEE calculator, total daily energy expenditure' },
  '/gst-calculator.html': { title: 'GST Calculator - TheCalHub', description: 'Calculate GST amount and final price with our free online GST calculator.', keywords: 'GST calculator, goods and services tax, tax calculator India' },
  '/emi-calculator.html': { title: 'EMI Calculator - TheCalHub', description: 'Calculate your loan EMI online. Free EMI calculator for home loan, car loan, personal loan and more.', keywords: 'EMI calculator, loan EMI, home loan EMI, car loan EMI' },
  '/compound-interest-calculator.html': { title: 'Compound Interest Calculator - TheCalHub', description: 'Calculate compound interest and see your investment growth over time with our free calculator.', keywords: 'compound interest calculator, investment calculator, savings calculator' },
  '/simple-interest-calculator.html': { title: 'Simple Interest Calculator - TheCalHub', description: 'Calculate simple interest on loans or investments with our free online calculator.', keywords: 'simple interest calculator' },
  '/tax-calculator.html': { title: 'Tax Calculator - TheCalHub', description: 'Estimate your income tax liability with our free online tax calculator.', keywords: 'tax calculator, income tax, tax estimator' },
  '/age-calculator.html': { title: 'Age Calculator - TheCalHub', description: 'Calculate your exact age in years, months, and days. Free online age calculator.', keywords: 'age calculator, birthday calculator' },
  '/retirement-calculator.html': { title: 'Retirement Calculator - TheCalHub', description: 'Plan your retirement savings. Calculate how much you need to save for retirement.', keywords: 'retirement calculator, retirement planning' },
  '/investment-calculator.html': { title: 'Investment Calculator - TheCalHub', description: 'Calculate your investment growth. See how your investments can grow over time.', keywords: 'investment calculator, SIP calculator' },
  '/fd-calculator.html': { title: 'FD Calculator - TheCalHub', description: 'Calculate Fixed Deposit returns with our free online FD calculator.', keywords: 'FD calculator, fixed deposit calculator' },
  '/rd-calculator.html': { title: 'RD Calculator - TheCalHub', description: 'Calculate Recurring Deposit returns with our free online RD calculator.', keywords: 'RD calculator, recurring deposit calculator' },
  '/sip-calculator.html': { title: 'SIP Calculator - TheCalHub', description: 'Calculate SIP returns and plan your mutual fund investments.', keywords: 'SIP calculator, mutual fund calculator' },
  '/nps-calculator.html': { title: 'NPS Calculator - TheCalHub', description: 'Calculate your National Pension System (NPS) returns.', keywords: 'NPS calculator, pension calculator' },
  '/ppf-calculator.html': { title: 'PPF Calculator - TheCalHub', description: 'Calculate Public Provident Fund (PPF) returns with our free calculator.', keywords: 'PPF calculator, public provident fund' },
  '/car-loan-calculator.html': { title: 'Car Loan Calculator - TheCalHub', description: 'Calculate car loan EMI, total interest, and repayment schedule.', keywords: 'car loan calculator, auto loan calculator' },
  '/personal-loan-calculator.html': { title: 'Personal Loan Calculator - TheCalHub', description: 'Calculate personal loan EMI and total interest payable.', keywords: 'personal loan calculator' },
  '/mortgage-calculator.html': { title: 'Mortgage Calculator - TheCalHub', description: 'Calculate mortgage payments including principal and interest.', keywords: 'mortgage calculator, home loan calculator' },
  '/loan-calculator.html': { title: 'Loan Calculator - TheCalHub', description: 'Calculate loan EMI, total interest, and payment schedule.', keywords: 'loan calculator, EMI calculator' },
  '/home-loan-calculator.html': { title: 'Home Loan Calculator - TheCalHub', description: 'Calculate home loan EMI, interest, and total repayment amount.', keywords: 'home loan calculator, housing loan calculator' },
  '/percentage-calculator.html': { title: 'Percentage Calculator - TheCalHub', description: 'Calculate percentages easily with our free online percentage calculator.', keywords: 'percentage calculator, percent calculator' },
  '/pace-calculator.html': { title: 'Pace Calculator - TheCalHub', description: 'Calculate your running or walking pace, time, and distance.', keywords: 'pace calculator, running pace calculator' },
  '/concrete-calculator.html': { title: 'Concrete Calculator - TheCalHub', description: 'Calculate concrete needed for slabs, footings, and columns. Free online calculator.', keywords: 'concrete calculator, cement calculator, construction calculator' },
  '/stair-calculator.html': { title: 'Stair Calculator - TheCalHub', description: 'Calculate rise, run, and materials for stairs. Free online calculator.', keywords: 'stair calculator, stairs calculator, rise run calculator' },
  '/gravel-calculator.html': { title: 'Gravel Calculator - TheCalHub', description: 'Calculate gravel for driveways and landscaping. Free online calculator.', keywords: 'gravel calculator, aggregate calculator, landscaping calculator' },
  '/tile-calculator.html': { title: 'Tile Calculator - TheCalHub', description: 'Calculate tiles for flooring, bathrooms, kitchens. Free online calculator.', keywords: 'tile calculator, flooring calculator, bathroom calculator' },
  '/paint-calculator.html': { title: 'Paint Calculator - TheCalHub', description: 'Calculate paint needed for walls and rooms. Free online calculator.', keywords: 'paint calculator, wall paint calculator, room paint calculator' },
  '/wood-calculator.html': { title: 'Wood Calculator - TheCalHub', description: 'Calculate lumber board feet for decks and framing. Free online calculator.', keywords: 'wood calculator, lumber calculator, board feet calculator' },
  '/cubic-yards-calculator.html': { title: 'Cubic Yards Calculator - TheCalHub', description: 'Convert cubic feet to cubic yards for excavation. Free online calculator.', keywords: 'cubic yards calculator, excavation calculator, volume calculator' },
};

function SEO() {
  const location = useLocation();
  const path = location.pathname;
  const data = seoData[path] || seoData['/'];
  const canonicalUrl = `${BASE_URL}${path === '/' ? '' : path}`;

  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords || 'calculator, online calculator, free calculator'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="TheCalHub" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={data.title} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />
      <meta name="twitter:site" content="@thecalhub" />
      <meta name="twitter:creator" content="@thecalhub" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="TheCalHub" />
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
                <Route path="/emi-calculator.html" element={<EMICalculator />} />
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
                <Route path="/concrete-calculator.html" element={<ConcreteCalculator />} />
                <Route path="/stair-calculator.html" element={<StairCalculator />} />
                <Route path="/gravel-calculator.html" element={<GravelCalculator />} />
                <Route path="/tile-calculator.html" element={<TileCalculator />} />
                <Route path="/paint-calculator.html" element={<PaintCalculator />} />
                <Route path="/wood-calculator.html" element={<WoodCalculator />} />
                <Route path="/cubic-yards-calculator.html" element={<CubicYardsCalculator />} />
                <Route path="/math.html" element={<MathPage />} />
                <Route path="/datetime.html" element={<DateTimePage />} />
                <Route path="/health.html" element={<HealthPage />} />
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
