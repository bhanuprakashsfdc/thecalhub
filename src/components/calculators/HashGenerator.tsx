import { useState } from 'react';
import { Hash, Copy, Check } from 'lucide-react';

export function HashGenerator() {
  const [input, setInput] = useState('Hello World');

  const simpleHash = (str: string, seed: number): number => {
    let h = seed;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 2654435761);
    }
    return (h ^ (h >>> 16)) >>> 0;
  };

  const hashes = {
    md5: simpleHash(input, 0).toString(16).padStart(8, '0').repeat(4).slice(0, 32),
    sha1: simpleHash(input, 1).toString(16).padStart(8, '0').repeat(5).slice(0, 40),
    sha256: simpleHash(input, 2).toString(16).padStart(8, '0').repeat(8).slice(0, 64),
  };

  const [copied, setCopied] = useState<string | null>(null);

  const copyHash = (hash: string, type: string) => {
    navigator.clipboard.writeText(hash);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const hashTypes = [
    { name: 'MD5', value: hashes.md5, note: '128-bit (demo)' },
    { name: 'SHA-1', value: hashes.sha1, note: '160-bit (demo)' },
    { name: 'SHA-256', value: hashes.sha256, note: '256-bit (demo)' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Input String</label>
              <textarea
                className="w-full h-32 bg-surface-container-highest border-none rounded-lg p-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-lg outline-none resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
          <p className="text-yellow-400 text-sm">
            <strong>Note:</strong> Demo hashes only. Use a crypto library for production.
          </p>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <Hash className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Hash Values</span>
          </div>

          <div className="space-y-4">
            {hashTypes.map((h) => (
              <div key={h.name} className="bg-surface-container-highest p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-lg font-bold text-primary-fixed">{h.name}</p>
                    <p className="text-xs text-neutral-500">{h.note}</p>
                  </div>
                  <button
                    onClick={() => copyHash(h.value, h.name)}
                    className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    {copied === h.name ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-neutral-500" />
                    )}
                  </button>
                </div>
                <code className="text-sm text-neutral-300 font-mono break-all">{h.value}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HashGenerator;