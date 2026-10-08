import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import LongTermCareCalculator from './LongTermCareCalculator';
import DisabilityInsuranceCalculator from './DisabilityInsuranceCalculator';
import LifeInsuranceNeedCalculator from './LifeInsuranceNeedCalculator';
import TCOCalculator from './TCOCalculator';
import ROITechnologyCalculator from './ROITechnologyCalculator';
import SubscriptionCostCalculator from './SubscriptionCostCalculator';
import LicenseCostCalculator from './LicenseCostCalculator';
import StorageCostCalculator from './StorageCostCalculator';
import BandwidthCostCalculator from './BandwidthCostCalculator';
import ServerLoadCalculator from './ServerLoadCalculator';
import CloudCostCalculator from './CloudCostCalculator';
import DefectRateCalculator from './DefectRateCalculator';
import QualityControlCalculator from './QualityControlCalculator';
import DowntimeCalculator from './DowntimeCalculator';
import EfficiencyManufacturingCalculator from './EfficiencyManufacturingCalculator';
import ProductionRateCalculator from './ProductionRateCalculator';
import ManufacturingCostCalculator from './ManufacturingCostCalculator';
import ExtendedRepaymentCalculator from './ExtendedRepaymentCalculator';
import GraduatedRepaymentCalculator from './GraduatedRepaymentCalculator';
import IncomeDrivenRepaymentCalculator from './IncomeDrivenRepaymentCalculator';
import StudentLoanRefinanceCalculator from './StudentLoanRefinanceCalculator';
import StudentLoanPayoffCalculator from './StudentLoanPayoffCalculator';
import StudentLoanCalculator from './StudentLoanCalculator';
import RestingHeartRateCalculator from './RestingHeartRateCalculator';
import RecoveryTimeCalculator from './RecoveryTimeCalculator';
import FitnessPlateauBreakerCalculator from './FitnessPlateauBreakerCalculator';
import ExerciseProgressionCalculator from './ExerciseProgressionCalculator';
import SedentaryToActiveCalculator from './SedentaryToActiveCalculator';
import ActivityLevelCalculator from './ActivityLevelCalculator';
import BMICalculator from './BMICalculator';
import WaistCircumferenceCalculator from './WaistCircumferenceCalculator';
import SavingsGrowthCalculator from './SavingsGrowthCalculator';
import FIRECalculator from './FIRECalculator';
import FinancialIndependenceCalculator from './FinancialIndependenceCalculator';
import WealthBuildingCalculator from './WealthBuildingCalculator';
import DebtPayoffSpreadsheetCalculator from './DebtPayoffSpreadsheetCalculator';
import EnvelopeSystemCalculator from './EnvelopeSystemCalculator';
import ZeroBasedBudgetCalculator from './ZeroBasedBudgetCalculator';
import CashEnvelopeCalculator from './CashEnvelopeCalculator';
import ExpenseTrackCalculator from './ExpenseTrackCalculator';

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

const money = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const num = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

describe('LongTermCareCalculator', () => {
  const page: CalculatorPage = {
    title: 'Long-Term Care Calculator',
    description: 'Estimate long-term care costs and the savings needed to fund them.',
    path: '/long-term-care-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LongTermCareCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Long-Term Care Calculator' })).toBeDefined();
    expect(screen.getByText('Monthly care cost ($)')).toBeDefined();
    expect(screen.getByText('Lump sum needed today')).toBeDefined();
  });

  it('discounts inflated care costs back to today’s dollars', () => {
    const { container } = renderCalculatorPage(<LongTermCareCalculator />, page);
    const yearsUntil = 15;
    const futureMonthly = 5000 * Math.pow(1.04, yearsUntil);
    const totalFuture = futureMonthly * 12 * 3;
    const presentValue = totalFuture / Math.pow(1.05, yearsUntil);

    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(presentValue));
    expect(screen.getByText('Monthly cost when care starts').nextElementSibling!.textContent).toBe(
      money(futureMonthly)
    );
    expect(screen.getByText('Total future cost').nextElementSibling!.textContent).toBe(money(totalFuture));
  });

  it('moves the care start date closer and lowers the lump sum', () => {
    const { container } = renderCalculatorPage(<LongTermCareCalculator />, page);
    const before = container.querySelector('p.text-4xl')!.textContent;
    fireEvent.change(screen.getByLabelText('Age when care starts'), { target: { value: '70' } });
    const after = container.querySelector('p.text-4xl')!.textContent;
    expect(after).not.toBe(before);
    const futureMonthly = 5000 * Math.pow(1.04, 5);
    const presentValue = (futureMonthly * 12 * 3) / Math.pow(1.05, 5);
    expect(after).toBe(money(presentValue));
  });
});

describe('DisabilityInsuranceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Disability Insurance Calculator',
    description: 'Estimate disability insurance cover and premiums.',
    path: '/disability-insurance-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DisabilityInsuranceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Disability Insurance Calculator' })).toBeDefined();
    expect(screen.getByText('Monthly income ($)')).toBeDefined();
    expect(screen.getByText('Monthly benefit')).toBeDefined();
  });

  it('pays the configured share of monthly income', () => {
    const { container } = renderCalculatorPage(<DisabilityInsuranceCalculator />, page);
    const monthlyBenefit = 6000 * (60 / 100);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(monthlyBenefit));
    expect(screen.getByText('Cost during elimination period').nextElementSibling!.textContent).toBe(
      money((monthlyBenefit / 30) * 90)
    );
  });

  it('raises the benefit when income rises', () => {
    const { container } = renderCalculatorPage(<DisabilityInsuranceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Monthly income ($)'), { target: { value: '8000' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(8000 * (60 / 100)));
  });
});

