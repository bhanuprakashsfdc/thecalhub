import { Calculator, CreditCard, FlaskConical, Terminal, Heart, Binary } from 'lucide-react';

export const APP_NAME = "TheCalHub";
export const APP_VERSION = "1.0.0";

export const TOOL_CATEGORIES = [
  { id: 'standard', name: 'Standard', icon: Calculator, path: '/standard.html' },
  { id: 'financial', name: 'Financial', icon: CreditCard, path: '/financial.html' },
  { id: 'health', name: 'Health', icon: Heart, path: '/health.html' },
  { id: 'scientific', name: 'Scientific', icon: FlaskConical, path: '/scientific.html' },
  { id: 'programming', name: 'Programming', icon: Terminal, path: '/programming.html' },
];

export const CALCULATORS = {
  standard: [
    { name: 'Basic Calculator', path: '/standard.html', description: 'Simple arithmetic operations' },
    { name: 'Percentage Calculator', path: '/percentage.html', description: 'Calculate percentages easily' },
    { name: 'Tip Calculator', path: '/tip.html', description: 'Calculate tips and split bills' },
    { name: 'GST Calculator', path: '/gst.html', description: 'Add or remove GST' },
  ],
  financial: [
    { name: 'EMI Calculator', path: '/financial.html', description: 'Calculate monthly installments' },
    { name: 'Compound Interest', path: '/compound-interest.html', description: 'Calculate CI with compounding' },
    { name: 'Simple Interest', path: '/simple-interest.html', description: 'Calculate simple interest' },
    { name: 'FD Calculator', path: '/fd.html', description: 'Fixed deposit returns' },
    { name: 'RD Calculator', path: '/rd.html', description: 'Recurring deposit returns' },
    { name: 'PPF Calculator', path: '/ppf.html', description: 'Public provident fund' },
    { name: 'NPS Calculator', path: '/nps.html', description: 'National pension scheme' },
    { name: 'Home Loan EMI', path: '/home-loan.html', description: 'Housing loan EMI' },
    { name: 'Car Loan EMI', path: '/car-loan.html', description: 'Vehicle loan EMI' },
    { name: 'Personal Loan EMI', path: '/personal-loan.html', description: 'Unsecured loan EMI' },
    { name: 'Tax Calculator', path: '/tax.html', description: 'Income tax estimation' },
    { name: 'Capital Gains', path: '/capital-gains.html', description: 'Investment gains' },
    { name: 'Income Tax', path: '/income-tax.html', description: 'Tax liability' },
  ],
  health: [
    { name: 'BMI Calculator', path: '/bmi.html', description: 'Body mass index' },
    { name: 'BMR Calculator', path: '/bmr.html', description: 'Basal metabolic rate' },
    { name: 'Calorie Calculator', path: '/calorie.html', description: 'Daily calorie needs' },
    { name: 'Body Fat Calculator', path: '/body-fat.html', description: 'Body fat percentage' },
    { name: 'Ideal Weight', path: '/ideal-weight.html', description: 'Target weight' },
    { name: 'Water Intake', path: '/water.html', description: 'Daily water needs' },
  ],
  scientific: [
    { name: 'Scientific Calculator', path: '/scientific.html', description: 'Advanced calculations' },
    { name: 'Graphing Calculator', path: '/graphing.html', description: 'Plot functions' },
    { name: 'Matrix Calculator', path: '/matrix.html', description: 'Matrix operations' },
    { name: 'Statistics Calculator', path: '/statistics.html', description: 'Statistical analysis' },
  ],
  programming: [
    { name: 'Binary Converter', path: '/programming.html', description: 'Number base conversion' },
    { name: 'ASCII Converter', path: '/ascii.html', description: 'Text to ASCII' },
    { name: 'Hash Generator', path: '/hash.html', description: 'Generate hashes' },
    { name: 'Color Converter', path: '/color.html', description: 'Color format conversion' },
    { name: 'JSON Formatter', path: '/json.html', description: 'Format and validate JSON' },
  ],
};

export const DEFAULT_PRECISION = 2;
export const MAX_DECIMAL_PLACES = 10;
