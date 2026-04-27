import { Shield, Lock, Eye, Mail, Globe, Clock } from 'lucide-react';
import { APP_NAME } from '@/src/data/data';

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tighter mb-4">Privacy Policy</h1>
        <p className="text-neutral-400 text-lg">Last updated: April 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">Introduction</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            {APP_NAME} ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">Information We Collect</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed mb-4">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
            <li>Use our calculator tools</li>
            <li>Contact us via email</li>
            <li>Subscribe to our newsletter</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          <p className="text-neutral-400 leading-relaxed mt-4">
            <strong>Automatically Collected Information:</strong> When you access our Website, we may automatically collect certain information such as your IP address, browser type, operating system, access times, and pages viewed.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">How We Use Your Information</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            We use the information we collect or receive to:
          </p>
          <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4 mt-2">
            <li>Provide and maintain our services</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Communicate with you, either directly or through our partners</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
          </ul>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">Cookies and Tracking Technologies</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            We use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">Data Retention</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">Contact Us</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            If you have questions or comments about this policy, you may email us at support@thecalhub.com
          </p>
        </section>
      </div>
    </div>
  );
}