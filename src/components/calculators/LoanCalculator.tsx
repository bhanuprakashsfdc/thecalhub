import { useState } from 'react';

export default function LoanCalculator() {
  const [amount, setAmount] = useState('50000');
  const [rate, setRate] = useState('10');
  const [years, setYears] = useState('5');
  const [result, setResult] = useState('');

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(years) * 12;

    if (isNaN(p) || isNaN(r) || isNaN(n)) { setResult('Please enter valid values'); return; }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;

    setResult(`Monthly Payment: $${emi.toFixed(2)}\nTotal Payment: $${total.toFixed(2)}\nTotal Interest: $${(total - p).toFixed(2)}`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Loan Calculator</h2>
      <div className="space-y-4">
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Loan Amount ($)" className="w-full p-3 border rounded-lg" />
        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Interest Rate (%)" className="w-full p-3 border rounded-lg" />
        <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="Term (years)" className="w-full p-3 border rounded-lg" />
        <button onClick={calculate} className="w-full bg-primary text-white p-3 rounded-lg hover:opacity-90">Calculate</button>
        {result && <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-line text-center font-semibold">{result}</div>}
      </div>
    </div>
  );
}