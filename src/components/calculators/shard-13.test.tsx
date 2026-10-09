import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import AntennaRangeCalculator, { computeAntennaRange } from './AntennaRangeCalculator';

function renderCalculatorPage(
  component: ReactElement,
  page: { title: string; description: string; path: string; category?: string }
) {
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

const fmt = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

describe('AntennaRangeCalculator', () => {
  const page = {
    title: 'Antenna Range Calculator',
    description:
      'Estimate the maximum free-space range of a radio link from transmit power, antenna gains, frequency and receiver sensitivity.',
    path: '/antenna-range-calculator.html',
    category: 'scientific',
  };

  it('renders through CalculatorPageLayout with labelled inputs', () => {
    renderCalculatorPage(<AntennaRangeCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Antenna Range Calculator' })
    ).toBeDefined();
    expect(screen.getByLabelText('Transmit power (dBm)')).toBeDefined();
    expect(screen.getByLabelText('Frequency (GHz)')).toBeDefined();
    expect(screen.getByLabelText('Transmit gain (dBi)')).toBeDefined();
    expect(screen.getByLabelText('Receive gain (dBi)')).toBeDefined();
    expect(screen.getByLabelText('Receiver sensitivity (dBm)')).toBeDefined();
    expect(screen.getByText('Maximum range')).toBeDefined();
    expect(screen.getByText('Range in miles')).toBeDefined();
  });

  it('solves the Friis free-space link for a known scenario', () => {
    const input = {
      txPowerDbm: 20,
      frequencyGhz: 2.4,
      txGain: 5,
      rxGain: 5,
      sensitivityDbm: -85,
    };
    // Worked independently: Pr = Pt + Gt + Gr - FSPL - losses, FSPL solved at sensitivity
    const linkBudget = 20 + 5 + 5 - -85;
    const constant = 20 * Math.log10(2400) + 32.44;
    const distanceKm = Math.pow(10, (linkBudget - constant) / 20);

    const result = computeAntennaRange(input);
    expect(linkBudget).toBe(115);
    expect(result.linkBudget).toBeCloseTo(linkBudget, 9);
    expect(result.constant).toBeCloseTo(constant, 9);
    expect(result.distanceKm).toBeCloseTo(distanceKm, 9);
    expect(result.distanceKm).toBeCloseTo(5.5949, 3);
    expect(result.distanceMiles).toBeCloseTo(distanceKm * 0.621371, 9);
  });

  it('recomputes the displayed range when the frequency changes', () => {
    const { container } = renderCalculatorPage(<AntennaRangeCalculator />, page);
    const hero = () => container.querySelector('p.text-4xl')!.textContent;

    const defaultKm = Math.pow(10, (115 - (20 * Math.log10(2400) + 32.44)) / 20);
    expect(hero()).toBe(`${fmt(defaultKm)} km`);

    fireEvent.change(screen.getByLabelText('Frequency (GHz)'), { target: { value: '5' } });
    const fiveGhzKm = Math.pow(10, (115 - (20 * Math.log10(5000) + 32.44)) / 20);
    expect(hero()).toBe(`${fmt(fiveGhzKm)} km`);
    expect(hero()).not.toBe(`${fmt(defaultKm)} km`);
    expect(screen.getByText('Range in miles').nextElementSibling!.textContent).toBe(
      `${fmt(fiveGhzKm * 0.621371)} mi`
    );
    expect(screen.getByText('Link budget (max free-space path loss) 115.00 dB')).toBeDefined();
  });

  it('raises the range when receiver sensitivity improves', () => {
    const { container } = renderCalculatorPage(<AntennaRangeCalculator />, page);
    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Receiver sensitivity (dBm)'), {
      target: { value: '-95' },
    });
    const linkBudget = 20 + 5 + 5 - -95;
    const km = Math.pow(10, (linkBudget - (20 * Math.log10(2400) + 32.44)) / 20);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${fmt(km)} km`);
    expect(screen.getByText('Link budget (max free-space path loss) 125.00 dB')).toBeDefined();
    expect(container.querySelector('p.text-4xl')!.textContent).not.toBe(before);
  });

  it('shows no NaN or Infinity for zero or negative inputs', () => {
    const { container } = renderCalculatorPage(<AntennaRangeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Frequency (GHz)'), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText('Transmit power (dBm)'), { target: { value: '-100' } });
    fireEvent.change(screen.getByLabelText('Transmit gain (dBi)'), { target: { value: '-3' } });
    fireEvent.change(screen.getByLabelText('Receiver sensitivity (dBm)'), { target: { value: '' } });

    const text = container.textContent ?? '';
    expect(text).not.toContain('NaN');
    expect(text).not.toContain('Infinity');
    expect(screen.getByText('Maximum range').nextElementSibling!.textContent).toBe('0.00 km');

    const degenerate = computeAntennaRange({
      txPowerDbm: NaN,
      frequencyGhz: -5,
      txGain: Infinity,
      rxGain: 0,
      sensitivityDbm: NaN,
    });
    expect(Number.isFinite(degenerate.linkBudget)).toBe(true);
    expect(Number.isFinite(degenerate.constant)).toBe(true);
    expect(Number.isFinite(degenerate.distanceKm)).toBe(true);
    expect(Number.isFinite(degenerate.distanceMiles)).toBe(true);
    expect(degenerate.distanceKm).toBe(0);

    const matched = computeAntennaRange({
      txPowerDbm: 0,
      frequencyGhz: 0,
      txGain: 0,
      rxGain: 0,
      sensitivityDbm: 0,
    });
    expect(matched.distanceKm).toBe(0);
    expect(matched.distanceMiles).toBe(0);
  });
});

import NauticalMileCalculator from './NauticalMileCalculator';

describe('NauticalMileCalculator', () => {
  it('converts nautical to statute', () => {
    renderCalculatorPage(<NauticalMileCalculator />, {
      title: 'Nautical Mile Calculator',
      description: 'Convert between nautical miles and statute miles with precision.',
      path: '/nautical-mile-calculator.html',
      category: 'standard',
    });
    const nm = screen.getByLabelText('Nautical Miles (NM)');
    fireEvent.change(nm, { target: { value: '1' } });
    const hero = document.querySelector('p.text-4xl');
    expect(hero).toBeTruthy();
  });
});

import AzimuthMilitaryCalculator from './AzimuthMilitaryCalculator';

describe('AzimuthMilitaryCalculator', () => {
  it('converts azimuth', () => {
    renderCalculatorPage(<AzimuthMilitaryCalculator />, {
      title: 'Azimuth Military Calculator',
      description: 'Convert between degrees and military mils for azimuth readings.',
      path: '/azimuth-military-calculator.html',
      category: 'scientific',
    });
    const deg = screen.getByLabelText('Degrees (°)');
    fireEvent.change(deg, { target: { value: '90' } });
    const hero = document.querySelector('p.text-4xl');
    expect(hero).toBeTruthy();
  });
});

import StairClimberCalculator from './StairClimberCalculator';

describe('StairClimberCalculator', () => {
  it('estimates climb', () => {
    renderCalculatorPage(<StairClimberCalculator />, {
      title: 'Stair Climber Calculator',
      description: 'Estimate calories burned and vertical distance climbed on stairs.',
      path: '/stair-climber-calculator.html',
      category: 'fitness',
    });
    const steps = screen.getByLabelText('Steps');
    fireEvent.change(steps, { target: { value: '100' } });
    const hero = document.querySelector('p.text-4xl');
    expect(hero).toBeTruthy();
  });
});

import AreaOnEarthCalculator from './AreaOnEarthCalculator';

describe('AreaOnEarthCalculator', () => {
  it('computes distance', () => {
    renderCalculatorPage(<AreaOnEarthCalculator />, {
      title: 'Area on Earth Calculator',
      description: 'Calculate distance and area between coordinates on Earth.',
      path: '/area-on-earth-calculator.html',
      category: 'scientific',
    });
    const l1 = screen.getByLabelText('Lat 1 (°)');
    fireEvent.change(l1, { target: { value: '0' } });
    const hero = document.querySelector('p.text-4xl');
    expect(hero).toBeTruthy();
  });
});

import CensusCalculator from './CensusCalculator';

describe('CensusCalculator', () => {
  it('computes response rate', () => {
    renderCalculatorPage(<CensusCalculator />, {
      title: 'Census Calculator',
      description: 'Calculate response rates and basic census sampling statistics.',
      path: '/census-calculator.html',
      category: 'scientific',
    });
    const sample = screen.getByLabelText('Sample Size');
    const resp = screen.getByLabelText('Responses');
    fireEvent.change(sample, { target: { value: '100' } });
    fireEvent.change(resp, { target: { value: '95' } });
    const hero = document.querySelector('p.text-4xl');
    expect(hero).toBeTruthy();
    expect(hero?.textContent).toMatch(/95\.00%|95%/);
  });
});

import CognitiveFunctionCalculator from './CognitiveFunctionCalculator';

describe('CognitiveFunctionCalculator', () => {
  it('computes percentage', () => {
    renderCalculatorPage(<CognitiveFunctionCalculator />, {
      title: 'Cognitive Function Calculator',
      description: 'Estimate cognitive function score as a percentage of max score.',
      path: '/cognitive-function-calculator.html',
      category: 'health',
    });
    const score = screen.getByLabelText('Score');
    const max = screen.getByLabelText('Max Score');
    fireEvent.change(score, { target: { value: '15' } });
    fireEvent.change(max, { target: { value: '30' } });
    const hero = document.querySelector('p.text-4xl');
    expect(hero).toBeTruthy();
    expect(hero?.textContent).toMatch(/50\.00%|50%/);
  });
});

import InputOutputCalculator from './InputOutputCalculator';

describe('InputOutputCalculator', () => {
  it('computes efficiency', () => {
    renderCalculatorPage(<InputOutputCalculator />, {
      title: 'Input Output Calculator',
      description: 'Calculate efficiency and loss from input and output values.',
      path: '/input-output-calculator.html',
      category: 'math',
    });
    const input = screen.getByLabelText('Input');
    const output = screen.getByLabelText('Output');
    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.change(output, { target: { value: '80' } });
    const hero = document.querySelector('p.text-4xl');
    expect(hero).toBeTruthy();
    expect(hero?.textContent).toMatch(/80\.00%|80%/);
  });
});

import GeriatricDosageCalculator from './GeriatricDosageCalculator';

describe('GeriatricDosageCalculator', () => {
  it('computes adjusted dose', () => {
    renderCalculatorPage(<GeriatricDosageCalculator />, {
      title: 'Geriatric Dosage Calculator',
      description: 'Calculate adjusted medication dosages for elderly patients.',
      path: '/geriatric-dosage-calculator.html',
      category: 'health',
    });
    const w = screen.getByLabelText('Weight (kg)');
    const a = screen.getByLabelText('Adult Dose (mg)');
    fireEvent.change(w, { target: { value: '70' } });
    fireEvent.change(a, { target: { value: '100' } });
    const hero = document.querySelector('p.text-4xl');
    expect(hero).toBeTruthy();
  });
});

import QuaternionCalculator from './QuaternionCalculator';

describe('QuaternionCalculator', () => {
  it('computes magnitude', () => {
    renderCalculatorPage(<QuaternionCalculator />, {
      title: 'Quaternion Calculator',
      description: 'Calculate quaternion magnitude and basic operations.',
      path: '/quaternion-calculator.html',
      category: 'math',
    });
    const w = screen.getByLabelText('W');
    const x = screen.getByLabelText('X');
    const y = screen.getByLabelText('Y');
    const z = screen.getByLabelText('Z');
    fireEvent.change(w, { target: { value: '1' } });
    fireEvent.change(x, { target: { value: '0' } });
    fireEvent.change(y, { target: { value: '0' } });
    fireEvent.change(z, { target: { value: '0' } });
    const hero = document.querySelector('p.text-4xl');
    expect(hero).toBeTruthy();
  });
});
