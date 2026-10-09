import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import BreakevenCalculator from './BreakevenCalculator';
import MatrixMultiplicationCalculator from './MatrixMultiplicationCalculator';
import TimeZoneCalculator from './TimeZoneCalculator';
import PageAuthorityCalculator from './PageAuthorityCalculator';
import WheelOffsetCalculator from './WheelOffsetCalculator';
import PoHCalculator from './PoHCalculator';
import WoundCareCalculator from './WoundCareCalculator';

interface CalculatorPage {
  title: string;
  description: string;
  path: string;
  category?: string;
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

const hero = (container: HTMLElement) => container.querySelector('p.text-4xl')?.textContent ?? '';

const row = (label: string) => {
  const labelEl = screen.getAllByText(label).find((el) => el.tagName === 'P');
  return labelEl!.nextElementSibling!.textContent;
};

describe('BreakevenCalculator', () => {
  const page: CalculatorPage = {
    title: 'Break-Even Calculator',
    description: 'Find the price a trade must reach to cover entry costs and fees.',
    path: '/break-even-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<BreakevenCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Break-Even Calculator' })).toBeDefined();
    expect(screen.getAllByText('Entry Price').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Breakeven Point').length).toBeGreaterThan(0);
    expect(
      screen.getAllByText('Breakeven Price')[0].nextElementSibling!.textContent!.endsWith('110.00')
    ).toBe(true);
    expect(container.querySelector('input[type="number"]')).toBeDefined();
  });

  it('raises the breakeven price when the entry price rises', () => {
    renderCalculatorPage(<BreakevenCalculator />, page);
    const price = () => screen.getAllByText('Breakeven Price')[0].nextElementSibling!.textContent!;
    fireEvent.change(document.querySelector('input[type="number"]') as HTMLInputElement, {
      target: { value: '150' },
    });
    expect(price().endsWith('160.00')).toBe(true);
    expect(screen.getAllByText('Price Move Needed').length).toBeGreaterThan(0);
  });
});

describe('MatrixMultiplicationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Matrix Multiplication Calculator',
    description: 'Multiply two matrices row by row and read the resulting product.',
    path: '/matrix-multiplication-calculator.html',
    category: 'math',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<MatrixMultiplicationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Matrix Multiplication Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Matrix A')).toBeDefined();
    expect(screen.getByLabelText('Matrix B')).toBeDefined();
    expect(hero(container)).toBe('2×2');
    expect(screen.getAllByText('A shape').length).toBeGreaterThan(0);
  });

  it('updates the product shape when Matrix A changes', () => {
    const { container } = renderCalculatorPage(<MatrixMultiplicationCalculator />, page);
    fireEvent.change(screen.getByLabelText('Matrix A'), { target: { value: '1 2; 3 4; 5 6' } });
    expect(hero(container)).toBe('3×2');
    expect(row('A shape')).toBe('3×2');
  });
});

describe('TimeZoneCalculator', () => {
  const page: CalculatorPage = {
    title: 'Time Zone Calculator',
    description: 'Convert a clock time between major world time zones.',
    path: '/time-zone-calculator.html',
    category: 'dateTime',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TimeZoneCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Time Zone Calculator' })).toBeDefined();
    expect(screen.getAllByText('Converted Time').length).toBeGreaterThan(0);
    expect(screen.getByText('17:30')).toBeDefined();
  });

  it('converts a newly entered clock time', () => {
    renderCalculatorPage(<TimeZoneCalculator />, page);
    const timeInput = document.querySelector('input[type="time"]') as HTMLInputElement;
    fireEvent.change(timeInput, { target: { value: '10:00' } });
    expect(screen.getByText('15:30')).toBeDefined();
  });
});

describe('PageAuthorityCalculator', () => {
  const page: CalculatorPage = {
    title: 'Page Authority Calculator',
    description: 'Estimate page ranking strength from authority and link signals.',
    path: '/page-authority-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<PageAuthorityCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Page Authority Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Domain authority')).toBeDefined();
    expect(screen.getByLabelText('Backlinks')).toBeDefined();
    expect(hero(container)).toBe('42.50');
    expect(row('Backlinks per domain')).toBe('4.17');
  });

  it('recomputes the authority score when domain authority changes', () => {
    const { container } = renderCalculatorPage(<PageAuthorityCalculator />, page);
    fireEvent.change(screen.getByLabelText('Domain authority'), { target: { value: '80' } });
    expect(hero(container)).toBe('68.00');
  });
});

describe('WheelOffsetCalculator', () => {
  const page: CalculatorPage = {
    title: 'Wheel Offset Calculator',
    description: 'Compare wheel offset and width to check fitment changes.',
    path: '/wheel-offset-calculator.html',
    category: 'construction',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<WheelOffsetCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Wheel Offset Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Wheel diameter (in)')).toBeDefined();
    expect(screen.getByLabelText('Stock offset (mm)')).toBeDefined();
    expect(hero(container)).toBe('-9.25 mm');
    expect(row('Stock backspace')).toBe('49.00 mm');
  });

  it('updates the offset change when the new offset changes', () => {
    const { container } = renderCalculatorPage(<WheelOffsetCalculator />, page);
    fireEvent.change(screen.getByLabelText('New offset (mm)'), { target: { value: '45' } });
    expect(hero(container)).toBe('0.75 mm');
  });
});

describe('PoHCalculator', () => {
  const page: CalculatorPage = {
    title: 'pOH Calculator',
    description: 'Convert pH to pOH and ion concentrations in mol/L.',
    path: '/poh-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<PoHCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'pOH Calculator' })).toBeDefined();
    expect(screen.getByLabelText('pH')).toBeDefined();
    expect(hero(container)).toBe('7.00');
    expect(screen.getAllByText('[OH⁻] mol/L').length).toBeGreaterThan(0);
  });

  it('recomputes pOH when the pH input changes', () => {
    const { container } = renderCalculatorPage(<PoHCalculator />, page);
    fireEvent.change(screen.getByLabelText('pH'), { target: { value: '3' } });
    expect(hero(container)).toBe('11.00');
    expect(row('[H⁺] mol/L')).toBe('0.00');
  });
});

describe('WoundCareCalculator', () => {
  const page: CalculatorPage = {
    title: 'Wound Care Calculator',
    description: 'Estimate wound healing time and dressing changes needed.',
    path: '/wound-care-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    const { container } = renderCalculatorPage(<WoundCareCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Wound Care Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Wound area (cm²)')).toBeDefined();
    expect(hero(container)).toBe('4.00 days');
    expect(row('Dressing changes needed')).toBe('2');
  });

  it('lowers the healing estimate when the healing rate rises', () => {
    const { container } = renderCalculatorPage(<WoundCareCalculator />, page);
    fireEvent.change(screen.getByLabelText('Healing rate (cm²/day)'), { target: { value: '2' } });
    expect(hero(container)).toBe('2.00 days');
    expect(row('Dressing changes needed')).toBe('1');
  });
});
