
import { Info, BarChart2, AlertTriangle } from 'lucide-react';

export default function About() {
  return (
    <main className="flex-1 pt-20 md:pt-0 overflow-y-auto bg-surface selection:bg-primary-container selection:text-on-primary-fixed">
      <header className="px-6 md:px-16 pt-12 md:pt-24 pb-12 max-w-5xl mx-auto">
        <span className="text-primary-fixed uppercase tracking-[0.3em] text-[10px] font-mono mb-4 block">System / Documentation</span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-on-background mb-8 leading-[0.9]">Project Integrity & Legal Compliance.</h1>
        <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
          Technical transparency for the DevCalc engine. Understanding the precision, limitations, and intended use of our computational workspace.
        </p>
      </header>

      <div className="h-px w-full bg-surface-container-highest"></div>

      <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-4 space-y-12">
          <div className="space-y-4">
            <h4 className="text-sm font-mono text-primary-fixed uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-3">
              <li><a className="text-on-surface hover:text-primary-fixed transition-colors block py-1" href="#about">About the Project</a></li>
              <li><a className="text-on-surface hover:text-primary-fixed transition-colors block py-1" href="#methodology">Methodology</a></li>
              <li><a className="text-on-surface hover:text-primary-fixed transition-colors block py-1" href="#disclaimer">Legal Disclaimer</a></li>
              <li><a className="text-on-surface hover:text-primary-fixed transition-colors block py-1" href="#licensing">Licensing</a></li>
            </ul>
          </div>
          <div className="p-6 bg-surface-container-low rounded-xl border border-white/5">
            <p className="text-xs font-mono text-neutral-500 mb-2">LAST UPDATED</p>
            <p className="text-lg font-mono text-on-surface">2023.10.27</p>
          </div>
        </div>

        <div className="md:col-span-8 space-y-24">
          <article className="space-y-6" id="about">
            <div className="flex items-center gap-4 text-primary-fixed">
              <Info className="w-6 h-6" />
              <h2 className="text-2xl font-bold tracking-tight">About the Project</h2>
            </div>
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg">
              <p>
                DevCalc was born from the necessity of a precision-driven workspace for technical professionals. While traditional calculators focus on general-purpose arithmetic, DevCalc is architected to handle the specific complexities of modern development workflows—from binary manipulation and floating-point analysis to complex financial forecasting.
              </p>
              <p>
                Our philosophy is centered on <strong className="text-on-background">Computational Transparency</strong>. We believe that every user should understand not just the result, but the logic and constraints applied to reach it.
              </p>
            </div>
          </article>

          <article className="space-y-6" id="methodology">
            <div className="flex items-center gap-4 text-primary-fixed">
              <BarChart2 className="w-6 h-6" />
              <h2 className="text-2xl font-bold tracking-tight">Methodology</h2>
            </div>
            <div className="space-y-6 text-on-surface-variant leading-relaxed">
              <p>
                The core calculation engine utilizes high-precision arithmetic libraries ensuring that rounding errors are kept within a <span className="mono px-1 bg-surface-container-high rounded text-sm">1e-15</span> tolerance margin for standard operations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-surface-container-low rounded-lg border-l-2 border-primary-fixed">
                  <h5 className="text-on-background font-bold mb-2">Floating Point</h5>
                  <p className="text-sm opacity-80">Strict adherence to IEEE 754 standards for all scientific and programming calculations.</p>
                </div>
                <div className="p-5 bg-surface-container-low rounded-lg border-l-2 border-primary-fixed">
                  <h5 className="text-on-background font-bold mb-2">Financial Kernels</h5>
                  <p className="text-sm opacity-80">Utilizes bankers' rounding (half-to-even) for all currency-sensitive operations.</p>
                </div>
              </div>
            </div>
          </article>

          <article className="relative group" id="disclaimer">
            <div className="absolute -inset-6 bg-error-container/10 rounded-2xl border border-error/20 -z-10"></div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-error">
                <AlertTriangle className="w-6 h-6" />
                <h2 className="text-2xl font-bold tracking-tight">Legal Disclaimer</h2>
              </div>
              <div className="p-6 bg-surface-container-highest rounded-xl border border-white/5 space-y-4">
                <p className="text-on-background font-bold text-lg leading-snug">
                  THE RESULTS PROVIDED BY DEVCALC ARE FOR EDUCATIONAL AND INFORMATIONAL PURPOSES ONLY.
                </p>
                <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed opacity-90 italic">
                  <p>
                    DevCalc, its developers, and affiliates make no representations or warranties, express or implied, regarding the accuracy, completeness, or reliability of any calculation results. These tools are intended to assist in conceptual modeling and should not be used as the sole basis for critical financial, structural, medical, or life-safety decisions.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
