import type { ReactElement } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageLayout } from '../CalculatorPageLayout';
import { I18nProvider } from '../../lib/i18n';
import TipCalculator from './TipCalculator';
import SavingsBondCalculator from './SavingsBondCalculator';
import APYCalculator from './APYCalculator';
import SimpleInterestCalc from './SimpleInterestCalc';
import AccountBalanceCalculator from './AccountBalanceCalculator';
import PmiRemovalCalculator from './PmiRemovalCalculator';
import MortgageInsuranceCalculator from './MortgageInsuranceCalculator';
import MortgagePointsCalculator from './MortgagePointsCalculator';
import MortgageAprCalculator from './MortgageAprCalculator';
import MortgageBreakEvenCalculator from './MortgageBreakEvenCalculator';
import MortgageComparisonCalculator from './MortgageComparisonCalculator';
import MortgageQualificationCalculator from './MortgageQualificationCalculator';
import MortgagePrequalificationCalculator from './MortgagePrequalificationCalculator';
import BalancePayoffCalculator from './BalancePayoffCalculator';
import LoanCalculator from './LoanCalculator';
import ExtraPaymentCalculator from './ExtraPaymentCalculator';
import BiweeklySavingsCalculator from './BiweeklySavingsCalculator';
import LoanRefinanceCalculator from './LoanRefinanceCalculator';
import LoanComparisonCalculator from './LoanComparisonCalculator';
import LoanPreapprovalCalculator from './LoanPreapprovalCalculator';
import LoanQualificationCalculator from './LoanQualificationCalculator';
import LoanApprovalCalculator from './LoanApprovalCalculator';
import TaxDueCalculator from './TaxDueCalculator';
import TaxRefundCalculator from './TaxRefundCalculator';
import EstimatedTaxCalculator from './EstimatedTaxCalculator';
import WithholdingCalculator from './WithholdingCalculator';
import TaxBracketCalculator from './TaxBracketCalculator';
import AlternativeMinimumTaxCalculator from './AlternativeMinimumTaxCalculator';
import OrdinaryIncomeTaxCalculator from './OrdinaryIncomeTaxCalculator';
import CapitalGainsTaxCalculator from './CapitalGainsTaxCalculator';
import UseTaxCalculator from './UseTaxCalculator';
import DcfCalculator from './DcfCalculator';
import GrahamNumberCalculator from './GrahamNumberCalculator';
import PegRatioCalculator from './PegRatioCalculator';
import EvEbitdaCalculator from './EvEbitdaCalculator';
import PriceToSalesCalculator from './PriceToSalesCalculator';
import PriceToBookCalculator from './PriceToBookCalculator';
import BookValuePerShareCalculator from './BookValuePerShareCalculator';
import EarningsPerShareCalculator from './EarningsPerShareCalculator';
import EpsGrowthCalculator from './EpsGrowthCalculator';
import PeRatioCalculator from './PeRatioCalculator';
import StockValuationCalculator from './StockValuationCalculator';
import DividendGrowthCalculator from './DividendGrowthCalculator';
import DividendYieldCalculator from './DividendYieldCalculator';
import StockPriceCalculator from './StockPriceCalculator';
import StockReturnCalculator from './StockReturnCalculator';
import RequiredMinimumDistributionCalculator from './RequiredMinimumDistributionCalculator';
import IraWithdrawalCalculator from './IraWithdrawalCalculator';
import Withdrawal401kCalculator from './Withdrawal401kCalculator';
import PensionCalculator from './PensionCalculator';
import SocialSecurityCalculator from './SocialSecurityCalculator';
import RetirementGoalCalculator from './RetirementGoalCalculator';
import RetirementAgeCalculator from './RetirementAgeCalculator';
import RetirementIncomeCalculator from './RetirementIncomeCalculator';
import RetirementSavingsCalculator from './RetirementSavingsCalculator';

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

