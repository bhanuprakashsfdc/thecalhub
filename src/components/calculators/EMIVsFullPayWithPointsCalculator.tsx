import { useState, useMemo } from 'react';
import { useI18n } from '../../lib/i18n';

export default function EMIVsFullPayWithPointsCalculator() {
  const { getCurrencySymbol } = useI18n();
  const [loanAmount] = useState(250000);
  const [interestRate] = useState(7.5);
  const [tenure] = useState(15);
  const [propertyPrice] = useState(500000);
  const [downPaymentPercent] = useState(20);
  const [creditCardPoints] = useState(100000);
  const [pointsValue] = useState(0.01);

  const calculateEMI = (principal: number, annualRate: number, years: number) => {
    const monthlyRate = annualRate / 100 / 12;
    const totalPayments = years * 12;
    if (monthlyRate === 0) return principal / totalPayments;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
  };

  const result = useMemo(() => {
    const emi = calculateEMI(loanAmount, interestRate, tenure);
    const totalEmiPaid = emi * tenure * 12;
    const totalInterest = totalEmiPaid - loanAmount;
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const amountFinanced = propertyPrice - downPayment;
    const pointsEarned = Math.floor(amountFinanced * 2);
    const pointsValueRedeemed = Math.min(creditCardPoints, pointsEarned) * pointsValue;
    const effectiveCost = amountFinanced - pointsValueRedeemed;
    const netSavings = totalEmiPaid - effectiveCost;
    const emiVsFullPay = netSavings > 0 ? 'full-pay' : netSavings < 0 ? 'emi' : 'tie';
    return { emi, totalEmiPaid, totalInterest, effectiveCost, netSavings, emiVsFullPay };
  }, [loanAmount, interestRate, tenure, propertyPrice, downPaymentPercent, creditCardPoints, pointsValue]);

  return (
    <div>
      <h2>EMI vs Full Pay with Points</h2>
      <p>EMI: {result.emi}</p>
      <p>Net Savings: {result.netSavings}</p>
      <p>Best Option: {result.emiVsFullPay}</p>
    </div>
  );
}
