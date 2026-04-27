import { Calculator, CreditCard, FlaskConical, Terminal, Heart, Scale, Clock, Activity, LayoutGrid, Hammer, TrendingUp } from 'lucide-react';

export const APP_NAME = "TheCalHub";
export const APP_VERSION = "1.0.0";
export const APP_DESCRIPTION = "Free online calculators for finance, health, science, and more";
export const APP_AUTHOR = "TheCalHub";

export const TOOL_CATEGORIES = [
  { id: 'all', name: 'All', icon: LayoutGrid, path: '/all.html' },
  { id: 'standard', name: 'Standard', icon: Calculator, path: '/standard.html' },
  { id: 'financial', name: 'Financial', icon: CreditCard, path: '/financial.html' },
  { id: 'health', name: 'Health', icon: Heart, path: '/health.html' },
  { id: 'scientific', name: 'Scientific', icon: FlaskConical, path: '/scientific.html' },
  { id: 'programming', name: 'Programming', icon: Terminal, path: '/programming.html' },
  { id: 'math', name: 'Math', icon: Calculator, path: '/math.html' },
  { id: 'fitness', name: 'Fitness', icon: Activity, path: '/fitness.html' },
  { id: 'dateTime', name: 'Date & Time', icon: Clock, path: '/datetime.html' },
  { id: 'construction', name: 'Construction', icon: Hammer, path: '/construction.html' },
  { id: 'trading', name: 'Trading', icon: TrendingUp, path: '/trading.html' },
];

