import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calculator, 
  CreditCard, 
  FlaskConical, 
  Terminal, 
  Heart,
  FileText, 
  LifeBuoy
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { TOOL_CATEGORIES, APP_NAME, APP_VERSION } from '@/src/data/data';

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-neutral-900 border-r border-white/5 py-6 shrink-0 sticky top-0">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-primary-fixed flex items-center justify-center">
          <Calculator className="text-on-primary-fixed w-5 h-5" />
        </div>
        <div>
          <h1 className="text-white font-black uppercase tracking-widest text-sm">{APP_NAME}</h1>
          <p className="text-[10px] text-neutral-500 font-mono tracking-tighter">v{APP_VERSION}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        <NavLink
          to="/index.html"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-2.5 transition-all duration-150 ease-out rounded text-sm font-sans tracking-wide mb-4",
            isActive 
              ? "bg-white/5 text-primary-fixed font-medium border-r-2 border-primary-fixed translate-x-1" 
              : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
          )}
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>

        <div className="grid grid-cols-2 gap-2">
          {TOOL_CATEGORIES.map((category) => (
            <NavLink
              key={category.id}
              to={category.path}
              className={({ isActive }) => cn(
                "flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-all duration-150",
                isActive 
                  ? "bg-primary-fixed text-on-primary-fixed" 
                  : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
              )}
            >
              <category.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{category.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="mt-auto px-3 pt-6 border-t border-white/5 space-y-1">
        <NavLink
          to="/docs.html"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-2.5 transition-all duration-150 rounded text-sm font-sans",
            isActive ? "text-primary-fixed" : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
          )}
        >
          <FileText className="w-5 h-5" />
          Docs
        </NavLink>
        <NavLink
          to="/support.html"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-2.5 transition-all duration-150 rounded text-sm font-sans",
            isActive ? "text-primary-fixed" : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
          )}
        >
          <LifeBuoy className="w-5 h-5" />
          Support
        </NavLink>
      </div>
    </aside>
  );
}
