import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Grid3X3, Percent, Clock, Calendar, Scale, Hammer } from 'lucide-react';
import { TopBar } from './components/layout/TopBar';
import Footer from './components/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { I18nProvider } from './lib/i18n';
import Dashboard from './pages/Dashboard';
import { CALCULATORS } from './data/data';
import { REGISTRY, REGISTRY_BY_PATH } from './data/registry';
import type { CalculatorDef } from './data/registry/types';

const NotepadPage = lazy(() => import('./pages/NotepadPage'));
const PomodoroTimer = lazy(() => import('./pages/PomodoroTimer'));
const ClockPage = lazy(() => import('./pages/ClockPage'));
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Tutorials = lazy(() => import('./pages/Tutorials'));
const CalculatorSuite = lazy(() => import('./pages/CalculatorSuite'));
const FinancialTools = lazy(() => import('./pages/FinancialTools'));
const NotFound = lazy(() => import('./pages/NotFound'));
const FinancialPage = lazy(() => import('./pages/FinancialPage'));
const FitnessPage = lazy(() => import('./pages/FitnessPage'));
const ScientificPage = lazy(() => import('./pages/ScientificPage'));
const ProgrammingPage = lazy(() => import('./pages/ProgrammingPage'));
const TradingPage = lazy(() => import('./pages/TradingPage'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

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
const InvestmentPnLCalculator = lazy(() => import('./components/calculators/InvestmentPnLCalculator'));

// Loading fallback component for Suspense
function CalculatorLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-fixed/30 border-t-primary-fixed rounded-full animate-spin" />
        <p className="text-neutral-500 text-sm font-mono">Loading calculator...</p>
      </div>
    </div>
  );
}

const CalculatorPageLayout = lazy(() =>
  import('./components/CalculatorPageLayout').then((m) => ({ default: m.CalculatorPageLayout }))
);

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
  '/investment-pnl-calculator.html': { title: 'Investment P&L Calculator', description: 'Calculate profit/loss and CAGR for investments.', category: 'trading' },
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
  '/about.html': { title: 'About Us', description: 'Learn about TheCalHub — free, private, browser-based calculators for everyone.' },
  '/faq.html': { title: 'Frequently Asked Questions', description: 'Answers to common questions about TheCalHub calculators, privacy, and accuracy.' },
  '/tutorials.html': { title: 'Calculator Tutorials', description: 'Step-by-step guides for getting the most out of every calculator on TheCalHub.' },
  '/calculator-suite.html': { title: 'Calculator Suite', description: 'Browse the complete suite of free online calculators in one place.' },
  '/financial-tools.html': { title: 'Financial Tools', description: 'Free financial calculators for loans, taxes, savings, and investments.' },
  '/construction.html': { title: 'Construction Calculators', description: 'Calculators for concrete, bricks, paint, tiles, flooring, and other building materials.' },
};

