import { useState, useMemo } from 'react';
import { Braces, Copy, Check, AlertCircle } from 'lucide-react';

export function JSONFormatter() {
  const [input, setInput] = useState('{"name": "John", "age": 30, "city": "New York"}');
  const [minified, setMinified] = useState(false);
  const [indent, setIndent] = useState(2);

  const result = useMemo(() => {
    try {
      const parsed = JSON.parse(input);
      const formatted = minified 
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, indent);
      return { valid: true, output: formatted, error: null };
    } catch (e) {
      return { valid: false, output: '', error: (e as Error).message };
    }
  }, [input, minified, indent]);

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
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Input JSON</label>
              <textarea
                className="w-full h-64 bg-surface-container-highest border-none rounded-lg p-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-sm outline-none resize-none font-mono"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"key": "value"}'
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Indent</label>
                <select
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white focus:ring-1 focus:ring-primary-fixed outline-none"
                  value={indent}
                  onChange={(e) => setIndent(Number(e.target.value))}
                >
                  <option value={2}>2 spaces</option>
                  <option value={4}>4 spaces</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Output</label>
                <button
                  onClick={() => setMinified(!minified)}
                  className={`w-full py-4 rounded-lg font-medium transition-colors ${
                    minified 
                      ? "bg-primary-fixed text-on-primary-fixed" 
                      : "bg-surface-container-highest text-neutral-300"
                  }`}
                >
                  {minified ? 'Minified' : 'Formatted'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between text-primary-fixed mb-6">
            <div className="flex items-center gap-2">
              <Braces className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Output</span>
            </div>
            <button
              onClick={copyOutput}
              className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {result.valid ? (
            <textarea
              className="w-full h-64 bg-surface-container-highest border-none rounded-lg p-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-sm outline-none resize-none font-mono"
              value={result.output}
              readOnly
            />
          ) : (
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <p className="font-medium">Invalid JSON</p>
              </div>
              <p className="text-red-300 text-sm mt-2">{result.error}</p>
            </div>
          )}

          {result.valid && (
            <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">Statistics</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-neutral-400 text-xs">Keys</p>
                  <p className="text-xl text-white mono">
                    {Object.keys(JSON.parse(input)).length}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-400 text-xs">Characters</p>
                  <p className="text-xl text-white mono">{result.output.length}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-xs">Lines</p>
                  <p className="text-xl text-white mono">{result.output.split('\n').length}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JSONFormatter;