export const CALCULATORS = {
  standard: [
    { id: 'addition', name: 'Addition Calculator', path: '/addition-calculator.html', description: 'Add two numbers', keywords: ['sum', 'add', 'plus', 'total'] },
    { id: 'average', name: 'Average Calculator', path: '/average-calculator.html', description: 'Calculate averages', keywords: ['mean', 'arithmetic', 'mean value'] },
    { id: 'division', name: 'Division Calculator', path: '/division-calculator.html', description: 'Divide two numbers', keywords: ['divide', 'quotient', 'split'] },
    { id: 'fraction', name: 'Fraction Calculator', path: '/fraction-calculator.html', description: 'Calculate with fractions', keywords: ['fraction', 'numerator', 'denominator'] },
    { id: 'multiplication', name: 'Multiplication Calculator', path: '/multiplication-calculator.html', description: 'Multiply two numbers', keywords: ['multiply', 'product', 'times'] },
    { id: 'percentage', name: 'Percentage Calculator', path: '/percentage-calculator.html', description: 'Calculate percentages', keywords: ['percent', '%', 'ratio', 'portion'] },
    { id: 'power', name: 'Power Calculator', path: '/power-calculator.html', description: 'Calculate powers and exponents', keywords: ['exponent', 'power', 'squared', 'cubed'] },
    { id: 'ratio', name: 'Ratio Calculator', path: '/ratio-calculator.html', description: 'Calculate ratios', keywords: ['ratio', 'proportion', 'scale'] },
    { id: 'square-root', name: 'Square Root Calculator', path: '/square-root-calculator.html', description: 'Calculate square root', keywords: ['sqrt', 'root', 'radical'] },
    { id: 'subtraction', name: 'Subtraction Calculator', path: '/subtraction-calculator.html', description: 'Subtract two numbers', keywords: ['subtract', 'minus', 'difference'] },
  ],
  financial: [
    { id: 'cagr', name: 'CAGR Calculator', path: '/cagr-calculator.html', description: 'Compound annual growth rate', keywords: ['compound', 'growth', 'annual', 'return', 'investment'] },
    { id: 'compound-interest', name: 'Compound Interest Calculator', path: '/compound-interest-calculator.html', description: 'Calculate CI with compounding', keywords: ['compound', 'interest', 'compounding', 'investment'] },
    { id: 'emi', name: 'EMI Calculator', path: '/emi-calculator.html', description: 'Calculate monthly installments', keywords: ['emi', 'loan', 'installment', 'monthly payment'] },
    { id: 'inflation', name: 'Inflation Calculator', path: '/inflation-calculator.html', description: 'Calculate inflation effects', keywords: ['inflation', 'purchasing power', 'cpi'] },
    { id: 'irr', name: 'IRR Calculator', path: '/irr-calculator.html', description: 'Internal rate of return', keywords: ['irr', 'internal rate', 'return', 'investment'] },
    { id: 'loan', name: 'Loan Calculator', path: '/loan-calculator.html', description: 'Calculate loan payments', keywords: ['loan', 'mortgage', 'payment', 'amortization'] },
    { id: 'npv', name: 'NPV Calculator', path: '/npv-calculator.html', description: 'Net present value', keywords: ['npv', 'present value', 'discount', 'cash flow'] },
    { id: 'retirement', name: 'Retirement Calculator', path: '/retirement-calculator.html', description: 'Plan retirement savings', keywords: ['retirement', 'pension', 'savings', 'retire'] },
    { id: 'simple-interest', name: 'Simple Interest Calculator', path: '/simple-interest-calculator.html', description: 'Calculate simple interest', keywords: ['simple interest', 'principal', 'interest'] },
    { id: 'sip', name: 'SIP Calculator', path: '/sip-calculator.html', description: 'Systematic investment plan', keywords: ['sip', 'mutual fund', 'investment', 'monthly'] },
    { id: 'tax', name: 'Tax Calculator', path: '/tax-calculator.html', description: 'Income tax estimation', keywords: ['tax', 'income tax', 'tax return', 'irs'] },
  ],
  health: [
    { id: 'bmr', name: 'BMR Calculator', path: '/bmr-calculator.html', description: 'Basal metabolic rate', keywords: ['bmr', 'metabolism', 'calories', 'basal'] },
    { id: 'body-fat', name: 'Body Fat Calculator', path: '/body-fat-calculator.html', description: 'Calculate body fat percentage', keywords: ['body fat', 'bf', 'percentage', 'fat'] },
    { id: 'bmi', name: 'BMI Calculator', path: '/bmi-calculator.html', description: 'Body mass index', keywords: ['bmi', 'body mass', 'weight', 'height'] },
    { id: 'calorie', name: 'Calorie Calculator', path: '/calorie-calculator.html', description: 'Daily calorie needs', keywords: ['calories', 'tdee', 'daily calories', 'energy'] },
    { id: 'heart-rate', name: 'Heart Rate Calculator', path: '/heart-rate-calculator.html', description: 'Target heart rate zones', keywords: ['heart rate', 'pulse', 'target zone', 'cardio'] },
    { id: 'ideal-weight', name: 'Ideal Weight Calculator', path: '/ideal-weight-calculator.html', description: 'Calculate ideal body weight', keywords: ['ideal weight', 'healthy weight', 'target weight'] },
    { id: 'macro', name: 'Macro Calculator', path: '/macro-calculator.html', description: 'Macro nutrient calculator', keywords: ['macros', 'protein', 'carbs', 'fat', 'nutrients'] },
    { id: 'ovulation', name: 'Ovulation Calculator', path: '/ovulation-calculator.html', description: 'Ovulation calendar', keywords: ['ovulation', 'fertility', 'cycle', 'period'] },
    { id: 'pregnancy', name: 'Pregnancy Calculator', path: '/pregnancy-calculator.html', description: 'Pregnancy due date', keywords: ['pregnancy', 'due date', 'conception', 'baby'] },
    { id: 'water-intake', name: 'Water Intake Calculator', path: '/water-intake-calculator.html', description: 'Daily water needs', keywords: ['water', 'hydration', 'daily intake', 'fluids'] },
  ],
  scientific: [
    { id: 'complex-number', name: 'Complex Number Calculator', path: '/complex-number-calculator.html', description: 'Complex number operations', keywords: ['complex', 'imaginary', 'real', 'imaginary'] },
    { id: 'exponential', name: 'Exponential Calculator', path: '/exponential-calculator.html', description: 'Exponential calculations', keywords: ['exponential', 'e', 'power', 'growth'] },
    { id: 'graphing', name: 'Graphing Calculator', path: '/graphing-calculator.html', description: 'Graph functions', keywords: ['graph', 'plot', 'function', 'chart'] },
    { id: 'logarithm', name: 'Logarithm Calculator', path: '/logarithm-calculator.html', description: 'Log and exponential functions', keywords: ['log', 'ln', 'logarithm', 'natural log'] },
    { id: 'matrix', name: 'Matrix Calculator', path: '/matrix-calculator.html', description: 'Matrix operations', keywords: ['matrix', 'matrices', 'determinant', 'inverse'] },
    { id: 'scientific-constants', name: 'Scientific Constants', path: '/scientific-constants.html', description: 'Physical constants', keywords: ['constants', 'physics', 'avogadro', 'speed of light'] },
    { id: 'scientific-notation', name: 'Scientific Notation Calculator', path: '/scientific-notation-calculator.html', description: 'Scientific notation', keywords: ['scientific notation', 'powers of 10', 'exponent'] },
    { id: 'trigonometry', name: 'Trigonometry Calculator', path: '/trigonometry-calculator.html', description: 'Trigonometric calculations', keywords: ['trig', 'sin', 'cos', 'tan', 'angle'] },
    { id: 'unit-converter', name: 'Unit Converter', path: '/unit-converter.html', description: 'Convert between units', keywords: ['convert', 'units', 'conversion', 'measurement'] },
    { id: 'vector', name: 'Vector Calculator', path: '/vector-calculator.html', description: 'Vector operations', keywords: ['vector', 'magnitude', 'dot product', 'cross product'] },
  ],
  programming: [
    { id: 'base64', name: 'Base64 Encoder', path: '/base64-encoder.html', description: 'Base64 encode/decode', keywords: ['base64', 'encode', 'decode', 'encoding'] },
    { id: 'binary', name: 'Binary Converter', path: '/binary-converter.html', description: 'Binary conversion', keywords: ['binary', 'bin', 'convert', 'base 2'] },
    { id: 'bitwise', name: 'Bitwise Calculator', path: '/bitwise-calculator.html', description: 'Bitwise operations', keywords: ['bitwise', 'and', 'or', 'xor', 'bit'] },
    { id: 'color-converter', name: 'Color Converter', path: '/color-converter.html', description: 'Color code converter', keywords: ['color', 'hex', 'rgb', 'hexadecimal', 'conversion'] },
    { id: 'hash', name: 'Hash Generator', path: '/hash-generator.html', description: 'Generate hashes', keywords: ['hash', 'md5', 'sha', 'checksum'] },
    { id: 'hex', name: 'Hex Converter', path: '/hex-converter.html', description: 'Hexadecimal conversion', keywords: ['hex', 'hexadecimal', 'base 16', 'convert'] },
    { id: 'json-formatter', name: 'JSON Formatter', path: '/json-formatter.html', description: 'Format and validate JSON', keywords: ['json', 'format', 'validate', 'pretty print'] },
    { id: 'regex-tester', name: 'Regex Tester', path: '/regex-tester.html', description: 'Test regular expressions', keywords: ['regex', 'regular expression', 'pattern', 'match'] },
    { id: 'timestamp', name: 'Timestamp Converter', path: '/timestamp-converter.html', description: 'Unix timestamp converter', keywords: ['timestamp', 'unix', 'epoch', 'convert'] },
    { id: 'uuid', name: 'UUID Generator', path: '/uuid-generator.html', description: 'Generate UUIDs', keywords: ['uuid', 'guid', 'unique', 'identifier'] },
  ],
  math: [
    { id: 'algebra-solver', name: 'Algebra Solver', path: '/algebra-solver.html', description: 'Solve algebraic equations', keywords: ['algebra', 'equation', 'solve', 'linear'] },
    { id: 'combination', name: 'Combination Calculator', path: '/combination-calculator.html', description: 'Calculate combinations', keywords: ['combination', 'ncr', 'choose', 'binomial'] },
    { id: 'equation-solver', name: 'Equation Solver', path: '/equation-solver.html', description: 'Solve equations', keywords: ['equation', 'solve', 'roots', 'variable'] },
    { id: 'factorial', name: 'Factorial Calculator', path: '/factorial-calculator.html', description: 'Calculate factorials', keywords: ['factorial', 'n!', 'permutation'] },
    { id: 'gcd', name: 'GCD Calculator', path: '/gcd-calculator.html', description: 'Greatest common divisor', keywords: ['gcd', 'greatest common', 'divisor', 'hcf'] },
    { id: 'geometry', name: 'Geometry Calculator', path: '/geometry-calculator.html', description: 'Geometry calculations', keywords: ['geometry', 'area', 'perimeter', 'volume'] },
    { id: 'lcm', name: 'LCM Calculator', path: '/lcm-calculator.html', description: 'Least common multiple', keywords: ['lcm', 'least common', 'multiple'] },
    { id: 'permutation', name: 'Permutation Calculator', path: '/permutation-calculator.html', description: 'Calculate permutations', keywords: ['permutation', 'npr', 'arrangement'] },
    { id: 'prime', name: 'Prime Number Calculator', path: '/prime-number-calculator.html', description: 'Check prime numbers', keywords: ['prime', 'prime number', 'composite'] },
    { id: 'probability', name: 'Probability Calculator', path: '/probability-calculator.html', description: 'Calculate probability', keywords: ['probability', 'chance', 'odds', 'likelihood'] },
    { id: 'quadratic', name: 'Quadratic Calculator', path: '/quadratic-calculator.html', description: 'Solve quadratic equations', keywords: ['quadratic', 'parabola', 'roots', 'discriminant'] },
    { id: 'sequence', name: 'Sequence Calculator', path: '/sequence-calculator.html', description: 'Number sequences', keywords: ['sequence', 'arithmetic', 'geometric', 'series'] },
  ],
  fitness: [
    { id: 'calories-burned', name: 'Calories Burned Calculator', path: '/calories-burned-calculator.html', description: 'Calories burned', keywords: ['calories', 'burn', 'exercise', 'activity'] },
    { id: 'lean-mass', name: 'Lean Mass Calculator', path: '/lean-mass-calculator.html', description: 'Calculate lean mass', keywords: ['lean mass', 'fat free', 'body composition'] },
    { id: 'macro-split', name: 'Macro Split Calculator', path: '/macro-split-calculator.html', description: 'Macro distribution', keywords: ['macro', 'split', 'distribution', 'ratio'] },
    { id: 'one-rep-max', name: 'One Rep Max Calculator', path: '/one-rep-max-calculator.html', description: '1RM estimation', keywords: ['1rm', 'one rep max', 'strength', 'weight'] },
    { id: 'pace', name: 'Pace Calculator', path: '/pace-calculator.html', description: 'Running pace', keywords: ['pace', 'running', 'speed', 'time'] },
    { id: 'step-counter', name: 'Step Counter Calculator', path: '/step-counter-calculator.html', description: 'Steps to calories', keywords: ['steps', 'walking', 'pedometer'] },
    { id: 'tdee', name: 'TDEE Calculator', path: '/tdee-calculator.html', description: 'Total daily energy expenditure', keywords: ['tdee', 'total daily', 'energy', 'metabolism'] },
    { id: 'vo2-max', name: 'VO2 Max Calculator', path: '/vo2-max-calculator.html', description: 'VO2 max estimation', keywords: ['vo2', 'max', 'cardiovascular', 'fitness'] },
    { id: 'workout-timer', name: 'Workout Timer', path: '/workout-timer.html', description: 'Workout timer', keywords: ['timer', 'workout', 'exercise', 'stopwatch'] },
  ],
  dateTime: [
    { id: 'age', name: 'Age Calculator', path: '/age-calculator.html', description: 'Calculate age', keywords: ['age', 'birthday', 'years', 'how old'] },
    { id: 'business-days', name: 'Business Days Calculator', path: '/business-days-calculator.html', description: 'Business days between', keywords: ['business days', 'workdays', 'working days'] },
    { id: 'countdown', name: 'Countdown Timer', path: '/countdown-timer.html', description: 'Event countdown', keywords: ['countdown', 'timer', 'event', 'count down'] },
    { id: 'date-add', name: 'Date Add/Subtract Calculator', path: '/date-add-subtract-calculator.html', description: 'Add/subtract days', keywords: ['date', 'add', 'subtract', 'days'] },
    { id: 'date-diff', name: 'Date Difference Calculator', path: '/date-difference-calculator.html', description: 'Days between dates', keywords: ['date difference', 'days between', 'difference'] },
    { id: 'leap-year', name: 'Leap Year Calculator', path: '/leap-year-calculator.html', description: 'Check leap years', keywords: ['leap year', 'feb 29', 'divisible'] },
    { id: 'time-duration', name: 'Time Duration Calculator', path: '/time-duration-calculator.html', description: 'Time duration', keywords: ['duration', 'time', 'hours', 'minutes'] },
    { id: 'time-zone', name: 'Time Zone Converter', path: '/time-zone-converter.html', description: 'Time zone conversion', keywords: ['timezone', 'time zone', 'convert', 'utc'] },
    { id: 'week-number', name: 'Week Number Calculator', path: '/week-number-calculator.html', description: 'Week number lookup', keywords: ['week number', 'iso week', 'week of year'] },
    { id: 'workdays', name: 'Workdays Calculator', path: '/workdays-calculator.html', description: 'Business days', keywords: ['workdays', 'business days', 'working'] },
  ],
  construction: [
    { id: 'area', name: 'Area Calculator', path: '/area-calculator.html', description: 'Calculate area', keywords: ['area', 'square', 'measure', 'size'] },
    { id: 'brick', name: 'Brick Calculator', path: '/brick-calculator.html', description: 'Brick calculations', keywords: ['brick', 'wall', 'masonry', 'bricks needed'] },
    { id: 'cement', name: 'Cement Calculator', path: '/cement-calculator.html', description: 'Cement calculations', keywords: ['cement', 'concrete', 'mix', 'quantity'] },
    { id: 'concrete', name: 'Concrete Calculator', path: '/concrete-calculator.html', description: 'Calculate concrete', keywords: ['concrete', 'volume', 'cubic', 'yard'] },
    { id: 'flooring', name: 'Flooring Calculator', path: '/flooring-calculator.html', description: 'Flooring materials', keywords: ['flooring', 'floor', 'tiles', 'laminate'] },
    { id: 'paint', name: 'Paint Calculator', path: '/paint-calculator.html', description: 'Calculate paint', keywords: ['paint', 'coverage', 'gallons', 'liters'] },
    { id: 'roofing', name: 'Roofing Calculator', path: '/roofing-calculator.html', description: 'Roofing materials', keywords: ['roofing', 'roof', 'shingles', 'materials'] },
    { id: 'steel-weight', name: 'Steel Weight Calculator', path: '/steel-weight-calculator.html', description: 'Steel weight', keywords: ['steel', 'weight', 'metal', 'beam'] },
    { id: 'tile', name: 'Tile Calculator', path: '/tile-calculator.html', description: 'Calculate tiles', keywords: ['tile', 'tiles', 'quantity', 'ceramic'] },
    { id: 'volume', name: 'Volume Calculator', path: '/volume-calculator.html', description: 'Calculate volume', keywords: ['volume', 'cubic', 'capacity', 'space'] },
  ],
  trading: [
    { id: 'breakeven', name: 'Breakeven Calculator', path: '/breakeven-calculator.html', description: 'Breakeven point', keywords: ['breakeven', 'break even', 'profit', 'loss'] },
    { id: 'drawdown', name: 'Drawdown Calculator', path: '/drawdown-calculator.html', description: 'Drawdown calculation', keywords: ['drawdown', 'loss', 'risk', 'equity'] },
    { id: 'investment-pnl', name: 'Investment P&L Calculator', path: '/investment-pnl-calculator.html', description: 'Calculate profit/loss and CAGR', keywords: ['investment', 'profit', 'loss', 'cagr', 'return', 'buy', 'sell'] },
    { id: 'kelly-criterion', name: 'Kelly Criterion Calculator', path: '/kelly-criterion-calculator.html', description: 'Kelly position sizing', keywords: ['kelly', 'position sizing', 'betting', 'risk'] },
    { id: 'margin', name: 'Margin Calculator', path: '/margin-calculator.html', description: 'Margin calculations', keywords: ['margin', 'leverage', 'margin call'] },
    { id: 'pnl', name: 'P&L Calculator', path: '/pnl-calculator.html', description: 'Profit and loss', keywords: ['profit', 'loss', 'pnl', 'gain'] },
    { id: 'position-size', name: 'Position Size Calculator', path: '/position-size-calculator.html', description: 'Calculate position size', keywords: ['position size', 'lot size', 'risk management'] },
    { id: 'risk-of-ruin', name: 'Risk of Ruin Calculator', path: '/risk-of-ruin-calculator.html', description: 'Probability of ruin', keywords: ['risk of ruin', 'ruin', 'probability'] },
    { id: 'risk-reward', name: 'Risk Reward Calculator', path: '/risk-reward-calculator.html', description: 'Risk to reward ratio', keywords: ['risk reward', 'ratio', 'rr', 'reward'] },
    { id: 'stop-loss', name: 'Stop Loss Calculator', path: '/stop-loss-calculator.html', description: 'Stop loss levels', keywords: ['stop loss', 'stop', 'exit', 'risk'] },
  ],
};

export const CALCULATORS_ALL = Object.values(CALCULATORS).flat();

export const DEFAULT_PRECISION = 2;
export const MAX_DECIMAL_PLACES = 10;

export const getCalculatorById = (id) => {
  return CALCULATORS_ALL.find(calc => calc.id === id);
};

export const getCalculatorsByCategory = (categoryId) => {
  return CALCULATORS[categoryId] || [];
};

export const searchCalculators = (query) => {
  const q = query.toLowerCase();
  return CALCULATORS_ALL.filter(calc => 
    calc.name.toLowerCase().includes(q) ||
    calc.description.toLowerCase().includes(q) ||
    calc.keywords?.some(kw => kw.toLowerCase().includes(q))
  );
};