describe('LifeInsuranceNeedCalculator', () => {
  const page: CalculatorPage = {
    title: 'Life Insurance Need Calculator',
    description: 'Work out how much life cover your family needs.',
    path: '/life-insurance-need-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LifeInsuranceNeedCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Life Insurance Need Calculator' })).toBeDefined();
    expect(screen.getByText('Savings & investments ($)')).toBeDefined();
    expect(screen.getByText('Life cover needed')).toBeDefined();
  });

  it('nets obligations against assets', () => {
    const { container } = renderCalculatorPage(<LifeInsuranceNeedCalculator />, page);
    const obligations = 75000 * 10 + 20000 + 50000;
    const cover = obligations - (100000 + 50000);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(cover));
    expect(screen.getByText('Total obligations').nextElementSibling!.textContent).toBe(money(obligations));
  });

  it('grows with income', () => {
    const { container } = renderCalculatorPage(<LifeInsuranceNeedCalculator />, page);
    fireEvent.change(screen.getByLabelText('Annual income ($)'), { target: { value: '90000' } });
    const cover = 90000 * 10 + 20000 + 50000 - (100000 + 50000);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(cover));
  });
});

describe('TCOCalculator', () => {
  const page: CalculatorPage = {
    title: 'TCO Calculator',
    description: 'Calculate total cost of ownership.',
    path: '/tco-calculator.html',
    category: 'programming',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TCOCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'TCO Calculator' })).toBeDefined();
    expect(screen.getByText('Upfront cost ($)')).toBeDefined();
    expect(screen.getByText('Total cost of ownership')).toBeDefined();
  });

  it('adds upfront spend to the annual run rate', () => {
    const { container } = renderCalculatorPage(<TCOCalculator />, page);
    const annual = 5000 + 3600 + 2400 + 120 * 80;
    const total = 20000 + annual * 3;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(total));
    expect(screen.getByText('Annual run rate').nextElementSibling!.textContent).toBe(money(annual));
  });

  it('adds a bigger upfront purchase', () => {
    const { container } = renderCalculatorPage(<TCOCalculator />, page);
    fireEvent.change(screen.getByLabelText('Upfront cost ($)'), { target: { value: '30000' } });
    const total = 30000 + (5000 + 3600 + 2400 + 120 * 80) * 3;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(total));
  });
});

describe('ROITechnologyCalculator', () => {
  const page: CalculatorPage = {
    title: 'ROI Technology Calculator',
    description: 'Measure return on a technology investment.',
    path: '/roi-technology-calculator.html',
    category: 'programming',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ROITechnologyCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'ROI Technology Calculator' })).toBeDefined();
    expect(screen.getByText('Total investment ($)')).toBeDefined();
    expect(screen.getByText('Return on investment')).toBeDefined();
  });

  it('returns net gain over investment', () => {
    const { container } = renderCalculatorPage(<ROITechnologyCalculator />, page);
    const net = 30000 * 3 - 50000;
    const roi = (net / 50000) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(roi)}%`);
    expect(screen.getByText('Net gain').nextElementSibling!.textContent).toBe(money(net));
  });

  it('recomputes when the annual benefit changes', () => {
    const { container } = renderCalculatorPage(<ROITechnologyCalculator />, page);
    fireEvent.change(screen.getByLabelText('Annual benefit ($)'), { target: { value: '40000' } });
    const roi = ((40000 * 3 - 50000) / 50000) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(roi)}%`);
  });
});

describe('SubscriptionCostCalculator', () => {
  const page: CalculatorPage = {
    title: 'Subscription Cost Calculator',
    description: 'Forecast SaaS subscription spend.',
    path: '/subscription-cost-calculator.html',
    category: 'programming',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SubscriptionCostCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Subscription Cost Calculator' })).toBeDefined();
    expect(screen.getByText('Number of users')).toBeDefined();
    expect(screen.getByText('Total contract cost')).toBeDefined();
  });

  it('discounts the gross contract value', () => {
    const { container } = renderCalculatorPage(<SubscriptionCostCalculator />, page);
    const gross = 12 * 25 * 12;
    const total = gross - gross * (10 / 100);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(total));
    expect(screen.getByText('Monthly cost').nextElementSibling!.textContent).toBe(money(12 * 25));
  });

  it('scales with seat count', () => {
    const { container } = renderCalculatorPage(<SubscriptionCostCalculator />, page);
    fireEvent.change(screen.getByLabelText('Number of users'), { target: { value: '30' } });
    const gross = 12 * 30 * 12;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(gross - gross * (10 / 100)));
  });
});

describe('LicenseCostCalculator', () => {
  const page: CalculatorPage = {
    title: 'License Cost Calculator',
    description: 'Price multi-year software licences.',
    path: '/license-cost-calculator.html',
    category: 'programming',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LicenseCostCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'License Cost Calculator' })).toBeDefined();
    expect(screen.getByText('Number of seats')).toBeDefined();
    expect(screen.getByText('Multi-year licence cost')).toBeDefined();
  });

  it('adds maintenance years to the seat licences', () => {
    const { container } = renderCalculatorPage(<LicenseCostCalculator />, page);
    const licence = 500 * 10;
    const total = licence + (licence * (20 / 100)) * 3;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(total));
    expect(screen.getByText('Licence cost').nextElementSibling!.textContent).toBe(money(licence));
  });

  it('scales with seats', () => {
    const { container } = renderCalculatorPage(<LicenseCostCalculator />, page);
    fireEvent.change(screen.getByLabelText('Number of seats'), { target: { value: '20' } });
    const licence = 500 * 20;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(
      money(licence + (licence * (20 / 100)) * 3)
    );
  });
});

describe('StorageCostCalculator', () => {
  const page: CalculatorPage = {
    title: 'Storage Cost Calculator',
    description: 'Project storage spend over time.',
    path: '/storage-cost-calculator.html',
    category: 'programming',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<StorageCostCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Storage Cost Calculator' })).toBeDefined();
    expect(screen.getByText('Stored data (GB)')).toBeDefined();
    expect(screen.getByText('Total storage cost')).toBeDefined();
  });

  it('compounds monthly growth across the horizon', () => {
    const { container } = renderCalculatorPage(<StorageCostCalculator />, page);
    const first = 2000 * 3 * 0.023;
    const g = 5 / 100;
    const total = first * ((Math.pow(1 + g, 12) - 1) / g);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(total));
    expect(screen.getByText('First month cost').nextElementSibling!.textContent).toBe(money(first));
  });

  it('shortens the horizon', () => {
    const { container } = renderCalculatorPage(<StorageCostCalculator />, page);
    fireEvent.change(screen.getByLabelText('Storage months'), { target: { value: '6' } });
    const first = 2000 * 3 * 0.023;
    const g = 5 / 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(
      money(first * ((Math.pow(1 + g, 6) - 1) / g))
    );
  });
});

