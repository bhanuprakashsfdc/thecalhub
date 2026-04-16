import { useState } from 'react';

export default function TaxCalculator() {
  const [income, setIncome] = useState('50000');
  const [status, setStatus] = useState('single');
  const [result, setResult] = useState('');

  const calculate = () => {
    const inc = parseFloat(income);
    if (isNaN(inc)) { setResult('Please enter valid income'); return; }

    let tax = 0;
    const rate = status === 'single' ? [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37] : [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
    const brackets = [11600, 47150, 100525, 191950, 243725, 609350];
    
    if (inc <= 11600) tax = inc * 0.1;
    else if (inc <= 47150) tax = 1160 + (inc - 11600) * 0.12;
    else if (inc <= 100525) tax = 5426 + (inc - 47150) * 0.22;
    else if (inc <= 191950) tax = 16758 + (inc - 100525) * 0.24;
    else if (inc <= 243725) tax = 38740 + (inc - 191950) * 0.32;
    else if (inc <= 609350) tax = 55328 + (inc - 243725) * 0.35;
    else tax = 181954 + (inc - 609350) * 0.37;

    setResult(`Estimated Tax: $${tax.toFixed(2)}\nEffective Rate: ${((tax / inc) * 100).toFixed(1)}%`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Tax Calculator</h2>
      <div className="space-y-4">
        <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="Annual Income ($)" className="w-full p-3 border rounded-lg" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-3 border rounded-lg">
          <option value="single">Single</option>
          <option value="married">Married</option>
        </select>
        <button onClick={calculate} className="w-full bg-primary text-white p-3 rounded-lg hover:opacity-90">Calculate</button>
        {result && <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-line text-center font-semibold">{result}</div>}
      </div>
    </div>
  );
}