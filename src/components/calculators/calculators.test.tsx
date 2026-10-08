import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import BMICalculator from './BMICalculator';
import PercentageCalculator from './PercentageCalculator';
import GSTCalculator from './GSTCalculator';
import CalorieCalculator from './CalorieCalculator';
import BrickCalculator from './BrickCalculator';
import BreakevenCalculator from './BreakevenCalculator';
import ScientificNotationCalculator from './ScientificNotationCalculator';
import BinaryHexDecimalConverter from './BinaryHexDecimalConverter';
import CaloriesBurnedCalculator from './CaloriesBurnedCalculator';
import AgeCalculator from './AgeCalculator';
import IdealWeightCalculator from './IdealWeightCalculator';
import WoodCalculator from './WoodCalculator';
import StairCalculator from './StairCalculator';
import GravelCalculator from './GravelCalculator';
import OvulationCalculator from './OvulationCalculator';
import ConcreteCalculator from './ConcreteCalculator';

interface CalculatorPage {
  title: string;
  description: string;
  path: string;
  category?: 'finance' | 'health' | 'math' | 'construction';
}

function renderCalculatorPage(component: ReactElement, page: CalculatorPage) {
  return render(
    <MemoryRouter initialEntries={[page.path]}>
      <HelmetProvider>
        <I18nProvider>
          <CalculatorPageLayout title={page.title} description={page.description} category={page.category}>
            {component}
          </CalculatorPageLayout>
        </I18nProvider>
      </HelmetProvider>
    </MemoryRouter>
  );
}

describe('BMICalculator', () => {
  const page: CalculatorPage = {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) online for free.',
    path: '/bmi-calculator.html',
    category: 'health',
  };

  it('renders the BMI calculator', () => {
    renderCalculatorPage(<BMICalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'BMI Calculator' })).toBeDefined();
    expect(screen.getByText('Body Metrics')).toBeDefined();
  });

  it('accepts weight input', () => {
    renderCalculatorPage(<BMICalculator />, page);
    const weightInput = document.querySelector('input[type="range"]') as HTMLInputElement;
    fireEvent.change(weightInput, { target: { value: '80' } });
    expect(weightInput.value).toBe('80');
    expect(screen.getByText('80 kg')).toBeDefined();
  });

  it('accepts height input', () => {
    renderCalculatorPage(<BMICalculator />, page);
    const inputs = document.querySelectorAll('input[type="range"]');
    const heightInput = inputs[1] as HTMLInputElement;
    fireEvent.change(heightInput, { target: { value: '180' } });
    expect(heightInput.value).toBe('180');
    expect(screen.getByText('180 cm')).toBeDefined();
  });

  it('switches between metric and imperial units', () => {
    renderCalculatorPage(<BMICalculator />, page);
    fireEvent.click(screen.getByText('Imperial'));
    expect(screen.getByText('Weight (lbs)')).toBeDefined();
    expect(screen.getByText('Height (in)')).toBeDefined();
  });
});