function SEO() {
  const location = useLocation();
  const path = location.pathname;
  const registryDef = REGISTRY_BY_PATH.get(path);
  const isHome = path === '/' || path === '/index.html';
  const data = registryDef
    ? { title: registryDef.title, description: registryDef.description }
    : calculatorSeo[path] || {
        title: 'TheCalHub',
        description:
          'Free online calculators for finance, health, math, construction, trading and more. 125+ accurate tools including EMI, BMI, SIP, age and percentage calculators.',
      };
  const title = isHome ? 'TheCalHub - Free Online Calculators' : `${data.title} | TheCalHub`;
  const description = data.description;
  const canonicalUrl = `${BASE_URL}${path === '/' ? '' : path}`;
  const ogImage = `${BASE_URL}/og-image.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TheCalHub" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}

function CalculatorWrapper({ component, def }: { component?: any; def?: CalculatorDef }) {
  const location = useLocation();
  const path = location.pathname;
  const data = def
    ? { title: def.title, description: def.description, keywords: def.keywords?.join(', '), category: def.category.toLowerCase() }
    : calculatorSeo[path] || { title: 'Calculator', description: 'Online tool', category: 'finance' };
  const Component = component ?? def!.component;
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

function ConstructionPage() {
  const constructionCalculators = CALCULATORS.construction || [];
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Hammer className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Construction</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Construction Calculators</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Plan materials and costs with concrete, brick, paint, and tile calculators.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {constructionCalculators.map((calc) => (
          <a key={calc.name} href={calc.path} className="bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center"><Hammer className="w-6 h-6 text-primary-fixed" /></div>
            <div><h3 className="text-lg font-bold text-white mb-1">{calc.name}</h3><p className="text-neutral-400 text-sm">{calc.description}</p></div>
          </a>
        ))}
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-surface text-on-surface w-full max-w-full overflow-x-hidden flex flex-col">
        <SEO />
        <TopBar />
        <main className="pt-14 flex-1">
          <ErrorBoundary>
            <Suspense fallback={<CalculatorLoader />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/notepad.html" element={<NotepadPage />} />
                <Route path="/pomodoro-timer.html" element={<PomodoroTimer />} />
                <Route path="/clock.html" element={<ClockPage />} />
                <Route path="/index.html" element={<Dashboard />} />
                <Route path="/all.html" element={<Dashboard />} />
                <Route path="/standard.html" element={<CalculatorWrapper component={StandardCalc} />} />
                <Route path="/support.html" element={<About />} />
                <Route path="/fraction-calculator.html" element={<CalculatorWrapper component={FractionCalculator} />} />
                <Route path="/percent-calculator.html" element={<CalculatorWrapper component={PercentCalculator} />} />
                <Route path="/percentage-calculator.html" element={<CalculatorWrapper component={PercentageCalculator} />} />
                <Route path="/bmi-calculator.html" element={<CalculatorWrapper component={BMICalculator} />} />
                <Route path="/bmr-calculator.html" element={<CalculatorWrapper component={BMRCalculator} />} />
                <Route path="/calorie-calculator.html" element={<CalculatorWrapper component={CalorieCalculator} />} />
                <Route path="/gst-calculator.html" element={<CalculatorWrapper component={GSTCalculator} />} />
                <Route path="/tip-calculator.html" element={<CalculatorWrapper component={TipCalculator} />} />
                <Route path="/pace-calculator.html" element={<CalculatorWrapper component={PaceCalculator} />} />
                <Route path="/tdee-calculator.html" element={<CalculatorWrapper component={TDEECalculator} />} />
                <Route path="/emi-calculator.html" element={<CalculatorWrapper component={EMICalculator} />} />
                <Route path="/financial-calculator.html" element={<CalculatorWrapper component={FinancialCalc} />} />
                <Route path="/age-calculator.html" element={<CalculatorWrapper component={AgeCalculator} />} />
                <Route path="/date-calculator.html" element={<CalculatorWrapper component={DateCalculator} />} />
                <Route path="/compound-interest-calculator.html" element={<CalculatorWrapper component={CompoundInterestCalc} />} />
                <Route path="/simple-interest-calculator.html" element={<CalculatorWrapper component={SimpleInterestCalc} />} />
                <Route path="/fd-calculator.html" element={<CalculatorWrapper component={FDCalculator} />} />
                <Route path="/rd-calculator.html" element={<CalculatorWrapper component={RDCalculator} />} />
                <Route path="/sip-calculator.html" element={<CalculatorWrapper component={SIPCalculator} />} />
                <Route path="/nps-calculator.html" element={<CalculatorWrapper component={NPSCalculator} />} />
                <Route path="/ppf-calculator.html" element={<CalculatorWrapper component={PPFCalculator} />} />
                <Route path="/home-loan-calculator.html" element={<CalculatorWrapper component={HomeLoanCalc} />} />
                <Route path="/car-loan-calculator.html" element={<CalculatorWrapper component={CarLoanCalculator} />} />
                <Route path="/personal-loan-calculator.html" element={<CalculatorWrapper component={PersonalLoanCalculator} />} />
                <Route path="/mortgage-calculator.html" element={<CalculatorWrapper component={MortgageCalculator} />} />
                <Route path="/loan-calculator.html" element={<CalculatorWrapper component={LoanCalculator} />} />
                <Route path="/tax-calculator.html" element={<CalculatorWrapper component={TaxCalculator} />} />
                <Route path="/retirement-calculator.html" element={<CalculatorWrapper component={RetirementCalculator} />} />
                <Route path="/investment-calculator.html" element={<CalculatorWrapper component={InvestmentCalculator} />} />
                <Route path="/scientific-calculator.html" element={<CalculatorWrapper component={ScientificCalc} />} />
                <Route path="/programming-calculator.html" element={<CalculatorWrapper component={ProgrammingCalc} />} />
                <Route path="/concrete-calculator.html" element={<CalculatorWrapper component={ConcreteCalculator} />} />
                <Route path="/stair-calculator.html" element={<CalculatorWrapper component={StairCalculator} />} />
                <Route path="/gravel-calculator.html" element={<CalculatorWrapper component={GravelCalculator} />} />
                <Route path="/tile-calculator.html" element={<CalculatorWrapper component={TileCalculator} />} />
                <Route path="/paint-calculator.html" element={<CalculatorWrapper component={PaintCalculator} />} />
                <Route path="/wood-calculator.html" element={<CalculatorWrapper component={WoodCalculator} />} />
                <Route path="/cubic-yards-calculator.html" element={<CalculatorWrapper component={CubicYardsCalculator} />} />
                <Route path="/position-size-calculator.html" element={<CalculatorWrapper component={PositionSizeCalculator} />} />
                <Route path="/risk-reward-calculator.html" element={<CalculatorWrapper component={RiskRewardCalculator} />} />
                <Route path="/pnl-calculator.html" element={<CalculatorWrapper component={PnLCalculator} />} />
                <Route path="/stop-loss-calculator.html" element={<CalculatorWrapper component={StopLossCalculator} />} />
                <Route path="/breakeven-calculator.html" element={<CalculatorWrapper component={BreakevenCalculator} />} />
                <Route path="/investment-pnl-calculator.html" element={<CalculatorWrapper component={InvestmentPnLCalculator} />} />
                <Route path="/kelly-criterion-calculator.html" element={<CalculatorWrapper component={KellyCriterionCalculator} />} />
                <Route path="/risk-of-ruin-calculator.html" element={<CalculatorWrapper component={RiskOfRuinCalculator} />} />
                <Route path="/cagr-calculator.html" element={<CalculatorWrapper component={CAGRCalculator} />} />
                <Route path="/liquidation-calculator.html" element={<CalculatorWrapper component={LiquidationCalculator} />} />
                <Route path="/dca-calculator.html" element={<CalculatorWrapper component={DCACalculator} />} />
                <Route path="/basic-arithmetic-calculator.html" element={<CalculatorWrapper component={BasicArithmeticCalculator} />} />
                <Route path="/trigonometric-calculator.html" element={<CalculatorWrapper component={TrigonometricCalculator} />} />
                <Route path="/logarithmic-calculator.html" element={<CalculatorWrapper component={LogarithmicCalculator} />} />
                <Route path="/complex-number-calculator.html" element={<CalculatorWrapper component={ComplexNumberCalculator} />} />
                <Route path="/matrix-calculator.html" element={<CalculatorWrapper component={MatrixCalculator} />} />
                <Route path="/statistical-calculator.html" element={<CalculatorWrapper component={StatisticalCalculator} />} />
                <Route path="/unit-conversion-calculator.html" element={<CalculatorWrapper component={UnitConversionCalculator} />} />
                <Route path="/equation-solver.html" element={<CalculatorWrapper component={EquationSolver} />} />
                <Route path="/graphing-calculator.html" element={<CalculatorWrapper component={GraphingCalculator} />} />
                <Route path="/scientific-constants.html" element={<CalculatorWrapper component={ScientificConstants} />} />
                <Route path="/time-complexity-calculator.html" element={<CalculatorWrapper component={TimeComplexityCalculator} />} />
                <Route path="/big-o-analyzer.html" element={<CalculatorWrapper component={BigOAnalyzer} />} />
                <Route path="/binary-hex-decimal-converter.html" element={<CalculatorWrapper component={BinaryHexDecimalConverter} />} />
                <Route path="/bitwise-calculator.html" element={<CalculatorWrapper component={BitwiseCalculator} />} />
                <Route path="/regex-tester.html" element={<CalculatorWrapper component={RegexTester} />} />
                <Route path="/json-formatter.html" element={<CalculatorWrapper component={JSONFormatter} />} />
                <Route path="/hash-generator.html" element={<CalculatorWrapper component={HashGenerator} />} />
                <Route path="/base64-encoder.html" element={<CalculatorWrapper component={Base64Encoder} />} />
                <Route path="/code-beautifier.html" element={<CalculatorWrapper component={CodeBeautifier} />} />
                <Route path="/memory-size-calculator.html" element={<CalculatorWrapper component={MemorySizeCalculator} />} />
                <Route path="/addition-calculator.html" element={<CalculatorWrapper component={AdditionCalculator} />} />
                <Route path="/subtraction-calculator.html" element={<CalculatorWrapper component={SubtractionCalculator} />} />
                <Route path="/multiplication-calculator.html" element={<CalculatorWrapper component={MultiplicationCalculator} />} />
                <Route path="/division-calculator.html" element={<CalculatorWrapper component={DivisionCalculator} />} />
                <Route path="/square-root-calculator.html" element={<CalculatorWrapper component={SquareRootCalculator} />} />
                <Route path="/power-calculator.html" element={<CalculatorWrapper component={PowerCalculator} />} />
                <Route path="/ratio-calculator.html" element={<CalculatorWrapper component={RatioCalculator} />} />
                <Route path="/average-calculator.html" element={<CalculatorWrapper component={AverageCalculator} />} />
                <Route path="/trigonometry-calculator.html" element={<CalculatorWrapper component={TrigonometryCalculator} />} />
                <Route path="/body-fat-calculator.html" element={<CalculatorWrapper component={BodyFatCalculator} />} />
                <Route path="/quadratic-calculator.html" element={<CalculatorWrapper component={QuadraticCalculator} />} />
                <Route path="/lcm-calculator.html" element={<CalculatorWrapper component={LCMCalculator} />} />
                <Route path="/gcd-calculator.html" element={<CalculatorWrapper component={GCDCalculator} />} />
                <Route path="/probability-calculator.html" element={<CalculatorWrapper component={ProbabilityCalculator} />} />
                <Route path="/permutation-calculator.html" element={<CalculatorWrapper component={PermutationCalculator} />} />
                <Route path="/combination-calculator.html" element={<CalculatorWrapper component={CombinationCalculator} />} />
                <Route path="/prime-number-calculator.html" element={<CalculatorWrapper component={PrimeNumberCalculator} />} />
                <Route path="/factorial-calculator.html" element={<CalculatorWrapper component={FactorialCalculator} />} />
                <Route path="/sequence-calculator.html" element={<CalculatorWrapper component={SequenceCalculator} />} />
                <Route path="/geometry-calculator.html" element={<CalculatorWrapper component={GeometryCalculator} />} />
                <Route path="/calories-burned-calculator.html" element={<CalculatorWrapper component={CaloriesBurnedCalculator} />} />
                <Route path="/one-rep-max-calculator.html" element={<CalculatorWrapper component={OneRepMaxCalculator} />} />
                <Route path="/vo2-max-calculator.html" element={<CalculatorWrapper component={VO2MaxCalculator} />} />
                <Route path="/lean-mass-calculator.html" element={<CalculatorWrapper component={LeanMassCalculator} />} />
                <Route path="/step-counter-calculator.html" element={<CalculatorWrapper component={StepCounterCalculator} />} />
                <Route path="/macro-calculator.html" element={<CalculatorWrapper component={MacroCalculator} />} />
                <Route path="/ideal-weight-calculator.html" element={<CalculatorWrapper component={IdealWeightCalculator} />} />
                <Route path="/water-intake-calculator.html" element={<CalculatorWrapper component={WaterIntakeCalculator} />} />
                <Route path="/heart-rate-calculator.html" element={<CalculatorWrapper component={HeartRateCalculator} />} />
                <Route path="/pregnancy-calculator.html" element={<CalculatorWrapper component={PregnancyCalculator} />} />
                <Route path="/ovulation-calculator.html" element={<CalculatorWrapper component={OvulationCalculator} />} />
                <Route path="/inflation-calculator.html" element={<CalculatorWrapper component={InflationCalculator} />} />
                <Route path="/npv-calculator.html" element={<CalculatorWrapper component={NPVCalculator} />} />
                <Route path="/irr-calculator.html" element={<CalculatorWrapper component={IRRCalculator} />} />
                <Route path="/date-difference-calculator.html" element={<CalculatorWrapper component={DateDifferenceCalculator} />} />
                <Route path="/time-duration-calculator.html" element={<CalculatorWrapper component={TimeDurationCalculator} />} />
                <Route path="/time-zone-converter.html" element={<CalculatorWrapper component={TimeZoneCalculator} />} />
                <Route path="/cement-calculator.html" element={<CalculatorWrapper component={CementCalculator} />} />
                <Route path="/brick-calculator.html" element={<CalculatorWrapper component={BrickCalculator} />} />
                <Route path="/leap-year-calculator.html" element={<CalculatorWrapper component={LeapYearCalculator} />} />
                <Route path="/week-number-calculator.html" element={<CalculatorWrapper component={WeekNumberCalculator} />} />
                <Route path="/business-days-calculator.html" element={<CalculatorWrapper component={BusinessDaysCalculator} />} />
                <Route path="/date-add-subtract-calculator.html" element={<CalculatorWrapper component={DateAddSubtractCalculator} />} />
                <Route path="/steel-weight-calculator.html" element={<CalculatorWrapper component={SteelWeightCalculator} />} />
                <Route path="/area-calculator.html" element={<CalculatorWrapper component={AreaCalculator} />} />
                <Route path="/volume-calculator.html" element={<CalculatorWrapper component={VolumeCalculator} />} />
                <Route path="/roofing-calculator.html" element={<CalculatorWrapper component={RoofCalculator} />} />
                <Route path="/flooring-calculator.html" element={<CalculatorWrapper component={FloorCalculator} />} />
                <Route path="/vector-calculator.html" element={<CalculatorWrapper component={VectorCalculator} />} />
                <Route path="/scientific-notation-calculator.html" element={<CalculatorWrapper component={ScientificNotationCalculator} />} />
                <Route path="/logarithm-calculator.html" element={<CalculatorWrapper component={LogarithmCalculator} />} />
                <Route path="/exponential-calculator.html" element={<CalculatorWrapper component={ExponentialCalculator} />} />
                <Route path="/drawdown-calculator.html" element={<CalculatorWrapper component={DrawdownCalculator} />} />
                <Route path="/workout-timer.html" element={<CalculatorWrapper component={WorkoutTimer} />} />
                <Route path="/macro-split-calculator.html" element={<CalculatorWrapper component={MacroSplitCalculator} />} />
                <Route path="/math.html" element={<MathPage />} />
                <Route path="/datetime.html" element={<DateTimePage />} />
                <Route path="/health.html" element={<HealthPage />} />
                <Route path="/construction.html" element={<ConstructionPage />} />
                <Route path="/financial.html" element={<FinancialPage />} />
                <Route path="/scientific.html" element={<ScientificPage />} />
                <Route path="/programming.html" element={<ProgrammingPage />} />
                <Route path="/fitness.html" element={<FitnessPage />} />
                <Route path="/trading.html" element={<TradingPage />} />
                <Route path="/about.html" element={<About />} />
                <Route path="/faq.html" element={<FAQ />} />
                <Route path="/tutorials.html" element={<Tutorials />} />
                <Route path="/calculator-suite.html" element={<CalculatorSuite />} />
                <Route path="/financial-tools.html" element={<FinancialTools />} />
                <Route path="/blog.html" element={<Blog />} />
                <Route path="/blog/:slug.html" element={<Blog />} />
                <Route path="/contact.html" element={<Contact />} />
                <Route path="/privacy-policy.html" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service.html" element={<TermsOfService />} />
                {REGISTRY.map((def) => (
                  <Route key={def.path} path={def.path} element={<CalculatorWrapper def={def} />} />
                ))}
                <Route path="*" element={<NotFound />} />
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
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </Router>
  );
}