describe('BandwidthCostCalculator', () => {
  const page: CalculatorPage = {
    title: 'Bandwidth Cost Calculator',
    description: 'Estimate egress bandwidth billing.',
    path: '/bandwidth-cost-calculator.html',
    category: 'programming',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<BandwidthCostCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Bandwidth Cost Calculator' })).toBeDefined();
    expect(screen.getByText('Monthly egress (GB)')).toBeDefined();
    expect(screen.getByText('Monthly bandwidth cost')).toBeDefined();
  });

  it('charges only traffic above the free allowance', () => {
    const { container } = renderCalculatorPage(<BandwidthCostCalculator />, page);
    const billable = 5000 - 1000;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(billable * 0.08));
    expect(screen.getByText('Billable data (GB)').nextElementSibling!.textContent).toBe(num(billable));
  });

  it('bills more when traffic rises', () => {
    const { container } = renderCalculatorPage(<BandwidthCostCalculator />, page);
    fireEvent.change(screen.getByLabelText('Monthly egress (GB)'), { target: { value: '8000' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money((8000 - 1000) * 0.08));
  });
});

describe('ServerLoadCalculator', () => {
  const page: CalculatorPage = {
    title: 'Server Load Calculator',
    description: 'Estimate server utilisation and capacity.',
    path: '/server-load-calculator.html',
    category: 'programming',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ServerLoadCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Server Load Calculator' })).toBeDefined();
    expect(screen.getByText('Requests per second')).toBeDefined();
    expect(screen.getByText('Server utilisation')).toBeDefined();
  });

  it('divides offered work by server count', () => {
    const { container } = renderCalculatorPage(<ServerLoadCalculator />, page);
    const concurrent = (300 * 20) / 1000;
    const util = (concurrent / 8) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(util)}%`);
    expect(screen.getByText('Concurrent work (server-seconds)').nextElementSibling!.textContent).toBe(
      num(concurrent)
    );
  });

  it('raises utilisation when servers are removed', () => {
    const { container } = renderCalculatorPage(<ServerLoadCalculator />, page);
    fireEvent.change(screen.getByLabelText('Servers'), { target: { value: '6' } });
    const util = ((300 * 20) / 1000 / 6) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(util)}%`);
  });
});

describe('CloudCostCalculator', () => {
  const page: CalculatorPage = {
    title: 'Cloud Cost Calculator',
    description: 'Estimate monthly cloud hosting bills.',
    path: '/cloud-cost-calculator.html',
    category: 'programming',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CloudCostCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Cloud Cost Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Instances')).toBeDefined();
    expect(screen.getByText('Monthly cloud cost')).toBeDefined();
  });

  it('sums compute, storage and egress', () => {
    const { container } = renderCalculatorPage(<CloudCostCalculator />, page);
    const compute = 4 * 0.12 * 730;
    const monthly = compute + 500 * 0.1 + 1000 * 0.09;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(monthly));
    expect(screen.getByText('Compute cost').nextElementSibling!.textContent).toBe(money(compute));
  });

  it('adds instances to the monthly bill', () => {
    const { container } = renderCalculatorPage(<CloudCostCalculator />, page);
    fireEvent.change(screen.getByLabelText('Instances'), { target: { value: '6' } });
    const monthly = 6 * 0.12 * 730 + 500 * 0.1 + 1000 * 0.09;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(monthly));
  });
});

describe('DefectRateCalculator', () => {
  const page: CalculatorPage = {
    title: 'Defect Rate Calculator',
    description: 'Turn defects into defect rates and DPMO.',
    path: '/defect-rate-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DefectRateCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Defect Rate Calculator' })).toBeDefined();
    expect(screen.getByText('Units inspected')).toBeDefined();
    expect(screen.getByText('Defect rate')).toBeDefined();
  });

  it('divides defects by inspected units', () => {
    const { container } = renderCalculatorPage(<DefectRateCalculator />, page);
    const rate = (12 / 1000) * 100;
    const dpmo = (12 / (1000 * 5)) * 1000000;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(rate)}%`);
    expect(screen.getByText('DPMO').nextElementSibling!.textContent).toBe(num(dpmo));
  });

  it('raises the rate when more defects are found', () => {
    const { container } = renderCalculatorPage(<DefectRateCalculator />, page);
    fireEvent.change(screen.getByLabelText('Defects found'), { target: { value: '20' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num((20 / 1000) * 100)}%`);
  });
});

describe('QualityControlCalculator', () => {
  const page: CalculatorPage = {
    title: 'Quality Control Calculator',
    description: 'Measure yield and reject costs.',
    path: '/quality-control-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<QualityControlCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Quality Control Calculator' })).toBeDefined();
    expect(screen.getByText('Units rejected')).toBeDefined();
    expect(screen.getByText('First-pass yield')).toBeDefined();
  });

  it('keeps the rejected units out of first-pass yield', () => {
    const { container } = renderCalculatorPage(<QualityControlCalculator />, page);
    const yieldPct = ((5000 - 40) / 5000) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(yieldPct)}%`);
    expect(screen.getByText('Cost of rejects').nextElementSibling!.textContent).toBe(money(40 * 12));
  });

  it('lowers yield as rejects rise', () => {
    const { container } = renderCalculatorPage(<QualityControlCalculator />, page);
    fireEvent.change(screen.getByLabelText('Units rejected'), { target: { value: '100' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(((5000 - 100) / 5000) * 100)}%`);
  });
});

