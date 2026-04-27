import { useState, useMemo } from 'react';
import { DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function NPVCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [rate, setRate] = useState(10);
  const [cashflows, setCashflows] = useState("-1000, 300, 400, 500, 600");
  
  const calculation = useMemo(() => {
    const flows = cashflows.split(',').map(c => Number(c.trim())).filter(c => !isNaN(c));
    if (flows.length === 0) return { npv: 0, pvProfile: [] as {rate: number, npv: number}[], yearByYear: [] as {year: string, cashflow: number, pv: number, cumulative: number}[], cashflows: flows };
    
    let npv = 0;
    const yearByYear: {year: string, cashflow: number, pv: number, cumulative: number}[] = [];
    flows.forEach((cf, i) => {
      const pv = cf / Math.pow(1 + rate/100, i + 1);
      npv += pv;
      yearByYear.push({ year: `Year ${i + 1}`, cashflow: cf, pv: Math.round(pv), cumulative: Math.round(npv) });
    });
    
    const pvProfile: {rate: number, npv: number}[] = [];
    for (let r = 0; r <= 30; r += 2) {
      let profileNpv = 0;
      flows.forEach((cf, i) => { profileNpv += cf / Math.pow(1 + r/100, i + 1); });
      pvProfile.push({ rate: r, npv: Math.round(profileNpv) });
    }
    
    return { npv, yearByYear, pvProfile, cashflows: flows };
  }, [cashflows, rate]);

  const faqs = [
    {
      question: "What is NPV and why is it important?",
      answer: "Net Present Value (NPV) is the difference between the present value of cash inflows and outflows over time. It helps determine whether an investment will generate value - a positive NPV means the investment exceeds the required return, while negative NPV means it destroys value. NPV accounts for the time value of money - a rupee earned today is worth more than one earned tomorrow. It's the gold standard for capital budgeting because it directly measures value addition in monetary terms. The discount rate used should reflect the risk and cost of capital."
    },
    {
      question: "How do I choose the discount rate for NPV calculation?",
      answer: "The discount rate should equal your required rate of return or cost of capital. For projects with average risk, use the company's weighted average cost of capital (WACC). For riskier projects, add a risk premium. For safer projects, use a lower rate. You can also use the opportunity cost of capital - what you could earn in a similar investment. If money costs 10% to borrow, use 10%. If you could earn 15% in equities, use 15% as your hurdle rate. The discount rate significantly impacts NPV - higher rates reduce present value of future cash flows."
    },
    {
      question: "What is the difference between NPV and IRR?",
      answer: "NPV gives the absolute value added in today's rupees, while IRR gives the rate of return as a percentage. For example, a 10 crore investment with NPV of 2 crore at 10% discount has IRR of 15%. NPV is more reliable for decision making - it tells you exactly how much value is created. IRR can be misleading for projects with non-standard cash flows or when comparing projects of different sizes. Use NPV for mutually exclusive projects, IRR for ranking projects of similar size. When NPV and IRR conflict, trust NPV."
    },
    {
      question: "How do I interpret a negative NPV result?",
      answer: "A negative NPV means the investment returns less than the discount rate used - it destroys value. For example, NPV of -50000 at 10% discount means the project is worse than a 10% return alternative. However, negative NPV doesn't always mean reject - consider strategic value, market conditions, or if discount rate is too high. Also check your cash flow estimates - optimistic projections can give false positive NPV. Always do sensitivity analysis on key assumptions. A project with small negative NPV might be worth doing if no better alternatives exist."
    },
    {
      question: "Can NPV be used for comparing projects of different sizes?",
      answer: "Yes, NPV is the best metric for comparing projects of different sizes because it measures absolute value addition. A smaller project with 1 crore NPV is better than a larger project with 50 lakh NPV if your capital is limited. However, consider the investment required - a 100 crore investment with 10 crore NPV (10% return) might be less attractive than a 10 crore investment with 5 crore NPV (50% return). In such cases, also calculate profitability index (PV of inflows / Initial investment) to understand return per unit of investment."
    },
    {
      question: "What cash flow format should I use for NPV calculation?",
      answer: "Enter cash flows as comma-separated values starting from Year 1 onwards (not Year 0). For example: -1000, 300, 400, 500, 600 means initial investment of 1000 followed by returns of 300, 400, 500, 600 over 4 years. The first value is Year 0 (initial investment) and should typically be negative. If you want to include Year 0 in discounting, adjust the formula accordingly. Make sure all cash flows are in chronological order and use consistent units (all in lakhs, crores, etc)."
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Discount Rate (%)</label>
              <div className="relative">
                <input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">%</span>
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Cash Flows (comma separated)</label>
              <textarea 
                className="w-full h-24 bg-surface-container-highest border-none rounded-lg p-4 text-white mono text-lg outline-none resize-none" 
                value={cashflows} 
                onChange={(e) => setCashflows(e.target.value)} 
              />
              <p className="text-neutral-500 text-xs mt-2">Format: -1000, 300, 400, 500 (First = initial investment)</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Year-by-Year Breakdown</label>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={calculation.yearByYear} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="year" stroke="#666" fontSize={10} />
                <YAxis stroke="#666" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} formatter={(v, name) => [symbol + v, name === 'pv' ? 'Present Value' : 'Cash Flow']} />
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
            <DollarSign className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Net Present Value</span>
          </div>
          <div className="bg-surface-container-highest p-8 rounded-xl mb-4">
            <p className={`text-5xl font-bold mono ${calculation.npv >= 0 ? 'text-white' : 'text-red-400'}`}>
              {symbol}{Math.round(calculation.npv).toLocaleString()}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Cash Flows</label>
              <p className="text-2xl font-bold text-white mono">{symbol}{calculation.cashflows.slice(1).reduce((a, b) => a + b, 0)}</p>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Discount Rate</label>
              <p className="text-2xl font-bold text-primary-fixed mono">{rate}%</p>
            </div>
          </div>
        </motion.div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">NPV Profile (NPV at Different Rates)</label>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={calculation.pvProfile} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="rate" stroke="#666" fontSize={10} />
                <YAxis stroke="#666" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} formatter={(v) => [symbol + v, 'NPV']} />
                <Line type="monotone" dataKey="npv" stroke="#BDC2FF" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <AboutSection 
          title="NPV Calculator"
          description="The Net Present Value (NPV) Calculator is a fundamental tool for investment analysis and capital budgeting decisions. NPV calculates the present value of all future cash flows from an investment, minus the initial investment, using a specified discount rate. A positive NPV indicates that the investment will generate returns above the required rate of return and should be accepted, while a negative NPV suggests the investment will destroy value and should be rejected. This calculator helps you evaluate investments by discounting future cash flows back to their present value, accounting for the time value of money - the principle that money available today is worth more than the same amount in the future due to its earning potential."
          features={[
            "Calculate NPV at different discount rates",
            "See year-by-year breakdown of cash flows and present values",
            "Visualize NPV profile across different rates",
            "Compare investment alternatives",
            "Make data-driven capital budgeting decisions"
          ]}
          formula="NPV = Σ(CFt / (1+r)^t) - Initial Investment"
        />

        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
export default NPVCalculator;