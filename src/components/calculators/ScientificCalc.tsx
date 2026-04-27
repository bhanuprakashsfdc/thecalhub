import { useState } from 'react';
import { FlaskConical } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Safe math expression evaluator
const safeMath = (expr: string): number => {
  if (!expr || expr === '0') return 0;
  
  // Only allow numbers, operators, and decimal point
  if (!/^[\d+\-*/.]+$/.test(expr)) {
    throw new Error('Invalid expression');
  }
  
  // Tokenize and evaluate
  const tokens = expr.match(/(\d+\.?\d*|[+\-*/])/g) || [];
  if (tokens.length === 0) throw new Error('Invalid');
  
  let result = parseFloat(tokens[0]!);
  
  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const val = parseFloat(tokens[i + 1]);
    
    if (isNaN(val)) throw new Error('Invalid');
    
    switch (op) {
      case '+': result = result + val; break;
      case '-': result = result - val; break;
      case '*': result = result * val; break;
      case '/': 
        if (val === 0) throw new Error('Division by zero');
        result = result / val; 
        break;
      default: throw new Error('Invalid operator');
    }
  }
  
  return result;
};

export default function ScientificCalc() {
  const [display, setDisplay] = useState('0');


  const handleFunc = (func: string) => {
    const val = parseFloat(display);
    let res = 0;
    switch(func) {
      case 'sin': res = Math.sin(val); break;
      case 'cos': res = Math.cos(val); break;
      case 'tan': res = Math.tan(val); break;
      case 'log': res = Math.log10(val); break;
      case 'ln': res = Math.log(val); break;
      case 'sqrt': res = Math.sqrt(val); break;
      case 'pow2': res = Math.pow(val, 2); break;
      case 'pi': res = Math.PI; break;
      default: res = val;
    }
    setDisplay(String(res.toFixed(6)));
  };

  const btnClass = "h-8 rounded flex items-center justify-center text-[10px] font-mono transition-all active:scale-95";
  const funcBtn = cn(btnClass, "bg-secondary-container/10 text-secondary-container hover:bg-secondary-container/20 border border-secondary-container/20");
  const numBtn = cn(btnClass, "bg-white/5 text-neutral-400 hover:bg-white/10");

  const handleNumber = (n: string) => {
    setDisplay(prev => prev === '0' ? n : prev + n);
  };

  const calculate = () => {
    try {
      const result = safeMath(display);
      setDisplay(String(Math.round(result * 1000000) / 1000000));
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
  };

  return (
    <div className="bg-surface-container-low p-4 rounded-xl border border-white/5 flex flex-col gap-3 h-full min-h-[320px]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Scientific / v0.9</span>
        <FlaskConical className="w-4 h-4 text-secondary-container" />
      </div>

      <div className="bg-black/40 rounded-lg p-3 text-right mb-1 border border-white/5">
        <div className="text-xl font-mono text-white truncate">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 flex-1">
        {['sin', 'cos', 'tan', 'sqrt'].map(f => (
          <button key={f} onClick={() => handleFunc(f)} className={funcBtn}>{f}</button>
        ))}
        {['log', 'ln', 'pow2', 'pi'].map(f => (
          <button key={f} onClick={() => handleFunc(f)} className={funcBtn}>{f}</button>
        ))}
        
        <div className="col-span-4 grid grid-cols-4 gap-1.5 mt-2">
          {[7, 8, 9, '/'].map(n => <button key={n} onClick={() => handleNumber(String(n))} className={numBtn}>{n}</button>)}
          {[4, 5, 6, '*'].map(n => <button key={n} onClick={() => handleNumber(String(n))} className={numBtn}>{n}</button>)}
          {[1, 2, 3, '-'].map(n => <button key={n} onClick={() => handleNumber(String(n))} className={numBtn}>{n}</button>)}
          {['0', '.', '=', '+'].map(n => (
            <button 
              key={n} 
              onClick={() => n === '=' ? calculate() : handleNumber(n)} 
              className={n === '=' ? cn(btnClass, "bg-primary-fixed text-on-primary-fixed") : numBtn}
            >
              {n}
            </button>
          ))}
        </div>
        
        <button onClick={clear} className="col-span-4 h-8 mt-1 rounded bg-red-500/10 text-red-400 text-[10px] font-mono uppercase tracking-widest">Clear Buffer</button>
      </div>
    </div>
  );
}
