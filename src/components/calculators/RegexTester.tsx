import { useState, useMemo } from 'react';
import { Regex, CheckCircle, XCircle } from 'lucide-react';

export function RegexTester() {
  const [pattern, setPattern] = useState('^\\d{3}-\\d{4}$');
  const [testString, setTestString] = useState('123-4567');
  const [flags, setFlags] = useState({ g: false, i: false, m: false });

  const result = useMemo(() => {
    try {
      const regex = new RegExp(pattern, `${flags.g ? 'g' : ''}${flags.i ? 'i' : ''}${flags.m ? 'm' : ''}`);
      const matches = testString.match(regex);
      return {
        valid: true,
        matches: matches ? matches.length : 0,
        groups: matches ? [...matches] : [],
        error: null,
      };
    } catch (e) {
      return { valid: false, matches: 0, groups: [], error: (e as Error).message };
    }
  }, [pattern, testString, flags]);

  const presets = [
    { name: 'Phone (US)', pattern: '^\\d{3}-\\d{3}-\\d{4}$' },
    { name: 'Email', pattern: '^[\\w.-]+@[\\w.-]+\\.\\w+$' },
    { name: 'URL', pattern: 'https?://[\\w.-]+' },
    { name: 'IP Address', pattern: '^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$' },
    { name: 'Date (YYYY-MM-DD)', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    { name: 'Hex Color', pattern: '^#[0-9A-Fa-f]{6}$' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Regex Pattern</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Flags</label>
              <div className="flex gap-2">
                {['g', 'i', 'm'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFlags({ ...flags, [f]: !flags[f as keyof typeof flags] })}
                    className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                      flags[f as keyof typeof flags]
                        ? "bg-primary-fixed text-on-primary-fixed"
                        : "bg-surface-container-highest text-neutral-300"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Test String</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="text"
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setPattern(p.pattern)}
                  className="px-3 py-1 bg-surface-container-highest hover:bg-neutral-700 rounded-lg text-xs text-neutral-300"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <Regex className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Results</span>
          </div>

          {result.valid ? (
            <div className={`p-6 rounded-xl mb-6 ${result.matches > 0 ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
              <div className="flex items-center gap-3">
                {result.matches > 0 ? (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-400" />
                )}
                <div>
                  <p className={`text-2xl font-bold ${result.matches > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {result.matches > 0 ? 'Match Found!' : 'No Match'}
                  </p>
                  <p className="text-neutral-400 text-sm">{result.matches} match(es)</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl mb-6">
              <p className="text-red-400">Invalid regex: {result.error}</p>
            </div>
          )}

          {result.matches > 0 && (
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">Captured Groups</p>
              <div className="space-y-2">
                {result.groups.map((g, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-neutral-500 w-8">Group {i}</span>
                    <code className="text-primary-fixed font-mono">{g}</code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegexTester;