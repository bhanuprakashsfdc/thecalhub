import { useState, useMemo } from 'react';
import { CreditCard } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function TipCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [bill, setBill] = useState(50);
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(1);

  const faqs = [
    { question: "What is a good tip percentage?", answer: "Standard tipping: 15-20% for adequate service, 20-25% for excellent service, 10% for below average. In the US, servers often depend on tips as primary income, so 15-20% is expected. In Europe, 5-10% shows appreciation. In Japan, tipping can be offensive. Adjust based on local customs. For large groups (6+), many restaurants add 18-20% automatically." },
    { question: "Should I tip on before or after tax amount?", answer: "Tip should be calculated on the pre-tax bill amount. You're rewarding service, not the government's tax collection. However, some people do tip on post-tax to simplify calculations. The difference is usually small - on a 100 bill with 8% tax, tip on 100 is 15-20, tip on 108 is 16.20-21.60. Either approach is acceptable, but the pre-tax method is more technically correct." },
    { question: "How do I calculate tip for multiple people?", answer: "Divide the total tip by number of people. Example: 100 bill, 20% tip = 20 tip, total 120. Split 3 ways = 40 each. Many apps now allow splitting by exact amount or percentage per person. You can also use this calculator - just enter the number of people and it automatically calculates per-person share including tip." },
    { question: "When should I not tip?", answer: "Skip tipping in countries where it's not customary (Japan, South Korea, parts of Europe). Don't feel obligated for terrible service - but consider whether the issue was controllable. Some restaurants include service charge (check your bill). In India, rounding up or 10% is common. In luxury hotels, service charge may already be included - check before adding more." },
    { question: "What about tipping delivery or takeout?", answer: "For delivery, 10-15% is standard - they drove your food and brought it to you. For takeout, 5-10% or no tip is acceptable - you're just picking up. During COVID, many people increased takeout tips to support workers. Fast food usually doesn't expect tips. Grocery delivery: 10-15% for normal orders, more for heavy/bulky items." },
    { question: "How does tip affect service workers?", answer: "In the US, tipped workers often have lower base wages (as low as 2.13/hour) with the expectation tips will make up the difference. Average server earns 8-15/hour from tips. Good tips can significantly impact their livelihood. Studies show tip amounts correlate more with customer demographics than service quality. Consider the worker's situation when deciding tip amount." }
  ];

  const calculation = useMemo(() => {
    const tipAmount = (bill * tipPercent) / 100;
    const total = bill + tipAmount;
    const perPerson = total / people;
    const pieData = [
      { name: 'Bill', value: bill, color: '#D6ED79' },
      { name: 'Tip', value: tipAmount, color: '#BDC2FF' },
    ];
    return { tipAmount, total, perPerson, pieData };
  }, [bill, tipPercent, people]);

  const tipAmounts = ['10', '15', '18', '20', '25'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Bill Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Tip Percentage</label>
              <div className="flex gap-2">
                {tipAmounts.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipPercent(Number(t))}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                      tipPercent === Number(t) ? 'bg-primary-fixed text-on-primary-fixed shadow-lg' : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                    }`}
                  >
                    {t}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Number of People</label>
              <input type="number" value={people} onChange={(e) => setPeople(Number(e.target.value))} min="1"
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CreditCard className="w-32 h-32 text-primary-fixed" />
          </div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Per Person</label>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-5xl font-black text-white mono">{symbol}{calculation.perPerson.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1"> Tip Amount</label>
              <p className="text-2xl font-bold text-white mono">{symbol}{calculation.tipAmount.toFixed(2)}</p>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total</label>
              <p className="text-2xl font-bold text-primary-fixed mono">{symbol}{calculation.total.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Bill vs Tip</label>
          <div className="relative w-40 h-40 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={calculation.pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">{calculation.pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie></PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Tip</span>
              <span className="text-xl font-black text-white mono">{tipPercent}%</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#D6ED79]"></div><span className="text-xs text-neutral-400">Bill</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#BDC2FF]"></div><span className="text-xs text-neutral-400">Tip</span></div>
          </div>
        </div>

        <AboutSection title="Tip Calculator" description="The Tip Calculator helps you calculate the appropriate tip amount based on your bill, preferred tip percentage, and number of people splitting the bill. Tipping is customary in many countries, especially for restaurant service, but the percentages vary by country and service quality. This calculator makes it easy to determine fair tip amounts, split the total among friends, and understand the breakdown between your bill and the tip. Whether you're dining domestically or internationally, this tool helps you navigate tipping customs with confidence." features={["Calculate exact tip amount for any bill", "Determine fair tip percentage based on service quality", "Split tip and total among multiple people", "Visualize bill vs tip breakdown", "Navigate tipping customs with confidence"]} formula="Tip = Bill Amount × Tip Percentage" />

        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}

export default TipCalculator;
