import { Terminal, Code } from 'lucide-react';

const programmingCalculators = [
  { name: 'Programming Calculator', path: '/programming-calculator.html', description: 'Number base conversion' },
  { name: 'Time Complexity Calculator', path: '/time-complexity-calculator.html', description: 'Calculate time complexity' },
  { name: 'Big-O Notation Analyzer', path: '/big-o-analyzer.html', description: 'Analyze Big-O notation' },
  { name: 'Binary/Hex/Decimal Converter', path: '/binary-hex-decimal-converter.html', description: 'Convert between bases' },
  { name: 'Bitwise Operation Calculator', path: '/bitwise-calculator.html', description: 'Bitwise operations' },
  { name: 'Regex Tester', path: '/regex-tester.html', description: 'Test regular expressions' },
  { name: 'JSON Formatter', path: '/json-formatter.html', description: 'Format and validate JSON' },
  { name: 'Hash Generator', path: '/hash-generator.html', description: 'Generate MD5/SHA hashes' },
  { name: 'Base64 Encoder/Decoder', path: '/base64-encoder.html', description: 'Encode/decode Base64' },
  { name: 'Code Beautifier', path: '/code-beautifier.html', description: 'Minify/beautify code' },
  { name: 'Memory Size Calculator', path: '/memory-size-calculator.html', description: 'Calculate memory sizes' },
];

export default function ProgrammingPage() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Code className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Programming</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Programming Calculators</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Developer tools for code analysis, conversion, and formatting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {programmingCalculators.map((calc) => (
          <a
            key={calc.name}
            href={calc.path}
            className="bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
              <Terminal className="w-6 h-6 text-primary-fixed" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{calc.name}</h3>
              <p className="text-neutral-400 text-sm">{calc.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}