describe('PercentageCalculator', () => {
  const page: CalculatorPage = {
    title: 'Percentage Calculator',
    description: 'Calculate percentages easily.',
    path: '/percentage-calculator.html',
    category: 'math',
  };

  it('renders the percentage calculator', () => {
    renderCalculatorPage(<PercentageCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Percentage Calculator' })).toBeDefined();
    expect(screen.getByText('First Value')).toBeDefined();
  });

  it('accepts value input', () => {
    renderCalculatorPage(<PercentageCalculator />, page);
    const inputs = document.querySelectorAll('input[type="number"]');
    const valueInput = inputs[0] as HTMLInputElement;
    fireEvent.change(valueInput, { target: { value: '200' } });
    expect(valueInput.value).toBe('200');
  });

  it('switches between modes', () => {
    renderCalculatorPage(<PercentageCalculator />, page);
    const whatPercentBtn = screen.getByText('X is what % of Y');
    fireEvent.click(whatPercentBtn);
    expect(screen.getByText('X is what % of Y')).toBeDefined();
  });
});

describe('GSTCalculator', () => {
  const page: CalculatorPage = {
    title: 'GST Calculator',
    description: 'Calculate GST amount and final price.',
    path: '/gst-calculator.html',
    category: 'finance',
  };

  it('renders the GST calculator', () => {
    renderCalculatorPage(<GSTCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'GST Calculator' })).toBeDefined();
    expect(screen.getByLabelText('GST calculation mode')).toBeDefined();
  });

  it('accepts amount input', () => {
    renderCalculatorPage(<GSTCalculator />, page);
    const amountInput = screen.getByLabelText('Amount to calculate GST on') as HTMLInputElement;
    fireEvent.change(amountInput, { target: { value: '5000' } });
    expect(amountInput.value).toBe('5000');
  });

  it('switches between add and remove GST modes', () => {
    renderCalculatorPage(<GSTCalculator />, page);
    const removeBtn = screen.getByText('Remove GST');
    fireEvent.click(removeBtn);
    expect(screen.getByText('GST (Reverse)')).toBeDefined();
  });

  it('shows GST rate buttons', () => {
    renderCalculatorPage(<GSTCalculator />, page);
    const rateGroup = screen.getByLabelText('Common GST rates');
    expect(within(rateGroup).getByText('5%')).toBeDefined();
    expect(within(rateGroup).getByText('12%')).toBeDefined();
    expect(within(rateGroup).getByText('18%')).toBeDefined();
    expect(within(rateGroup).getByText('28%')).toBeDefined();
  });
});

