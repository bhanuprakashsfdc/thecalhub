import { useState, useMemo } from 'react';
import { Banknote } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { cn } from '../../lib/utils';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function EMICalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [loanAmount, setLoanAmount] = useState(250000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [tenure, setTenure] = useState(15);

  const faqs = [
    {
      question: "What is EMI and how is it calculated?",
      answer: "EMI (Equated Monthly Installment) is the fixed payment you make to a lender each month to repay your loan. The EMI formula is: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is the principal loan amount, r is monthly interest rate, and n is number of monthly installments. Each EMI payment includes both principal and interest, with the proportion changing over time - early payments are mostly interest, while later payments are mostly principal."
    },
    {
      question: "How does loan tenure affect my EMI?",
      answer: "Longer tenure means lower monthly EMI but higher total interest paid. For example, a 20 lakh loan at 8% for 20 years gives EMI of 16,288 with total interest of 19.1 lakhs. The same loan for 10 years gives EMI of 24,328 but total interest of only 9.2 lakhs. So while shorter tenure reduces interest cost significantly, it increases monthly burden. Choose a tenure that balances affordable EMI with minimal total interest."
    },
    {
      question: "Should I prepay my loan early?",
      answer: "Prepaying a loan can save significant interest, especially in early years when interest component is highest. However, check for prepayment charges (typically 1-2% of outstanding amount). Also consider if you have better investment opportunities that give returns higher than your loan interest rate. If your loan interest is higher than potential investment returns, prepaying makes sense. Use our calculator to see how much interest you can save by paying extra each month."
    },
    {
      question: "What is the difference between fixed and floating interest rates?",
      answer: "Fixed interest rates remain constant throughout the loan tenure, giving you predictable EMIs regardless of market changes. Floating rates are linked to a benchmark (like MCLR or repo rate) and change periodically, causing your EMI to fluctuate. Fixed rates are typically 1-2% higher than floating rates but provide stability. Choose fixed if you want budget certainty, choose floating if you expect rates to fall and can handle EMI variations."
    },
    {
      question: "How does interest rate affect total loan cost?",
      answer: "Even small differences in interest rates significantly impact total cost. For a 20 lakh, 20-year loan: at 7% EMI is 15,562 and total interest is 17.3 lakhs. At 8% EMI rises to 16,653 and total interest becomes 20 lakh - a 1% increase costs you 2.7 lakhs more! Always compare rates from multiple lenders and consider negotiating for better rates, especially if you have good credit score."
    },
    {
      question: "Can I change my EMI or tenure after taking a loan?",
      answer: "Most lenders allow loan restructuring - you can increase EMI, reduce tenure, or even switch between fixed/floating rates. Some banks charge a small fee (500-1000) for tenure changes. You can also consider balance transfer to another bank for lower rates, though this involves processing fees. Before making changes, use this calculator to compare old vs new terms to ensure it's beneficial."
    }
  ];

  const calculation = useMemo(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    return {
      emi: emi.toFixed(2),
      totalInterest: Math.round(totalInterest).toLocaleString(),
      totalPayment: Math.round(totalPayment).toLocaleString(),
      principalPercent: Math.round((p / totalPayment) * 100),
      interestPercent: Math.round((totalInterest / totalPayment) * 100),
    };
  }, [loanAmount, interestRate, tenure]);

  const pieData = [
    { name: 'Principal', value: loanAmount, color: '#D6ED79' },
    { name: 'Interest', value: parseFloat(calculation.totalInterest.replace(/,/g, '')), color: '#BDC2FF' },
  ];

  const barData = Array.from({ length: 6 }, (_, i) => ({
    name: i === 0 ? 'Start' : i === 5 ? 'End' : '',
    principal: 100 - i * 15,
    interest: i * 15,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Loan Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Interest Rate (%)</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">%</span>
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Tenure (Years)</label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 30].map((y) => (
                  <button
                    key={y}
                    onClick={() => setTenure(y)}
                    className={cn(
                      "py-3 rounded-lg text-sm font-medium transition-colors",
                      tenure === y ? "bg-primary-fixed text-on-primary-fixed font-bold" : "bg-surface-container-highest hover:bg-neutral-700"
                    )}
                  >
                    {y}y
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Banknote className="w-32 h-32" />
            </div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-2">Monthly EMI</label>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-black text-white mono">{symbol}{calculation.emi.split('.')[0]}</span>
              <span className="text-neutral-500 mono text-xl">.{calculation.emi.split('.')[1]}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Interest</label>
                <p className="text-2xl font-bold text-white mono">{symbol}{calculation.totalInterest}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Payment</label>
                <p className="text-2xl font-bold text-white mono">{symbol}{calculation.totalPayment}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Principal</span>
                <span className="text-xl font-black text-white mono">{calculation.principalPercent}%</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-6">Amortization Projection</label>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Bar dataKey="interest" stackId="a" fill="#D6ED79" radius={[2, 2, 0, 0]} opacity={0.2} />
                  <Bar dataKey="principal" stackId="a" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <AboutSection 
            title="EMI Calculator"
            description="The EMI (Equated Monthly Installment) Calculator is an essential financial tool that helps you calculate the monthly payments required to repay a loan. Whether you're planning to take a home loan, car loan, personal loan, or any other type of credit, understanding your EMI obligations is crucial for effective financial planning. This calculator uses the standard amortization formula to provide accurate monthly payment calculations, helping you understand exactly how much you'll pay each month and how your payments break down between principal and interest. Using this EMI calculator before taking a loan allows you to plan your budget effectively, compare different loan options, and make informed decisions about borrowing. You can adjust variables like loan amount, interest rate, and tenure to see how they affect your monthly payments, enabling you to choose a loan structure that fits your financial situation. Many people underestimate the total cost of borrowing, but by using this calculator, you can see the complete picture including the total interest you'll pay over the loan tenure."
            features={[
              "Calculate exact monthly EMI for any loan amount",
              "See breakdown between principal and interest portions",
              "Compare different tenure options and their costs",
              "Visualize amortization schedule over loan period",
              "Plan your budget with accurate monthly commitments"
            ]}
            formula="EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)"
          />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}
export default EMICalculator;
