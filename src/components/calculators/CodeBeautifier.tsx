import { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';

export function CodeBeautifier() {
  const [input, setInput] = useState('function test(){console.log("hello");var x=1;}');
  const [language, setLanguage] = useState('javascript');
  const [mode, setMode] = useState<'beautify' | 'minify'>('beautify');

  const result = (() => {
    try {
      if (language === 'javascript') {
        if (mode === 'minify') {
          return input.replace(/\s+/g, ' ').replace(/\s*([{};:,])\s*/g, '$1').trim();
        } else {
          let formatted = input;
          let indent = 0;
          let output = '';
          
          formatted = formatted.replace(/\{/g, '{\n');
          formatted = formatted.replace(/\}/g, '\n}');
          
          const lines = formatted.split('\n');
          lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed) {
              if (trimmed.startsWith('}')) {
                indent = Math.max(0, indent - 1);
              }
              output += '  '.repeat(indent) + trimmed + '\n';
              if (trimmed.endsWith('{')) {
                indent++;
              }
            }
          });
          return output.trim();
        }
      } else if (language === 'css') {
        if (mode === 'minify') {
          return input.replace(/\s+/g, ' ').replace(/\s*([{}:;])\s*/g, '$1').trim();
        } else {
          return input.replace(/\{/g, ' {\n').replace(/\}/g, '\n}\n').replace(/;/g, ';\n').replace(/  /g, ' ');
        }
      } else if (language === 'html') {
        if (mode === 'minify') {
          return input.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
        } else {
          return input.replace(/></g, '>\n<').replace(/(\w+)="/g, '\n  $1="');
        }
      }
      return input;
    } catch {
      return input;
    }
  })();

  const [copied, setCopied] = useState(false);

  const copyOutput = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languages = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'CSS', value: 'css' },
    { label: 'HTML', value: 'html' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Language</label>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => setLanguage(lang.value)}
                    className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                      language === lang.value
                        ? "bg-primary-fixed text-on-primary-fixed font-bold"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('beautify')}
                  className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                    mode === 'beautify'
                      ? "bg-primary-fixed text-on-primary-fixed font-bold"
                      : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                  }`}
                >
                  Beautify
                </button>
                <button
                  onClick={() => setMode('minify')}
                  className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                    mode === 'minify'
                      ? "bg-primary-fixed text-on-primary-fixed font-bold"
                      : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                  }`}
                >
                  Minify
                </button>
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Input Code</label>
              <textarea
                className="w-full h-48 bg-surface-container-highest border-none rounded-lg p-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-sm outline-none resize-none font-mono"
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
              <Code className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Output</span>
            </div>
            <button
              onClick={copyOutput}
              className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <textarea
            className="w-full h-64 bg-surface-container-highest border-none rounded-lg p-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-sm outline-none resize-none font-mono"
            value={result}
            readOnly
          />

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-neutral-500 text-xs">Input Size</p>
                <p className="text-xl text-white mono">{input.length} bytes</p>
              </div>
              <div>
                <p className="text-neutral-500 text-xs">Output Size</p>
                <p className="text-xl text-white mono">{result.length} bytes</p>
              </div>
            </div>
            {mode === 'minify' && (
              <div className="mt-4 pt-4 border-t border-neutral-700">
                <p className="text-green-400 text-sm">
                  Saved {Math.round(((input.length - result.length) / input.length) * 100)}% (
                  {input.length - result.length} bytes)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeBeautifier;