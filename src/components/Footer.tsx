import { Calculator, Twitter, Linkedin, Github, Youtube, Instagram } from 'lucide-react';
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
            <div className="flex items-center gap-5">
              <a href="#" className="text-neutral-500 hover:text-white transition-all transform hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-white transition-all transform hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-white transition-all transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-white transition-all transform hover:scale-110">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-white transition-all transform hover:scale-110">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
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
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Financial <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-fixed/10 text-primary-fixed font-bold uppercase tracking-wider">Updated</span></a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Health & Fitness</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Mathematics</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Construction</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-8 uppercase tracking-widest">Tools</h4>
              <ul className="space-y-5">
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Unit Converter</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Currency Exchange</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Mortgage AI</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Tax Estimator</a></li>
              </ul>
            </div>
          </div>

          {/* Column 3 - Company & Blog */}
          <div className="space-y-16">
            <div>
              <h4 className="text-white font-bold text-sm mb-8 uppercase tracking-widest">Company</h4>
              <ul className="space-y-5">
                <li><Link to="#" className="text-neutral-400 hover:text-white transition-colors text-[15px]">About {APP_NAME}</Link></li>
                <li><Link to="#" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Careers</Link></li>
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
              <h4 className="text-white font-bold text-sm mb-8 uppercase tracking-widest">Community</h4>
              <ul className="space-y-5">
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Open Source</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Contribution</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-8 uppercase tracking-widest">Support</h4>
              <ul className="space-y-5">
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Help Center</a></li>
                <li><a href="/contact.html" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Contact Support</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors text-[15px]">Join Community</a></li>
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
            <Link to="#" className="text-neutral-500 hover:text-white transition-colors text-[14px] font-medium">Cookie Settings</Link>
            <Link to="#" className="text-neutral-500 hover:text-white transition-colors text-[14px] font-medium">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}