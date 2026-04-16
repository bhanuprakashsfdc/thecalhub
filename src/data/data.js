import { Calculator, CreditCard, FlaskConical, Terminal, Heart, Scale, Clock, Activity, LayoutGrid } from 'lucide-react';

export const APP_NAME = "TheCalHub";
export const APP_VERSION = "1.0.0";

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
];

export const CALCULATORS = {
  all: [
    { name: 'EMI Calculator', path: '/emi-calculator.html', description: 'Calculate monthly installments', icon: 'financial' },
    { name: 'Compound Interest Calculator', path: '/compound-interest-calculator.html', description: 'Calculate CI with compounding', icon: 'financial' },
    { name: 'Simple Interest Calculator', path: '/simple-interest-calculator.html', description: 'Calculate simple interest', icon: 'financial' },
    { name: 'FD Calculator', path: '/fd-calculator.html', description: 'Fixed deposit returns', icon: 'financial' },
    { name: 'RD Calculator', path: '/rd-calculator.html', description: 'Recurring deposit returns', icon: 'financial' },
    { name: 'PPF Calculator', path: '/ppf-calculator.html', description: 'Public provident fund', icon: 'financial' },
    { name: 'NPS Calculator', path: '/nps-calculator.html', description: 'National pension scheme', icon: 'financial' },
    { name: 'SIP Calculator', path: '/sip-calculator.html', description: 'Systematic investment plan', icon: 'financial' },
    { name: 'Home Loan Calculator', path: '/home-loan-calculator.html', description: 'Housing loan EMI', icon: 'financial' },
    { name: 'Car Loan Calculator', path: '/car-loan-calculator.html', description: 'Vehicle loan EMI', icon: 'financial' },
    { name: 'Personal Loan Calculator', path: '/personal-loan-calculator.html', description: 'Unsecured loan EMI', icon: 'financial' },
    { name: 'Tax Calculator', path: '/tax-calculator.html', description: 'Income tax estimation', icon: 'financial' },
    { name: 'Mortgage Calculator', path: '/mortgage-calculator.html', description: 'Calculate mortgage payments', icon: 'financial' },
    { name: 'Loan Calculator', path: '/loan-calculator.html', description: 'General loan calculator', icon: 'financial' },
    { name: 'Retirement Calculator', path: '/retirement-calculator.html', description: 'Plan retirement savings', icon: 'financial' },
    { name: 'Investment Calculator', path: '/investment-calculator.html', description: 'Investment growth', icon: 'financial' },
    { name: 'BMI Calculator', path: '/bmi-calculator.html', description: 'Body mass index', icon: 'health' },
    { name: 'BMR Calculator', path: '/bmr-calculator.html', description: 'Basal metabolic rate', icon: 'health' },
    { name: 'Calorie Calculator', path: '/calorie-calculator.html', description: 'Daily calorie needs', icon: 'health' },
    { name: 'Scientific Calculator', path: '/scientific-calculator.html', description: 'Advanced calculations', icon: 'scientific' },
    { name: 'Programming Calculator', path: '/programming-calculator.html', description: 'Number base conversion', icon: 'programming' },
    { name: 'Fraction Calculator', path: '/fraction-calculator.html', description: 'Calculate with fractions', icon: 'math' },
    { name: 'Percent Calculator', path: '/percent-calculator.html', description: 'Percentage calculations', icon: 'math' },
    { name: 'Age Calculator', path: '/age-calculator.html', description: 'Calculate age', icon: 'datetime' },
    { name: 'Date Calculator', path: '/date-calculator.html', description: 'Date operations', icon: 'datetime' },
    { name: 'Pace Calculator', path: '/pace-calculator.html', description: 'Running pace', icon: 'fitness' },
    { name: 'TDEE Calculator', path: '/tdee-calculator.html', description: 'Total daily energy', icon: 'fitness' },
  ],
  standard: [
    { name: 'Basic Calculator', path: '/standard.html', description: 'Simple arithmetic operations' },
    { name: 'Percentage Calculator', path: '/percentage-calculator.html', description: 'Calculate percentages easily' },
    { name: 'Tip Calculator', path: '/tip-calculator.html', description: 'Calculate tips and split bills' },
    { name: 'GST Calculator', path: '/gst-calculator.html', description: 'Add or remove GST' },
  ],
  financial: [
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
  ],
  health: [
    { name: 'BMI Calculator', path: '/bmi-calculator.html', description: 'Body mass index' },
    { name: 'BMR Calculator', path: '/bmr-calculator.html', description: 'Basal metabolic rate' },
    { name: 'Calorie Calculator', path: '/calorie-calculator.html', description: 'Daily calorie needs' },
  ],
  scientific: [
    { name: 'Scientific Calculator', path: '/scientific-calculator.html', description: 'Advanced calculations' },
  ],
  programming: [
    { name: 'Programming Calculator', path: '/programming-calculator.html', description: 'Number base conversion' },
  ],
  math: [
    { name: 'Fraction Calculator', path: '/fraction-calculator.html', description: 'Calculate with fractions' },
    { name: 'Percent Calculator', path: '/percent-calculator.html', description: 'Percentage calculations' },
  ],
  fitness: [
    { name: 'Pace Calculator', path: '/pace-calculator.html', description: 'Running pace' },
    { name: 'TDEE Calculator', path: '/tdee-calculator.html', description: 'Total daily energy' },
  ],
  dateTime: [
    { name: 'Age Calculator', path: '/age-calculator.html', description: 'Calculate age' },
    { name: 'Date Calculator', path: '/date-calculator.html', description: 'Date operations' },
  ],
};

export const DEFAULT_PRECISION = 2;
export const MAX_DECIMAL_PLACES = 10;
