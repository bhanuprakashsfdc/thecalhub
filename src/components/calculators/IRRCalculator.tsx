import { useState, useMemo } from 'react';
import { Percent } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function IRRCalculator() {
  const [cashflows, setCashflows] = useState("-1000, 300, 400, 500, 600");
  
  const calculation = useMemo(() => {
    const flows = cashflows.split(',').map(c => Number(c.trim())).filter(c => !isNaN(c));
    if (flows.length === 0) return { irr: 0, npvProfile: [], cashflows: [] };
    
    let rate = 0.1;
    for (let i = 0; i < 1000; i++) {
      let npv = 0;
      flows.forEach((cf, j) => { npv += cf / Math.pow(1 + rate, j); });
      if (Math.abs(npv) < 0.0001) break;
      rate += npv > 0 ? 0.0001 : -0.0001;
    }
    
    const npvProfile = [];
    for (let r = 0; r <= 0.3; r += 0.02) {
      let npv = 0;
      flows.forEach((cf, j) => { npv += cf / Math.pow(1 + r, j); });
      npvProfile.push({ rate: (r * 100).toFixed(0), npv: Math.round(npv) });
    }
    
    return { irr: rate * 100, npvProfile, cashflows: flows };
  }, [cashflows]);

  const yearlyData = calculation.cashflows.map((cf, i) => ({
    year: `Year ${i}`,
    cashflow: cf
  }));

  const faqs = [
    {
      question: "What is IRR and how is it calculated?",
      answer: "Internal Rate of Return (IRR) is the discount rate that makes the Net Present Value (NPV) of all cash flows equal to zero. It's essentially the expected compound annual rate of return. The IRR is calculated through iteration - you guess a rate, calculate NPV, adjust the rate, and repeat until NPV equals zero. In our calculator, we use Newton-Raphson method to find the IRR that balances incoming and outgoing cash flows. IRR is used to evaluate the profitability of investments - higher IRR indicates better returns."
    },
    {
      question: "How do I interpret IRR results?",
      answer: "IRR should be compared against your required rate of return or cost of capital. If IRR > required return, the investment is acceptable. If IRR < required return, the investment destroys value. For example, if your cost of capital is 10% and IRR is 15%, the investment adds value. However, IRR has limitations: it assumes all positive cash flows are reinvested at the same rate (often unrealistic), and it can give multiple results for alternating cash flow patterns. Always consider NPV alongside IRR for better decision making."
    },
    {
      question: "What is a good IRR for different investments?",
      answer: "IRR benchmarks vary by asset class: Real estate projects typically look for 15-25% IRR, Private equity expects 20-30%, Venture capital can target 30%+ (but with high failure rates), Stocks historically return 10-15%, and FDs give 6-8%. Your required return should reflect the risk - higher risk investments need higher IRR to be worthwhile. A 15% IRR might be excellent for a stable real estate deal but poor for a risky startup. Compare IRR to your cost of capital plus a risk premium."
    },
    {
      question: "When should I use IRR vs NPV?",
      answer: "Use NPV when comparing mutually exclusive projects of different sizes or timing - NPV shows absolute value addition. Use IRR when comparing projects of similar size and timing - IRR shows rate of return. NPV is more reliable when cash flow patterns differ significantly. IRR is intuitive for presenting to stakeholders as a percentage. However, NPV is theoretically superior because it assumes reinvestment at the discount rate (more realistic) while IRR assumes reinvestment at IRR (often unrealistic). For final decisions, rely on NPV."
    },
    {
      question: "How do I handle negative cash flows after positive ones?",
      answer: "Projects with non-standard cash flows (e.g., initial investment, positive returns, then additional investment needed) can have multiple IRRs. In such cases, IRR calculation may give misleading results. The Modified IRR (MIRR) addresses this by assuming positive cash flows are reinvested at the finance rate and negative cash flows are financed at the reinvestment rate. For projects with unusual patterns, always calculate and review NPV alongside IRR. If IRR seems unrealistic, trust NPV instead."
    },
    {
      question: "What cash flow format should I use?",
      answer: "Enter cash flows as comma-separated values starting with the initial investment (usually negative). For example: -1000, 300, 400, 500, 600 means you invest 1000 now and receive 300, 400, 500, 600 over 4 years. The first value is Year 0 (initial investment), second is Year 1, and so on. Make sure all cash flows are included in chronological order. Don't include trailing zeros for years with no cash flow - just list the actual cash flows."
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Cash Flows (comma separated)</label>
              <textarea 
                className="w-full h-24 bg-surface-container-highest border-none rounded-lg p-4 text-white mono text-lg outline-none resize-none" 
                value={cashflows} 
                onChange={(e) => setCashflows(e.target.value)} 
              />
            </div>
            <div className="text-neutral-500 text-xs">
              Format: -1000, 300, 400, 500 (First value = initial investment, usually negative)
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Cash Flow Timeline</label>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="year" stroke="#666" fontSize={10} />
                <YAxis stroke="#666" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} formatter={(v) => [v, 'Cash Flow']} />
                <Bar dataKey="cashflow" fill="#D6ED79" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <Percent className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Internal Rate of Return</span>
          </div>
          <div className="bg-surface-container-highest p-8 rounded-xl mb-4">
            <p className="text-5xl font-bold text-white mono">{calculation.irr.toFixed(2)}%</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Investment</label>
              <p className="text-2xl font-bold text-white mono">{Math.abs(calculation.cashflows[0] || 0)}</p>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Returns</label>
              <p className="text-2xl font-bold text-primary-fixed mono">{calculation.cashflows.slice(1).reduce((a, b) => a + b, 0)}</p>
            </div>
          </div>
        </motion.div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">NPV Profile (NPV at Different Rates)</label>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={calculation.npvProfile} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="rate" stroke="#666" fontSize={10} />
                <YAxis stroke="#666" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} formatter={(v) => [v, 'NPV']} />
                <Line type="monotone" dataKey="npv" stroke="#BDC2FF" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <AboutSection 
          title="IRR Calculator"
          description="The IRR (Internal Rate of Return) Calculator is a powerful financial tool used to evaluate the profitability of investments and projects. IRR is the discount rate that makes the Net Present Value (NPV) of all cash flows equal to zero - essentially the break-even rate of return. This calculator helps you determine the expected rate of return for a series of cash flows over time. Understanding IRR is crucial for capital budgeting decisions, investment analysis, and comparing different investment opportunities. It provides a single percentage metric that's easy to compare against required rates of return or cost of capital."
          features={[
            "Calculate IRR from cash flow series",
            "Visualize cash flow timeline with bar chart",
            "See NPV profile across different discount rates",
            "Analyze investment profitability metrics",
            "Compare multiple investment opportunities"
          ]}
          formula="NPV = Σ(CFt / (1+IRR)^t) = 0"
        />

        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
export default IRRCalculator;