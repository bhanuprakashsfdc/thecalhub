import { useState } from 'react';

export default function InvestmentCalculator() {
  const [initial, setInitial] = useState('10000');
  const [monthly, setMonthly] = useState('500');
  const [rate, setRate] = useState('8');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState('');

  const calculate = () => {
    const init = parseFloat(initial);
    const mon = parseFloat(monthly);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (isNaN(init) || isNaN(mon) || isNaN(r) || isNaN(n)) { setResult('Please enter valid values'); return; }

    const futureValue = init * Math.pow(1 + r, n) + mon * ((Math.pow(1 + r, n) - 1) / r);
    const totalInvested = init + mon * n;
    const totalInterest = futureValue - totalInvested;

    setResult(`Future Value: $${futureValue.toFixed(2)}\nTotal Invested: $${totalInvested.toFixed(2)}\nTotal Interest: $${totalInterest.toFixed(2)}`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Investment Calculator</h2>
      <div className="space-y-4">
        <input type="number" value={initial} onChange={(e) => setInitial(e.target.value)} placeholder="Initial Investment ($)" className="w-full p-3 border rounded-lg" />
        <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} placeholder="Monthly Contribution ($)" className="w-full p-3 border rounded-lg" />
        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Annual Return (%)" className="w-full p-3 border rounded-lg" />
        <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="Years" className="w-full p-3 border rounded-lg" />
        <button onClick={calculate} className="w-full bg-primary text-white p-3 rounded-lg hover:opacity-90">Calculate</button>
        {result && <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-line text-center font-semibold">{result}</div>}
      </div>
    </div>
  );
}