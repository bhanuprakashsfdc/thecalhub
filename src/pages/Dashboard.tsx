import { useState, useEffect, useRef } from 'react';
import { Search, Bolt, CornerDownLeft, Calculator, CreditCard, FlaskConical, Terminal, Heart, TrendingUp, Scale, Activity, Grid3X3, Clock, LayoutGrid, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { TOOL_CATEGORIES, CALCULATORS, CALCULATORS_ALL, APP_NAME, APP_VERSION } from '@/src/data/data';

const TOTAL_CALCULATORS = CALCULATORS_ALL.length;
import { cn } from '@/src/lib/utils';

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
          {TOTAL_CALCULATORS}+ <span className="text-primary-fixed">Calculators</span> in one place
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

      {/* SEO Content Section */}
      <section className="mt-24 border-t border-white/5 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-3xl font-black text-white tracking-tighter mb-8 leading-tight">
                The Ultimate Hub for <span className="text-primary-fixed">Precision Calculations</span> and Financial Planning
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                In today's fast-paced digital economy, precision isn't just a luxury—it's a necessity. Whether you're a first-time homebuyer navigating the complexities of 
                <Link to="/mortgage-calculator.html" className="text-primary-fixed hover:underline mx-1">mortgage payments</Link>, 
                a fitness enthusiast tracking your <Link to="/bmi-calculator.html" className="text-primary-fixed hover:underline mx-1">Body Mass Index (BMI)</Link>, 
                or a professional base-converting in a <Link to="/programming-calculator.html" className="text-primary-fixed hover:underline mx-1">programming environment</Link>, 
                TheCalHub provides a centralized suite of high-fidelity tools designed for accuracy, speed, and ease of use.
              </p>
              
              <h3 className="text-xl font-bold text-white mb-4">Mastering Your Finances with Expert-Grade Tools</h3>
              <p className="text-neutral-400 leading-relaxed mb-6">
                Financial literacy begins with understanding the numbers. Our suite of financial calculators is built on industry-standard algorithms used by banking 
                institutions worldwide. For instance, our <Link to="/emi-calculator.html" className="text-primary-fixed hover:underline mx-1">EMI Calculator</Link> 
                utilizes the reducing balance method to give you a transparent look at your monthly commitments. When planning for the long term, the power of 
                <Link to="/compound-interest-calculator.html" className="text-primary-fixed hover:underline mx-1">Compound Interest</Link> can be your greatest ally. 
                By visualizing how your wealth grows exponentially, you can make informed decisions about <Link to="/sip-calculator.html" className="text-primary-fixed hover:underline mx-1">SIP investments</Link> 
                and <Link to="/retirement-calculator.html" className="text-primary-fixed hover:underline mx-1">retirement planning</Link>.
              </p>

              <div className="bg-surface-container-high/50 border border-white/5 rounded-2xl p-8 my-10">
                <h4 className="text-primary-fixed font-black uppercase tracking-widest text-xs mb-4">Why Choose TheCalHub?</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <li className="flex items-center gap-3 text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></div>
                    100% Free and Private
                  </li>
                  <li className="flex items-center gap-3 text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></div>
                    Real-time Accuracy
                  </li>
                  <li className="flex items-center gap-3 text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></div>
                    PWA Support for Offline Use
                  </li>
                  <li className="flex items-center gap-3 text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></div>
                    No Data Collection
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-white mb-4">Health and Fitness: Data-Driven Wellness</h3>
              <p className="text-neutral-400 leading-relaxed mb-6">
                Your health journey is unique, and data should reflect that. Beyond simple weight tracking, our <Link to="/tdee-calculator.html" className="text-primary-fixed hover:underline mx-1">TDEE Calculator</Link> 
                factors in your activity levels to provide a precise caloric maintenance target. For athletes, our <Link to="/pace-calculator.html" className="text-primary-fixed hover:underline mx-1">Pace Calculator</Link> 
                is an essential tool for race preparation, allowing you to break down split times and optimize your training blocks.
              </p>

              <h3 className="text-xl font-bold text-white mb-4">Academic and Professional Excellence</h3>
              <p className="text-neutral-400 leading-relaxed mb-6">
                From solving complex <Link to="/fraction-calculator.html" className="text-primary-fixed hover:underline mx-1">fraction equations</Link> to calculating 
                <Link to="/concrete-calculator.html" className="text-primary-fixed hover:underline mx-1">construction materials</Link> for your next DIY project, 
                TheCalHub bridges the gap between academic theory and practical application. Our tools are designed to be accessible yet powerful enough for 
                engineers, students, and hobbyists alike.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-surface-container-low border border-white/5 rounded-2xl p-6">
              <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Trending Calculators</h4>
              <div className="space-y-4">
                {[
                  { name: 'EMI Calculator', path: '/emi-calculator.html', cat: 'Finance' },
                  { name: 'BMI Index', path: '/bmi-calculator.html', cat: 'Health' },
                  { name: 'Compound Interest', path: '/compound-interest-calculator.html', cat: 'Finance' },
                  { name: 'Scientific Calc', path: '/scientific-calculator.html', cat: 'Math' }
                ].map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.path}
                    className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-all group"
                  >
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-primary-fixed">{item.name}</p>
                      <p className="text-[10px] text-neutral-500 uppercase font-mono">{item.cat}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-primary-fixed" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-primary-fixed/5 border border-primary-fixed/10 rounded-2xl p-6">
              <h4 className="text-primary-fixed font-bold text-sm mb-4 uppercase tracking-widest text-center">Join 50k+ Users</h4>
              <p className="text-neutral-400 text-xs text-center leading-relaxed">
                Experience the most powerful calculator suite on the web. Bookmark us or install our PWA for instant access anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-20 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <p className="text-[10px] font-mono text-neutral-600">© 2024 {APP_NAME} — LinearBytes Inc.</p>
          <p className="text-[10px] font-mono text-neutral-600">v{APP_VERSION}</p>
        </div>
        <div className="flex items-center gap-8">
          <Link className="text-[10px] font-mono text-neutral-500 hover:text-white uppercase tracking-widest" to="/support.html">About</Link>
          <a className="text-[10px] font-mono text-neutral-500 hover:text-white uppercase tracking-widest" href="#">Privacy</a>
          <a className="text-[10px] font-mono text-neutral-500 hover:text-white uppercase tracking-widest" href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
}

interface VirtualizedCalculatorGridProps {
  activeCategory: string;
}

interface CalculatorItem {
  name: string;
  path: string;
  description: string;
  icon?: string;
}

function VirtualizedCalculatorGrid({ activeCategory }: VirtualizedCalculatorGridProps) {
  const calculators = activeCategory === 'all' 
    ? CALCULATORS_ALL as CalculatorItem[]
    : (CALCULATORS[activeCategory as keyof typeof CALCULATORS] || []) as CalculatorItem[];

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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
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
    </motion.div>
  );
}
