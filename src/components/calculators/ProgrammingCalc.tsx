import { useState } from 'react';
import { Terminal } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function ProgrammingCalc() {
  const [value, setValue] = useState(0);

  const handleInput = (val: string) => {
    const num = parseInt(val) || 0;
    setValue(num);
  };

  const btnClass = "h-8 rounded flex items-center justify-center text-[10px] font-mono transition-all active:scale-95";
  const baseLabel = "text-[9px] font-mono text-neutral-600 uppercase tracking-widest block mb-1";
  const baseValue = "text-sm font-mono text-white bg-black/30 p-2 rounded border border-white/5 break-all";

  return (
    <div className="bg-surface-container-low p-4 rounded-xl border border-white/5 flex flex-col gap-4 h-full min-h-[320px]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Programming / Base</span>
        <Terminal className="w-4 h-4 text-primary-fixed" />
      </div>

      <div>
        <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2 block">Decimal Input</label>
        <input 
          type="number" 
          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-lg font-mono text-white focus:border-primary-fixed/50 outline-none transition-colors"
          value={value}
          onChange={(e) => handleInput(e.target.value)}
        />
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        <div>
          <label className={baseLabel}>Hexadecimal</label>
          <div className={cn(baseValue, "text-primary-fixed")}>0x{value.toString(16).toUpperCase()}</div>
        </div>
        <div>
          <label className={baseLabel}>Binary</label>
          <div className={baseValue}>{value.toString(2).padStart(8, '0').match(/.{1,4}/g)?.join(' ') || '0000'}</div>
        </div>
        <div>
          <label className={baseLabel}>Octal</label>
          <div className={baseValue}>0o{value.toString(8)}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-auto">
        <button onClick={() => setValue(prev => prev << 1)} className={cn(btnClass, "bg-white/5 text-neutral-400 hover:bg-white/10")}>LSH {"(<<)"}</button>
        <button onClick={() => setValue(prev => prev >> 1)} className={cn(btnClass, "bg-white/5 text-neutral-400 hover:bg-white/10")}>RSH {"(>>)"}</button>
      </div>
    </div>
  );
}
