import { useState } from 'react';

export default function RetirementCalculator() {
  const [age, setAge] = useState('30');
  const [retireAge, setRetireAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('10000');
  const [monthly, setMonthly] = useState('500');
  const [returnRate, setReturnRate] = useState('7');
  const [result, setResult] = useState('');

  const calculate = () => {
    const years = parseInt(retireAge) - parseInt(age);
    const rate = parseFloat(returnRate) / 100 / 12;
    const months = years * 12;
    const savings = parseFloat(currentSavings);
    const monthlyContrib = parseFloat(monthly);

    if (years <= 0) { setResult('Retirement age must be greater than current age'); return; }

    const futureSavings = savings * Math.pow(1 + rate, months) + monthlyContrib * ((Math.pow(1 + rate, months) - 1) / rate);
    const totalContrib = savings + monthlyContrib * months;
    const totalInterest = futureSavings - totalContrib;

    setResult(`Projected Savings: $${futureSavings.toFixed(2)}\nTotal Contributions: $${totalContrib.toFixed(2)}\nTotal Interest: $${totalInterest.toFixed(2)}`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Retirement Calculator</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Current Age" className="w-full p-3 border rounded-lg" />
          <input type="number" value={retireAge} onChange={(e) => setRetireAge(e.target.value)} placeholder="Retirement Age" className="w-full p-3 border rounded-lg" />
        </div>
        <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} placeholder="Current Savings ($)" className="w-full p-3 border rounded-lg" />
        <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} placeholder="Monthly Contribution ($)" className="w-full p-3 border rounded-lg" />
        <input type="number" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} placeholder="Expected Return (%)" className="w-full p-3 border rounded-lg" />
        <button onClick={calculate} className="w-full bg-primary text-white p-3 rounded-lg hover:opacity-90">Calculate</button>
        {result && <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-line text-center font-semibold">{result}</div>}
      </div>
    </div>
  );
}