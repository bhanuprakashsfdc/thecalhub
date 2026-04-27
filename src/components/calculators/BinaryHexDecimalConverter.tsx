import { useState } from 'react';
import { Binary } from 'lucide-react';

export function BinaryHexDecimalConverter() {
  const [decimal, setDecimal] = useState(255);
  const [binary, setBinary] = useState('11111111');
  const [hex, setHex] = useState('FF');
  const [octal, setOctal] = useState('377');

  const updateFromDecimal = (val: number) => {
    setDecimal(val);
    setBinary(val.toString(2));
    setHex(val.toString(16).toUpperCase());
    setOctal(val.toString(8));
  };

  const updateFromBinary = (val: string) => {
    setBinary(val);
    const dec = parseInt(val, 2);
    if (!isNaN(dec)) {
      setDecimal(dec);
      setHex(dec.toString(16).toUpperCase());
      setOctal(dec.toString(8));
    }
  };

  const updateFromHex = (val: string) => {
    setHex(val);
    const dec = parseInt(val, 16);
    if (!isNaN(dec)) {
      setDecimal(dec);
      setBinary(dec.toString(2));
      setOctal(dec.toString(8));
    }
  };

  const updateFromOctal = (val: string) => {
    setOctal(val);
    const dec = parseInt(val, 8);
    if (!isNaN(dec)) {
      setDecimal(dec);
      setBinary(dec.toString(2));
      setHex(dec.toString(16).toUpperCase());
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Decimal (Base 10)</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                value={decimal}
                onChange={(e) => updateFromDecimal(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Binary (Base 2)</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="text"
                value={binary}
                onChange={(e) => updateFromBinary(e.target.value.replace(/[^01]/g, ''))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Hexadecimal (Base 16)</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="text"
                value={hex}
                onChange={(e) => updateFromHex(e.target.value.replace(/[^0-9A-Fa-f]/g, ''))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Octal (Base 8)</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="text"
                value={octal}
                onChange={(e) => updateFromOctal(e.target.value.replace(/[^0-7]/g, ''))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <Binary className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Quick Conversions</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { val: 0, label: '0' },
              { val: 1, label: '1' },
              { val: 7, label: '7' },
              { val: 8, label: '8' },
              { val: 15, label: 'F (15)' },
              { val: 16, label: '10' },
              { val: 255, label: 'FF (255)' },
              { val: 256, label: '100' },
              { val: 1024, label: '400' },
              { val: 4096, label: '1000' },
              { val: 65535, label: 'FFFF' },
              { val: 16777215, label: 'FFFFFF' },
            ].map((item) => (
              <button
                key={item.val}
                onClick={() => updateFromDecimal(item.val)}
                className="bg-surface-container-highest p-4 rounded-xl text-left hover:bg-neutral-700 transition-colors"
              >
                <p className="text-xl font-bold text-white mono">{item.label}</p>
                <p className="text-sm text-neutral-500">Decimal: {item.val}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BinaryHexDecimalConverter;