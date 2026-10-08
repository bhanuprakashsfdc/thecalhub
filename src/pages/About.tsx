import { Info, BarChart2, AlertTriangle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '@/src/data/data';
import { PageSEO } from '@/src/components/layout/PageSEO';

export default function About() {
  return (
    <main className="flex-1 pt-20 md:pt-0 overflow-y-auto bg-surface selection:bg-primary-container selection:text-on-primary-fixed">
      <PageSEO
        title="About"
        description={`Learn how ${APP_NAME} builds and checks its 125+ free online calculators, the formulas we use, and the limits of every result we show.`}
        keywords="about, calculator accuracy, methodology, disclaimer"
        path="/about.html"
      />

      <header className="px-6 md:px-16 pt-12 md:pt-24 pb-12 max-w-5xl mx-auto">
        <span className="text-primary-fixed uppercase tracking-[0.3em] text-[10px] font-mono mb-4 block">About / {APP_NAME}</span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-on-background mb-8 leading-[0.9]">Free calculators, explained in the open.</h1>
        <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
          {APP_NAME} is a free, browser-based calculator hub for finance, health, mathematics, construction, trading, datetime and programming tasks. This page explains how we build our calculators, and the honest limits of the numbers they produce.
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
              <li><a className="text-on-surface hover:text-primary-fixed transition-colors block py-1" href="#contact">Contact & Policies</a></li>
            </ul>
          </div>
          <div className="p-6 bg-surface-container-low rounded-xl border border-white/5">
            <p className="text-xs font-mono text-neutral-500 mb-2">LAST UPDATED</p>
            <p className="text-lg font-mono text-on-surface">2026.10.07</p>
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
                {APP_NAME} started with a simple frustration: most calculator websites are slow, cluttered, and never explain how they reached their answer. We built a single hub where every tool — from an EMI schedule to a staircase riser calculator — loads instantly, works offline-friendly in your browser, and publishes the formula it uses.
              </p>
              <p>
                Our philosophy is <strong className="text-on-background">Computational Transparency</strong>. Every calculator shows not just the result, but the inputs, the assumptions, and the method behind it, so you can check whether the answer actually fits your situation.
              </p>
              <p>
                Nothing you type into a calculator is sent to a server by default — the maths runs locally in your browser. There is no account, no paywall, and no data resale. The site is funded by advertising, which is disclosed in our <Link className="text-primary-fixed hover:underline" to="/privacy-policy.html">Privacy Policy</Link>.
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
                Each calculator is built from a published formula (for example, the standard amortisation formula for EMI, or the WHO BMI formula) and is unit-tested against known reference values before release. Where a standard exists — ISO, IEEE, or an industry publication — we follow it.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-surface-container-low rounded-lg border-l-2 border-primary-fixed">
                  <h5 className="text-on-background font-bold mb-2">Floating Point</h5>
                  <p className="text-sm opacity-80">Scientific and programming calculations follow IEEE 754 semantics with rounding applied only at presentation time.</p>
                </div>
                <div className="p-5 bg-surface-container-low rounded-lg border-l-2 border-primary-fixed">
                  <h5 className="text-on-background font-bold mb-2">Financial Kernels</h5>
                  <p className="text-sm opacity-80">Currency-sensitive operations use explicit decimal rounding (half-up by default) so instalment totals reconcile.</p>
                </div>
                <div className="p-5 bg-surface-container-low rounded-lg border-l-2 border-primary-fixed">
                  <h5 className="text-on-background font-bold mb-2">Reference Values</h5>
                  <p className="text-sm opacity-80">Every tool ships with worked examples and common-value tables so you can sanity-check the output yourself.</p>
                </div>
                <div className="p-5 bg-surface-container-low rounded-lg border-l-2 border-primary-fixed">
                  <h5 className="text-on-background font-bold mb-2">Assumptions Stated</h5>
                  <p className="text-sm opacity-80">Rate frequency, compounding, and unit systems are shown next to the inputs — never hidden in fine print.</p>
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
                  THE RESULTS PROVIDED BY {APP_NAME.toUpperCase()} ARE FOR EDUCATIONAL AND INFORMATIONAL PURPOSES ONLY.
                </p>
                <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed opacity-90 italic">
                  <p>
                    {APP_NAME}, its operators, and affiliates make no representations or warranties, express or implied, regarding the accuracy, completeness, or reliability of any calculation results. These tools are intended to assist in conceptual modeling and should not be used as the sole basis for critical financial, structural, medical, or life-safety decisions.
                  </p>
                  <p>
                    Nothing on this site is financial, medical, legal, or tax advice. Consult a qualified professional before acting on any result. See our full <Link className="text-primary-fixed hover:underline not-italic" to="/terms-of-service.html">Terms of Service</Link> for details.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="space-y-6" id="contact">
            <div className="flex items-center gap-4 text-primary-fixed">
              <Users className="w-6 h-6" />
              <h2 className="text-2xl font-bold tracking-tight">Contact & Policies</h2>
            </div>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p>
                Found a bug in a formula, or want a calculator we do not have yet? We read every message at <a className="text-primary-fixed hover:underline" href="mailto:support@thecalhub.com">support@thecalhub.com</a>, or use our <Link className="text-primary-fixed hover:underline" to="/contact.html">Contact page</Link>.
              </p>
              <p>
                Legal pages: <Link className="text-primary-fixed hover:underline" to="/privacy-policy.html">Privacy Policy</Link> · <Link className="text-primary-fixed hover:underline" to="/terms-of-service.html">Terms of Service</Link>
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