describe('DowntimeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Downtime Calculator',
    description: 'Convert outage minutes into availability.',
    path: '/downtime-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DowntimeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Downtime Calculator' })).toBeDefined();
    expect(screen.getByText('Downtime (minutes)')).toBeDefined();
    expect(screen.getByText('Availability')).toBeDefined();
  });

  it('reports availability over the full period', () => {
    const { container } = renderCalculatorPage(<DowntimeCalculator />, page);
    const availability = ((43200 - 90) / 43200) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(availability)}%`);
    expect(screen.getByText('MTBF (hours)').nextElementSibling!.textContent).toBe(num(((43200 - 90) / 60 / 2)));
  });

  it('drops availability when outages grow', () => {
    const { container } = renderCalculatorPage(<DowntimeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Downtime (minutes)'), { target: { value: '300' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(
      `${num(((43200 - 300) / 43200) * 100)}%`
    );
  });
});

describe('EfficiencyManufacturingCalculator', () => {
  const page: CalculatorPage = {
    title: 'Efficiency Manufacturing Calculator',
    description: 'Compare actual and theoretical output.',
    path: '/efficiency-manufacturing-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EfficiencyManufacturingCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Efficiency Manufacturing Calculator' })
    ).toBeDefined();
    expect(screen.getByLabelText('Actual output (units)')).toBeDefined();
    expect(screen.getByText('Manufacturing efficiency')).toBeDefined();
  });

  it('divides actual output by theoretical capacity', () => {
    const { container } = renderCalculatorPage(<EfficiencyManufacturingCalculator />, page);
    const theoretical = 60 * 24;
    const efficiency = (1350 / theoretical) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(efficiency)}%`);
    expect(screen.getByText('Theoretical output').nextElementSibling!.textContent).toBe(num(theoretical));
  });

  it('hits full efficiency when output matches capacity', () => {
    const { container } = renderCalculatorPage(<EfficiencyManufacturingCalculator />, page);
    fireEvent.change(screen.getByLabelText('Actual output (units)'), { target: { value: '1440' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(100)}%`);
  });
});

describe('ProductionRateCalculator', () => {
  const page: CalculatorPage = {
    title: 'Production Rate Calculator',
    description: 'Calculate units per hour and shift.',
    path: '/production-rate-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ProductionRateCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Production Rate Calculator' })).toBeDefined();
    expect(screen.getByText('Downtime (hours)')).toBeDefined();
    expect(screen.getByText('Units per hour')).toBeDefined();
  });

  it('uses net run hours for the rate', () => {
    const { container } = renderCalculatorPage(<ProductionRateCalculator />, page);
    const netHours = 10 - 2;
    const perHour = 1200 / netHours;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(perHour));
    expect(screen.getByText('Units per 8-hour shift').nextElementSibling!.textContent).toBe(
      num(perHour * 8)
    );
  });

  it('rises when more units are produced', () => {
    const { container } = renderCalculatorPage(<ProductionRateCalculator />, page);
    fireEvent.change(screen.getByLabelText('Units produced'), { target: { value: '1600' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(1600 / (10 - 2)));
  });
});

describe('ManufacturingCostCalculator', () => {
  const page: CalculatorPage = {
    title: 'Manufacturing Cost Calculator',
    description: 'Build a fully loaded unit cost.',
    path: '/manufacturing-cost-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ManufacturingCostCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Manufacturing Cost Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Material cost per unit ($)')).toBeDefined();
    expect(screen.getByText('Cost per unit')).toBeDefined();
  });

  it('adds waste, labour and overhead to material', () => {
    const { container } = renderCalculatorPage(<ManufacturingCostCalculator />, page);
    const material = 12 * (1 + 3 / 100);
    const unit = material + 0.5 * 25 + 4;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(unit));
    expect(screen.getByText('Total batch cost').nextElementSibling!.textContent).toBe(money(unit * 1000));
  });

  it('scales the batch with quantity', () => {
    const { container } = renderCalculatorPage(<ManufacturingCostCalculator />, page);
    fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '2000' } });
    const unit = 12 * (1 + 3 / 100) + 0.5 * 25 + 4;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(unit));
    expect(screen.getByText('Total batch cost').nextElementSibling!.textContent).toBe(money(unit * 2000));
  });
});

describe('ExtendedRepaymentCalculator', () => {
  const page: CalculatorPage = {
    title: 'Extended Repayment Calculator',
    description: 'Model a long student loan term.',
    path: '/extended-repayment-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ExtendedRepaymentCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Extended Repayment Calculator' })).toBeDefined();
    expect(screen.getByText('Interest-only months')).toBeDefined();
    expect(screen.getByText('Monthly payment')).toBeDefined();
  });

  it('amortises the balance over the remaining term', () => {
    const { container } = renderCalculatorPage(<ExtendedRepaymentCalculator />, page);
    const r = 6.5 / 100 / 12;
    const remaining = 25 * 12 - 12;
    const payment = (40000 * r) / (1 - Math.pow(1 + r, -remaining));
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(payment));
    expect(screen.getByText('Interest-only payment').nextElementSibling!.textContent).toBe(
      money(40000 * r)
    );
  });

  it('grows the payment with the balance', () => {
    const { container } = renderCalculatorPage(<ExtendedRepaymentCalculator />, page);
    fireEvent.change(screen.getByLabelText('Loan balance ($)'), { target: { value: '50000' } });
    const r = 6.5 / 100 / 12;
    const payment = (50000 * r) / (1 - Math.pow(1 + r, -288));
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(payment));
  });
});

describe('GraduatedRepaymentCalculator', () => {
  const page: CalculatorPage = {
    title: 'Graduated Repayment Calculator',
    description: 'Plan stepped student loan payments.',
    path: '/graduated-repayment-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<GraduatedRepaymentCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Graduated Repayment Calculator' })).toBeDefined();
    expect(screen.getByText('Start payment factor (%)')).toBeDefined();
    expect(screen.getByText('First monthly payment')).toBeDefined();
  });

  it('starts the schedule at the standard payment factor', () => {
    const { container } = renderCalculatorPage(<GraduatedRepaymentCalculator />, page);
    const r = 6.5 / 100 / 12;
    const standard = (40000 * r) / (1 - Math.pow(1 + r, -120));
    const first = standard * (50 / 100);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(first));
    expect(screen.getByText('Months to payoff').nextElementSibling!.textContent).not.toBe('');
  });

  it('raises the first payment with a higher factor', () => {
    const { container } = renderCalculatorPage(<GraduatedRepaymentCalculator />, page);
    fireEvent.change(screen.getByLabelText('Start payment factor (%)'), { target: { value: '75' } });
    const r = 6.5 / 100 / 12;
    const standard = (40000 * r) / (1 - Math.pow(1 + r, -120));
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(standard * (75 / 100)));
  });
});

describe('IncomeDrivenRepaymentCalculator', () => {
  const page: CalculatorPage = {
    title: 'Income Driven Repayment Calculator',
    description: 'Estimate payments from discretionary income.',
    path: '/income-driven-repayment-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<IncomeDrivenRepaymentCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Income Driven Repayment Calculator' })
    ).toBeDefined();
    expect((screen.getByLabelText('Annual income ($)') as HTMLInputElement).value).toBe('55000');
    expect(screen.getByText('Monthly payment')).toBeDefined();
  });

  it('takes a share of discretionary income', () => {
    const { container } = renderCalculatorPage(<IncomeDrivenRepaymentCalculator />, page);
    const poverty = 15000 * 2;
    const discretionary = 55000 - poverty * 1.5;
    const monthly = (discretionary * (10 / 100)) / 12;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(monthly));
    expect(screen.getByText('Discretionary income').nextElementSibling!.textContent).toBe(
      money(discretionary)
    );
  });

  it('raises the payment as income rises', () => {
    const { container } = renderCalculatorPage(<IncomeDrivenRepaymentCalculator />, page);
    fireEvent.change(screen.getByLabelText('Annual income ($)'), { target: { value: '70000' } });
    const discretionary = 70000 - 15000 * 2 * 1.5;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(
      money((discretionary * (10 / 100)) / 12)
    );
  });
});

describe('StudentLoanRefinanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Student Loan Refinance Calculator',
    description: 'Compare refinanced student loan payments.',
    path: '/student-loan-refinance-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<StudentLoanRefinanceCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Student Loan Refinance Calculator' })
    ).toBeDefined();
    expect(screen.getByLabelText('New rate (%)')).toBeDefined();
    expect(screen.getByText('Monthly saving')).toBeDefined();
  });

  it('subtracts the new payment from the old one', () => {
    const { container } = renderCalculatorPage(<StudentLoanRefinanceCalculator />, page);
    const r1 = 6.8 / 100 / 12;
    const p1 = (30000 * r1) / (1 - Math.pow(1 + r1, -120));
    const r2 = 5.2 / 100 / 12;
    const p2 = (30000 * r2) / (1 - Math.pow(1 + r2, -120));
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(p1 - p2));
    expect(screen.getByText('Current payment').nextElementSibling!.textContent).toBe(money(p1));
  });

  it('increases the saving when the new rate falls', () => {
    const { container } = renderCalculatorPage(<StudentLoanRefinanceCalculator />, page);
    fireEvent.change(screen.getByLabelText('New rate (%)'), { target: { value: '4' } });
    const r1 = 6.8 / 100 / 12;
    const p1 = (30000 * r1) / (1 - Math.pow(1 + r1, -120));
    const r2 = 4 / 100 / 12;
    const p2 = (30000 * r2) / (1 - Math.pow(1 + r2, -120));
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(p1 - p2));
  });
});

describe('StudentLoanPayoffCalculator', () => {
  const page: CalculatorPage = {
    title: 'Student Loan Payoff Calculator',
    description: 'See how extra payments shorten a loan.',
    path: '/student-loan-payoff-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<StudentLoanPayoffCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Student Loan Payoff Calculator' })).toBeDefined();
    expect(screen.getByText('Extra monthly payment ($)')).toBeDefined();
    expect(screen.getByText('Monthly payment with extra')).toBeDefined();
  });

  it('adds the extra payment to the amortised minimum', () => {
    const { container } = renderCalculatorPage(<StudentLoanPayoffCalculator />, page);
    const r = 6.5 / 100 / 12;
    const minimum = (30000 * r) / (1 - Math.pow(1 + r, -120));
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(minimum + 100));
    expect(screen.getByText('Months to payoff').nextElementSibling!.textContent).not.toBe('0');
  });

  it('grows the payment when more is paid extra', () => {
    const { container } = renderCalculatorPage(<StudentLoanPayoffCalculator />, page);
    fireEvent.change(screen.getByLabelText('Extra monthly payment ($)'), { target: { value: '300' } });
    const r = 6.5 / 100 / 12;
    const minimum = (30000 * r) / (1 - Math.pow(1 + r, -120));
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(minimum + 300));
  });
});

describe('StudentLoanCalculator', () => {
  const page: CalculatorPage = {
    title: 'Student Loan Calculator',
    description: 'Calculate student loan payments.',
    path: '/student-loan-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<StudentLoanCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Student Loan Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Loan balance ($)')).toBeDefined();
    expect(screen.getByText('Monthly payment')).toBeDefined();
  });

  it('amortises the balance over the term', () => {
    const { container } = renderCalculatorPage(<StudentLoanCalculator />, page);
    const r = 5.5 / 100 / 12;
    const payment = (35000 * r) / (1 - Math.pow(1 + r, -120));
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(payment));
    expect(screen.getByText('Total repaid').nextElementSibling!.textContent).toBe(money(payment * 120));
  });

  it('raises the payment with the balance', () => {
    const { container } = renderCalculatorPage(<StudentLoanCalculator />, page);
    fireEvent.change(screen.getByLabelText('Loan balance ($)'), { target: { value: '45000' } });
    const r = 5.5 / 100 / 12;
    const payment = (45000 * r) / (1 - Math.pow(1 + r, -120));
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(payment));
  });
});

describe('RestingHeartRateCalculator', () => {
  const page: CalculatorPage = {
    title: 'Resting Heart Rate Calculator',
    description: 'Build heart rate training zones.',
    path: '/resting-heart-rate-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RestingHeartRateCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Resting Heart Rate Calculator' })).toBeDefined();
    expect(screen.getByText('Resting heart rate (bpm)')).toBeDefined();
    expect(screen.getByText('Target heart rate')).toBeDefined();
  });

  it('adds a share of heart rate reserve to resting rate', () => {
    const { container } = renderCalculatorPage(<RestingHeartRateCalculator />, page);
    const max = 220 - 35;
    const reserve = max - 60;
    const target = 60 + reserve * (60 / 100);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(target));
    expect(screen.getByText('Heart rate reserve').nextElementSibling!.textContent).toBe(num(reserve));
  });

  it('lowers the target as age rises', () => {
    const { container } = renderCalculatorPage(<RestingHeartRateCalculator />, page);
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '40' } });
    const reserve = 220 - 40 - 60;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(60 + reserve * (60 / 100)));
  });
});

describe('RecoveryTimeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Recovery Time Calculator',
    description: 'Estimate recovery time after training.',
    path: '/recovery-time-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RecoveryTimeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Recovery Time Calculator' })).toBeDefined();
    expect(screen.getByText('Workout duration (minutes)')).toBeDefined();
    expect(screen.getByText('Recovery time')).toBeDefined();
  });

  it('scales session length by intensity and sleep', () => {
    const { container } = renderCalculatorPage(<RecoveryTimeCalculator />, page);
    const recovery = (60 / 60) * (7 / 5) * 1;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(recovery)} hours`);
    expect(screen.getByText('Recovery minutes').nextElementSibling!.textContent).toBe(num(recovery * 60));
  });

  it('extends recovery when sleep is short', () => {
    const { container } = renderCalculatorPage(<RecoveryTimeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Sleep last night (hours)'), { target: { value: '5' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(
      `${num((60 / 60) * (7 / 5) * 1.3)} hours`
    );
  });
});

