import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Bolt, CornerDownLeft, Calculator, CreditCard, FlaskConical, Terminal, Heart, TrendingUp, Scale, Activity, Grid3X3, Clock, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { TOOL_CATEGORIES, CALCULATORS, APP_NAME, APP_VERSION } from '@/src/data/data';
import { cn } from '@/src/lib/utils';

const ITEM_HEIGHT = 100;
const ITEMS_PER_ROW = 4;
const BUFFER_ROWS = 2;

const categoryIcons: Record<string, React.ElementType> = {
  all: LayoutGrid,
  standard: Calculator,
  financial: CreditCard,
  health: Heart,
  scientific: FlaskConical,
  programming: Terminal,
};

const calculatorIcons: Record<string, React.ElementType> = {
  'EMI Calculator': TrendingUp,
  'Compound Interest Calculator': TrendingUp,
  'Simple Interest Calculator': TrendingUp,
  'FD Calculator': TrendingUp,
  'RD Calculator': TrendingUp,
  'PPF Calculator': TrendingUp,
  'NPS Calculator': TrendingUp,
  'SIP Calculator': TrendingUp,
  'Home Loan Calculator': TrendingUp,
  'Car Loan Calculator': TrendingUp,
  'Personal Loan Calculator': TrendingUp,
  'Tax Calculator': TrendingUp,
  'Mortgage Calculator': TrendingUp,
  'Loan Calculator': TrendingUp,
  'Retirement Calculator': TrendingUp,
  'Investment Calculator': TrendingUp,
  'Basic Calculator': Calculator,
  'Percentage Calculator': Calculator,
  'Tip Calculator': Calculator,
  'GST Calculator': Calculator,
  'Scientific Calculator': FlaskConical,
  'Programming Calculator': Terminal,
  'Fraction Calculator': Grid3X3,
  'Percent Calculator': Grid3X3,
  'BMI Calculator': Scale,
  'BMR Calculator': Activity,
  'Calorie Calculator': Activity,
  'Pace Calculator': Activity,
  'TDEE Calculator': Activity,
  'Age Calculator': Clock,
  'Date Calculator': Clock,
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ name: string; path: string; category: string }>>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const allCalculators = Object.entries(CALCULATORS).flatMap(([category, calcs]) =>
    calcs.map(calc => ({ ...calc, category: category.charAt(0).toUpperCase() + category.slice(1) }))
  );

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filtered = allCalculators.filter(tool => 
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
      <div className="mb-10 mt-4 flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 text-center"
        >
          All <span className="text-primary-fixed">Calculators</span> in one place
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
              placeholder="Search calculators..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
            />
          </div>

          <AnimatePresence>
            {isFocused && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-surface-container-highest border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100]"
              >
                <div className="p-2 max-h-64 overflow-y-auto">
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

      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {TOOL_CATEGORIES.map((category) => {
          const Icon = categoryIcons[category.id] || Calculator;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === category.id
                  ? "bg-primary-fixed text-on-primary-fixed"
                  : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      <VirtualizedCalculatorGrid activeCategory={activeCategory} />

      <footer className="mt-20 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-mono text-neutral-600">© 2024 {APP_NAME}</span>
          <span className="text-[10px] font-mono text-neutral-600">v{APP_VERSION}</span>
        </div>
        <div className="flex items-center gap-4">
          <a className="text-[10px] font-mono text-neutral-500 hover:text-white" href="#">Privacy</a>
          <a className="text-[10px] font-mono text-neutral-500 hover:text-white" href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
}

interface VirtualizedCalculatorGridProps {
  activeCategory: string;
}

function VirtualizedCalculatorGrid({ activeCategory }: VirtualizedCalculatorGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(600);

  const calculators = CALCULATORS[activeCategory as keyof typeof CALCULATORS] || [];
  const totalItems = calculators.length;
  const totalRows = Math.ceil(totalItems / ITEMS_PER_ROW);
  const totalHeight = totalRows * ITEM_HEIGHT;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(window.innerHeight - containerRef.current.getBoundingClientRect().top - 100);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const startRow = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_ROWS);
  const endRow = Math.min(totalRows, Math.ceil((scrollTop + containerHeight) / ITEM_HEIGHT) + BUFFER_ROWS);

  const visibleItems = [];
  for (let row = startRow; row < endRow; row++) {
    for (let col = 0; col < ITEMS_PER_ROW; col++) {
      const idx = row * ITEMS_PER_ROW + col;
      if (idx < totalItems) {
        visibleItems.push({ calc: calculators[idx], idx });
      }
    }
  }

  const getIcon = (iconType?: string) => {
    switch(iconType) {
      case 'financial': return TrendingUp;
      case 'health': return Scale;
      case 'scientific': return FlaskConical;
      case 'programming': return Terminal;
      case 'math': return Grid3X3;
      case 'datetime': return Clock;
      case 'fitness': return Activity;
      default: return Calculator;
    }
  };

  return (
    <motion.div
      key={activeCategory}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {totalItems <= 16 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {calculators.map((calc) => {
            const Icon = calc.icon ? getIcon(calc.icon) : calculatorIcons[calc.name] || Bolt;
            return (
              <Link
                key={calc.name}
                to={calc.path}
                className="group bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 hover:bg-surface-container-high transition-all cursor-pointer flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center mb-0 group-hover:bg-primary-fixed/20 transition-colors shrink-0">
                  <Icon className="w-6 h-6 text-primary-fixed" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-primary-fixed transition-colors">{calc.name}</h3>
                  <p className="text-[11px] text-neutral-500 line-clamp-1">{calc.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="overflow-x-hidden"
          style={{ height: containerHeight }}
        >
          <div style={{ height: totalHeight, position: 'relative', maxWidth: '100%' }}>
            {visibleItems.map(({ calc, idx }) => {
              const row = Math.floor(idx / ITEMS_PER_ROW);
              const col = idx % ITEMS_PER_ROW;
              const left = col * (100 / ITEMS_PER_ROW);
              const Icon = calc.icon ? getIcon(calc.icon) : calculatorIcons[calc.name] || Bolt;
              return (
                <div
                  key={calc.name}
                  className="absolute"
                  style={{
                    top: row * ITEM_HEIGHT,
                    left: `${left}%`,
                    width: `${100 / ITEMS_PER_ROW}%`,
                    padding: '0 8px',
                  }}
                >
                  <Link
                    to={calc.path}
                    className="group bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary-fixed/50 hover:bg-surface-container-high transition-all cursor-pointer flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center mb-0 group-hover:bg-primary-fixed/20 transition-colors shrink-0">
                      <Icon className="w-6 h-6 text-primary-fixed" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-primary-fixed transition-colors">{calc.name}</h3>
                      <p className="text-[11px] text-neutral-500 line-clamp-1">{calc.description}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
