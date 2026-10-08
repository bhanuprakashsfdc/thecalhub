import { Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '@/src/data/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/5 bg-surface-container-lowest pt-20 pb-10 px-6 md:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Column 1 - Brand */}
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center shadow-lg shadow-primary-fixed/20">
                <Calculator className="w-6 h-6 text-on-primary-fixed" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">{APP_NAME}</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-[280px]">
              The most comprehensive and accurate collection of free online calculators for every need.
            </p>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-[12px] font-semibold text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              All systems operational
            </div>
          </div>

          {/* Column 2 - Calculators */}
          <div className="space-y-16">
            <div>
              <h4 className="text-white font-bold text-sm mb-8 uppercase tracking-widest">Calculators</h4>
              <ul className="space-y-5">
                <li><Link to="/financial.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Financial <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-fixed/10 text-primary-fixed font-bold uppercase tracking-wider">Updated</span></Link></li>
                <li><Link to="/health.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Health & Fitness</Link></li>
                <li><Link to="/math.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Mathematics</Link></li>
                <li><Link to="/construction.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Construction</Link></li>
                <li><Link to="/all.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">All Calculators</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-8 uppercase tracking-widest">Tools</h4>
              <ul className="space-y-5">
                <li><Link to="/unit-conversion-calculator.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Unit Converter</Link></li>
                <li><Link to="/tax-calculator.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Tax Estimator</Link></li>
                <li><Link to="/mortgage-calculator.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Mortgage Calculator</Link></li>
                <li><Link to="/tip-calculator.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Tip Calculator</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 3 - Company & Blog */}
          <div className="space-y-16">
            <div>
              <h4 className="text-white font-bold text-sm mb-8 uppercase tracking-widest">Company</h4>
              <ul className="space-y-5">
                <li><Link to="/about.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">About {APP_NAME}</Link></li>
                <li><Link to="/faq.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">FAQ</Link></li>
                <li><Link to="/blog.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Blog</Link></li>
                <li><Link to="/contact.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-8 uppercase tracking-widest">Popular Articles</h4>
              <ul className="space-y-3">
                <li><Link to="/blog.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">EMI Guide</Link></li>
                <li><Link to="/blog.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Compound Interest</Link></li>
                <li><Link to="/blog.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">BMI Explained</Link></li>
                <li><Link to="/blog.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Binary Guide</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 4 - Community & Support */}
          <div className="space-y-16">
            <div>
              <h4 className="text-white font-bold text-sm mb-8 uppercase tracking-widest">Learn</h4>
              <ul className="space-y-5">
                <li><Link to="/tutorials.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Tutorials</Link></li>
                <li><Link to="/calculator-suite.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Calculator Suite</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-8 uppercase tracking-widest">Support</h4>
              <ul className="space-y-5">
                <li><Link to="/faq.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Help Center</Link></li>
                <li><Link to="/contact.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Contact Support</Link></li>
                <li><Link to="/all.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Browse All Tools</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 text-neutral-500 text-[14px] font-medium">
            <span>© {currentYear} {APP_NAME}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-800"></span>
            <span>Anuhya Digital Pvt. Ltd.</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            <Link to="/privacy-policy.html" className="text-neutral-500 hover:text-white transition-colors text-[14px] font-medium">Privacy Policy</Link>
            <Link to="/terms-of-service.html" className="text-neutral-500 hover:text-white transition-colors text-[14px] font-medium">Terms of Service</Link>
            <Link to="/about.html" className="text-neutral-500 hover:text-white transition-colors text-[14px] font-medium">About</Link>
            <Link to="/contact.html" className="text-neutral-500 hover:text-white transition-colors text-[14px] font-medium">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}