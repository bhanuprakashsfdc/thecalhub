import React, { useState } from 'react';
import { Delete, Divide, Minus, Plus, X, Equal } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Safe math expression evaluator (no eval())
const evaluateExpression = (expr: string): number => {
  const tokens = expr.split(/\s+/);
  let result = parseFloat(tokens[0]);
  
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const operand = parseFloat(tokens[i + 1]);
    
    if (isNaN(operand)) throw new Error('Invalid');
    
    switch (operator) {
      case '+': result += operand; break;
      case '-': result -= operand; break;
      case '*': result *= operand; break;
      case '/': 
        if (operand === 0) throw new Error('Division by zero');
        result /= operand; 
        break;
      default: throw new Error('Invalid operator');
    }
  }
  
  return result;
};

export function StandardCalc() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const fullExpr = equation + display;
      const result = evaluateExpression(fullExpr);
      setDisplay(String(Math.round(result * 1000000) / 1000000)); // 6 decimal places
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const btnClass = "h-10 rounded flex items-center justify-center text-sm font-mono transition-all active:scale-95";
  const numBtn = cn(btnClass, "bg-white/5 text-neutral-300 hover:bg-white/10");
  const opBtn = cn(btnClass, "bg-primary-fixed/10 text-primary-fixed hover:bg-primary-fixed/20");

  return (
    <div className="bg-surface-container-low p-4 rounded-xl border border-white/5 flex flex-col gap-3 h-full min-h-[320px]">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Standard / v1.0</span>
      </div>
      
      <div className="bg-black/40 rounded-lg p-3 text-right mb-2 border border-white/5">
        <div className="text-[10px] font-mono text-neutral-600 h-4 overflow-hidden">{equation}</div>
        <div className="text-2xl font-mono text-white truncate">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-2 flex-1">
        <button onClick={clear} className={cn(btnClass, "col-span-2 bg-red-500/10 text-red-400 hover:bg-red-500/20")}>AC</button>
        <button onClick={() => setDisplay(prev => prev.slice(0, -1) || '0')} className={numBtn}><Delete className="w-4 h-4" /></button>
        <button onClick={() => handleOperator('/')} className={opBtn}><Divide className="w-4 h-4" /></button>

        {[7, 8, 9].map(n => <button key={n} onClick={() => handleNumber(String(n))} className={numBtn}>{n}</button>)}
        <button onClick={() => handleOperator('*')} className={opBtn}><X className="w-4 h-4" /></button>

        {[4, 5, 6].map(n => <button key={n} onClick={() => handleNumber(String(n))} className={numBtn}>{n}</button>)}
        <button onClick={() => handleOperator('-')} className={opBtn}><Minus className="w-4 h-4" /></button>

        {[1, 2, 3].map(n => <button key={n} onClick={() => handleNumber(String(n))} className={numBtn}>{n}</button>)}
        <button onClick={() => handleOperator('+')} className={opBtn}><Plus className="w-4 h-4" /></button>

        <button onClick={() => handleNumber('0')} className={cn(numBtn, "col-span-2")}>0</button>
        <button onClick={() => handleNumber('.')} className={numBtn}>.</button>
        <button onClick={calculate} className={cn(btnClass, "bg-primary-fixed text-on-primary-fixed hover:opacity-90")}><Equal className="w-4 h-4" /></button>
      </div>
    </div>
  );
}
