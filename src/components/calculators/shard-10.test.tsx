import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import CoaxCableCalculator, { computeCoaxCable } from './CoaxCableCalculator';

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

const page: CalculatorPage = {
  title: 'Coax Cable Calculator',
  description: 'Estimate coax cable signal loss and received power.',
  path: '/coax-cable-calculator.html',
  category: 'scientific',
};

describe('CoaxCableCalculator', () => {
  it('renders through CalculatorPageLayout with input labels', () => {
    renderCalculatorPage(<CoaxCableCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Coax Cable Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Cable length (m)')).toBeDefined();
    expect(screen.getByLabelText('Loss per 100 m (dB)')).toBeDefined();
    expect(screen.getByLabelText('Transmitter power (W)')).toBeDefined();
    expect(screen.getByLabelText('Connector loss (dB)')).toBeDefined();
    expect(screen.getByText('Received power')).toBeDefined();
  });

  it('computes loss and received power from known inputs', () => {
    const lengthMeters = 100;
    const lossPer100m = 5;
    const transmitterPower = 20;
    const connectorLoss = 0.5;

    const cableLoss = lossPer100m * (lengthMeters / 100);
    const totalLoss = cableLoss + connectorLoss;
    const received = transmitterPower * Math.pow(10, -totalLoss / 10);
    const lost = transmitterPower - received;
    const receivedDbm = 10 * Math.log10(received * 1000);

    const result = computeCoaxCable({ lengthMeters, lossPer100m, transmitterPower, connectorLoss });
    expect(result.cableLoss).toBeCloseTo(cableLoss, 10);
    expect(result.connectors).toBeCloseTo(connectorLoss, 10);
    expect(result.totalLoss).toBeCloseTo(totalLoss, 10);
    expect(result.received).toBeCloseTo(received, 10);
    expect(result.lost).toBeCloseTo(lost, 10);
    expect(result.receivedDbm).toBeCloseTo(receivedDbm, 10);
    // dBm output equals input power in dBm minus total link loss.
    expect(result.receivedDbm).toBeCloseTo(10 * Math.log10(transmitterPower * 1000) - totalLoss, 10);

    const noConnectors = computeCoaxCable({ lengthMeters, lossPer100m, transmitterPower });
    expect(noConnectors.totalLoss).toBeCloseTo(cableLoss, 10);
    expect(noConnectors.received).toBeCloseTo(transmitterPower * Math.pow(10, -cableLoss / 10), 10);
  });

  it('recomputes the displayed result when the cable length changes', () => {
    const { container } = renderCalculatorPage(<CoaxCableCalculator />, page);
    const hero = () => container.querySelector('p.text-4xl')!.textContent;

    const defaultReceived = 50 * Math.pow(10, -(6 * (50 / 100) + 0.5) / 10);
    expect(hero()).toBe(`${num(defaultReceived)} W`);
    expect(screen.getByText('Cable loss').nextElementSibling!.textContent).toBe(`${num(3)} dB`);

    fireEvent.change(screen.getByLabelText('Cable length (m)'), { target: { value: '100' } });
    const updatedReceived = 50 * Math.pow(10, -(6 * (100 / 100) + 0.5) / 10);
    expect(hero()).toBe(`${num(updatedReceived)} W`);
    expect(screen.getByText('Cable loss').nextElementSibling!.textContent).toBe(`${num(6)} dB`);
    expect(screen.getByText('Power lost').nextElementSibling!.textContent).toBe(
      `${num(50 - updatedReceived)} W`
    );
  });

  it('never shows NaN for zero or negative lengths and powers', () => {
    const zero = computeCoaxCable({ lengthMeters: 0, lossPer100m: 6, transmitterPower: 50, connectorLoss: 0 });
    expect(zero.totalLoss).toBe(0);
    expect(zero.received).toBe(50);
    expect(zero.lost).toBe(0);
    expect(Number.isFinite(zero.receivedDbm)).toBe(true);
    expect(zero.receivedDbm).toBeCloseTo(10 * Math.log10(50 * 1000), 10);

    const negative = computeCoaxCable({
      lengthMeters: -100,
      lossPer100m: -5,
      transmitterPower: -10,
      connectorLoss: -2,
    });
    expect(Number.isNaN(negative.totalLoss)).toBe(false);
    expect(Number.isNaN(negative.received)).toBe(false);
    expect(Number.isNaN(negative.lost)).toBe(false);
    expect(Number.isNaN(negative.receivedDbm)).toBe(false);
    expect(negative.totalLoss).toBe(0);
    expect(negative.received).toBe(0);
    expect(negative.receivedDbm).toBe(0);

    const { container } = renderCalculatorPage(<CoaxCableCalculator />, page);
    fireEvent.change(screen.getByLabelText('Cable length (m)'), { target: { value: '-40' } });
    fireEvent.change(screen.getByLabelText('Transmitter power (W)'), { target: { value: '-5' } });
    fireEvent.change(screen.getByLabelText('Connector loss (dB)'), { target: { value: '-1' } });
    expect(container.textContent).not.toContain('NaN');
    expect(container.querySelector('p.text-4xl')!.textContent).toBe('0.00 W');
  });
});