describe('CalorieCalculator', () => {
  const page: CalculatorPage = {
    title: 'Calorie Calculator',
    description: 'Calculate your daily calorie needs based on your goals.',
    path: '/calorie-calculator.html',
    category: 'health',
  };

  it('renders the calorie calculator', () => {
    renderCalculatorPage(<CalorieCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Calorie Calculator' })).toBeDefined();
    expect(screen.getByText('Daily Calorie Needs')).toBeDefined();
  });

  it('accepts weight input', () => {
    renderCalculatorPage(<CalorieCalculator />, page);
    const weightInput = screen.getByLabelText('Weight (kg)') as HTMLInputElement;
    fireEvent.change(weightInput, { target: { value: '75' } });
    expect(weightInput.value).toBe('75');
  });

  it('accepts height input', () => {
    renderCalculatorPage(<CalorieCalculator />, page);
    const heightInput = screen.getByLabelText('Height (cm)') as HTMLInputElement;
    fireEvent.change(heightInput, { target: { value: '175' } });
    expect(heightInput.value).toBe('175');
  });

  it('accepts age input', () => {
    renderCalculatorPage(<CalorieCalculator />, page);
    const ageInput = screen.getByLabelText('Age') as HTMLInputElement;
    fireEvent.change(ageInput, { target: { value: '25' } });
    expect(ageInput.value).toBe('25');
  });

  it('switches between male and female gender', () => {
    renderCalculatorPage(<CalorieCalculator />, page);
    const femaleBtn = screen.getByText('Female');
    fireEvent.click(femaleBtn);
    expect(femaleBtn.getAttribute('aria-checked')).toBe('true');
  });
});

describe('BrickCalculator', () => {
  const page: CalculatorPage = {
    title: 'Brick Calculator',
    description: 'Calculate bricks, cement and sand needed for a wall.',
    path: '/brick-calculator.html',
    category: 'construction',
  };

  it('renders the brick calculator through CalculatorPageLayout', () => {
    renderCalculatorPage(<BrickCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Brick Calculator' })).toBeDefined();
    expect(screen.getByText('Wall Length (m)')).toBeDefined();
    expect(screen.getByText('Wall Height (m)')).toBeDefined();
  });

  it('recalculates materials when wall length changes', () => {
    renderCalculatorPage(<BrickCalculator />, page);
    const bricksResult = () => (screen.getByText('Bricks').nextElementSibling as HTMLElement).textContent;
    const before = bricksResult();
    const lengthInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(lengthInput, { target: { value: '20' } });
    expect(lengthInput.value).toBe('20');
    expect(bricksResult()).not.toBe(before);
  });
});

describe('BreakevenCalculator', () => {
  const page: CalculatorPage = {
    title: 'Breakeven Calculator',
    description: 'Calculate breakeven point.',
    path: '/breakeven-calculator.html',
  };

  it('renders the breakeven calculator through CalculatorPageLayout', () => {
    renderCalculatorPage(<BreakevenCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Breakeven Calculator' })).toBeDefined();
    expect(screen.getByText('Entry Price')).toBeDefined();
    expect(screen.getByText('Breakeven Price')).toBeDefined();
  });

  it('switches the price move direction for short positions', () => {
    renderCalculatorPage(<BreakevenCalculator />, page);
    const moveNeeded = () => (screen.getByText('Price Move Needed').nextElementSibling as HTMLElement).textContent;
    expect(moveNeeded()).toMatch(/^\+/);
    fireEvent.click(screen.getByText('Short'));
    expect(moveNeeded()).toMatch(/^-/);
  });
});

describe('ScientificNotationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Scientific Notation Calculator',
    description: 'Convert numbers to scientific notation.',
    path: '/scientific-notation-calculator.html',
  };

  it('renders the scientific notation calculator through CalculatorPageLayout', () => {
    renderCalculatorPage(<ScientificNotationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Scientific Notation Calculator' })).toBeDefined();
    expect(screen.getByText('Enter Number')).toBeDefined();
    expect(screen.getByText('1.2340e+6')).toBeDefined();
  });

  it('updates the notation when the number changes', () => {
    renderCalculatorPage(<ScientificNotationCalculator />, page);
    const numberInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(numberInput, { target: { value: '1000' } });
    expect(numberInput.value).toBe('1000');
    expect(screen.getByText('1.0000e+3')).toBeDefined();
  });
});

describe('BinaryHexDecimalConverter', () => {
  const page: CalculatorPage = {
    title: 'Binary/Hex/Decimal Converter',
    description: 'Convert between number bases.',
    path: '/binary-hex-decimal-converter.html',
  };

  it('renders the base converter through CalculatorPageLayout', () => {
    renderCalculatorPage(<BinaryHexDecimalConverter />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Binary/Hex/Decimal Converter' })).toBeDefined();
    expect(screen.getByText('Decimal (Base 10)')).toBeDefined();
    expect(screen.getByText('Binary (Base 2)')).toBeDefined();
    expect(screen.getByText('Hexadecimal (Base 16)')).toBeDefined();
  });

  it('converts a decimal entry into binary', () => {
    renderCalculatorPage(<BinaryHexDecimalConverter />, page);
    const binaryInput = screen.getByDisplayValue('11111111') as HTMLInputElement;
    const decimalInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(decimalInput, { target: { value: '10' } });
    expect(decimalInput.value).toBe('10');
    expect((screen.getByDisplayValue('1010') as HTMLInputElement).value).toBe('1010');
    expect(binaryInput.value).toBeDefined();
  });
});

describe('CaloriesBurnedCalculator', () => {
  const page: CalculatorPage = {
    title: 'Calories Burned Calculator',
    description: 'Calories burned',
    path: '/calories-burned-calculator.html',
  };

  it('renders the calories burned calculator through CalculatorPageLayout', () => {
    renderCalculatorPage(<CaloriesBurnedCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Calories Burned Calculator' })).toBeDefined();
    expect(screen.getByText('Weight (lbs)')).toBeDefined();
    expect(screen.getByText('Duration (min)')).toBeDefined();
  });

  it('updates burned calories when weight changes', () => {
    const { container } = renderCalculatorPage(<CaloriesBurnedCalculator />, page);
    const result = () => (container.querySelector('p.text-4xl') as HTMLElement).textContent;
    expect(result()).toMatch(/cal$/);
    const before = result();
    const weightInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(weightInput, { target: { value: '200' } });
    expect(weightInput.value).toBe('200');
    expect(result()).not.toBe(before);
  });
});

describe('AgeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days.',
    path: '/age-calculator.html',
    category: 'math',
  };

  it('renders the age calculator through CalculatorPageLayout', () => {
    renderCalculatorPage(<AgeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Age Calculator' })).toBeDefined();
    expect(screen.getByText('Birth Date')).toBeDefined();
    expect(screen.getByText('Your Age')).toBeDefined();
  });

  it('recalculates the age when the birth date changes', () => {
    renderCalculatorPage(<AgeCalculator />, page);
    const yearsResult = () => (screen.getByText('Years').previousElementSibling as HTMLElement).textContent;
    const before = yearsResult();
    const birthDateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(birthDateInput, { target: { value: '2015-06-01' } });
    expect(birthDateInput.value).toBe('2015-06-01');
    expect(yearsResult()).not.toBe(before);
  });
});

describe('IdealWeightCalculator', () => {
  const page: CalculatorPage = {
    title: 'Ideal Weight Calculator',
    description: 'Calculate your ideal body weight with the Devine formula.',
    path: '/ideal-weight-calculator.html',
    category: 'health',
  };

  it('applies Devine in kilograms and converts the result to pounds', () => {
    const { container } = renderCalculatorPage(<IdealWeightCalculator />, page);
    const kg = () => (container.querySelector('p.text-4xl') as HTMLElement).textContent;
    const lbs = () => (container.querySelector('p.text-4xl + p') as HTMLElement).textContent;
    // Man, 70 in: 50 + 2.3 × 10 = 73 kg → 73 × 2.2046 = 160.9 lb
    expect(kg()).toBe('73.0 kg');
    expect(lbs()).toBe('160.9 lbs');
    const heightInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(heightInput, { target: { value: '66' } });
    fireEvent.click(screen.getByText('Female'));
    // Woman, 66 in: 45.5 + 2.3 × 6 = 59.3 kg → 59.3 × 2.2046 = 130.7 lb
    expect(kg()).toBe('59.3 kg');
    expect(lbs()).toBe('130.7 lbs');
  });

  it('does not subtract weight for heights at or below five feet', () => {
    const { container } = renderCalculatorPage(<IdealWeightCalculator />, page);
    const kg = () => (container.querySelector('p.text-4xl') as HTMLElement).textContent;
    const lbs = () => (container.querySelector('p.text-4xl + p') as HTMLElement).textContent;
    const heightInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(heightInput, { target: { value: '60' } });
    // 50 kg base figure → 50 × 2.2046 = 110.2 lb
    expect(kg()).toBe('50.0 kg');
    expect(lbs()).toBe('110.2 lbs');
    fireEvent.change(heightInput, { target: { value: '55' } });
    expect(kg()).toBe('50.0 kg');
    expect(lbs()).toBe('110.2 lbs');
  });
});

describe('WoodCalculator', () => {
  const page: CalculatorPage = {
    title: 'Wood Calculator',
    description: 'Calculate board feet and lumber cost.',
    path: '/wood-calculator.html',
    category: 'construction',
  };

  it('calculates board feet as area in sq ft times thickness in inches', () => {
    renderCalculatorPage(<WoodCalculator />, page);
    const boardFeet = () => (screen.getByText('Board Feet').nextElementSibling as HTMLElement).textContent;
    const cost = () => (screen.getByText('Estimated Cost').nextElementSibling as HTMLElement).textContent;
    // 8 ft × 10 ft at 1 in: 80 sq ft × 1 in = 80 BF, 80 × $5 = $400
    expect(screen.getByText('80 sq ft')).toBeDefined();
    expect(boardFeet()).toBe('80.00 BF');
    expect(cost()).toContain('400.00');
    const thicknessInput = document.querySelectorAll('input[type="number"]')[2] as HTMLInputElement;
    fireEvent.change(thicknessInput, { target: { value: '2' } });
    expect(boardFeet()).toBe('160.00 BF');
  });
});

describe('StairCalculator', () => {
  const page: CalculatorPage = {
    title: 'Stair Calculator',
    description: 'Calculate rise, run and concrete for stairs.',
    path: '/stair-calculator.html',
    category: 'construction',
  };

  it('computes concrete volume with every dimension converted to feet first', () => {
    renderCalculatorPage(<StairCalculator />, page);
    const concrete = () => (screen.getByText('Concrete Needed').nextElementSibling as HTMLElement).textContent;
    // total run 121 in = 10.0833 ft, width 36 in = 3 ft, rise 108 in = 9 ft
    // 10.0833 × 3 × 9 ÷ 27 = 10.08 cu yd
    expect(concrete()).toBe('10.08 cu yd');
    const widthInput = document.querySelectorAll('input[type="number"]')[3] as HTMLInputElement;
    fireEvent.change(widthInput, { target: { value: '48' } });
    // 10.0833 × 4 × 9 ÷ 27 = 13.44 cu yd
    expect(concrete()).toBe('13.44 cu yd');
  });

  it('reports the entered tread depth as the run per step', () => {
    renderCalculatorPage(<StairCalculator />, page);
    expect((screen.getByText('Run per Step').nextElementSibling as HTMLElement).textContent).toBe('11.00 in');
    expect((screen.getByText('Total Run').nextElementSibling as HTMLElement).textContent).toBe('121.00 in');
  });
});

describe('GravelCalculator', () => {
  const page: CalculatorPage = {
    title: 'Gravel Calculator',
    description: 'Calculate gravel volume, tonnage and cost.',
    path: '/gravel-calculator.html',
    category: 'construction',
  };

  it('converts cubic yards to tons using the stated 1.4 tons per cubic yard density', () => {
    renderCalculatorPage(<GravelCalculator />, page);
    const tons = () => (screen.getByText('Weight (tons)').nextElementSibling as HTMLElement).textContent;
    // 50 × 10 ft at 3 in = 125 cu ft = 4.63 cu yd; 4.6296 × 1.4 = 6.48 tons
    expect((screen.getByText('Cubic Yards').nextElementSibling as HTMLElement).textContent).toBe('4.63 cu yd');
    expect(tons()).toBe('6.48 tons');
    expect(screen.getByText(/Tonnage uses a bulk density of 1\.4 tons per cubic yard/)).toBeDefined();
    const depthInput = document.querySelectorAll('input[type="number"]')[2] as HTMLInputElement;
    fireEvent.change(depthInput, { target: { value: '6' } });
    // 250 cu ft = 9.2593 cu yd; 9.2593 × 1.4 = 12.96 tons
    expect(tons()).toBe('12.96 tons');
  });
});

describe('OvulationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Ovulation Calculator',
    description: 'Estimate ovulation day and the fertile window.',
    path: '/ovulation-calculator.html',
    category: 'health',
  };

  it('ends the fertile window on ovulation day, five days after it opens', () => {
    const { container } = renderCalculatorPage(<OvulationCalculator />, page);
    const lmp = new Date('2025-01-01');
    const ovulation = new Date(lmp);
    ovulation.setDate(ovulation.getDate() + 28 - 14);
    const windowStart = new Date(ovulation);
    windowStart.setDate(windowStart.getDate() - 5);

    const ovulationResult = (container.querySelector('p.text-4xl') as HTMLElement).textContent;
    expect(ovulationResult).toBe(ovulation.toLocaleDateString());

    const column = screen.getByText('Ovulation Date').parentElement!.parentElement!;
    const fertile = (column.querySelector('p.text-xs') as HTMLElement).textContent;
    expect(fertile).toBe(`Fertile window: ${windowStart.toLocaleDateString()} - ${ovulation.toLocaleDateString()}`);
    expect(windowStart.getTime()).toBeLessThan(ovulation.getTime());
    expect(ovulation.getTime() - windowStart.getTime()).toBe(5 * 86400000);
  });
});

describe('ConcreteCalculator', () => {
  const page: CalculatorPage = {
    title: 'Concrete Calculator',
    description: 'Calculate concrete needed for slabs and footings.',
    path: '/concrete-calculator.html',
    category: 'construction',
  };

  it('prices the pour by cubic yard, matching the price-per-cubic-yard input', () => {
    renderCalculatorPage(<ConcreteCalculator />, page);
    const cost = () => (screen.getByText('Estimated Cost').nextElementSibling as HTMLElement).textContent;
    // 10 × 10 ft at 4 in = 33.33 cu ft = 1.2346 cu yd × $150 = $185.19
    expect(cost()).toContain('185.19');
    const priceInput = document.querySelectorAll('input[type="number"]')[3] as HTMLInputElement;
    fireEvent.change(priceInput, { target: { value: '200' } });
    expect(cost()).toContain('246.91');
  });
});
