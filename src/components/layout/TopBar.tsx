import { useState, useEffect, useRef } from 'react';
import { Calculator, Type, Timer, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n, currencies, Currency } from '../../lib/i18n';

const NOTEPAD_STORAGE_KEY = 'thecalhub-notepad-content';

export function TopBar() {
  const [hasNotepadData, setHasNotepadData] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const { currency, setCurrency } = useI18n();
  const navigate = useNavigate();
  const currencyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(NOTEPAD_STORAGE_KEY);
    setHasNotepadData(!!saved && saved.length > 0);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setShowCurrencyMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCurrencyChange = (code: Currency) => {
    setCurrency(code);
    setShowCurrencyMenu(false);
  };

  const currentCurrency = currencies.find(c => c.code === currency);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-neutral-950/60 backdrop-blur-xl border-b border-white/5 h-14 px-4 md:px-6 flex items-center justify-between shadow-2xl shadow-black/50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center shadow-lg shadow-primary-fixed/20">
            <Calculator className="text-on-primary-fixed w-5 h-5" />
          </div>
          <span className="text-white font-black tracking-widest text-sm">TheCalHub</span>
        </div>

        <div className="flex items-center gap-2 ml-2 pl-3 border-l border-white/10">
          <button
            onClick={() => navigate('/pomodoro-timer.html')}
            className="px-3 py-1.5 flex items-center gap-2 text-neutral-400 hover:bg-primary-fixed/20 hover:text-primary-fixed rounded-lg transition-colors text-sm"
            title="Pomodoro Timer"
          >
            <Timer className="w-4 h-4" />
            <span>Timer</span>
          </button>
          <button
            onClick={() => navigate('/clock.html')}
            className="px-3 py-1.5 flex items-center gap-2 text-neutral-400 hover:bg-primary-fixed/20 hover:text-primary-fixed rounded-lg transition-colors text-sm"
            title="World Clock"
          >
            <Globe className="w-4 h-4" />
            <span>Clock</span>
          </button>
          <button
            onClick={() => navigate('/notepad.html')}
            className="px-3 py-1.5 flex items-center gap-2 text-neutral-400 hover:bg-primary-fixed/20 hover:text-primary-fixed rounded-lg transition-colors text-sm relative"
            title="Open Notepad"
          >
            <Type className="w-4 h-4" />
            <span>Notepad</span>
            {hasNotepadData && (
              <span className="absolute top-1 left-5 w-2 h-2 bg-green-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      <div className="relative" ref={currencyRef}>
        <button
          onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-neutral-400 hover:bg-white/5 hover:text-white transition-colors border border-white/10 bg-neutral-900/50 min-w-[70px] justify-center"
        >
          <span className="text-sm font-bold">{currentCurrency?.symbol}</span>
          <span className="text-xs">{currentCurrency?.code}</span>
        </button>
        {showCurrencyMenu && (
          <div className="absolute top-full right-0 mt-1 min-w-[220px] bg-neutral-800 border border-white/10 rounded-lg shadow-2xl overflow-visible z-[200]">
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => handleCurrencyChange(c.code)}
                className={`w-full px-4 py-3 text-left text-sm hover:bg-white/5 transition-colors flex items-center justify-between ${
                  currency === c.code ? 'bg-primary-fixed/20 text-primary-fixed' : 'text-white'
                }`}
              >
                <span className="font-bold text-lg w-8">{c.symbol}</span>
                <span className="text-neutral-300 flex-1 truncate">{c.name}</span>
                <span className="text-neutral-500 text-xs ml-2">{c.code}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}