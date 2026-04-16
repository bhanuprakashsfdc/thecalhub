import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calculator, 
  CreditCard, 
  FlaskConical, 
  Terminal, 
  Plus, 
  FileText, 
  LifeBuoy,
  LayoutGrid
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/index.html' },
  { icon: LayoutGrid, label: 'Suite', path: '/suite.html' },
  { icon: Calculator, label: 'Standard', path: '/standard.html' },
  { icon: CreditCard, label: 'Financial', path: '/financial.html' },
  { icon: FlaskConical, label: 'Scientific', path: '/scientific.html' },
  { icon: Terminal, label: 'Programming', path: '/programming.html' },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-neutral-900 border-r border-white/5 py-6 shrink-0 sticky top-0">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-primary-fixed flex items-center justify-center">
          <Terminal className="text-on-primary-fixed w-5 h-5" />
        </div>
        <div>
          <h1 className="text-white font-black uppercase tracking-widest text-sm">DevCalc</h1>
          <p className="text-[10px] text-neutral-500 font-mono tracking-tighter">v1.0.4</p>
        </div>
      </div>

      <div className="px-3 mb-6">
        <button className="w-full py-2.5 px-4 rounded bg-primary-fixed text-on-primary-fixed text-sm font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:opacity-80">
          <Plus className="w-4 h-4" />
          New Calculation
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-2.5 transition-all duration-150 ease-out rounded text-sm font-sans tracking-wide",
              isActive 
                ? "bg-white/5 text-primary-fixed font-medium border-r-2 border-primary-fixed translate-x-1" 
                : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
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
