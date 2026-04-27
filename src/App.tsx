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
import ScientificPage from './pages/ScientificPage';
import ProgrammingPage from './pages/ProgrammingPage';
import TradingPage from './pages/TradingPage';

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
const PositionSizeCalculator = lazy(() => import('./components/calculators/PositionSizeCalculator'));
const RiskRewardCalculator = lazy(() => import('./components/calculators/RiskRewardCalculator'));
const PnLCalculator = lazy(() => import('./components/calculators/PnLCalculator'));
const StopLossCalculator = lazy(() => import('./components/calculators/StopLossCalculator'));
const BreakevenCalculator = lazy(() => import('./components/calculators/BreakevenCalculator'));
const KellyCriterionCalculator = lazy(() => import('./components/calculators/KellyCriterionCalculator'));
const RiskOfRuinCalculator = lazy(() => import('./components/calculators/RiskOfRuinCalculator'));
const CAGRCalculator = lazy(() => import('./components/calculators/CAGRCalculator'));
const LiquidationCalculator = lazy(() => import('./components/calculators/LiquidationCalculator'));
const DCACalculator = lazy(() => import('./components/calculators/DCACalculator'));
const BasicArithmeticCalculator = lazy(() => import('./components/calculators/BasicArithmeticCalculator'));
const TrigonometricCalculator = lazy(() => import('./components/calculators/TrigonometricCalculator'));
const LogarithmicCalculator = lazy(() => import('./components/calculators/LogarithmicCalculator'));
const ComplexNumberCalculator = lazy(() => import('./components/calculators/ComplexNumberCalculator'));
const MatrixCalculator = lazy(() => import('./components/calculators/MatrixCalculator'));
const StatisticalCalculator = lazy(() => import('./components/calculators/StatisticalCalculator'));
const UnitConversionCalculator = lazy(() => import('./components/calculators/UnitConversionCalculator'));
const EquationSolver = lazy(() => import('./components/calculators/EquationSolver'));
const GraphingCalculator = lazy(() => import('./components/calculators/GraphingCalculator'));
const ScientificConstants = lazy(() => import('./components/calculators/ScientificConstants'));
const TimeComplexityCalculator = lazy(() => import('./components/calculators/TimeComplexityCalculator'));
const BigOAnalyzer = lazy(() => import('./components/calculators/BigOAnalyzer'));
const BinaryHexDecimalConverter = lazy(() => import('./components/calculators/BinaryHexDecimalConverter'));
const BitwiseCalculator = lazy(() => import('./components/calculators/BitwiseCalculator'));
const RegexTester = lazy(() => import('./components/calculators/RegexTester'));
const JSONFormatter = lazy(() => import('./components/calculators/JSONFormatter'));
const HashGenerator = lazy(() => import('./components/calculators/HashGenerator'));
const Base64Encoder = lazy(() => import('./components/calculators/Base64Encoder'));
const CodeBeautifier = lazy(() => import('./components/calculators/CodeBeautifier'));
const MemorySizeCalculator = lazy(() => import('./components/calculators/MemorySizeCalculator'));
const TrigonometryCalculator = lazy(() => import('./components/calculators/TrigonometryCalculator'));
const BodyFatCalculator = lazy(() => import('./components/calculators/BodyFatCalculator'));
const QuadraticCalculator = lazy(() => import('./components/calculators/QuadraticCalculator'));
const LCMCalculator = lazy(() => import('./components/calculators/LCMCalculator'));
const GCDCalculator = lazy(() => import('./components/calculators/GCDCalculator'));
const ProbabilityCalculator = lazy(() => import('./components/calculators/ProbabilityCalculator'));
const PermutationCalculator = lazy(() => import('./components/calculators/PermutationCalculator'));
const CombinationCalculator = lazy(() => import('./components/calculators/CombinationCalculator'));
const PrimeNumberCalculator = lazy(() => import('./components/calculators/PrimeNumberCalculator'));
const FactorialCalculator = lazy(() => import('./components/calculators/FactorialCalculator'));
const SequenceCalculator = lazy(() => import('./components/calculators/SequenceCalculator'));
const GeometryCalculator = lazy(() => import('./components/calculators/GeometryCalculator'));
const CaloriesBurnedCalculator = lazy(() => import('./components/calculators/CaloriesBurnedCalculator'));
const OneRepMaxCalculator = lazy(() => import('./components/calculators/OneRepMaxCalculator'));
const VO2MaxCalculator = lazy(() => import('./components/calculators/VO2MaxCalculator'));
const LeanMassCalculator = lazy(() => import('./components/calculators/LeanMassCalculator'));
const StepCounterCalculator = lazy(() => import('./components/calculators/StepCounterCalculator'));
const MacroCalculator = lazy(() => import('./components/calculators/MacroCalculator'));
const IdealWeightCalculator = lazy(() => import('./components/calculators/IdealWeightCalculator'));
const WaterIntakeCalculator = lazy(() => import('./components/calculators/WaterIntakeCalculator'));
const HeartRateCalculator = lazy(() => import('./components/calculators/HeartRateCalculator'));
const PregnancyCalculator = lazy(() => import('./components/calculators/PregnancyCalculator'));
const OvulationCalculator = lazy(() => import('./components/calculators/OvulationCalculator'));
const InflationCalculator = lazy(() => import('./components/calculators/InflationCalculator'));
const NPVCalculator = lazy(() => import('./components/calculators/NPVCalculator'));
const IRRCalculator = lazy(() => import('./components/calculators/IRRCalculator'));
const DateDifferenceCalculator = lazy(() => import('./components/calculators/DateDifferenceCalculator'));
const TimeDurationCalculator = lazy(() => import('./components/calculators/TimeDurationCalculator'));
const TimeZoneCalculator = lazy(() => import('./components/calculators/TimeZoneCalculator'));
const CementCalculator = lazy(() => import('./components/calculators/CementCalculator'));
const BrickCalculator = lazy(() => import('./components/calculators/BrickCalculator'));
const AdditionCalculator = lazy(() => import('./components/calculators/AdditionCalculator'));
const SubtractionCalculator = lazy(() => import('./components/calculators/SubtractionCalculator'));
const MultiplicationCalculator = lazy(() => import('./components/calculators/MultiplicationCalculator'));
const DivisionCalculator = lazy(() => import('./components/calculators/DivisionCalculator'));
const SquareRootCalculator = lazy(() => import('./components/calculators/SquareRootCalculator'));
const PowerCalculator = lazy(() => import('./components/calculators/PowerCalculator'));
const RatioCalculator = lazy(() => import('./components/calculators/RatioCalculator'));
const AverageCalculator = lazy(() => import('./components/calculators/AverageCalculator'));
const WorkoutTimer = lazy(() => import('./components/calculators/WorkoutTimer'));
const MacroSplitCalculator = lazy(() => import('./components/calculators/MacroSplitCalculator'));
const LeapYearCalculator = lazy(() => import('./components/calculators/LeapYearCalculator'));
const WeekNumberCalculator = lazy(() => import('./components/calculators/WeekNumberCalculator'));
const BusinessDaysCalculator = lazy(() => import('./components/calculators/BusinessDaysCalculator'));
const DateAddSubtractCalculator = lazy(() => import('./components/calculators/DateAddSubtractCalculator'));
const SteelWeightCalculator = lazy(() => import('./components/calculators/SteelWeightCalculator'));
const AreaCalculator = lazy(() => import('./components/calculators/AreaCalculator'));
const VolumeCalculator = lazy(() => import('./components/calculators/VolumeCalculator'));
const RoofCalculator = lazy(() => import('./components/calculators/RoofingCalculator'));
const FloorCalculator = lazy(() => import('./components/calculators/FlooringCalculator'));
const VectorCalculator = lazy(() => import('./components/calculators/VectorCalculator'));
const ScientificNotationCalculator = lazy(() => import('./components/calculators/ScientificNotationCalculator'));
const DrawdownCalculator = lazy(() => import('./components/calculators/DrawdownCalculator'));
const LogarithmCalculator = lazy(() => import('./components/calculators/LogarithmCalculator'));
const ExponentialCalculator = lazy(() => import('./components/calculators/ExponentialCalculator'));

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
  '/position-size-calculator.html': { title: 'Position Size Calculator', description: 'Calculate optimal position size for trades.', category: 'trading' },
  '/risk-reward-calculator.html': { title: 'Risk/Reward Calculator', description: 'Calculate risk to reward ratio.', category: 'trading' },
  '/pnl-calculator.html': { title: 'P&L Calculator', description: 'Calculate profit and loss.', category: 'trading' },
  '/stop-loss-calculator.html': { title: 'Stop Loss Calculator', description: 'Calculate stop loss levels.', category: 'trading' },
  '/breakeven-calculator.html': { title: 'Breakeven Calculator', description: 'Calculate breakeven point.', category: 'trading' },
  '/kelly-criterion-calculator.html': { title: 'Kelly Criterion Calculator', description: 'Calculate optimal position using Kelly criterion.', category: 'trading' },
  '/risk-of-ruin-calculator.html': { title: 'Risk of Ruin Calculator', description: 'Calculate probability of ruin.', category: 'trading' },
  '/cagr-calculator.html': { title: 'CAGR Calculator', description: 'Calculate compound annual growth rate.', category: 'trading' },
  '/liquidation-calculator.html': { title: 'Liquidation Calculator', description: 'Calculate liquidation price.', category: 'trading' },
  '/dca-calculator.html': { title: 'DCA Calculator', description: 'Dollar cost averaging calculator.', category: 'trading' },
  '/standard.html': { title: 'Standard Calculator', description: 'Perform basic arithmetic operations.', category: 'math' },
  '/tip-calculator.html': { title: 'Tip Calculator', description: 'Calculate tips and split bills easily.', category: 'finance' },
  '/scientific-calculator.html': { title: 'Scientific Calculator', description: 'Advanced scientific calculations for students and engineers.', category: 'scientific' },
  '/basic-arithmetic-calculator.html': { title: 'Basic Arithmetic Calculator', description: 'Basic arithmetic operations.', category: 'scientific' },
  '/trigonometric-calculator.html': { title: 'Trigonometric Calculator', description: 'Trigonometric calculations.', category: 'scientific' },
  '/logarithmic-calculator.html': { title: 'Logarithmic Calculator', description: 'Log and exponential calculations.', category: 'scientific' },
  '/complex-number-calculator.html': { title: 'Complex Number Calculator', description: 'Complex number operations.', category: 'scientific' },
  '/matrix-calculator.html': { title: 'Matrix Calculator', description: 'Matrix operations.', category: 'scientific' },
  '/statistical-calculator.html': { title: 'Statistical Calculator', description: 'Statistical analysis.', category: 'scientific' },
  '/unit-conversion-calculator.html': { title: 'Unit Conversion Calculator', description: 'Convert between units.', category: 'scientific' },
  '/equation-solver.html': { title: 'Equation Solver', description: 'Solve equations.', category: 'scientific' },
  '/graphing-calculator.html': { title: 'Graphing Calculator', description: 'Graph functions.', category: 'scientific' },
  '/scientific-constants.html': { title: 'Scientific Constants', description: 'Physical constants.', category: 'scientific' },
  '/programming-calculator.html': { title: 'Programming Calculator', description: 'Convert between number bases and perform programming calculations.', category: 'programming' },
  '/time-complexity-calculator.html': { title: 'Time Complexity Calculator', description: 'Calculate time complexity.', category: 'programming' },
  '/big-o-analyzer.html': { title: 'Big-O Notation Analyzer', description: 'Analyze Big-O notation.', category: 'programming' },
  '/binary-hex-decimal-converter.html': { title: 'Binary/Hex/Decimal Converter', description: 'Convert between bases.', category: 'programming' },
  '/bitwise-calculator.html': { title: 'Bitwise Operation Calculator', description: 'Bitwise operations.', category: 'programming' },
  '/regex-tester.html': { title: 'Regex Tester', description: 'Test regular expressions.', category: 'programming' },
  '/json-formatter.html': { title: 'JSON Formatter', description: 'Format and validate JSON.', category: 'programming' },
  '/hash-generator.html': { title: 'Hash Generator', description: 'Generate MD5/SHA hashes.', category: 'programming' },
  '/base64-encoder.html': { title: 'Base64 Encoder/Decoder', description: 'Encode/decode Base64.', category: 'programming' },
  '/code-beautifier.html': { title: 'Code Beautifier', description: 'Minify/beautify code.', category: 'programming' },
  '/memory-size-calculator.html': { title: 'Memory Size Calculator', description: 'Calculate memory sizes.', category: 'programming' },
  '/addition-calculator.html': { title: 'Addition Calculator', description: 'Add two numbers', category: 'standard' },
  '/subtraction-calculator.html': { title: 'Subtraction Calculator', description: 'Subtract two numbers', category: 'standard' },
  '/multiplication-calculator.html': { title: 'Multiplication Calculator', description: 'Multiply two numbers', category: 'standard' },
  '/division-calculator.html': { title: 'Division Calculator', description: 'Divide two numbers', category: 'standard' },
  '/square-root-calculator.html': { title: 'Square Root Calculator', description: 'Calculate square root', category: 'standard' },
  '/power-calculator.html': { title: 'Power Calculator', description: 'Calculate powers and exponents', category: 'standard' },
  '/ratio-calculator.html': { title: 'Ratio Calculator', description: 'Calculate ratios', category: 'standard' },
  '/average-calculator.html': { title: 'Average Calculator', description: 'Calculate averages', category: 'standard' },
  '/quadratic-calculator.html': { title: 'Quadratic Calculator', description: 'Solve quadratic equations', category: 'math' },
  '/lcm-calculator.html': { title: 'LCM Calculator', description: 'Least common multiple', category: 'math' },
  '/gcd-calculator.html': { title: 'GCD Calculator', description: 'Greatest common divisor', category: 'math' },
  '/probability-calculator.html': { title: 'Probability Calculator', description: 'Calculate probability', category: 'math' },
  '/permutation-calculator.html': { title: 'Permutation Calculator', description: 'Calculate permutations', category: 'math' },
  '/combination-calculator.html': { title: 'Combination Calculator', description: 'Calculate combinations', category: 'math' },
  '/prime-number-calculator.html': { title: 'Prime Number Calculator', description: 'Check prime numbers', category: 'math' },
  '/factorial-calculator.html': { title: 'Factorial Calculator', description: 'Calculate factorials', category: 'math' },
  '/sequence-calculator.html': { title: 'Sequence Calculator', description: 'Number sequences', category: 'math' },
  '/geometry-calculator.html': { title: 'Geometry Calculator', description: 'Geometry calculations', category: 'math' },
  '/calories-burned-calculator.html': { title: 'Calories Burned Calculator', description: 'Calories burned', category: 'fitness' },
  '/one-rep-max-calculator.html': { title: 'One Rep Max Calculator', description: '1RM estimation', category: 'fitness' },
  '/vo2-max-calculator.html': { title: 'VO2 Max Calculator', description: 'VO2 max estimation', category: 'fitness' },
  '/lean-mass-calculator.html': { title: 'Lean Mass Calculator', description: 'Calculate lean mass', category: 'fitness' },
  '/step-counter-calculator.html': { title: 'Step Counter Calculator', description: 'Steps to calories', category: 'fitness' },
  '/macro-calculator.html': { title: 'Macro Calculator', description: 'Macro nutrient calculator', category: 'health' },
  '/ideal-weight-calculator.html': { title: 'Ideal Weight Calculator', description: 'Calculate ideal body weight', category: 'health' },
  '/water-intake-calculator.html': { title: 'Water Intake Calculator', description: 'Daily water needs', category: 'health' },
  '/heart-rate-calculator.html': { title: 'Heart Rate Calculator', description: 'Target heart rate zones', category: 'health' },
  '/pregnancy-calculator.html': { title: 'Pregnancy Calculator', description: 'Pregnancy due date', category: 'health' },
  '/ovulation-calculator.html': { title: 'Ovulation Calculator', description: 'Ovulation calendar', category: 'health' },
  '/inflation-calculator.html': { title: 'Inflation Calculator', description: 'Calculate inflation effects', category: 'financial' },
  '/npv-calculator.html': { title: 'NPV Calculator', description: 'Net present value', category: 'financial' },
  '/irr-calculator.html': { title: 'IRR Calculator', description: 'Internal rate of return', category: 'financial' },
  '/date-difference-calculator.html': { title: 'Date Difference Calculator', description: 'Days between dates', category: 'datetime' },
  '/time-duration-calculator.html': { title: 'Time Duration Calculator', description: 'Time duration', category: 'datetime' },
  '/time-zone-converter.html': { title: 'Time Zone Converter', description: 'Time zone conversion', category: 'datetime' },
  '/cement-calculator.html': { title: 'Cement Calculator', description: 'Concrete materials', category: 'construction' },
  '/brick-calculator.html': { title: 'Brick Calculator', description: 'Brick wall materials', category: 'construction' },
  '/leap-year-calculator.html': { title: 'Leap Year Calculator', description: 'Check leap years', category: 'datetime' },
  '/week-number-calculator.html': { title: 'Week Number Calculator', description: 'Week number lookup', category: 'datetime' },
  '/business-days-calculator.html': { title: 'Business Days Calculator', description: 'Business days between', category: 'datetime' },
  '/date-add-subtract-calculator.html': { title: 'Date Add/Subtract Calculator', description: 'Add/subtract days', category: 'datetime' },
  '/steel-weight-calculator.html': { title: 'Steel Weight Calculator', description: 'Steel weight', category: 'construction' },
  '/area-calculator.html': { title: 'Area Calculator', description: 'Calculate area', category: 'construction' },
  '/volume-calculator.html': { title: 'Volume Calculator', description: 'Calculate volume', category: 'construction' },
  '/roofing-calculator.html': { title: 'Roofing Calculator', description: 'Roofing materials', category: 'construction' },
  '/flooring-calculator.html': { title: 'Flooring Calculator', description: 'Flooring materials', category: 'construction' },
  '/vector-calculator.html': { title: 'Vector Calculator', description: 'Vector operations', category: 'scientific' },
  '/scientific-notation-calculator.html': { title: 'Scientific Notation Calculator', description: 'Scientific notation', category: 'scientific' },
  '/logarithm-calculator.html': { title: 'Logarithm Calculator', description: 'Log functions', category: 'scientific' },
  '/exponential-calculator.html': { title: 'Exponential Calculator', description: 'Exponential calculations', category: 'scientific' },
  '/drawdown-calculator.html': { title: 'Drawdown Calculator', description: 'Drawdown calculation', category: 'trading' },
  '/workout-timer.html': { title: 'Workout Timer', description: 'Workout timer', category: 'fitness' },
  '/macro-split-calculator.html': { title: 'Macro Split Calculator', description: 'Macro distribution', category: 'fitness' },
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
      '/matrix-calculator.html': 'Matrix Calculator',
      '/statistical-calculator.html': 'Statistical Calculator',
      '/unit-conversion-calculator.html': 'Unit Conversion Calculator',
      '/equation-solver.html': 'Equation Solver',
      '/graphing-calculator.html': 'Graphing Calculator',
      '/scientific-constants.html': 'Scientific Constants',
      '/time-complexity-calculator.html': 'Time Complexity Calculator',
      '/big-o-analyzer.html': 'Big-O Notation Analyzer',
      '/binary-hex-decimal-converter.html': 'Binary/Hex/Decimal Converter',
      '/bitwise-calculator.html': 'Bitwise Operation Calculator',
      '/regex-tester.html': 'Regex Tester',
      '/json-formatter.html': 'JSON Formatter',
      '/hash-generator.html': 'Hash Generator',
      '/base64-encoder.html': 'Base64 Encoder/Decoder',
      '/code-beautifier.html': 'Code Beautifier',
      '/memory-size-calculator.html': 'Memory Size Calculator',
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
                <Route path="/position-size-calculator.html" element={<CalculatorWrapper component={PositionSizeCalculator} path="/position-size-calculator.html" />} />
                <Route path="/risk-reward-calculator.html" element={<CalculatorWrapper component={RiskRewardCalculator} path="/risk-reward-calculator.html" />} />
                <Route path="/pnl-calculator.html" element={<CalculatorWrapper component={PnLCalculator} path="/pnl-calculator.html" />} />
                <Route path="/stop-loss-calculator.html" element={<CalculatorWrapper component={StopLossCalculator} path="/stop-loss-calculator.html" />} />
                <Route path="/breakeven-calculator.html" element={<CalculatorWrapper component={BreakevenCalculator} path="/breakeven-calculator.html" />} />
                <Route path="/kelly-criterion-calculator.html" element={<CalculatorWrapper component={KellyCriterionCalculator} path="/kelly-criterion-calculator.html" />} />
                <Route path="/risk-of-ruin-calculator.html" element={<CalculatorWrapper component={RiskOfRuinCalculator} path="/risk-of-ruin-calculator.html" />} />
                <Route path="/cagr-calculator.html" element={<CalculatorWrapper component={CAGRCalculator} path="/cagr-calculator.html" />} />
                <Route path="/liquidation-calculator.html" element={<CalculatorWrapper component={LiquidationCalculator} path="/liquidation-calculator.html" />} />
                <Route path="/dca-calculator.html" element={<CalculatorWrapper component={DCACalculator} path="/dca-calculator.html" />} />
                <Route path="/basic-arithmetic-calculator.html" element={<CalculatorWrapper component={BasicArithmeticCalculator} path="/basic-arithmetic-calculator.html" />} />
                <Route path="/trigonometric-calculator.html" element={<CalculatorWrapper component={TrigonometricCalculator} path="/trigonometric-calculator.html" />} />
                <Route path="/logarithmic-calculator.html" element={<CalculatorWrapper component={LogarithmicCalculator} path="/logarithmic-calculator.html" />} />
                <Route path="/complex-number-calculator.html" element={<CalculatorWrapper component={ComplexNumberCalculator} path="/complex-number-calculator.html" />} />
                <Route path="/matrix-calculator.html" element={<CalculatorWrapper component={MatrixCalculator} path="/matrix-calculator.html" />} />
                <Route path="/statistical-calculator.html" element={<CalculatorWrapper component={StatisticalCalculator} path="/statistical-calculator.html" />} />
                <Route path="/unit-conversion-calculator.html" element={<CalculatorWrapper component={UnitConversionCalculator} path="/unit-conversion-calculator.html" />} />
                <Route path="/equation-solver.html" element={<CalculatorWrapper component={EquationSolver} path="/equation-solver.html" />} />
                <Route path="/graphing-calculator.html" element={<CalculatorWrapper component={GraphingCalculator} path="/graphing-calculator.html" />} />
                <Route path="/scientific-constants.html" element={<CalculatorWrapper component={ScientificConstants} path="/scientific-constants.html" />} />
                <Route path="/time-complexity-calculator.html" element={<CalculatorWrapper component={TimeComplexityCalculator} path="/time-complexity-calculator.html" />} />
                <Route path="/big-o-analyzer.html" element={<CalculatorWrapper component={BigOAnalyzer} path="/big-o-analyzer.html" />} />
                <Route path="/binary-hex-decimal-converter.html" element={<CalculatorWrapper component={BinaryHexDecimalConverter} path="/binary-hex-decimal-converter.html" />} />
                <Route path="/bitwise-calculator.html" element={<CalculatorWrapper component={BitwiseCalculator} path="/bitwise-calculator.html" />} />
                <Route path="/regex-tester.html" element={<CalculatorWrapper component={RegexTester} path="/regex-tester.html" />} />
                <Route path="/json-formatter.html" element={<CalculatorWrapper component={JSONFormatter} path="/json-formatter.html" />} />
                <Route path="/hash-generator.html" element={<CalculatorWrapper component={HashGenerator} path="/hash-generator.html" />} />
                <Route path="/base64-encoder.html" element={<CalculatorWrapper component={Base64Encoder} path="/base64-encoder.html" />} />
                <Route path="/code-beautifier.html" element={<CalculatorWrapper component={CodeBeautifier} path="/code-beautifier.html" />} />
                <Route path="/memory-size-calculator.html" element={<CalculatorWrapper component={MemorySizeCalculator} path="/memory-size-calculator.html" />} />
                <Route path="/addition-calculator.html" element={<CalculatorWrapper component={AdditionCalculator} path="/addition-calculator.html" />} />
                <Route path="/subtraction-calculator.html" element={<CalculatorWrapper component={SubtractionCalculator} path="/subtraction-calculator.html" />} />
                <Route path="/multiplication-calculator.html" element={<CalculatorWrapper component={MultiplicationCalculator} path="/multiplication-calculator.html" />} />
                <Route path="/division-calculator.html" element={<CalculatorWrapper component={DivisionCalculator} path="/division-calculator.html" />} />
                <Route path="/square-root-calculator.html" element={<CalculatorWrapper component={SquareRootCalculator} path="/square-root-calculator.html" />} />
                <Route path="/power-calculator.html" element={<CalculatorWrapper component={PowerCalculator} path="/power-calculator.html" />} />
                <Route path="/ratio-calculator.html" element={<CalculatorWrapper component={RatioCalculator} path="/ratio-calculator.html" />} />
                <Route path="/average-calculator.html" element={<CalculatorWrapper component={AverageCalculator} path="/average-calculator.html" />} />
                <Route path="/trigonometry-calculator.html" element={<CalculatorWrapper component={TrigonometryCalculator} path="/trigonometry-calculator.html" />} />
                <Route path="/body-fat-calculator.html" element={<CalculatorWrapper component={BodyFatCalculator} path="/body-fat-calculator.html" />} />
                <Route path="/quadratic-calculator.html" element={<CalculatorWrapper component={QuadraticCalculator} path="/quadratic-calculator.html" />} />
                <Route path="/lcm-calculator.html" element={<CalculatorWrapper component={LCMCalculator} path="/lcm-calculator.html" />} />
                <Route path="/gcd-calculator.html" element={<CalculatorWrapper component={GCDCalculator} path="/gcd-calculator.html" />} />
                <Route path="/probability-calculator.html" element={<CalculatorWrapper component={ProbabilityCalculator} path="/probability-calculator.html" />} />
                <Route path="/permutation-calculator.html" element={<CalculatorWrapper component={PermutationCalculator} path="/permutation-calculator.html" />} />
                <Route path="/combination-calculator.html" element={<CalculatorWrapper component={CombinationCalculator} path="/combination-calculator.html" />} />
                <Route path="/prime-number-calculator.html" element={<CalculatorWrapper component={PrimeNumberCalculator} path="/prime-number-calculator.html" />} />
                <Route path="/factorial-calculator.html" element={<CalculatorWrapper component={FactorialCalculator} path="/factorial-calculator.html" />} />
                <Route path="/sequence-calculator.html" element={<CalculatorWrapper component={SequenceCalculator} path="/sequence-calculator.html" />} />
                <Route path="/geometry-calculator.html" element={<CalculatorWrapper component={GeometryCalculator} path="/geometry-calculator.html" />} />
                <Route path="/calories-burned-calculator.html" element={<CalculatorWrapper component={CaloriesBurnedCalculator} path="/calories-burned-calculator.html" />} />
                <Route path="/one-rep-max-calculator.html" element={<CalculatorWrapper component={OneRepMaxCalculator} path="/one-rep-max-calculator.html" />} />
                <Route path="/vo2-max-calculator.html" element={<CalculatorWrapper component={VO2MaxCalculator} path="/vo2-max-calculator.html" />} />
                <Route path="/lean-mass-calculator.html" element={<CalculatorWrapper component={LeanMassCalculator} path="/lean-mass-calculator.html" />} />
                <Route path="/step-counter-calculator.html" element={<CalculatorWrapper component={StepCounterCalculator} path="/step-counter-calculator.html" />} />
                <Route path="/macro-calculator.html" element={<CalculatorWrapper component={MacroCalculator} path="/macro-calculator.html" />} />
                <Route path="/ideal-weight-calculator.html" element={<CalculatorWrapper component={IdealWeightCalculator} path="/ideal-weight-calculator.html" />} />
                <Route path="/water-intake-calculator.html" element={<CalculatorWrapper component={WaterIntakeCalculator} path="/water-intake-calculator.html" />} />
                <Route path="/heart-rate-calculator.html" element={<CalculatorWrapper component={HeartRateCalculator} path="/heart-rate-calculator.html" />} />
                <Route path="/pregnancy-calculator.html" element={<CalculatorWrapper component={PregnancyCalculator} path="/pregnancy-calculator.html" />} />
                <Route path="/ovulation-calculator.html" element={<CalculatorWrapper component={OvulationCalculator} path="/ovulation-calculator.html" />} />
                <Route path="/inflation-calculator.html" element={<CalculatorWrapper component={InflationCalculator} path="/inflation-calculator.html" />} />
                <Route path="/npv-calculator.html" element={<CalculatorWrapper component={NPVCalculator} path="/npv-calculator.html" />} />
                <Route path="/irr-calculator.html" element={<CalculatorWrapper component={IRRCalculator} path="/irr-calculator.html" />} />
                <Route path="/date-difference-calculator.html" element={<CalculatorWrapper component={DateDifferenceCalculator} path="/date-difference-calculator.html" />} />
                <Route path="/time-duration-calculator.html" element={<CalculatorWrapper component={TimeDurationCalculator} path="/time-duration-calculator.html" />} />
                <Route path="/time-zone-converter.html" element={<CalculatorWrapper component={TimeZoneCalculator} path="/time-zone-converter.html" />} />
                <Route path="/cement-calculator.html" element={<CalculatorWrapper component={CementCalculator} path="/cement-calculator.html" />} />
                <Route path="/brick-calculator.html" element={<CalculatorWrapper component={BrickCalculator} path="/brick-calculator.html" />} />
                <Route path="/leap-year-calculator.html" element={<CalculatorWrapper component={LeapYearCalculator} path="/leap-year-calculator.html" />} />
                <Route path="/week-number-calculator.html" element={<CalculatorWrapper component={WeekNumberCalculator} path="/week-number-calculator.html" />} />
                <Route path="/business-days-calculator.html" element={<CalculatorWrapper component={BusinessDaysCalculator} path="/business-days-calculator.html" />} />
                <Route path="/date-add-subtract-calculator.html" element={<CalculatorWrapper component={DateAddSubtractCalculator} path="/date-add-subtract-calculator.html" />} />
                <Route path="/steel-weight-calculator.html" element={<CalculatorWrapper component={SteelWeightCalculator} path="/steel-weight-calculator.html" />} />
                <Route path="/area-calculator.html" element={<CalculatorWrapper component={AreaCalculator} path="/area-calculator.html" />} />
                <Route path="/volume-calculator.html" element={<CalculatorWrapper component={VolumeCalculator} path="/volume-calculator.html" />} />
                <Route path="/roofing-calculator.html" element={<CalculatorWrapper component={RoofCalculator} path="/roofing-calculator.html" />} />
                <Route path="/flooring-calculator.html" element={<CalculatorWrapper component={FloorCalculator} path="/flooring-calculator.html" />} />
                <Route path="/vector-calculator.html" element={<CalculatorWrapper component={VectorCalculator} path="/vector-calculator.html" />} />
                <Route path="/scientific-notation-calculator.html" element={<CalculatorWrapper component={ScientificNotationCalculator} path="/scientific-notation-calculator.html" />} />
                <Route path="/logarithm-calculator.html" element={<CalculatorWrapper component={LogarithmCalculator} path="/logarithm-calculator.html" />} />
                <Route path="/exponential-calculator.html" element={<CalculatorWrapper component={ExponentialCalculator} path="/exponential-calculator.html" />} />
                <Route path="/drawdown-calculator.html" element={<CalculatorWrapper component={DrawdownCalculator} path="/drawdown-calculator.html" />} />
                <Route path="/workout-timer.html" element={<CalculatorWrapper component={WorkoutTimer} path="/workout-timer.html" />} />
                <Route path="/macro-split-calculator.html" element={<CalculatorWrapper component={MacroSplitCalculator} path="/macro-split-calculator.html" />} />
                <Route path="/math.html" element={<MathPage />} />
                <Route path="/datetime.html" element={<DateTimePage />} />
                <Route path="/health.html" element={<HealthPage />} />
                <Route path="/financial.html" element={<FinancialPage />} />
                <Route path="/scientific.html" element={<ScientificPage />} />
                <Route path="/programming.html" element={<ProgrammingPage />} />
                <Route path="/fitness.html" element={<FitnessPage />} />
                <Route path="/trading.html" element={<TradingPage />} />
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
