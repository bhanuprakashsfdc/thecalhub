import { useState, useMemo } from 'react';
import { HardDrive } from 'lucide-react';

export function MemorySizeCalculator() {
  const [bytes, setBytes] = useState(1073741824);

  const conversions = useMemo(() => {
    return {
      bits: bytes * 8,
      bytes: bytes,
      kilobytes: bytes / 1024,
      megabytes: bytes / Math.pow(1024, 2),
      gigabytes: bytes / Math.pow(1024, 3),
      terabytes: bytes / Math.pow(1024, 4),
      petabytes: bytes / Math.pow(1024, 5),
    };
  }, [bytes]);

  const formatNumber = (num: number) => {
    if (num < 1000) return num.toFixed(0);
    if (num < 1000000) return (num / 1000).toFixed(2) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(2) + 'M';
    return (num / 1000000000).toFixed(2) + 'B';
  };

  const presets = [
    { name: '1 Bit', value: 1 },
    { name: '1 Byte', value: 1 },
    { name: '1 KB', value: 1024 },
    { name: '1 MB', value: 1048576 },
    { name: '1 GB', value: 1073741824 },
    { name: '1 TB', value: 1099511627776 },
    { name: '4 GB RAM', value: 4294967296 },
    { name: '8 GB RAM', value: 8589934592 },
    { name: '16 GB RAM', value: 17179869184 },
    { name: '1 SSD (256GB)', value: 274877906944 },
    { name: '1 HDD (1TB)', value: 1099511627776 },
    { name: '1 HDD (2TB)', value: 2199023255552 },
  ];

  const units = [
    { label: 'Bits', value: 'bits', size: conversions.bits },
    { label: 'Bytes', value: 'bytes', size: conversions.bytes },
    { label: 'KB', value: 'kilobytes', size: conversions.kilobytes },
    { label: 'MB', value: 'megabytes', size: conversions.megabytes },
    { label: 'GB', value: 'gigabytes', size: conversions.gigabytes },
    { label: 'TB', value: 'terabytes', size: conversions.terabytes },
    { label: 'PB', value: 'petabytes', size: conversions.petabytes },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Bytes</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                value={bytes}
                onChange={(e) => setBytes(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Quick Presets</label>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setBytes(p.value)}
                    className="px-3 py-2 bg-surface-container-highest hover:bg-neutral-700 rounded-lg text-xs text-neutral-300"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <HardDrive className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Memory Sizes</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {units.map((u) => (
              <div key={u.label} className="bg-surface-container-highest p-4 rounded-xl">
                <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">{u.label}</p>
                <p className="text-2xl font-bold text-white mono">{formatNumber(u.size)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">Quick Reference</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-400">1 Byte = 8 bits</span>
                <span className="text-neutral-400">1 KB = 1,024 bytes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">1 MB = 1,024 KB</span>
                <span className="text-neutral-400">1 GB = 1,024 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">1 TB = 1,024 GB</span>
                <span className="text-neutral-400">1 PB = 1,024 TB</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <p className="text-yellow-400 text-sm">
              <strong>Note:</strong> Some manufacturers use 1 GB = 1,000,000,000 bytes (decimal) 
              instead of 1,073,741,824 bytes (binary).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemorySizeCalculator;