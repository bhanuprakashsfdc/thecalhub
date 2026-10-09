import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import WaveguideCalculator, { computeWaveguide } from './WaveguideCalculator';

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

const num = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

describe('WaveguideCalculator', () => {
  const page: CalculatorPage = {
    title: 'Waveguide Calculator',
    description: 'Find TE10 cutoff frequency and guide wavelength for a rectangular waveguide.',
    path: '/waveguide-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WaveguideCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Waveguide Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Waveguide width (cm)')).toBeDefined();
    expect(screen.getByLabelText('Operating frequency (GHz)')).toBeDefined();
    expect(screen.getByText('Cutoff frequency')).toBeDefined();
  });

  it('computes TE10 cutoff, free-space and guide wavelengths', () => {
    const widthCm = 2.286;
    const frequencyGhz = 10;
    const cutoff = 15 / widthCm;
    const lambda0 = 30 / frequencyGhz;
    const lambdaG = lambda0 / Math.sqrt(1 - Math.pow(cutoff / frequencyGhz, 2));

    const result = computeWaveguide({ widthCm, frequencyGhz });
    expect(result.cutoff).toBeCloseTo(cutoff, 10);
    expect(result.freeSpace).toBeCloseTo(lambda0, 10);
    expect(result.guide).toBeCloseTo(lambdaG, 10);
    expect(result.operating).toBe(true);
  });

  it('updates the displayed cutoff when the width changes', () => {
    const { container } = renderCalculatorPage(<WaveguideCalculator />, page);
    fireEvent.change(screen.getByLabelText('Waveguide width (cm)'), { target: { value: '1' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(15 / 1)} GHz`);
    expect(screen.getByText('Free-space wavelength').nextElementSibling!.textContent).toBe(
      `${num(30 / 10)} cm`
    );
  });

  it('renders safely below cutoff without NaN', () => {
    const { container } = renderCalculatorPage(<WaveguideCalculator />, page);
    fireEvent.change(screen.getByLabelText('Operating frequency (GHz)'), { target: { value: '5' } });
    const text = container.textContent ?? '';
    expect(text).not.toContain('NaN');
    expect(text).not.toContain('Infinity');
    expect(screen.getByText('Guide wavelength').nextElementSibling!.textContent).toBe('None');
    expect(screen.getByText('Below cutoff — signal will not propagate')).toBeDefined();
    const below = computeWaveguide({ widthCm: 2.286, frequencyGhz: 5 });
    expect(below.operating).toBe(false);
    expect(below.guide).toBe(0);
  });
});
