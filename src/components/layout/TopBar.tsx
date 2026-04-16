import React, { useState, useEffect, useRef } from 'react';
import { Search, HelpCircle, Settings, Bolt, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { SEARCHABLE_TOOLS } from '@/src/constants';

export function TopBar({ title }: { title?: string }) {
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
    <header className="fixed top-0 right-0 left-0 md:left-64 z-50 bg-neutral-950/60 backdrop-blur-xl border-b border-white/5 h-14 px-6 flex justify-between items-center shadow-2xl shadow-black/50">
      <div className="flex-1 max-w-md relative" ref={searchRef}>
        {title ? (
          <span className="text-lg font-bold text-neutral-100 font-sans tracking-tight">{title}</span>
        ) : (
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <input
              className="w-full bg-white/5 border-none rounded py-1.5 pl-10 pr-4 text-sm font-mono focus:ring-1 focus:ring-primary-fixed transition-all placeholder:text-neutral-600 outline-none text-white"
              placeholder="Search financial tools..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
            />
            
            <AnimatePresence>
              {isFocused && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-surface-container-highest border border-white/10 rounded-lg shadow-2xl overflow-hidden z-[100]"
                >
                  <div className="p-1">
                    {suggestions.map((tool) => (
                      <button
                        key={tool.name}
                        onClick={() => handleSelect(tool.path)}
                        className="w-full flex items-center justify-between p-2 hover:bg-white/5 rounded transition-colors group text-left"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-primary-fixed">
                            <Bolt className="w-3 h-3" />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-white">{tool.name}</p>
                            <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-widest">{tool.category}</p>
                          </div>
                        </div>
                        <CornerDownLeft className="w-3 h-3 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 ml-4">
        <button className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:bg-white/5 hover:text-neutral-100 rounded transition-colors duration-150 scale-95 active:opacity-80">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:bg-white/5 hover:text-neutral-100 rounded transition-colors duration-150 scale-95 active:opacity-80">
          <Settings className="w-5 h-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-neutral-800 overflow-hidden border border-white/10">
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://picsum.photos/seed/dev/100/100"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
