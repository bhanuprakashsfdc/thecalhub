import React, { useState, useEffect, useRef } from 'react';
import { Search, Banknote, Activity, Sigma, Timer, History, ArrowRight, Bolt, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { SEARCHABLE_TOOLS } from '@/src/constants';
import { cn } from '@/src/lib/utils';

const categories = [
  {
    icon: Banknote,
    label: 'Finance',
    title: 'Financial Suite',
    items: [
      { name: 'EMI Calculator', path: '/standard.html' },
      { name: 'Compound Interest', path: '#' },
      { name: 'Tax Estimator', path: '#' },
    ],
  },
  {
    icon: Activity,
    label: 'Health',
    title: 'Health Vitals',
    items: [
      { name: 'BMI Index', path: '#' },
      { name: 'BMR Estimator', path: '#' },
      { name: 'Macro Ratio', path: '#' },
    ],
  },
  {
    icon: Sigma,
    label: 'Mathematics',
    title: 'Advanced Math',
    items: [
      { name: 'Percentage Calc', path: '#' },
      { name: 'GCD & LCM', path: '#' },
      { name: 'Linear Equation', path: '#' },
    ],
  },
  {
    icon: Timer,
    label: 'Systems',
    title: 'Time & Units',
    items: [
      { name: 'Time Zone Sync', path: '#' },
      { name: 'Storage Units', path: '#' },
      { name: 'Epoch Converter', path: '#' },
    ],
  },
];

const recentItems = [
  { title: 'Base64 Encode', time: '2m ago', category: 'Programming / Encoding' },
  { title: 'Loan Amortization', time: '1h ago', category: 'Financial / Loans' },
  { title: 'Cron Expression', time: '5h ago', category: 'Programming / Scheduling' },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof SEARCHABLE_TOOLS>([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filtered = SEARCHABLE_TOOLS.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (path: string) => {
    if (path !== '#') {
      navigate(path);
    }
    setSearchQuery('');
    setSuggestions([]);
    setIsFocused(false);
  };

  return (
    <div className="mt-14 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="mb-16 mt-8 flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-8 text-center"
        >
          Precision at your <span className="text-primary-fixed">fingertips.</span>
        </motion.h2>
        <div className="w-full max-w-2xl relative group" ref={searchRef}>
          <div className={cn(
            "absolute inset-0 bg-primary-fixed/20 blur-2xl transition-opacity duration-300",
            isFocused ? "opacity-100" : "opacity-0"
          )}></div>
          <div className="relative flex items-center bg-surface-container-highest border border-white/10 rounded-xl p-1 shadow-2xl">
            <Search className="ml-4 text-neutral-500 w-5 h-5" />
            <input
              className="w-full bg-transparent border-none focus:ring-0 text-white font-mono placeholder:text-neutral-600 px-4 py-3 outline-none"
              placeholder="Search calculators, constants, or formulas..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
            />
            <div className="hidden sm:flex items-center gap-1.5 mr-3 px-2 py-1 bg-surface-container-low border border-white/5 rounded text-[10px] font-mono text-neutral-500">
              <span>CMD</span>
              <span className="text-xs">K</span>
            </div>
          </div>

          <AnimatePresence>
            {isFocused && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-surface-container-highest border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100]"
              >
                <div className="p-2">
                  {suggestions.map((tool) => (
                    <button
                      key={tool.name}
                      onClick={() => handleSelect(tool.path)}
                      className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-primary-fixed">
                          <Bolt className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{tool.name}</p>
                          <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">{tool.category}</p>
                        </div>
                      </div>
                      <CornerDownLeft className="w-4 h-4 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface-container-low p-6 rounded-xl ghost-border hover:bg-surface-container-high transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <cat.icon className="text-primary-fixed w-6 h-6" />
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{cat.label}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">{cat.title}</h3>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <Link 
                      className="flex justify-between items-center text-neutral-400 hover:text-primary-fixed transition-colors text-sm py-1 border-b border-white/5" 
                      to={item.path}
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="w-3 h-3 -rotate-45" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-white/5 shadow-inner">
            <div className="flex items-center gap-2 mb-6">
              <History className="text-neutral-500 w-4 h-4" />
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">Recently Used</h4>
            </div>
            <div className="space-y-4">
              {recentItems.map((item) => (
                <div key={item.title} className="p-3 bg-surface-container-low rounded-lg border border-white/5 hover:border-primary-fixed/30 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-semibold text-white">{item.title}</span>
                    <span className="text-[10px] font-mono text-neutral-600">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-neutral-500">{item.category}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-[10px] font-mono text-neutral-500 hover:text-white transition-colors flex items-center justify-center gap-2">
              VIEW FULL HISTORY <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="relative overflow-hidden p-6 rounded-xl bg-gradient-to-br from-secondary-container/20 to-surface-container-low border border-white/5 group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Bolt className="w-16 h-16 fill-current" />
            </div>
            <h4 className="text-white font-bold mb-2">DevCalc API</h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">Integrate our calculation engine directly into your terminal or app.</p>
            <a className="inline-flex items-center gap-2 text-xs font-bold text-primary-fixed hover:underline" href="#">
              Request Beta Access <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-20 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-mono text-neutral-600">SYSTEM: OPERATIONAL</span>
          <span className="text-[10px] font-mono text-neutral-600">LATENCY: 12ms</span>
          <span className="text-[10px] font-mono text-neutral-600">ENGINE: V8-CORE</span>
        </div>
        <div className="flex items-center gap-4">
          <a className="text-[10px] font-mono text-neutral-500 hover:text-white" href="#">PRIVACY</a>
          <a className="text-[10px] font-mono text-neutral-500 hover:text-white" href="#">TERMS</a>
          <a className="text-[10px] font-mono text-neutral-500 hover:text-white" href="#">GITHUB</a>
        </div>
      </footer>
    </div>
  );
}
