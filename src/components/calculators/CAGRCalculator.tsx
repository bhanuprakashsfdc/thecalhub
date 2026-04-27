import { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { useI18n } from '../../lib/i18n';
import { DonutChart, FAQSection, AboutSection } from '../../components/common/DonutChart';

export function CAGRCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [initialValue, setInitialValue] = useState(10000);
  const [finalValue, setFinalValue] = useState(15000);
  const [years, setYears] = useState(5);

  const calculation = useMemo(() => {
    const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
    const totalReturn = ((finalValue - initialValue) / initialValue) * 100;
    const annualizedReturn = totalReturn / years;
    
    return {
      cagr: cagr.toFixed(2),
      totalReturn: totalReturn.toFixed(2),
      annualizedReturn: annualizedReturn.toFixed(2),
      multiplier: (finalValue / initialValue).toFixed(2),
    };
  }, [initialValue, finalValue, years]);

  const pieData = [
    { name: 'Initial Investment', value: initialValue, color: '#D6ED79' },
    { name: 'Growth', value: finalValue - initialValue, color: '#BDC2FF' },
  ];

  const faqs = [
    {
      question: "What is CAGR and why is it important?",
      answer: "CAGR (Compound Annual Growth Rate) is the mean annual growth rate of an investment over a specified period of time longer than one year. It represents the steady rate of return that would bring the initial investment to its final value. Unlike simple averages, CAGR accounts for the compounding effect, giving you a more accurate picture of investment performance over time."
    },
    {
      question: "How is CAGR different from simple return?",
      answer: "Simple return only calculates the percentage difference between initial and final values without considering the time period or compounding. CAGR smooths out the volatility and gives you the equivalent annual growth rate that would produce the same final result. For example, a 100% return over 10 years is very different from 100% over 1 year, and CAGR captures this difference."
    },
    {
      question: "Can CAGR be negative?",
      answer: "Yes, CAGR can be negative when the final value is less than the initial investment. A negative CAGR indicates declining value over the time period. However, it's important to note that CAGR assumes a steady decline or growth, which may not reflect actual market volatility."
    },
    {
      question: "What is a good CAGR for investments?",
      answer: "A 'good' CAGR depends on the type of investment and time period. Historically, the stock market has returned around 7-10% annually after inflation. A CAGR above 15% is considered strong for equities, while 5-8% might be more realistic for bonds. Always compare CAGR against appropriate benchmarks and consider inflation."
    },
    {
      question: "How do I use CAGR to compare investments?",
      answer: "Use CAGR to compare investments with different time horizons by normalizing the returns to annual figures. However, ensure you're comparing investments with similar risk profiles and in the same asset class. Also consider that past performance doesn't guarantee future results."
    },
    {
      question: "What are the limitations of CAGR?",
      answer: "CAGR assumes steady growth which rarely happens in reality - investments typically have ups and downs. It also hides the volatility and risk behind the numbers. Additionally, CAGR can give misleading results for investments with irregular cash flows or those that went to zero and recovered."
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Initial Value</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={initialValue}
                  onChange={(e) => setInitialValue(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Final Value</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={finalValue}
                  onChange={(e) => setFinalValue(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Time Period (Years)</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[1, 3, 5, 10].map((y) => (
                  <button
                    key={y}
                    onClick={() => setYears(y)}
                    className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                      years === y
                        ? "bg-primary-fixed text-on-primary-fixed"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {y}Y
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
          <h4 className="text-white font-bold mb-4">Investment Breakdown</h4>
          <div className="flex justify-center mb-4">
            <DonutChart 
              data={pieData} 
              centerText={`${Number(calculation.multiplier).toFixed(1)}x`}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#D6ED79]"></div>
                <span className="text-neutral-400 text-sm">Initial Investment</span>
              </div>
              <span className="text-white font-mono">{symbol}{initialValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#BDC2FF]"></div>
                <span className="text-neutral-400 text-sm">Growth</span>
              </div>
              <span className="text-green-400 font-mono">+{symbol}{(finalValue - initialValue).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">CAGR Results</span>
          </div>

          <div className={`p-6 rounded-xl mb-6 ${Number(calculation.cagr) >= 0 ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
            <div className="flex items-center gap-3">
              <TrendingUp className={`w-8 h-8 ${Number(calculation.cagr) >= 0 ? 'text-green-400' : 'text-red-400'}`} />
              <div>
                <p className="text-neutral-400 text-sm">CAGR</p>
                <p className={`text-3xl font-bold mono ${Number(calculation.cagr) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {Number(calculation.cagr) >= 0 ? '+' : ''}{calculation.cagr}%
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Total Return</p>
              <p className={`text-2xl font-bold mono ${Number(calculation.totalReturn) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {Number(calculation.totalReturn) >= 0 ? '+' : ''}{calculation.totalReturn}%
              </p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Multiplier</p>
              <p className="text-2xl font-bold text-white mono">{calculation.multiplier}x</p>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Growth Projection</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-400">Initial</span>
              <span className="text-white mono">{symbol}{initialValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-400">{years} years later</span>
              <span className="text-white mono">{symbol}{finalValue.toLocaleString()}</span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2 mt-3">
              <div 
                className={`h-2 rounded-full transition-all ${Number(calculation.cagr) >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(Math.abs(Number(calculation.cagr)) / 50 * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <AboutSection 
          title="CAGR Calculator"
          description="The Compound Annual Growth Rate (CAGR) calculator measures the mean annual growth rate of an investment over a specified time period greater than one year. It smooths out the volatility of periodic returns to show what the constant annual rate would have been over the investment period. This is one of the most widely used metrics for comparing investment performance across different time horizons."
          features={[
            "Calculates the smoothed annual growth rate",
            "Shows total return percentage over the period",
            "Displays investment multiplier (how many times the investment grew)",
            "Allows quick comparison between different investments",
            "Provides visual breakdown of initial investment vs growth"
          ]}
          formula="CAGR = (Final Value / Initial Value)^(1/Years) - 1"
        />

        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}

export default CAGRCalculator;