const money0 = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const pct = (n: number) =>
  `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;

const num = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const num0 = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

function mortgagePayment(principal: number, annualRate: number, years: number) {
  const n = Math.round(years * 12);
  const r = annualRate / 100 / 12;
  if (n === 0) return 0;
  if (r === 0) return principal / n;
  const growth = Math.pow(1 + r, n);
  return (principal * r * growth) / (growth - 1);
}

const TEST_BRACKETS: Array<[number, number]> = [
  [11600, 0.1],
  [47150, 0.12],
  [100525, 0.22],
  [191950, 0.24],
  [243725, 0.32],
  [609350, 0.35],
  [Infinity, 0.37],
];

function bracketsInfo(taxable: number) {
  let tax = 0;
  let prev = 0;
  let marginal = 0;
  let next = Infinity;
  for (const [cap, rate] of TEST_BRACKETS) {
    if (taxable <= prev) {
      next = prev;
      break;
    }
    tax += (Math.min(taxable, cap) - prev) * rate;
    marginal = rate;
    prev = cap;
    if (taxable <= cap) {
      next = cap;
      break;
    }
  }
  return { tax, marginal, next };
}

describe('TipCalculator', () => {
  const page: CalculatorPage = {
    title: 'Tip Calculator',
    description: 'Split a bill, work out the tip amount and see what each person owes in seconds.',
    path: '/tip-calculator.html',
    category: 'standard',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TipCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Tip Calculator' })).toBeDefined();
    expect(screen.getByText('Bill Amount')).toBeDefined();
    expect(screen.getByText('Per Person')).toBeDefined();
  });

  it('adds a 15% tip to a $50 bill', () => {
    const { container } = renderCalculatorPage(<TipCalculator />, page);
    const bill = 50;
    const tip = (bill * 15) / 100;
    const total = bill + tip;
    expect(container.querySelector('span.text-5xl')!.textContent).toBe(`$${total.toFixed(2)}`);
    expect(screen.getByText('Tip Amount').nextElementSibling!.textContent).toBe(`$${tip.toFixed(2)}`);
    expect(screen.getByText('Total').nextElementSibling!.textContent).toBe(`$${total.toFixed(2)}`);
  });

  it('updates the per-person total when the bill changes', () => {
    const { container } = renderCalculatorPage(<TipCalculator />, page);
    const billInput = container.querySelectorAll('input')[0];
    fireEvent.change(billInput, { target: { value: '100' } });
    const bill = 100;
    const total = bill + (bill * 15) / 100;
    expect(container.querySelector('span.text-5xl')!.textContent).toBe(`$${total.toFixed(2)}`);
  });
});

describe('SavingsBondCalculator', () => {
  const page: CalculatorPage = {
    title: 'Savings Bond Calculator',
    description: 'See what a savings bond is worth at maturity and how much interest it earns.',
    path: '/savings-bond-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SavingsBondCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Savings Bond Calculator' })).toBeDefined();
    expect(screen.getByText('Purchase price ($)')).toBeDefined();
    expect(screen.getByText('Value at maturity')).toBeDefined();
  });

  it('compounds the purchase price for ten years', () => {
    const { container } = renderCalculatorPage(<SavingsBondCalculator />, page);
    const price = 1000;
    const maturity = price * Math.pow(1 + 4.5 / 100, 10);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(maturity));
    expect(screen.getByText('Interest earned').nextElementSibling!.textContent).toBe(money(maturity - price));
  });

  it('shortens the term and lowers the maturity value', () => {
    const { container } = renderCalculatorPage(<SavingsBondCalculator />, page);
    fireEvent.change(screen.getByLabelText('Years to maturity'), { target: { value: '5' } });
    const maturity = 1000 * Math.pow(1 + 4.5 / 100, 5);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(maturity));
  });
});

describe('APYCalculator', () => {
  const page: CalculatorPage = {
    title: 'APY Calculator',
    description: 'Convert a stated annual rate into APY and compare the true yield on savings.',
    path: '/apy-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<APYCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'APY Calculator' })).toBeDefined();
    expect(screen.getByText('Stated annual rate (%)')).toBeDefined();
    expect(screen.getByText('Annual percentage yield')).toBeDefined();
  });

  it('turns a 5% stated rate compounded daily into an APY', () => {
    const { container } = renderCalculatorPage(<APYCalculator />, page);
    const apy = (Math.pow(1 + 0.05 / 365, 365) - 1) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(pct(apy));
    expect(screen.getByText('Interest on $1,000 in one year').nextElementSibling!.textContent).toBe(
      money(1000 * (apy / 100))
    );
  });

  it('drops to the stated rate when compounding is yearly', () => {
    const { container } = renderCalculatorPage(<APYCalculator />, page);
    fireEvent.change(screen.getByLabelText('Compounds per year'), { target: { value: '1' } });
    const apy = (Math.pow(1 + 0.05 / 1, 1) - 1) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(pct(apy));
  });
});

describe('InterestEarnedCalculator (SimpleInterestCalc)', () => {
  const page: CalculatorPage = {
    title: 'Interest Earned Calculator',
    description: 'Calculate the simple interest earned on a principal amount over any term.',
    path: '/interest-earned-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SimpleInterestCalc />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Interest Earned Calculator' })).toBeDefined();
    expect(screen.getByText('Principal Amount')).toBeDefined();
    expect(screen.getByText('Interest Earned')).toBeDefined();
  });

  it('earns simple interest on the principal', () => {
    const { container } = renderCalculatorPage(<SimpleInterestCalc />, page);
    const principal = 100000;
    const interest = (principal * 8.5 * 5) / 100;
    expect(container.querySelector('span.text-5xl')!.textContent).toBe(money0(principal + interest));
    expect(screen.getByText('Interest Earned').nextElementSibling!.textContent).toBe(money0(interest));
  });

  it('doubles the interest when the term doubles', () => {
    const { container } = renderCalculatorPage(<SimpleInterestCalc />, page);
    fireEvent.change(screen.getByText('Time (Years)').nextElementSibling as HTMLElement, {
      target: { value: '10' },
    });
    const principal = 100000;
    const interest = (principal * 8.5 * 10) / 100;
    expect(container.querySelector('span.text-5xl')!.textContent).toBe(money0(principal + interest));
  });
});

describe('AccountBalanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Account Balance Calculator',
    description: 'Project an account balance with monthly deposits and compounding interest.',
    path: '/account-balance-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<AccountBalanceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Account Balance Calculator' })).toBeDefined();
    expect(screen.getByText('Opening balance ($)')).toBeDefined();
    expect(screen.getByText('Ending balance')).toBeDefined();
  });

  it('compounds monthly deposits into the balance', () => {
    const { container } = renderCalculatorPage(<AccountBalanceCalculator />, page);
    const r = 4 / 100 / 12;
    let balance = 5000;
    for (let i = 0; i < 24; i++) balance = balance * (1 + r) + 200;
    const deposits = 200 * 24;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(balance));
    expect(screen.getByText('Total deposits').nextElementSibling!.textContent).toBe(money(deposits));
    expect(screen.getByText('Interest earned').nextElementSibling!.textContent).toBe(
      money(balance - 5000 - deposits)
    );
  });

  it('raises the ending balance when the horizon extends', () => {
    const { container } = renderCalculatorPage(<AccountBalanceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Months'), { target: { value: '36' } });
    const r = 4 / 100 / 12;
    let balance = 5000;
    for (let i = 0; i < 36; i++) balance = balance * (1 + r) + 200;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(balance));
  });
});

describe('PmiRemovalCalculator', () => {
  const page: CalculatorPage = {
    title: 'PMI Removal Calculator',
    description: 'Check your LTV and see how much principal you must repay before PMI can be removed.',
    path: '/pmi-removal-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PmiRemovalCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'PMI Removal Calculator' })).toBeDefined();
    expect(screen.getByText('Home value ($)')).toBeDefined();
    expect(screen.getByText('Current loan-to-value')).toBeDefined();
  });

  it('reports the current LTV and the paydown needed', () => {
    const { container } = renderCalculatorPage(<PmiRemovalCalculator />, page);
    const ltv = (340000 / 400000) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(pct(ltv));
    expect(screen.getByText('Paydown needed').nextElementSibling!.textContent).toBe(money(20000));
    expect(screen.getByText('PMI removable now').nextElementSibling!.textContent).toBe('No');
  });

  it('allows removal once the balance reaches 80% LTV', () => {
    const { container } = renderCalculatorPage(<PmiRemovalCalculator />, page);
    fireEvent.change(screen.getByLabelText('Current loan balance ($)'), { target: { value: '320000' } });
    const ltv = (320000 / 400000) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(pct(ltv));
    expect(screen.getByText('PMI removable now').nextElementSibling!.textContent).toBe('Yes');
  });
});

describe('MortgageInsuranceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Mortgage Insurance Calculator',
    description: 'Estimate monthly mortgage insurance premiums and their total cost over the loan term.',
    path: '/mortgage-insurance-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MortgageInsuranceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Mortgage Insurance Calculator' })).toBeDefined();
    expect(screen.getByText('Annual MI rate (%)')).toBeDefined();
    expect(screen.getByText('Monthly mortgage insurance')).toBeDefined();
  });

  it('charges the premium on the outstanding balance', () => {
    const { container } = renderCalculatorPage(<MortgageInsuranceCalculator />, page);
    const monthlyPremium = (300000 * 0.5) / 100 / 12;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(monthlyPremium));

    const n = 360;
    const r = 6.5 / 100 / 12;
    const growth = Math.pow(1 + r, n);
    const payment = (300000 * r * growth) / (growth - 1);
    let balance = 300000;
    let total = 0;
    for (let i = 0; i < n; i++) {
      total += (balance * 0.5) / 100 / 12;
      balance = Math.max(0, balance - (payment - balance * r));
    }
    expect(screen.getByText('Total premium over term').nextElementSibling!.textContent).toBe(money(total));
  });

  it('doubles the monthly premium when the MI rate doubles', () => {
    const { container } = renderCalculatorPage(<MortgageInsuranceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Annual MI rate (%)'), { target: { value: '1' } });
    const monthlyPremium = (300000 * 1) / 100 / 12;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(monthlyPremium));
  });
});

describe('MortgagePointsCalculator', () => {
  const page: CalculatorPage = {
    title: 'Mortgage Points Calculator',
    description: 'Compare discount point costs against the monthly savings and find the break-even month.',
    path: '/mortgage-points-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MortgagePointsCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Mortgage Points Calculator' })).toBeDefined();
    expect(screen.getByText('Discount points')).toBeDefined();
    expect(screen.getByText('Monthly payment savings')).toBeDefined();
  });

  it('prices one point against the lower rate', () => {
    const { container } = renderCalculatorPage(<MortgagePointsCalculator />, page);
    const paymentWithout = mortgagePayment(300000, 7, 30);
    const paymentWith = mortgagePayment(300000, 6.75, 30);
    const savings = paymentWithout - paymentWith;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(savings));
    expect(screen.getByText('Cost of points').nextElementSibling!.textContent).toBe(money(3000));
    expect(screen.getByText('Break-even').nextElementSibling!.textContent).toBe(
      `${num(3000 / savings)} months`
    );
  });

  it('grows the savings when each point cuts more of the rate', () => {
    const { container } = renderCalculatorPage(<MortgagePointsCalculator />, page);
    fireEvent.change(screen.getByLabelText('Rate cut per point (%)'), { target: { value: '0.5' } });
    const savings = mortgagePayment(300000, 7, 30) - mortgagePayment(300000, 6.5, 30);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(savings));
  });
});

describe('MortgageAprCalculator', () => {
  const page: CalculatorPage = {
    title: 'Mortgage APR Calculator',
    description: 'Estimate a mortgage APR by folding lender fees into the effective interest rate.',
    path: '/mortgage-apr-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MortgageAprCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Mortgage APR Calculator' })).toBeDefined();
    expect(screen.getByText('Lender fees ($)')).toBeDefined();
    expect(screen.getByText('Estimated APR')).toBeDefined();
  });

  it('lifts the APR above the note rate by the amount of fees', () => {
    const { container } = renderCalculatorPage(<MortgageAprCalculator />, page);
    const financed = 300000 - 4000;
    const target = mortgagePayment(300000, 6.5, 30);
    let lo = 0;
    let hi = 100;
    for (let i = 0; i < 80; i++) {
      const mid = (lo + hi) / 2;
      if (mortgagePayment(financed, mid, 30) > target) hi = mid;
      else lo = mid;
    }
    const apr = (lo + hi) / 2;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(pct(apr));
    expect(screen.getByText('Monthly payment').nextElementSibling!.textContent).toBe(money(target));
    expect(screen.getByText('Amount financed').nextElementSibling!.textContent).toBe(money(financed));
  });

  it('matches the note rate when there are no fees', () => {
    const { container } = renderCalculatorPage(<MortgageAprCalculator />, page);
    fireEvent.change(screen.getByLabelText('Lender fees ($)'), { target: { value: '0' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(pct(6.5));
  });
});

describe('MortgageBreakEvenCalculator', () => {
  const page: CalculatorPage = {
    title: 'Mortgage Break-Even Calculator',
    description: 'See how many months of savings are needed to recover points and closing costs.',
    path: '/mortgage-break-even-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MortgageBreakEvenCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Mortgage Break-Even Calculator' })).toBeDefined();
    expect(screen.getByText('Points cost ($)')).toBeDefined();
    expect(screen.getByText('Break-even period')).toBeDefined();
  });

  it('divides the upfront cost by the monthly savings', () => {
    const { container } = renderCalculatorPage(<MortgageBreakEvenCalculator />, page);
    const upfront = 6000 + 2000;
    const months = upfront / 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(months)} months`);
    expect(screen.getByText('Total upfront cost').nextElementSibling!.textContent).toBe(money(upfront));
    expect(screen.getByText('Net savings after 5 years').nextElementSibling!.textContent).toBe(
      money(100 * 60 - upfront)
    );
  });

  it('halves the break-even period when savings double', () => {
    const { container } = renderCalculatorPage(<MortgageBreakEvenCalculator />, page);
    fireEvent.change(screen.getByLabelText('Monthly payment savings ($)'), { target: { value: '200' } });
    const months = 8000 / 200;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(months)} months`);
  });
});

describe('MortgageComparisonCalculator', () => {
  const page: CalculatorPage = {
    title: 'Mortgage Comparison Calculator',
    description: 'Compare two mortgage rates side by side on payment, interest and total cost.',
    path: '/mortgage-comparison-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MortgageComparisonCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Mortgage Comparison Calculator' })).toBeDefined();
    expect(screen.getByText('Rate A (%)')).toBeDefined();
    expect(screen.getByText('Lower monthly payment')).toBeDefined();
  });

  it('shows the cheaper of the two payments', () => {
    const { container } = renderCalculatorPage(<MortgageComparisonCalculator />, page);
    const paymentA = mortgagePayment(350000, 7, 30);
    const paymentB = mortgagePayment(350000, 6.5, 30);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(Math.min(paymentA, paymentB)));
    expect(screen.getByText('Monthly payment A').nextElementSibling!.textContent).toBe(money(paymentA));
    expect(screen.getByText('Monthly payment B').nextElementSibling!.textContent).toBe(money(paymentB));
  });

  it('lowers the headline when rate B drops', () => {
    const { container } = renderCalculatorPage(<MortgageComparisonCalculator />, page);
    fireEvent.change(screen.getByLabelText('Rate B (%)'), { target: { value: '5' } });
    const paymentB = mortgagePayment(350000, 5, 30);
    const paymentA = mortgagePayment(350000, 7, 30);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(Math.min(paymentA, paymentB)));
  });
});

describe('MortgageQualificationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Mortgage Qualification Calculator',
    description: 'Work out the largest mortgage payment your income and debts can support.',
    path: '/mortgage-qualification-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MortgageQualificationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Mortgage Qualification Calculator' })).toBeDefined();
    expect(screen.getByText('Monthly debt payments ($)')).toBeDefined();
    expect(screen.getByText('Maximum loan amount')).toBeDefined();
  });

  it('sizes the loan from the leftover housing budget', () => {
    const { container } = renderCalculatorPage(<MortgageQualificationCalculator />, page);
    const r = 6.5 / 100 / 12;
    const housing = 8000 * 0.36 - 800;
    const maxLoan = (housing * (1 - Math.pow(1 + r, -360))) / r;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(maxLoan));
    expect(screen.getByText('Max monthly housing payment').nextElementSibling!.textContent).toBe(money(housing));
    expect(screen.getByText('Home price with 20% down').nextElementSibling!.textContent).toBe(
      money(maxLoan / 0.8)
    );
  });

  it('grows the loan when debts disappear', () => {
    const { container } = renderCalculatorPage(<MortgageQualificationCalculator />, page);
    fireEvent.change(screen.getByLabelText('Monthly debt payments ($)'), { target: { value: '0' } });
    const r = 6.5 / 100 / 12;
    const housing = 8000 * 0.36;
    const maxLoan = (housing * (1 - Math.pow(1 + r, -360))) / r;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(maxLoan));
  });
});

describe('MortgagePrequalificationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Mortgage Prequalification Calculator',
    description: 'Estimate the home price and loan you may qualify for before house hunting.',
    path: '/mortgage-prequalification-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<MortgagePrequalificationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Mortgage Prequalification Calculator' })).toBeDefined();
    expect(screen.getByText('Front-end ratio (%)')).toBeDefined();
    expect(screen.getByText('Prequalified home price')).toBeDefined();
  });

  it('turns the housing budget into a home price with 20% down', () => {
    const { container } = renderCalculatorPage(<MortgagePrequalificationCalculator />, page);
    const r = 6.5 / 100 / 12;
    const housing = 9000 * 0.28;
    const maxLoan = (housing * (1 - Math.pow(1 + r, -360))) / r;
    const homePrice = maxLoan / (1 - 20 / 100);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(homePrice));
    expect(screen.getByText('Maximum loan amount').nextElementSibling!.textContent).toBe(money(maxLoan));
    expect(screen.getByText('Down payment needed').nextElementSibling!.textContent).toBe(
      money(homePrice - maxLoan)
    );
  });

  it('raises the price target when the down payment shrinks', () => {
    const { container } = renderCalculatorPage(<MortgagePrequalificationCalculator />, page);
    fireEvent.change(screen.getByLabelText('Down payment (%)'), { target: { value: '10' } });
    const r = 6.5 / 100 / 12;
    const housing = 9000 * 0.28;
    const maxLoan = (housing * (1 - Math.pow(1 + r, -360))) / r;
    const homePrice = maxLoan / (1 - 10 / 100);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(homePrice));
  });
});

describe('BalancePayoffCalculator', () => {
  const page: CalculatorPage = {
    title: 'Balance Payoff Calculator',
    description: 'See how long it takes to clear a balance and what it costs at a given rate.',
    path: '/balance-payoff-calculator.html',
    category: 'financial',
  };

  const schedule = (balance: number, rate: number, payment: number) => {
    const r = rate / 100 / 12;
    let bal = balance;
    let months = 0;
    let paid = 0;
    while (bal > 0.005 && months < 1200) {
      const interest = bal * r;
      if (payment <= interest) return { months: 0, paid: 0 };
      const pay = Math.min(payment, bal + interest);
      bal = bal + interest - pay;
      paid += pay;
      months++;
    }
    return { months, paid };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<BalancePayoffCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Balance Payoff Calculator' })).toBeDefined();
    expect(screen.getByText('Current balance ($)')).toBeDefined();
    expect(screen.getByText('Time to pay off')).toBeDefined();
  });

  it('clears the balance in the expected number of months', () => {
    const { container } = renderCalculatorPage(<BalancePayoffCalculator />, page);
    const { months, paid } = schedule(5000, 18, 250);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num0(months)} months`);
    expect(screen.getByText('Total paid').nextElementSibling!.textContent).toBe(money(paid));
    expect(screen.getByText('Total interest').nextElementSibling!.textContent).toBe(money(paid - 5000));
  });

  it('finishes sooner with a larger payment', () => {
    const { container } = renderCalculatorPage(<BalancePayoffCalculator />, page);
    fireEvent.change(screen.getByLabelText('Monthly payment ($)'), { target: { value: '400' } });
    const { months } = schedule(5000, 18, 400);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num0(months)} months`);
  });
});

describe('LoanPayoffCalculator (LoanCalculator)', () => {
  const page: CalculatorPage = {
    title: 'Loan Payoff Calculator',
    description: 'Calculate the monthly payment, total interest and full cost of a loan payoff.',
    path: '/loan-payoff-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LoanCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Loan Payoff Calculator' })).toBeDefined();
    expect(screen.getByText('Loan Amount')).toBeDefined();
    expect(screen.getByText('Monthly Payment')).toBeDefined();
  });

  it('amortises the loan into a fixed monthly payment', () => {
    const { container } = renderCalculatorPage(<LoanCalculator />, page);
    const emi = mortgagePayment(50000, 10, 5);
    const interest = emi * 60 - 50000;
    expect(container.querySelector('span.text-5xl')!.textContent).toBe(`$${emi.toFixed(2)}`);
    expect(screen.getByText('Total Interest').nextElementSibling!.textContent).toBe(
      `$${Math.round(interest).toLocaleString()}`
    );
  });

  it('raises the payment when the term shortens', () => {
    const { container } = renderCalculatorPage(<LoanCalculator />, page);
    const inputs = container.querySelectorAll('input');
    fireEvent.change(inputs[2], { target: { value: '3' } });
    const emi = mortgagePayment(50000, 10, 3);
    expect(container.querySelector('span.text-5xl')!.textContent).toBe(`$${emi.toFixed(2)}`);
  });
});

describe('ExtraPaymentCalculator', () => {
  const page: CalculatorPage = {
    title: 'Extra Payment Calculator',
    description: 'See how extra monthly payments cut the interest and shorten a loan term.',
    path: '/extra-payment-calculator.html',
    category: 'financial',
  };

  const schedule = (loan: number, rate: number, years: number, extra: number) => {
    const n = Math.round(years * 12);
    const r = rate / 100 / 12;
    const growth = Math.pow(1 + r, n);
    const base = (loan * r * growth) / (growth - 1);
    const baselineInterest = base * n - loan;
    const payment = base + extra;
    let bal = loan;
    let months = 0;
    let paid = 0;
    while (bal > 0.005 && months < 1200) {
      const interest = bal * r;
      const due = bal + interest;
      if (payment <= interest) break;
      const pay = Math.min(payment, due);
      bal = due - pay;
      paid += pay;
      months++;
    }
    return {
      baselineInterest,
      saved: Math.max(0, baselineInterest - Math.max(0, paid - loan)),
      months,
      monthsSaved: Math.max(0, n - months),
    };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<ExtraPaymentCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Extra Payment Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Extra monthly payment ($)')).toBeDefined();
    expect(screen.getByText('Interest saved')).toBeDefined();
  });

  it('cuts interest when $200 is added each month', () => {
    const { container } = renderCalculatorPage(<ExtraPaymentCalculator />, page);
    const { saved, months, monthsSaved } = schedule(250000, 6.5, 30, 200);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(saved));
    expect(
      screen.getByText('Payoff time with extra payment').nextElementSibling!.textContent
    ).toBe(`${num0(months)} months`);
    expect(screen.getByText('Months saved').nextElementSibling!.textContent).toBe(num0(monthsSaved));
  });

  it('saves nothing when the extra payment is zero', () => {
    const { container } = renderCalculatorPage(<ExtraPaymentCalculator />, page);
    fireEvent.change(screen.getByLabelText('Extra monthly payment ($)'), { target: { value: '0' } });
    const { saved } = schedule(250000, 6.5, 30, 0);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(saved));
  });
});

describe('BiweeklySavingsCalculator', () => {
  const page: CalculatorPage = {
    title: 'Biweekly Savings Calculator',
    description: 'Compare biweekly loan payments against monthly payments to find the savings.',
    path: '/biweekly-savings-calculator.html',
    category: 'financial',
  };

  const schedule = (loan: number, rate: number, years: number) => {
    const n = Math.round(years * 12);
    const rM = rate / 100 / 12;
    const rB = rate / 100 / 26;
    const growth = Math.pow(1 + rM, n);
    const monthly = (loan * rM * growth) / (growth - 1);
    const biweekly = monthly / 2;

    let bal = loan;
    let months = 0;
    let paidMonthly = 0;
    while (bal > 0.005 && months < 1200) {
      const interest = bal * rM;
      const pay = Math.min(monthly, bal + interest);
      bal = bal + interest - pay;
      paidMonthly += pay;
      months++;
    }

    let bal2 = loan;
    let periods = 0;
    let paidBiweekly = 0;
    const maxPeriods = Math.round(years * 26) + 120;
    while (bal2 > 0.005 && periods < maxPeriods) {
      const interest = bal2 * rB;
      const pay = Math.min(biweekly, bal2 + interest);
      bal2 = bal2 + interest - pay;
      paidBiweekly += pay;
      periods++;
    }

    const payoffMonths = Math.round((periods * 12) / 26);
    return {
      monthly,
      biweekly,
      payoffMonths,
      monthsSaved: Math.max(0, months - payoffMonths),
      interestSaved: Math.max(0, paidMonthly - loan - Math.max(0, paidBiweekly - loan)),
    };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<BiweeklySavingsCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Biweekly Savings Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Loan amount ($)')).toBeDefined();
    expect(screen.getByText('Interest saved')).toBeDefined();
  });

  it('pays the loan off sooner with biweekly instalments', () => {
    const { container } = renderCalculatorPage(<BiweeklySavingsCalculator />, page);
    const { interestSaved, payoffMonths, biweekly } = schedule(300000, 6.5, 30);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(interestSaved));
    expect(screen.getByText('Payoff time').nextElementSibling!.textContent).toBe(`${num0(payoffMonths)} months`);
    expect(screen.getByText('Equivalent monthly payment').nextElementSibling!.textContent).toBe(money(monthlyOf(300000, 6.5, 30)));
    expect(biweekly).toBe(monthlyOf(300000, 6.5, 30) / 2);
  });

  it('tracks a rate cut in the interest saved', () => {
    const { container } = renderCalculatorPage(<BiweeklySavingsCalculator />, page);
    fireEvent.change(screen.getByLabelText('Annual interest rate (%)'), { target: { value: '4' } });
    const { interestSaved } = schedule(300000, 4, 30);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(interestSaved));
  });
});

function monthlyOf(loan: number, rate: number, years: number) {
  return mortgagePayment(loan, rate, years);
}

describe('LoanRefinanceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Loan Refinance Savings Calculator',
    description: 'Weigh a refinance against your current loan on payment and total interest savings.',
    path: '/loan-refinance-savings-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LoanRefinanceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Loan Refinance Savings Calculator' })).toBeDefined();
    expect(screen.getByText('Current balance ($)')).toBeDefined();
    expect(screen.getByText('Monthly payment savings')).toBeDefined();
  });

  it('compares the old payment with the refinanced one', () => {
    const { container } = renderCalculatorPage(<LoanRefinanceCalculator />, page);
    const oldPayment = mortgagePayment(280000, 7, 25);
    const newPayment = mortgagePayment(280000, 6.25, 25);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(oldPayment - newPayment));
    expect(screen.getByText('New monthly payment').nextElementSibling!.textContent).toBe(money(newPayment));
    expect(screen.getByText('Interest saved').nextElementSibling!.textContent).toBe(
      money((oldPayment - newPayment) * 300)
    );
  });

  it('grows the savings when the new rate falls further', () => {
    const { container } = renderCalculatorPage(<LoanRefinanceCalculator />, page);
    fireEvent.change(screen.getByLabelText('New rate (%)'), { target: { value: '5' } });
    const oldPayment = mortgagePayment(280000, 7, 25);
    const newPayment = mortgagePayment(280000, 5, 25);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(oldPayment - newPayment));
  });
});

describe('LoanComparisonCalculator', () => {
  const page: CalculatorPage = {
    title: 'Loan Comparison Calculator',
    description: 'Compare two loan offers side by side on payment, total cost and interest.',
    path: '/loan-comparison-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LoanComparisonCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Loan Comparison Calculator' })).toBeDefined();
    expect(screen.getByText('Rate A (%)')).toBeDefined();
    expect(screen.getByText('Lower monthly payment')).toBeDefined();
  });

  it('shows the cheaper payment and the total cost gap', () => {
    const { container } = renderCalculatorPage(<LoanComparisonCalculator />, page);
    const paymentA = mortgagePayment(20000, 8, 5);
    const paymentB = mortgagePayment(20000, 6.5, 5);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(Math.min(paymentA, paymentB)));
    expect(screen.getByText('Total cost difference').nextElementSibling!.textContent).toBe(
      money(Math.abs(paymentA * 60 - paymentB * 60))
    );
  });

  it('erases the difference when both rates match', () => {
    const { container } = renderCalculatorPage(<LoanComparisonCalculator />, page);
    fireEvent.change(screen.getByLabelText('Rate B (%)'), { target: { value: '8' } });
    const paymentA = mortgagePayment(20000, 8, 5);
    const paymentB = mortgagePayment(20000, 8, 5);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(Math.min(paymentA, paymentB)));
    expect(screen.getByText('Total cost difference').nextElementSibling!.textContent).toBe(
      money(Math.abs(paymentA * 60 - paymentB * 60))
    );
  });
});

describe('LoanPreapprovalCalculator', () => {
  const page: CalculatorPage = {
    title: 'Loan Preapproval Calculator',
    description: 'Estimate the loan amount a lender may preapprove from your income and debts.',
    path: '/loan-preapproval-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LoanPreapprovalCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Loan Preapproval Calculator' })).toBeDefined();
    expect(screen.getByText('Annual income ($)')).toBeDefined();
    expect(screen.getByText('Preapproved loan amount')).toBeDefined();
  });

  it('converts the leftover payment budget into a loan amount', () => {
    const { container } = renderCalculatorPage(<LoanPreapprovalCalculator />, page);
    const budget = (96000 / 12) * 0.33;
    const affordable = budget - 500;
    const r = 7 / 100 / 12;
    const amount = (affordable * (1 - Math.pow(1 + r, -60))) / r;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(amount));
    expect(screen.getByText('Affordable monthly payment').nextElementSibling!.textContent).toBe(money(affordable));
  });

  it('shrinks the offer when debts rise', () => {
    const { container } = renderCalculatorPage(<LoanPreapprovalCalculator />, page);
    fireEvent.change(screen.getByLabelText('Monthly debts ($)'), { target: { value: '1000' } });
    const budget = (96000 / 12) * 0.33;
    const affordable = budget - 1000;
    const r = 7 / 100 / 12;
    const amount = (affordable * (1 - Math.pow(1 + r, -60))) / r;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(amount));
  });
});

describe('LoanQualificationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Loan Qualification Calculator',
    description: 'Find the largest loan payment your income and debts can qualify for.',
    path: '/loan-qualification-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LoanQualificationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Loan Qualification Calculator' })).toBeDefined();
    expect(screen.getByText('Max debt-to-income (%)')).toBeDefined();
    expect(screen.getByText('Maximum loan amount')).toBeDefined();
  });

  it('uses the DTI budget left after existing debts', () => {
    const { container } = renderCalculatorPage(<LoanQualificationCalculator />, page);
    const affordable = 6000 * 0.4 - 400;
    const r = 9 / 100 / 12;
    const maxLoan = (affordable * (1 - Math.pow(1 + r, -60))) / r;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(maxLoan));
    expect(screen.getByText('Affordable monthly payment').nextElementSibling!.textContent).toBe(money(affordable));
    expect(screen.getByText('Leftover income').nextElementSibling!.textContent).toBe(
      money(6000 - 400 - affordable)
    );
  });

  it('raises the borrowing limit with a higher DTI', () => {
    const { container } = renderCalculatorPage(<LoanQualificationCalculator />, page);
    fireEvent.change(screen.getByLabelText('Max debt-to-income (%)'), { target: { value: '50' } });
    const affordable = 6000 * 0.5 - 400;
    const r = 9 / 100 / 12;
    const maxLoan = (affordable * (1 - Math.pow(1 + r, -60))) / r;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(maxLoan));
  });
});

describe('LoanApprovalCalculator', () => {
  const page: CalculatorPage = {
    title: 'Loan Approval Calculator',
    description: 'Check whether a loan payment fits inside your allowed share of monthly income.',
    path: '/loan-approval-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<LoanApprovalCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Loan Approval Calculator' })).toBeDefined();
    expect(screen.getByText('Gross monthly income ($)')).toBeDefined();
    expect(screen.getByText('Required monthly payment')).toBeDefined();
  });

  it('accepts a payment that fits the income limit', () => {
    const { container } = renderCalculatorPage(<LoanApprovalCalculator />, page);
    const payment = mortgagePayment(15000, 8, 4);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(payment));
    expect(screen.getByText('Maximum allowed payment').nextElementSibling!.textContent).toBe(money(5000 * 0.3));
    expect(screen.getByText('Share of monthly income').nextElementSibling!.textContent).toBe(
      `${num((payment / 5000) * 100)}%`
    );
    expect(screen.getByText('Loan approval').nextElementSibling!.textContent).toBe('Yes');
  });

  it('rejects the same payment when the allowed share is cut', () => {
    renderCalculatorPage(<LoanApprovalCalculator />, page);
    fireEvent.change(screen.getByLabelText('Max payment share (%)'), { target: { value: '5' } });
    expect(screen.getByText('Maximum allowed payment').nextElementSibling!.textContent).toBe(money(5000 * 0.05));
    expect(screen.getByText('Loan approval').nextElementSibling!.textContent).toBe('No');
  });
});

describe('TaxDueCalculator', () => {
  const page: CalculatorPage = {
    title: 'Tax Due Calculator',
    description: 'Estimate what you still owe or will be refunded after withholding and credits.',
    path: '/tax-due-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TaxDueCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Tax Due Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Annual income ($)')).toBeDefined();
    expect(screen.getByText('Federal tax liability')).toBeDefined();
  });

  it('nets the bracket tax against withholding and credits', () => {
    const { container } = renderCalculatorPage(<TaxDueCalculator />, page);
    const taxable = 120000 - 14600;
    const { tax } = bracketsInfo(taxable);
    const netDue = tax - 18000 - 1000;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(Math.abs(netDue)));
    expect(screen.getByText(netDue > 0 ? 'Tax still due' : 'Estimated refund')).toBeDefined();
    expect(screen.getByText('Federal tax liability').nextElementSibling!.textContent).toBe(money(tax));
  });

  it('swings toward a refund when more is withheld', () => {
    const { container } = renderCalculatorPage(<TaxDueCalculator />, page);
    fireEvent.change(screen.getByLabelText('Tax withheld ($)'), { target: { value: '25000' } });
    const taxable = 120000 - 14600;
    const { tax } = bracketsInfo(taxable);
    const netDue = tax - 25000 - 1000;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(Math.abs(netDue)));
  });
});

describe('TaxRefundCalculator', () => {
  const page: CalculatorPage = {
    title: 'Tax Refund Calculator',
    description: 'Compare your tax bill with what was withheld to find your refund or balance.',
    path: '/tax-refund-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TaxRefundCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Tax Refund Calculator' })).toBeDefined();
    expect(screen.getByText('Total tax liability ($)')).toBeDefined();
    expect(screen.getByText('Estimated refund')).toBeDefined();
  });

  it('refunds the excess of payments over the liability', () => {
    const { container } = renderCalculatorPage(<TaxRefundCalculator />, page);
    const refund = 18000 + 500 - 15000;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(refund));
    expect(screen.getByText('Total payments').nextElementSibling!.textContent).toBe(money(18500));
    expect(screen.getByText('Tax liability').nextElementSibling!.textContent).toBe(money(15000));
  });

  it('reports an amount owed when the liability exceeds payments', () => {
    const { container } = renderCalculatorPage(<TaxRefundCalculator />, page);
    fireEvent.change(screen.getByLabelText('Total tax liability ($)'), { target: { value: '20000' } });
    const owed = 20000 - (18000 + 500);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(owed));
    expect(screen.getByText('Additional tax owed')).toBeDefined();
  });
});

describe('EstimatedTaxCalculator', () => {
  const page: CalculatorPage = {
    title: 'Estimated Tax Calculator',
    description: 'Work out quarterly estimated tax payments from your income and withholding.',
    path: '/estimated-tax-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EstimatedTaxCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Estimated Tax Calculator' })).toBeDefined();
    expect(screen.getByText('Tax already withheld ($)')).toBeDefined();
    expect(screen.getByText('Quarterly estimated payment')).toBeDefined();
  });

  it('splits the unpaid balance into four instalments', () => {
    const { container } = renderCalculatorPage(<EstimatedTaxCalculator />, page);
    const taxable = 90000 - 14600;
    const { tax } = bracketsInfo(taxable);
    const remaining = Math.max(0, tax - 8000);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(remaining / 4));
    expect(screen.getByText('Annual tax estimate').nextElementSibling!.textContent).toBe(money(tax));
  });

  it('drops to zero once withholding covers the bill', () => {
    const { container } = renderCalculatorPage(<EstimatedTaxCalculator />, page);
    fireEvent.change(screen.getByLabelText('Tax already withheld ($)'), { target: { value: '20000' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(0));
  });
});

describe('WithholdingCalculator', () => {
  const page: CalculatorPage = {
    title: 'Withholding Calculator',
    description: 'Estimate paycheck withholding, net pay and annual tax from gross wages.',
    path: '/withholding-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<WithholdingCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Withholding Calculator' })).toBeDefined();
    expect(screen.getByText('Gross pay per paycheck ($)')).toBeDefined();
    expect(screen.getByText('Withholding per paycheck')).toBeDefined();
  });

  it('taxes pay after pre-tax deductions', () => {
    const { container } = renderCalculatorPage(<WithholdingCalculator />, page);
    const taxable = 2500 - 200;
    const withholding = (taxable * 12) / 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(withholding));
    expect(screen.getByText('Net pay per paycheck').nextElementSibling!.textContent).toBe(
      money(2500 - 200 - withholding)
    );
    expect(screen.getByText('Annual withholding').nextElementSibling!.textContent).toBe(money(withholding * 26));
  });

  it('raises the withholding when the rate rises', () => {
    const { container } = renderCalculatorPage(<WithholdingCalculator />, page);
    fireEvent.change(screen.getByLabelText('Tax rate (%)'), { target: { value: '20' } });
    const taxable = 2500 - 200;
    const withholding = (taxable * 20) / 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(withholding));
  });
});

describe('TaxBracketCalculator', () => {
  const page: CalculatorPage = {
    title: 'Tax Bracket Calculator',
    description: 'See your marginal tax bracket, effective rate and total federal tax.',
    path: '/tax-bracket-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<TaxBracketCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Tax Bracket Calculator' })).toBeDefined();
    expect(screen.getByText('Taxable income ($)')).toBeDefined();
    expect(screen.getByText('Marginal tax rate')).toBeDefined();
  });

  it('places $105,400 of income in the 24% bracket', () => {
    const { container } = renderCalculatorPage(<TaxBracketCalculator />, page);
    const { tax, marginal, next } = bracketsInfo(105400);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(pct(marginal * 100));
    expect(screen.getByText('Federal tax in this bracket').nextElementSibling!.textContent).toBe(money(tax));
    expect(screen.getByText('Effective tax rate').nextElementSibling!.textContent).toBe(
      pct((tax / 105400) * 100)
    );
    expect(screen.getByText('Next bracket starts at').nextElementSibling!.textContent).toBe(money(next));
  });

  it('drops to the 12% bracket for smaller income', () => {
    const { container } = renderCalculatorPage(<TaxBracketCalculator />, page);
    fireEvent.change(screen.getByLabelText('Taxable income ($)'), { target: { value: '40000' } });
    const { marginal, next } = bracketsInfo(40000);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(pct(marginal * 100));
    expect(screen.getByText('Next bracket starts at').nextElementSibling!.textContent).toBe(money(next));
  });
});

describe('AlternativeMinimumTaxCalculator', () => {
  const page: CalculatorPage = {
    title: 'Alternative Minimum Tax Calculator',
    description: 'Estimate the AMT when preference items push income into the parallel tax system.',
    path: '/alternative-minimum-tax-calculator.html',
    category: 'financial',
  };

  const amt = (taxable: number, preferences: number, exemption: number) => {
    const amti = taxable + preferences;
    const base = Math.max(0, amti - exemption);
    const tentative = Math.min(base, 232600) * 0.26 + Math.max(0, base - 232600) * 0.28;
    const regular = bracketsInfo(taxable).tax;
    return { base, tentative, regular, owed: Math.max(0, tentative - regular) };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<AlternativeMinimumTaxCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Alternative Minimum Tax Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Tax preference items ($)')).toBeDefined();
    expect(screen.getByText('Alternative minimum tax owed')).toBeDefined();
  });

  it('charges the excess of the tentative minimum tax over regular tax', () => {
    const { container } = renderCalculatorPage(<AlternativeMinimumTaxCalculator />, page);
    const { base, tentative, regular, owed } = amt(200000, 60000, 85700);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(owed));
    expect(screen.getByText('Tentative minimum tax').nextElementSibling!.textContent).toBe(money(tentative));
    expect(screen.getByText('Regular income tax').nextElementSibling!.textContent).toBe(money(regular));
    expect(base).toBe(174300);
  });

  it('erases the AMT when the exemption rises', () => {
    const { container } = renderCalculatorPage(<AlternativeMinimumTaxCalculator />, page);
    fireEvent.change(screen.getByLabelText('AMT exemption ($)'), { target: { value: '120000' } });
    const { owed } = amt(200000, 60000, 120000);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(owed));
  });
});

describe('OrdinaryIncomeTaxCalculator', () => {
  const page: CalculatorPage = {
    title: 'Ordinary Income Tax Calculator',
    description: 'Calculate federal tax on ordinary income with marginal and effective rates.',
    path: '/ordinary-income-tax-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<OrdinaryIncomeTaxCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Ordinary Income Tax Calculator' })).toBeDefined();
    expect(screen.getByText('Ordinary income ($)')).toBeDefined();
    expect(screen.getByText('Ordinary income tax')).toBeDefined();
  });

  it('taxes the slices of income inside each bracket', () => {
    const { container } = renderCalculatorPage(<OrdinaryIncomeTaxCalculator />, page);
    const taxable = 150000 - 14600;
    const { tax, marginal } = bracketsInfo(taxable);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(tax));
    expect(screen.getByText('Marginal tax rate').nextElementSibling!.textContent).toBe(pct(marginal * 100));
    expect(screen.getByText('Effective tax rate').nextElementSibling!.textContent).toBe(
      pct((tax / 150000) * 100)
    );
  });

  it('raises the tax when income grows', () => {
    const { container } = renderCalculatorPage(<OrdinaryIncomeTaxCalculator />, page);
    fireEvent.change(screen.getByLabelText('Ordinary income ($)'), { target: { value: '200000' } });
    const taxable = 200000 - 14600;
    const { tax } = bracketsInfo(taxable);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(tax));
  });
});

describe('CapitalGainsTaxCalculator', () => {
  const page: CalculatorPage = {
    title: 'Capital Gains Tax Calculator',
    description: 'Work out tax on an investment sale for long-term or short-term holdings.',
    path: '/capital-gains-tax-calculator.html',
    category: 'financial',
  };

  const shortTermRate = (income: number) => {
    if (income <= 11600) return 0.1;
    if (income <= 47150) return 0.12;
    if (income <= 100525) return 0.22;
    if (income <= 191950) return 0.24;
    if (income <= 243725) return 0.32;
    if (income <= 609350) return 0.35;
    return 0.37;
  };

  const longTermRate = (income: number) => {
    if (income <= 47025) return 0;
    if (income <= 518900) return 0.15;
    return 0.2;
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CapitalGainsTaxCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Capital Gains Tax Calculator' })).toBeDefined();
    expect(screen.getByText('Cost basis ($)')).toBeDefined();
    expect(screen.getByText('Capital gains tax')).toBeDefined();
  });

  it('taxes a long-term gain at the reduced rate', () => {
    const { container } = renderCalculatorPage(<CapitalGainsTaxCalculator />, page);
    const gain = 50000 - 30000;
    const rate = longTermRate(80000);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(gain * rate));
    expect(screen.getByText('Gain on sale').nextElementSibling!.textContent).toBe(money(gain));
    expect(screen.getByText('Tax rate applied').nextElementSibling!.textContent).toBe(pct(rate * 100));
    expect(screen.getByText('After-tax proceeds').nextElementSibling!.textContent).toBe(
      money(50000 - gain * rate)
    );
  });

  it('switches to the ordinary rate for short-term holdings', () => {
    const { container } = renderCalculatorPage(<CapitalGainsTaxCalculator />, page);
    fireEvent.click(screen.getByRole('radio', { name: 'Short-term' }));
    const gain = 50000 - 30000;
    const rate = shortTermRate(80000);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(gain * rate));
    expect(screen.getByText('Tax rate applied').nextElementSibling!.textContent).toBe(pct(rate * 100));
  });
});

describe('UseTaxCalculator', () => {
  const page: CalculatorPage = {
    title: 'Use Tax Calculator',
    description: 'Calculate the use tax owed when a seller charged less than your local rate.',
    path: '/use-tax-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<UseTaxCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Use Tax Calculator' })).toBeDefined();
    expect(screen.getByText('Seller tax rate (%)')).toBeDefined();
    expect(screen.getByText('Use tax due')).toBeDefined();
  });

  it('charges only the gap above the seller rate', () => {
    const { container } = renderCalculatorPage(<UseTaxCalculator />, page);
    const diff = Math.max(0, 8.5 - 0);
    const useTax = (1000 * diff) / 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(useTax));
    expect(screen.getByText('Rate difference').nextElementSibling!.textContent).toBe(pct(diff));
    expect(screen.getByText('Total payable').nextElementSibling!.textContent).toBe(money(1000 + useTax));
  });

  it('owes nothing when the seller already charged the local rate', () => {
    const { container } = renderCalculatorPage(<UseTaxCalculator />, page);
    fireEvent.change(screen.getByLabelText('Seller tax rate (%)'), { target: { value: '8.5' } });
    const diff = Math.max(0, 8.5 - 8.5);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money((1000 * diff) / 100));
  });
});

describe('DcfCalculator', () => {
  const page: CalculatorPage = {
    title: 'DCF Calculator',
    description: 'Value a business from discounted future free cash flow and a terminal value.',
    path: '/dcf-calculator.html',
    category: 'financial',
  };

  const valuation = (fcf: number, growth: number, discount: number, years: number, shares: number) => {
    let pv = 0;
    let last = 0;
    for (let i = 1; i <= years; i++) {
      const cashFlow = fcf * Math.pow(1 + growth, i);
      last = cashFlow;
      pv += cashFlow / Math.pow(1 + discount, i);
    }
    const terminal = (last * (1 + growth)) / (discount - growth);
    const terminalPv = terminal / Math.pow(1 + discount, years);
    const ev = pv + terminalPv;
    return { pv, terminalPv, ev, perShare: ev / shares };
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DcfCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'DCF Calculator' })).toBeDefined();
    expect(screen.getByText('Free cash flow ($)')).toBeDefined();
    expect(screen.getByText('Enterprise value')).toBeDefined();
  });

  it('discounts forecast cash flows plus a terminal value', () => {
    const { container } = renderCalculatorPage(<DcfCalculator />, page);
    const { pv, terminalPv, ev, perShare } = valuation(100000, 0.03, 0.09, 5, 10000);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(ev));
    expect(screen.getByText('Value per share').nextElementSibling!.textContent).toBe(money(perShare));
    expect(screen.getByText('PV of forecast cash flows').nextElementSibling!.textContent).toBe(money(pv));
    expect(screen.getByText('PV of terminal value').nextElementSibling!.textContent).toBe(money(terminalPv));
  });

  it('lowers the value when the discount rate rises', () => {
    const { container } = renderCalculatorPage(<DcfCalculator />, page);
    fireEvent.change(screen.getByLabelText('Discount rate (%)'), { target: { value: '12' } });
    const { ev } = valuation(100000, 0.03, 0.12, 5, 10000);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(ev));
  });
});

describe('GrahamNumberCalculator', () => {
  const page: CalculatorPage = {
    title: 'Graham Number Calculator',
    description: "Calculate Benjamin Graham's defensive number from EPS and book value per share.",
    path: '/graham-number-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<GrahamNumberCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Graham Number Calculator' })).toBeDefined();
    expect(screen.getByText('Book value per share ($)')).toBeDefined();
    expect(screen.getByText('Graham number')).toBeDefined();
  });

  it('takes the square root of 22.5 times EPS and book value', () => {
    const { container } = renderCalculatorPage(<GrahamNumberCalculator />, page);
    const graham = Math.sqrt(22.5 * 5 * 40);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(graham));
    expect(screen.getByText('Upside vs market price').nextElementSibling!.textContent).toBe(
      pct(((graham - 80) / 80) * 100)
    );
  });

  it('raises the number when earnings grow', () => {
    const { container } = renderCalculatorPage(<GrahamNumberCalculator />, page);
    fireEvent.change(screen.getByLabelText('Earnings per share ($)'), { target: { value: '8' } });
    const graham = Math.sqrt(22.5 * 8 * 40);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(graham));
  });
});

describe('PegRatioCalculator', () => {
  const page: CalculatorPage = {
    title: 'PEG Ratio Calculator',
    description: "Combine a stock's P/E ratio with its earnings growth rate into one PEG number.",
    path: '/peg-ratio-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PegRatioCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'PEG Ratio Calculator' })).toBeDefined();
    expect(screen.getByText('EPS growth (% per year)')).toBeDefined();
    expect(screen.getByText('PEG ratio')).toBeDefined();
  });

  it('divides the P/E ratio by the growth rate', () => {
    const { container } = renderCalculatorPage(<PegRatioCalculator />, page);
    const pe = 120 / 4;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(pe / 15));
    expect(screen.getByText('P/E ratio').nextElementSibling!.textContent).toBe(num(pe));
    expect(screen.getByText('EPS growth rate').nextElementSibling!.textContent).toBe(pct(15));
  });

  it('falls when growth speeds up', () => {
    const { container } = renderCalculatorPage(<PegRatioCalculator />, page);
    fireEvent.change(screen.getByLabelText('EPS growth (% per year)'), { target: { value: '20' } });
    const pe = 120 / 4;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(num(pe / 20));
  });
});

describe('EvEbitdaCalculator', () => {
  const page: CalculatorPage = {
    title: 'EV/EBITDA Calculator',
    description: 'Compare enterprise value with EBITDA to judge how a company is priced.',
    path: '/ev-ebitda-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EvEbitdaCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'EV/EBITDA Calculator' })).toBeDefined();
    expect(screen.getByText('Enterprise value ($)')).toBeDefined();
    expect(screen.getByText('EV/EBITDA multiple')).toBeDefined();
  });

  it('divides enterprise value by EBITDA', () => {
    const { container } = renderCalculatorPage(<EvEbitdaCalculator />, page);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(500000 / 100000)}x`);
    expect(screen.getByText('Value at the comparable multiple').nextElementSibling!.textContent).toBe(
      money(100000 * 10)
    );
    expect(screen.getByText('Value gap vs enterprise value').nextElementSibling!.textContent).toBe(
      money(100000 * 10 - 500000)
    );
  });

  it('falls as EBITDA grows', () => {
    const { container } = renderCalculatorPage(<EvEbitdaCalculator />, page);
    fireEvent.change(screen.getByLabelText('EBITDA ($)'), { target: { value: '125000' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(500000 / 125000)}x`);
  });
});

describe('PriceToSalesCalculator', () => {
  const page: CalculatorPage = {
    title: 'Price to Sales Calculator',
    description: 'Compare market capitalisation with annual revenue using price to sales.',
    path: '/price-to-sales-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PriceToSalesCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Price to Sales Calculator' })).toBeDefined();
    expect(screen.getByText('Annual revenue ($)')).toBeDefined();
    expect(screen.getByText('Price to sales ratio')).toBeDefined();
  });

  it('divides market cap by revenue', () => {
    const { container } = renderCalculatorPage(<PriceToSalesCalculator />, page);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(800000 / 400000)}x`);
    expect(screen.getByText('Value at target multiple').nextElementSibling!.textContent).toBe(
      money(400000 * 3)
    );
  });

  it('falls when revenue increases', () => {
    const { container } = renderCalculatorPage(<PriceToSalesCalculator />, page);
    fireEvent.change(screen.getByLabelText('Annual revenue ($)'), { target: { value: '500000' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(800000 / 500000)}x`);
  });
});

describe('PriceToBookCalculator', () => {
  const page: CalculatorPage = {
    title: 'Price to Book Calculator',
    description: 'Compare market capitalisation with shareholder equity via price to book.',
    path: '/price-to-book-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PriceToBookCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Price to Book Calculator' })).toBeDefined();
    expect(screen.getByText('Book value of equity ($)')).toBeDefined();
    expect(screen.getByText('Price to book ratio')).toBeDefined();
  });

  it('divides market cap by book equity', () => {
    const { container } = renderCalculatorPage(<PriceToBookCalculator />, page);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(600000 / 400000)}x`);
    expect(screen.getByText('Value at target multiple').nextElementSibling!.textContent).toBe(
      money(400000 * 2)
    );
  });

  it('rises when book equity shrinks', () => {
    const { container } = renderCalculatorPage(<PriceToBookCalculator />, page);
    fireEvent.change(screen.getByLabelText('Book value of equity ($)'), { target: { value: '300000' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(600000 / 300000)}x`);
  });
});

describe('BookValuePerShareCalculator', () => {
  const page: CalculatorPage = {
    title: 'Book Value Per Share Calculator',
    description: 'Work out book value per share from total equity and shares outstanding.',
    path: '/book-value-per-share-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<BookValuePerShareCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Book Value Per Share Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Total shareholders equity ($)')).toBeDefined();
    expect(screen.getByText('Book value per share')).toBeDefined();
  });

  it('divides common equity by shares', () => {
    const { container } = renderCalculatorPage(<BookValuePerShareCalculator />, page);
    const common = 2000000 - 200000;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(common / 100000));
    expect(screen.getByText('Common equity').nextElementSibling!.textContent).toBe(money(common));
  });

  it('rises when fewer shares are outstanding', () => {
    const { container } = renderCalculatorPage(<BookValuePerShareCalculator />, page);
    fireEvent.change(screen.getByLabelText('Shares outstanding'), { target: { value: '80000' } });
    const common = 2000000 - 200000;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(common / 80000));
  });
});

describe('EarningsPerShareCalculator', () => {
  const page: CalculatorPage = {
    title: 'Earnings Per Share Calculator',
    description: 'Calculate earnings per share from net income and shares outstanding.',
    path: '/earnings-per-share-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EarningsPerShareCalculator />, page);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Earnings Per Share Calculator' })
    ).toBeDefined();
    expect(screen.getByText('Preferred dividends ($)')).toBeDefined();
    expect(screen.getByText('Earnings per share')).toBeDefined();
  });

  it('divides earnings available to common by shares', () => {
    const { container } = renderCalculatorPage(<EarningsPerShareCalculator />, page);
    const earnings = 500000 - 50000;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(earnings / 100000));
    expect(screen.getByText('Earnings available to common').nextElementSibling!.textContent).toBe(
      money(earnings)
    );
  });

  it('grows EPS when net income rises', () => {
    const { container } = renderCalculatorPage(<EarningsPerShareCalculator />, page);
    fireEvent.change(screen.getByLabelText('Net income ($)'), { target: { value: '600000' } });
    const earnings = 600000 - 50000;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(earnings / 100000));
  });
});

describe('EpsGrowthCalculator', () => {
  const page: CalculatorPage = {
    title: 'EPS Growth Calculator',
    description: 'Track earnings per share growth over time in total and per year.',
    path: '/eps-growth-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<EpsGrowthCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'EPS Growth Calculator' })).toBeDefined();
    expect(screen.getByText('Prior EPS ($)')).toBeDefined();
    expect(screen.getByText('EPS growth rate')).toBeDefined();
  });

  it('reports the percentage move between two EPS figures', () => {
    const { container } = renderCalculatorPage(<EpsGrowthCalculator />, page);
    const total = ((4.5 - 3.2) / 3.2) * 100;
    const annualised = (Math.pow(4.5 / 3.2, 1 / 3) - 1) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(pct(total));
    expect(screen.getByText('Annualised growth').nextElementSibling!.textContent).toBe(pct(annualised));
    expect(screen.getByText('Change in EPS').nextElementSibling!.textContent).toBe(money(4.5 - 3.2));
  });

  it('doubles the growth when EPS doubles', () => {
    const { container } = renderCalculatorPage(<EpsGrowthCalculator />, page);
    fireEvent.change(screen.getByLabelText('Current EPS ($)'), { target: { value: '6.4' } });
    const total = ((6.4 - 3.2) / 3.2) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(pct(total));
  });
});

describe('PeRatioCalculator', () => {
  const page: CalculatorPage = {
    title: 'PE Ratio Calculator',
    description: "Work out a stock's P/E ratio and compare it with a benchmark multiple.",
    path: '/pe-ratio-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PeRatioCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'PE Ratio Calculator' })).toBeDefined();
    expect(screen.getByText('Earnings per share ($)')).toBeDefined();
    expect(screen.getByText('P/E ratio')).toBeDefined();
  });

  it('divides the share price by earnings', () => {
    const { container } = renderCalculatorPage(<PeRatioCalculator />, page);
    const pe = 150 / 6;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(pe)}x`);
    expect(screen.getByText('Earnings yield').nextElementSibling!.textContent).toBe(pct((6 / 150) * 100));
    expect(screen.getByText('Price at the benchmark multiple').nextElementSibling!.textContent).toBe(
      money(6 * 20)
    );
  });

  it('falls when earnings improve', () => {
    const { container } = renderCalculatorPage(<PeRatioCalculator />, page);
    fireEvent.change(screen.getByLabelText('Earnings per share ($)'), { target: { value: '7.5' } });
    const pe = 150 / 7.5;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${num(pe)}x`);
  });
});

describe('StockValuationCalculator', () => {
  const page: CalculatorPage = {
    title: 'Stock Valuation Calculator',
    description: 'Value a dividend-growing share with the Gordon growth model.',
    path: '/stock-valuation-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<StockValuationCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Stock Valuation Calculator' })).toBeDefined();
    expect(screen.getByText('Dividend next year ($)')).toBeDefined();
    expect(screen.getByText('Intrinsic value per share')).toBeDefined();
  });

  it('divides the next dividend by the return-growth gap', () => {
    const { container } = renderCalculatorPage(<StockValuationCalculator />, page);
    const value = 2.5 / (0.09 - 0.04);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(value));
    expect(screen.getByText('Upside vs market price').nextElementSibling!.textContent).toBe(
      pct(((value - 45) / 45) * 100)
    );
    expect(screen.getByText('Dividend yield at this value').nextElementSibling!.textContent).toBe(
      pct((2.5 / value) * 100)
    );
  });

  it('cuts the value when the required return rises', () => {
    const { container } = renderCalculatorPage(<StockValuationCalculator />, page);
    fireEvent.change(screen.getByLabelText('Required return (%)'), { target: { value: '10' } });
    const value = 2.5 / (0.1 - 0.04);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(value));
  });
});

describe('DividendGrowthCalculator', () => {
  const page: CalculatorPage = {
    title: 'Dividend Growth Calculator',
    description: 'Project future dividends and the total received under steady growth.',
    path: '/dividend-growth-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DividendGrowthCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Dividend Growth Calculator' })).toBeDefined();
    expect(screen.getByText('Current annual dividend ($)')).toBeDefined();
    expect(screen.getByText('Dividend in the final year')).toBeDefined();
  });

  it('compounds the payout for ten years', () => {
    const { container } = renderCalculatorPage(<DividendGrowthCalculator />, page);
    const future = 2 * Math.pow(1.06, 10);
    const total = (2 * (Math.pow(1.06, 10) - 1)) / 0.06;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(future));
    expect(screen.getByText('Total dividends received').nextElementSibling!.textContent).toBe(money(total));
    expect(screen.getByText('Cumulative dividend growth').nextElementSibling!.textContent).toBe(
      pct(((future - 2) / 2) * 100)
    );
  });

  it('grows further with a longer horizon', () => {
    const { container } = renderCalculatorPage(<DividendGrowthCalculator />, page);
    fireEvent.change(screen.getByLabelText('Years held'), { target: { value: '15' } });
    const future = 2 * Math.pow(1.06, 15);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(future));
  });
});

describe('DividendYieldCalculator', () => {
  const page: CalculatorPage = {
    title: 'Dividend Yield Calculator',
    description: 'Calculate dividend yield and the income your shares pay out.',
    path: '/dividend-yield-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<DividendYieldCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Dividend Yield Calculator' })).toBeDefined();
    expect(screen.getByText('Annual dividend per share ($)')).toBeDefined();
    expect(screen.getByText('Dividend yield')).toBeDefined();
  });

  it('divides the dividend by the share price', () => {
    const { container } = renderCalculatorPage(<DividendYieldCalculator />, page);
    const yieldPct = (1.8 / 60) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(pct(yieldPct));
    expect(screen.getByText('Annual income from dividends').nextElementSibling!.textContent).toBe(
      money(1.8 * 500)
    );
    expect(screen.getByText('Quarterly income').nextElementSibling!.textContent).toBe(money((1.8 * 500) / 4));
  });

  it('raises the yield when the price falls', () => {
    const { container } = renderCalculatorPage(<DividendYieldCalculator />, page);
    fireEvent.change(screen.getByLabelText('Share price ($)'), { target: { value: '45' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(pct((1.8 / 45) * 100));
  });
});

describe('StockPriceCalculator', () => {
  const page: CalculatorPage = {
    title: 'Stock Price Calculator',
    description: 'Derive a share price from market capitalisation and shares outstanding.',
    path: '/stock-price-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<StockPriceCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Stock Price Calculator' })).toBeDefined();
    expect(screen.getByText('Shares outstanding')).toBeDefined();
    expect(screen.getByText('Share price')).toBeDefined();
  });

  it('divides market cap by the share count', () => {
    const { container } = renderCalculatorPage(<StockPriceCalculator />, page);
    const price = 12000000 / 500000;
    const targetPrice = 15000000 / 500000;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(price));
    expect(screen.getByText('Price at the target market cap').nextElementSibling!.textContent).toBe(
      money(targetPrice)
    );
    expect(screen.getByText('Upside to the target cap').nextElementSibling!.textContent).toBe(
      pct(((targetPrice - price) / price) * 100)
    );
  });

  it('falls when the share count grows', () => {
    const { container } = renderCalculatorPage(<StockPriceCalculator />, page);
    fireEvent.change(screen.getByLabelText('Shares outstanding'), { target: { value: '600000' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(12000000 / 600000));
  });
});

describe('StockReturnCalculator', () => {
  const page: CalculatorPage = {
    title: 'Stock Return Calculator',
    description: 'Measure total return from price change and dividends held over time.',
    path: '/stock-return-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<StockReturnCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Stock Return Calculator' })).toBeDefined();
    expect(screen.getByText('Purchase price ($)')).toBeDefined();
    expect(screen.getByText('Total return')).toBeDefined();
  });

  it('adds price gain and dividends to the base cost', () => {
    const { container } = renderCalculatorPage(<StockReturnCalculator />, page);
    const profit = 75 - 50 + 6;
    const total = (profit / 50) * 100;
    const annualised = (Math.pow(1 + total / 100, 1 / 3) - 1) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(pct(total));
    expect(screen.getByText('Profit per share').nextElementSibling!.textContent).toBe(money(profit));
    expect(screen.getByText('Annualised return').nextElementSibling!.textContent).toBe(pct(annualised));
  });

  it('lifts the return with a higher sale price', () => {
    const { container } = renderCalculatorPage(<StockReturnCalculator />, page);
    fireEvent.change(screen.getByLabelText('Selling price ($)'), { target: { value: '100' } });
    const profit = 100 - 50 + 6;
    const total = (profit / 50) * 100;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(pct(total));
  });
});

describe('RequiredMinimumDistributionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Required Minimum Distribution Calculator',
    description: 'Work out the yearly minimum you must withdraw from a retirement account.',
    path: '/required-minimum-distribution-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RequiredMinimumDistributionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Required Minimum Distribution Calculator' })).toBeDefined();
    expect(screen.getByText('Retirement account balance ($)')).toBeDefined();
    expect(screen.getByText('Required minimum distribution')).toBeDefined();
  });

  it('divides the balance by the life expectancy divisor', () => {
    const { container } = renderCalculatorPage(<RequiredMinimumDistributionCalculator />, page);
    const rmd = 850000 / 24.6;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(rmd));
    expect(screen.getByText('Monthly equivalent').nextElementSibling!.textContent).toBe(money(rmd / 12));
    expect(screen.getByText('Balance after the distribution').nextElementSibling!.textContent).toBe(
      money(850000 - rmd)
    );
  });

  it('shrinks the distribution with a longer divisor', () => {
    const { container } = renderCalculatorPage(<RequiredMinimumDistributionCalculator />, page);
    fireEvent.change(screen.getByLabelText('Life expectancy divisor'), { target: { value: '26' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(850000 / 26));
  });
});

describe('IraWithdrawalCalculator', () => {
  const page: CalculatorPage = {
    title: 'IRA Withdrawal Calculator',
    description: 'Project IRA withdrawals, growth, and how long your balance lasts.',
    path: '/ira-withdrawal-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<IraWithdrawalCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'IRA Withdrawal Calculator' })).toBeDefined();
    expect(screen.getByText('IRA balance ($)')).toBeDefined();
    expect(screen.getByText('Annual withdrawal')).toBeDefined();
  });

  it('applies the rate to the balance and tracks the drawdown', () => {
    const { container } = renderCalculatorPage(<IraWithdrawalCalculator />, page);
    const annual = 600000 * 0.04;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(annual));
    expect(screen.getByText('Total withdrawn').nextElementSibling!.textContent).toBe(money(annual * 25));
    expect(screen.getByText('Years funded').nextElementSibling!.textContent).toBe('25');
  });

  it('raises the withdrawal when the rate rises', () => {
    const { container } = renderCalculatorPage(<IraWithdrawalCalculator />, page);
    fireEvent.change(screen.getByLabelText('Withdrawal rate (%)'), { target: { value: '6' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(600000 * 0.06));
  });
});

describe('Withdrawal401kCalculator', () => {
  const page: CalculatorPage = {
    title: '401k Withdrawal Calculator',
    description: 'Spend a 401(k) balance evenly over retirement while it still earns returns.',
    path: '/401k-withdrawal-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<Withdrawal401kCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: '401k Withdrawal Calculator' })).toBeDefined();
    expect(screen.getByText('401(k) balance ($)')).toBeDefined();
    expect(screen.getByText('Monthly withdrawal')).toBeDefined();
  });

  it('spreads the balance over the term as a level annuity', () => {
    const { container } = renderCalculatorPage(<Withdrawal401kCalculator />, page);
    const r = 0.05 / 12;
    const monthly = (900000 * r) / (1 - Math.pow(1 + r, -240));
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(monthly));
    expect(screen.getByText('Annual withdrawal').nextElementSibling!.textContent).toBe(money(monthly * 12));
    expect(screen.getByText('Total drawn over the term').nextElementSibling!.textContent).toBe(money(monthly * 240));
  });

  it('lowers the monthly amount with a longer term', () => {
    const { container } = renderCalculatorPage(<Withdrawal401kCalculator />, page);
    fireEvent.change(screen.getByLabelText('Years in retirement'), { target: { value: '25' } });
    const r = 0.05 / 12;
    const monthly = (900000 * r) / (1 - Math.pow(1 + r, -300));
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(monthly));
  });
});

describe('PensionCalculator', () => {
  const page: CalculatorPage = {
    title: 'Pension Calculator',
    description: 'Estimate a defined benefit pension from salary and years of service.',
    path: '/pension-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<PensionCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Pension Calculator' })).toBeDefined();
    expect(screen.getByText('Final annual salary ($)')).toBeDefined();
    expect(screen.getByText('Annual pension')).toBeDefined();
  });

  it('multiplies salary, service years, and the benefit rate', () => {
    const { container } = renderCalculatorPage(<PensionCalculator />, page);
    const annual = 90000 * 25 * 0.016;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(annual));
    expect(screen.getByText('Monthly pension').nextElementSibling!.textContent).toBe(money(annual / 12));
    expect(screen.getByText('Replacement ratio').nextElementSibling!.textContent).toBe(pct((annual / 90000) * 100));
  });

  it('grows with more credited years', () => {
    const { container } = renderCalculatorPage(<PensionCalculator />, page);
    fireEvent.change(screen.getByLabelText('Years of service'), { target: { value: '30' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(90000 * 30 * 0.016));
  });
});

describe('SocialSecurityCalculator', () => {
  const page: CalculatorPage = {
    title: 'Social Security Calculator',
    description: 'Estimate monthly Social Security benefits and the effect of claiming age.',
    path: '/social-security-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<SocialSecurityCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Social Security Calculator' })).toBeDefined();
    expect(screen.getByText('Average monthly earnings ($)')).toBeDefined();
    expect(screen.getByText('Estimated monthly benefit')).toBeDefined();
  });

  it('applies the bend-point formula at full retirement age', () => {
    const { container } = renderCalculatorPage(<SocialSecurityCalculator />, page);
    const pia = 1174 * 0.9 + (6000 - 1174) * 0.32;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(pia));
    expect(screen.getByText('Primary insurance amount').nextElementSibling!.textContent).toBe(money(pia));
    expect(screen.getByText('Annual benefit').nextElementSibling!.textContent).toBe(money(pia * 12));
  });

  it('boosts the benefit for delaying past 67', () => {
    const { container } = renderCalculatorPage(<SocialSecurityCalculator />, page);
    fireEvent.change(screen.getByLabelText('Claiming age'), { target: { value: '70' } });
    const pia = 1174 * 0.9 + (6000 - 1174) * 0.32;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(pia * 1.24));
  });
});

describe('RetirementGoalCalculator', () => {
  const page: CalculatorPage = {
    title: 'Retirement Goal Calculator',
    description: 'Find the nest egg required to fund a target monthly retirement income.',
    path: '/retirement-goal-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RetirementGoalCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Retirement Goal Calculator' })).toBeDefined();
    expect(screen.getByText('Desired monthly income ($)')).toBeDefined();
    expect(screen.getByText('Nest egg needed')).toBeDefined();
  });

  it('discounts the payment stream back to today', () => {
    const { container } = renderCalculatorPage(<RetirementGoalCalculator />, page);
    const r = 0.05 / 12;
    const nestEgg = (4000 * (1 - Math.pow(1 + r, -300))) / r;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(nestEgg));
    expect(screen.getByText('Total income over retirement').nextElementSibling!.textContent).toBe(money(4000 * 300));
    expect(screen.getByText('Annual income target').nextElementSibling!.textContent).toBe(money(4000 * 12));
  });

  it('scales the goal with the desired income', () => {
    const { container } = renderCalculatorPage(<RetirementGoalCalculator />, page);
    fireEvent.change(screen.getByLabelText('Desired monthly income ($)'), { target: { value: '5000' } });
    const r = 0.05 / 12;
    const nestEgg = (5000 * (1 - Math.pow(1 + r, -300))) / r;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(nestEgg));
  });
});

describe('RetirementAgeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Retirement Age Calculator',
    description: 'Project savings and years remaining for any target retirement age.',
    path: '/retirement-age-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RetirementAgeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Retirement Age Calculator' })).toBeDefined();
    expect(screen.getByText('Desired retirement age')).toBeDefined();
    expect(screen.getByText('Years until retirement')).toBeDefined();
  });

  it('grows the balance over the remaining years', () => {
    const { container } = renderCalculatorPage(<RetirementAgeCalculator />, page);
    const i = 0.06 / 12;
    const projected = 50000 * Math.pow(1 + i, 360) + 500 * ((Math.pow(1 + i, 360) - 1) / i);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe('30 years');
    expect(screen.getByText('Projected balance').nextElementSibling!.textContent).toBe(money(projected));
    expect(screen.getByText('Total contributed').nextElementSibling!.textContent).toBe(money(50000 + 500 * 360));
  });

  it('shortens the runway when the target age drops', () => {
    const { container } = renderCalculatorPage(<RetirementAgeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Desired retirement age'), { target: { value: '60' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe('25 years');
  });
});

describe('RetirementIncomeCalculator', () => {
  const page: CalculatorPage = {
    title: 'Retirement Income Calculator',
    description: 'Turn a retirement balance into annual and monthly income against expenses.',
    path: '/retirement-income-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RetirementIncomeCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Retirement Income Calculator' })).toBeDefined();
    expect(screen.getByText('Retirement savings ($)')).toBeDefined();
    expect(screen.getByText('Annual retirement income')).toBeDefined();
  });

  it('applies the withdrawal rate to the balance', () => {
    const { container } = renderCalculatorPage(<RetirementIncomeCalculator />, page);
    const annual = 800000 * 0.04;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(annual));
    expect(screen.getByText('Monthly income').nextElementSibling!.textContent).toBe(money(annual / 12));
    expect(screen.getByText('Surplus vs expenses').nextElementSibling!.textContent).toBe(`-${money(60000 - annual)}`);
  });

  it('raises income with a higher rate', () => {
    const { container } = renderCalculatorPage(<RetirementIncomeCalculator />, page);
    fireEvent.change(screen.getByLabelText('Withdrawal rate (%)'), { target: { value: '5' } });
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(800000 * 0.05));
  });
});

describe('RetirementSavingsCalculator', () => {
  const page: CalculatorPage = {
    title: 'Retirement Savings Calculator',
    description: 'Project retirement savings from current balance, contributions, and returns.',
    path: '/retirement-savings-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<RetirementSavingsCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Retirement Savings Calculator' })).toBeDefined();
    expect(screen.getByText('Monthly contribution ($)')).toBeDefined();
    expect(screen.getByText('Projected retirement savings')).toBeDefined();
  });

  it('compounds the balance and contributions', () => {
    const { container } = renderCalculatorPage(<RetirementSavingsCalculator />, page);
    const i = 0.06 / 12;
    const projected = 10000 * Math.pow(1 + i, 300) + 400 * ((Math.pow(1 + i, 300) - 1) / i);
    const contributed = 10000 + 400 * 300;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(projected));
    expect(screen.getByText('Total contributed').nextElementSibling!.textContent).toBe(money(contributed));
    expect(screen.getByText('Investment growth').nextElementSibling!.textContent).toBe(money(projected - contributed));
    expect(screen.getByText('Growth share of balance').nextElementSibling!.textContent).toBe(
      pct(((projected - contributed) / projected) * 100)
    );
  });

  it('adds the extra contributions to the projection', () => {
    const { container } = renderCalculatorPage(<RetirementSavingsCalculator />, page);
    fireEvent.change(screen.getByLabelText('Monthly contribution ($)'), { target: { value: '600' } });
    const i = 0.06 / 12;
    const projected = 10000 * Math.pow(1 + i, 300) + 600 * ((Math.pow(1 + i, 300) - 1) / i);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(money(projected));
  });
});

/* APPEND-MARKER */
import CtcToMonthlySalaryCalculator from './CtcToMonthlySalaryCalculator';
import HourlyToAnnualRateCalculator from './HourlyToAnnualRateCalculator';

describe('CtcToMonthlySalaryCalculator', () => {
  const page: CalculatorPage = {
    title: 'CTC to Monthly Salary Calculator',
    description: 'Convert an annual CTC offer into monthly gross and take-home pay.',
    path: '/ctc-to-monthly-salary-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<CtcToMonthlySalaryCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'CTC to Monthly Salary Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Annual CTC ($)')).toBeDefined();
    expect(screen.getByLabelText('Tax & Deductions (%)')).toBeDefined();
  });

  it('divides annual CTC by 12 and subtracts deductions', () => {
    const { container } = renderCalculatorPage(<CtcToMonthlySalaryCalculator />, page);
    const monthlyGross = 60000 / 12;
    const takeHome = monthlyGross * (1 - 18 / 100);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${money(takeHome)}/mo`);
    expect(screen.getByText('Annual Take-Home').nextElementSibling!.textContent).toBe(
      money(takeHome * 12)
    );
  });

  it('raises take-home when the CTC grows', () => {
    const { container } = renderCalculatorPage(<CtcToMonthlySalaryCalculator />, page);
    fireEvent.change(screen.getByLabelText('Annual CTC ($)'), { target: { value: '120000' } });
    const monthlyGross = 120000 / 12;
    const takeHome = monthlyGross * (1 - 18 / 100);
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${money(takeHome)}/mo`);
  });
});

describe('HourlyToAnnualRateCalculator', () => {
  const page: CalculatorPage = {
    title: 'Hourly to Annual Rate Calculator',
    description: 'Turn an hourly wage into weekly, monthly and annual earnings.',
    path: '/hourly-to-annual-rate-calculator.html',
    category: 'financial',
  };

  it('renders through CalculatorPageLayout', () => {
    renderCalculatorPage(<HourlyToAnnualRateCalculator />, page);
    expect(screen.getByRole('heading', { level: 1, name: 'Hourly to Annual Rate Calculator' })).toBeDefined();
    expect(screen.getByLabelText('Hourly Rate ($/hr)')).toBeDefined();
    expect(screen.getByLabelText('Hours per Week')).toBeDefined();
  });

  it('multiplies hourly rate by hours and weeks', () => {
    const { container } = renderCalculatorPage(<HourlyToAnnualRateCalculator />, page);
    const weekly = 25 * 40;
    const annual = weekly * 52;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${money(annual)}/yr`);
    expect(screen.getByText('Weekly Earnings').nextElementSibling!.textContent).toBe(
      `${money(weekly)}/wk`
    );
  });

  it('raises annual earnings when the hourly rate rises', () => {
    const { container } = renderCalculatorPage(<HourlyToAnnualRateCalculator />, page);
    fireEvent.change(screen.getByLabelText('Hourly Rate ($/hr)'), { target: { value: '30' } });
    const annual = 30 * 40 * 52;
    expect(container.querySelector('p.text-4xl')!.textContent).toBe(`${money(annual)}/yr`);
  });
});