describe('FitnessPlateauBreakerCalculator', () => {
  const page: CalculatorPage = {
    title: 'Fitness Plateau Breaker Calculator',
    description: 'Plan a deload to break a plateau.',
    path: '/fitness-plateau-breaker-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FitnessPlateauBreakerCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Fitness Plateau Breaker Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Deload reduction (%)')).toBeDefined();
    expect(screen.getByText('Deload weekly sets')).toBeDefined();
  });

  it('drops volume by the deload percentage', () => {
    const { container } = renderCalculatorPage(<FitnessPlateauBreakerCalculator />, page);
    const deload = 20 * (1 - 30 / 100);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(deload));
    expect(screen.getByText('Volume reduction').nextElementSibling!.textContent).toBe(num(20 - deload));
  });

  it('scales the deload with current volume', () => {
    const { container } = renderCalculatorPage(<FitnessPlateauBreakerCalculator />, page);
    fireEvent.change(screen.getByLabelText('Weekly sets now'), { target: { value: '30' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(30 * (1 - 30 / 100)));
  });
});

describe('ExerciseProgressionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Exercise Progression Calculator',
    description: 'Project strength gains over weeks.',
    path: '/exercise-progression-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ExerciseProgressionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Exercise Progression Calculator' })).toBeDefined();
    expect(screen.getByText('Current 1RM (kg)')).toBeDefined();
    expect(screen.getByText('Projected 1RM')).toBeDefined();
  });

  it('compounds weekly progression', () => {
    const { container } = renderCalculatorPage(<ExerciseProgressionCalculator />, page);
    const projected = 100 * Math.pow(1 + 2 / 100, 8);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(projected)} kg`);
    expect(screen.getByText('Week 1 target').nextElementSibling!.textContent).toBe(
      `${num(100 * (1 + 2 / 100))} kg`
    );
  });

  it('projects further with more weeks', () => {
    const { container } = renderCalculatorPage(<ExerciseProgressionCalculator />, page);
    fireEvent.change(screen.getByLabelText('Weeks'), { target: { value: '12' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(
      `${num(100 * Math.pow(1 + 2 / 100, 12))} kg`
    );
  });
});

describe('SedentaryToActiveCalculator', () => {
  const page: CalculatorPage = {
    title: 'Sedentary To Active Calculator',
    description: 'Plan a step-count ramp.',
    path: '/sedentary-to-active-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SedentaryToActiveCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Sedentary To Active Calculator' })).toBeDefined();
    expect(screen.getByText('Target daily steps')).toBeDefined();
    expect(screen.getByText('Extra calories per day')).toBeDefined();
  });

  it('burns calories for every extra step', () => {
    const { container } = renderCalculatorPage(<SedentaryToActiveCalculator />, page);
    const extra = 10000 - 3000;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(extra * 0.04));
    expect(screen.getByText('Extra calories per week').nextElementSibling!.textContent).toBe(
      num(extra * 0.04 * 7)
    );
  });

  it('grows with a bigger step goal', () => {
    const { container } = renderCalculatorPage(<SedentaryToActiveCalculator />, page);
    fireEvent.change(screen.getByLabelText('Target daily steps'), { target: { value: '12000' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num((12000 - 3000) * 0.04));
  });
});

describe('ActivityLevelCalculator', () => {
  const page: CalculatorPage = {
    title: 'Activity Level Calculator',
    description: 'Estimate maintenance calories.',
    path: '/activity-level-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ActivityLevelCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Activity Level Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Weight (kg)')).toBeDefined();
    expect(screen.getByText('Maintenance calories')).toBeDefined();
  });

  it('multiplies BMR by the activity factor', () => {
    const { container } = renderCalculatorPage(<ActivityLevelCalculator />, page);
    const bmr = 10 * 75 + 6.25 * 178 - 5 * 30 + 5;
    const tdee = bmr * 1.55;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(tdee)} kcal`);
    expect(screen.getByText('Basal metabolic rate').nextElementSibling!.textContent).toBe(
      `${num(bmr)} kcal`
    );
  });

  it('raises maintenance calories with weight', () => {
    const { container } = renderCalculatorPage(<ActivityLevelCalculator />, page);
    fireEvent.change(screen.getByLabelText('Weight (kg)'), { target: { value: '85' } });
    const tdee = (10 * 85 + 6.25 * 178 - 5 * 30 + 5) * 1.55;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(tdee)} kcal`);
  });
});

describe('BodyMassIndexCalculator', () => {
  const page: CalculatorPage = {
    title: 'Body Mass Index Calculator',
    description: 'Calculate body mass index.',
    path: '/body-mass-index-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<BMICalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Body Mass Index Calculator' })).toBeDefined();
    expect(screen.getByText('Body Metrics')).toBeDefined();
  });

  it('divides weight by height squared', () => {
    const { container } = renderCalculatorPage(<BMICalculator />, page);
    const height = 170 / 100;
    const bmi = (70 / (height * height)).toFixed(1);
    expect(container.querySelector('span.text-5xl')!.textContent).toBe(bmi);
  });

  it('updates when weight changes', () => {
    const { container } = renderCalculatorPage(<BMICalculator />, page);
    const sliders = container.querySelectorAll('input[type="range"]');
    fireEvent.change(sliders[0], { target: { value: '80' } });
    const height = 170 / 100;
    expect(container.querySelector('span.text-5xl')!.textContent).toBe(
      (80 / (height * height)).toFixed(1)
    );
  });
});

describe('WaistCircumferenceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Waist Circumference Calculator',
    description: 'Check waist-to-height ratio.',
    path: '/waist-circumference-calculator.html',
    category: 'health',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WaistCircumferenceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Waist Circumference Calculator' })).toBeDefined();
    expect(screen.getByText('Waist circumference (cm)')).toBeDefined();
    expect(screen.getByText('Waist-to-height ratio')).toBeDefined();
  });

  it('divides waist by height', () => {
    const { container } = renderCalculatorPage(<WaistCircumferenceCalculator />, page);
    const ratio = 85 / 175;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(ratio));
    expect(screen.getByText('Healthy waist limit').nextElementSibling!.textContent).toBe(
      `${num(175 * 0.5)} cm`
    );
  });

  it('raises the ratio when the waist grows', () => {
    const { container } = renderCalculatorPage(<WaistCircumferenceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Waist circumference (cm)'), { target: { value: '95' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(95 / 175));
  });
});

describe('SavingsGrowthCalculator', () => {
  const page: CalculatorPage = {
    title: 'Savings Growth Calculator',
    description: 'Project savings with contributions.',
    path: '/savings-growth-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SavingsGrowthCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Savings Growth Calculator' })).toBeDefined();
    expect(screen.getByText('Monthly contribution ($)')).toBeDefined();
    expect(screen.getByText('Future value')).toBeDefined();
  });

  it('compounds contributions over the term', () => {
    const { container } = renderCalculatorPage(<SavingsGrowthCalculator />, page);
    const r = 6 / 100 / 12;
    const growth = Math.pow(1 + r, 120);
    const future = 5000 * growth + 500 * ((growth - 1) / r);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(future));
    expect(screen.getByText('Interest earned').nextElementSibling!.textContent).toBe(
      money(future - 5000 - 500 * 120)
    );
  });

  it('grows with larger contributions', () => {
    const { container } = renderCalculatorPage(<SavingsGrowthCalculator />, page);
    fireEvent.change(screen.getByLabelText('Monthly contribution ($)'), { target: { value: '750' } });
    const r = 6 / 100 / 12;
    const growth = Math.pow(1 + r, 120);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(
      money(5000 * growth + 750 * ((growth - 1) / r))
    );
  });
});

describe('FIRECalculator', () => {
  const page: CalculatorPage = {
    title: 'FIRE Calculator',
    description: 'Find your financial independence number.',
    path: '/fire-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FIRECalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'FIRE Calculator' })).toBeDefined();
    expect(screen.getByText('Annual expenses ($)')).toBeDefined();
    expect(screen.getByText('Financial independence number')).toBeDefined();
  });

  it('multiplies expenses by the withdrawal rule', () => {
    const { container } = renderCalculatorPage(<FIRECalculator />, page);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(40000 / (4 / 100)));
    expect(screen.getByText('Years to reach FI').nextElementSibling!.textContent).not.toBe('');
  });

  it('raises the number with spending', () => {
    const { container } = renderCalculatorPage(<FIRECalculator />, page);
    fireEvent.change(screen.getByLabelText('Annual expenses ($)'), { target: { value: '50000' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(50000 / (4 / 100)));
  });
});

describe('FinancialIndependenceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Financial Independence Calculator',
    description: 'Project a nest egg and compare with your FI number.',
    path: '/financial-independence-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<FinancialIndependenceCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Financial Independence Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Current age')).toBeDefined();
    expect(screen.getByText('Projected nest egg')).toBeDefined();
  });

  it('grows savings annually to the target age', () => {
    const { container } = renderCalculatorPage(<FinancialIndependenceCalculator />, page);
    const r = 7 / 100;
    const growth = Math.pow(1 + r, 30);
    const projected = 80000 * growth + 20000 * ((growth - 1) / r);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(projected));
    expect(screen.getByText('FI number').nextElementSibling!.textContent).toBe(money(45000 / (4 / 100)));
  });

  it('projects more with a higher savings rate', () => {
    const { container } = renderCalculatorPage(<FinancialIndependenceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Annual savings ($)'), { target: { value: '30000' } });
    const r = 7 / 100;
    const growth = Math.pow(1 + r, 30);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(
      money(80000 * growth + 30000 * ((growth - 1) / r))
    );
  });
});

describe('WealthBuildingCalculator', () => {
  const page: CalculatorPage = {
    title: 'Wealth Building Calculator',
    description: 'Find the time to a target net worth.',
    path: '/wealth-building-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WealthBuildingCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Wealth Building Calculator' })).toBeDefined();
    expect(screen.getByText('Current net worth ($)')).toBeDefined();
    expect(screen.getByText('Time to target')).toBeDefined();
  });

  it('counts months until the target is reached', () => {
    const { container } = renderCalculatorPage(<WealthBuildingCalculator />, page);
    let balance = 20000;
    const r = 7 / 100 / 12;
    let months = 0;
    while (balance < 500000 && months < 600) {
      balance = balance * (1 + r) + 1000;
      months += 1;
    }
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(months / 12)} years`);
    expect(screen.getByText('Months to target').nextElementSibling!.textContent).toBe(`${months}`);
  });

  it('reaches the target sooner with bigger deposits', () => {
    const { container } = renderCalculatorPage(<WealthBuildingCalculator />, page);
    fireEvent.change(screen.getByLabelText('Monthly contribution ($)'), { target: { value: '2000' } });
    let balance = 20000;
    const r = 7 / 100 / 12;
    let months = 0;
    while (balance < 500000 && months < 600) {
      balance = balance * (1 + r) + 2000;
      months += 1;
    }
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(months / 12)} years`);
  });
});

describe('DebtPayoffSpreadsheetCalculator', () => {
  const page: CalculatorPage = {
    title: 'Debt Payoff Spreadsheet Calculator',
    description: 'Model a fixed-payment debt payoff.',
    path: '/debt-payoff-spreadsheet-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DebtPayoffSpreadsheetCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Debt Payoff Spreadsheet Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Monthly payment ($)')).toBeDefined();
    expect(screen.getByText('Time to debt free')).toBeDefined();
  });

  it('solves the amortisation period in closed form', () => {
    const { container } = renderCalculatorPage(<DebtPayoffSpreadsheetCalculator />, page);
    const r = 8.9 / 100 / 12;
    const months = Math.ceil(-Math.log(1 - (r * 12000) / 350) / Math.log(1 + r));
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${months} months`);
    expect(screen.getByText('Estimated total interest').nextElementSibling!.textContent).toBe(
      money(350 * months - 12000)
    );
  });

  it('shortens the term with a larger payment', () => {
    const { container } = renderCalculatorPage(<DebtPayoffSpreadsheetCalculator />, page);
    fireEvent.change(screen.getByLabelText('Monthly payment ($)'), { target: { value: '500' } });
    const r = 8.9 / 100 / 12;
    const months = Math.ceil(-Math.log(1 - (r * 12000) / 500) / Math.log(1 + r));
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${months} months`);
  });
});

describe('EnvelopeSystemCalculator', () => {
  const page: CalculatorPage = {
    title: 'Envelope System Calculator',
    description: 'Split cash into envelopes.',
    path: '/envelope-system-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EnvelopeSystemCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Envelope System Calculator' })).toBeDefined();
    expect(screen.getByText('Fixed bills ($)')).toBeDefined();
    expect(screen.getByText('Cash for envelopes')).toBeDefined();
  });

  it('splits what is left after fixed bills', () => {
    const { container } = renderCalculatorPage(<EnvelopeSystemCalculator />, page);
    const cash = 5000 - 1800;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(cash));
    expect(screen.getByText('Needs envelope').nextElementSibling!.textContent).toBe(money(cash * (50 / 100)));
    expect(screen.getByText('Wants envelope').nextElementSibling!.textContent).toBe(money(cash * (30 / 100)));
  });

  it('shrinks the envelopes as bills rise', () => {
    const { container } = renderCalculatorPage(<EnvelopeSystemCalculator />, page);
    fireEvent.change(screen.getByLabelText('Fixed bills ($)'), { target: { value: '2000' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(5000 - 2000));
  });
});

describe('ZeroBasedBudgetCalculator', () => {
  const page: CalculatorPage = {
    title: 'Zero-Based Budget Calculator',
    description: 'Assign every dollar of income.',
    path: '/zero-based-budget-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ZeroBasedBudgetCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Zero-Based Budget Calculator' })).toBeDefined();
    expect(screen.getByText('Monthly income ($)')).toBeDefined();
    expect(screen.getByText('Unassigned income')).toBeDefined();
  });

  it('leaves income minus assignments', () => {
    const { container } = renderCalculatorPage(<ZeroBasedBudgetCalculator />, page);
    const assigned = 1500 + 300 + 600 + 400 + 500 + 800 + 200;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(5000 - assigned));
    expect(screen.getByText('Total assigned').nextElementSibling!.textContent).toBe(money(assigned));
  });

  it('reassigns dollars when rent changes', () => {
    const { container } = renderCalculatorPage(<ZeroBasedBudgetCalculator />, page);
    fireEvent.change(screen.getByLabelText('Rent or mortgage ($)'), { target: { value: '1800' } });
    const assigned = 1800 + 300 + 600 + 400 + 500 + 800 + 200;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(5000 - assigned));
  });
});

describe('CashEnvelopeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Cash Envelope Calculator',
    description: 'Divide a cash budget into envelopes.',
    path: '/cash-envelope-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CashEnvelopeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Cash Envelope Calculator' })).toBeDefined();
    expect(screen.getByText('Number of envelopes')).toBeDefined();
    expect(screen.getByText('Cash per envelope')).toBeDefined();
  });

  it('divides the budget across envelopes', () => {
    const { container } = renderCalculatorPage(<CashEnvelopeCalculator />, page);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(600 / 6));
    const perDay = 600 / 30;
    expect(screen.getByText('Cash per refill').nextElementSibling!.textContent).toBe(money(perDay * 7));
  });

  it('spreads the budget over more envelopes', () => {
    const { container } = renderCalculatorPage(<CashEnvelopeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Number of envelopes'), { target: { value: '8' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(600 / 8));
  });
});

describe('ExpenseTrackCalculator', () => {
  const page: CalculatorPage = {
    title: 'Expense Track Calculator',
    description: 'Project month-end spending.',
    path: '/expense-track-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ExpenseTrackCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Expense Track Calculator' })).toBeDefined();
    expect(screen.getByText('Spent so far ($)')).toBeDefined();
    expect(screen.getByText('Projected month-end spend')).toBeDefined();
  });

  it('projects the daily pace across the month', () => {
    const { container } = renderCalculatorPage(<ExpenseTrackCalculator />, page);
    const projected = (900 / 15) * 30;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(projected));
    expect(screen.getByText('Budget used').nextElementSibling!.textContent).toBe(
      `${num((900 / 2000) * 100)}%`
    );
  });

  it('raises the forecast with more spending', () => {
    const { container } = renderCalculatorPage(<ExpenseTrackCalculator />, page);
    fireEvent.change(screen.getByLabelText('Spent so far ($)'), { target: { value: '1200' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money((1200 / 15) * 30));
  });
});
