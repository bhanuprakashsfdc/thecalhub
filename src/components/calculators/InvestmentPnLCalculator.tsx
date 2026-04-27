import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Percent } from 'lucide-react';

export function InvestmentPnLCalculator() {
  const [buyDate, setBuyDate] = useState('');
  const [buyPrice, setBuyPrice] = useState(100);
  const [quantity, setQuantity] = useState(100);
  const [sellPrice, setSellPrice] = useState(150);
  const [sellDate, setSellDate] = useState('');

  const calculation = useMemo(() => {
    if (!buyDate || !sellDate) {
      return null;
    }

    const buyValue = buyPrice * quantity;
    const sellValue = sellPrice * quantity;
    const profit = sellValue - buyValue;
    const profitPercent = buyValue > 0 ? (profit / buyValue) * 100 : 0;
    const isProfit = profit >= 0;

    const buyDateObj = new Date(buyDate);
    const sellDateObj = new Date(sellDate);
    const daysDiff = Math.floor((sellDateObj.getTime() - buyDateObj.getTime()) / (1000 * 60 * 60 * 24));
    const yearsDiff = daysDiff / 365.25;

    let cagr = 0;
    if (yearsDiff > 0 && buyValue > 0) {
      cagr = (Math.pow(sellValue / buyValue, 1 / yearsDiff) - 1) * 100;
    }

    return {
      buyValue: buyValue.toFixed(2),
      sellValue: sellValue.toFixed(2),
      profit: profit.toFixed(2),
      profitPercent: profitPercent.toFixed(2),
      isProfit,
      daysDiff,
      yearsDiff: yearsDiff.toFixed(2),
      cagr: cagr.toFixed(2),
    };
  }, [buyDate, buyPrice, quantity, sellPrice, sellDate]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">
                <Calendar className="w-3 h-3 inline mr-2" />
                Buy Date
              </label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="date"
                value={buyDate}
                max={today}
                onChange={(e) => setBuyDate(e.target.value)}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">
                <DollarSign className="w-3 h-3 inline mr-2" />
                Buy Price (per unit)
              </label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                step="0.01"
                value={buyPrice}
                onChange={(e) => setBuyPrice(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">
                Quantity
              </label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">
                <DollarSign className="w-3 h-3 inline mr-2" />
                Sell Price (per unit)
              </label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                step="0.01"
                value={sellPrice}
                onChange={(e) => setSellPrice(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">
                <Calendar className="w-3 h-3 inline mr-2" />
                Sell Date
              </label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="date"
                value={sellDate}
                min={buyDate}
                max={today}
                onChange={(e) => setSellDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Investment Results</span>
          </div>

          {calculation ? (
            <>
              <div className={`p-6 rounded-xl mb-6 ${calculation.isProfit ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                <div className="flex items-center gap-3">
                  {calculation.isProfit ? (
                    <TrendingUp className="w-8 h-8 text-green-400" />
                  ) : (
                    <TrendingDown className="w-8 h-8 text-red-400" />
                  )}
                  <div>
                    <p className="text-neutral-400 text-sm">Total Profit/Loss</p>
                    <p className={`text-3xl font-bold mono ${calculation.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                      {calculation.isProfit ? '+' : '-'}${Math.abs(Number(calculation.profit)).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-surface-container-highest p-6 rounded-xl">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Total Investment</p>
                  <p className="text-2xl font-bold mono text-white">
                    ${Number(calculation.buyValue).toLocaleString()}
                  </p>
                </div>
                <div className="bg-surface-container-highest p-6 rounded-xl">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Total Value</p>
                  <p className="text-2xl font-bold mono text-white">
                    ${Number(calculation.sellValue).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-surface-container-highest p-6 rounded-xl">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Duration</p>
                  <p className="text-2xl font-bold mono text-white">
                    {calculation.daysDiff} days
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">({calculation.yearsDiff} years)</p>
                </div>
                <div className="bg-surface-container-highest p-6 rounded-xl">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Return %</p>
                  <p className={`text-2xl font-bold mono ${calculation.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                    {calculation.isProfit ? '+' : '-'}{calculation.profitPercent}%
                  </p>
                </div>
              </div>

              <div className="bg-primary-fixed/10 border border-primary-fixed/20 p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Percent className="w-4 h-4 text-primary-fixed" />
                  <p className="text-primary-fixed text-xs uppercase tracking-wider font-bold">Compound Annual Growth Rate (CAGR)</p>
                </div>
                <p className={`text-4xl font-bold mono ${Number(calculation.cagr) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {Number(calculation.cagr) >= 0 ? '+' : ''}{calculation.cagr}%
                </p>
                <p className="text-neutral-500 text-xs mt-2">
                  Annualized return over {calculation.yearsDiff} years
                </p>
              </div>

              <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
                <div className="flex justify-between items-center">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider">Return on Investment</p>
                  <p className={`text-lg font-bold ${calculation.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                    {calculation.isProfit ? 'Profit' : 'Loss'}
                  </p>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2 mt-3">
                  <div 
                    className={`h-2 rounded-full transition-all ${calculation.isProfit ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(Math.abs(Number(calculation.profitPercent)), 100)}%` }}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-neutral-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Select buy and sell dates to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvestmentPnLCalculator;