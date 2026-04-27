import { useState } from 'react';
import { ArrowLeftRight, Copy, Check, AlertCircle } from 'lucide-react';

export function Base64Encoder() {
  const [input, setInput] = useState('Hello World');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const result = (() => {
    try {
      if (mode === 'encode') {
        return { output: btoa(input), error: null };
      } else {
        return { output: atob(input), error: null };
      }
    } catch (e) {
      return { output: '', error: (e as Error).message };
    }
  })();

  const [copied, setCopied] = useState(false);

  const copyOutput = () => {
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('encode')}
                  className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                    mode === 'encode'
                      ? "bg-primary-fixed text-on-primary-fixed font-bold"
                      : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                  }`}
                >
                  Encode
                </button>
                <button
                  onClick={() => setMode('decode')}
                  className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                    mode === 'decode'
                      ? "bg-primary-fixed text-on-primary-fixed font-bold"
                      : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                  }`}
                >
                  Decode
                </button>
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">
                {mode === 'encode' ? 'Plain Text' : 'Base64 String'}
              </label>
              <textarea
                className="w-full h-32 bg-surface-container-highest border-none rounded-lg p-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-lg outline-none resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between text-primary-fixed mb-6">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Result</span>
            </div>
            <button
              onClick={copyOutput}
              disabled={!result.output}
              className="p-2 hover:bg-neutral-700 rounded-lg transition-colors disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {result.error ? (
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <p className="font-medium">Error</p>
              </div>
              <p className="text-red-300 text-sm mt-2">
                {mode === 'decode' ? 'Invalid Base64 string' : result.error}
              </p>
            </div>
          ) : (
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">
                {mode === 'encode' ? 'Base64 Output' : 'Decoded Output'}
              </p>
              <p className="text-xl text-white mono break-all">{result.output}</p>
            </div>
          )}

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Quick Examples</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setInput('SGVsbG8gV29ybGQ='); setMode('decode'); }}
                className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs text-neutral-300"
              >
                Decode "SGVsbG8gV29ybGQ="
              </button>
              <button
                onClick={() => { setInput('TheCalHub'); setMode('encode'); }}
                className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs text-neutral-300"
              >
                Encode "TheCalHub"
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Base64Encoder;