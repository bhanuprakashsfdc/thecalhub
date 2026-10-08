import { Mail, Clock, MapPin, MessageSquare } from 'lucide-react';
import { APP_NAME } from '@/src/data/data';
import { PageSEO } from '@/src/components/layout/PageSEO';

export default function Contact() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-4xl mx-auto">
      <PageSEO
        title="Contact"
        description={`Questions, bug reports or calculator requests for ${APP_NAME}? Reach the team at support@thecalhub.com — we aim to reply within 2 business days.`}
        keywords="contact, support, feedback, bug report"
        path="/contact.html"
      />

      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tighter mb-4">Contact Us</h1>
        <p className="text-neutral-400 text-lg">
          Found a wrong result, found a broken link, or need a calculator we do not have? Tell us — we read every message.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary-fixed" />
            </div>
            <div>
              <h3 className="text-white font-bold">Email Us</h3>
              <p className="text-neutral-400 text-sm">support@thecalhub.com</p>
            </div>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            The fastest way to reach us. Include the calculator name, the values you entered, and what you expected to see — that lets us reproduce a bug in one reply.
          </p>
        </div>

        <div className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary-fixed" />
            </div>
            <div>
              <h3 className="text-white font-bold">Response Time</h3>
              <p className="text-neutral-400 text-sm">Monday – Friday</p>
            </div>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            We aim to reply within two business days. Bug reports that affect a calculation are prioritised ahead of everything else.
          </p>
        </div>

        <div className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary-fixed" />
            </div>
            <div>
              <h3 className="text-white font-bold">Feature Requests</h3>
              <p className="text-neutral-400 text-sm">New calculators welcome</p>
            </div>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            Suggest a calculator, a unit, or a locale. Requests with a real-world use case and a formula or reference link are the ones we build first.
          </p>
        </div>

        <div className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary-fixed" />
            </div>
            <div>
              <h3 className="text-white font-bold">Operator</h3>
              <p className="text-neutral-400 text-sm">{APP_NAME}</p>
            </div>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            Operated by Anuhya Digital Pvt. Ltd.
            <br />
            Privacy and legal enquiries: <a className="text-primary-fixed hover:underline" href="mailto:support@thecalhub.com">support@thecalhub.com</a>
          </p>
        </div>
      </div>

      <div className="mt-12 bg-surface-container-low border border-white/5 rounded-2xl p-8">
        <h2 className="text-2xl font-black text-white mb-2">Send us a Message</h2>
        <p className="text-neutral-400 text-sm mb-6">
          Prefer email? Write to support@thecalhub.com — it reaches the same inbox.
        </p>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2" htmlFor="contact-name">Name</label>
              <input id="contact-name" type="text" className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-fixed" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-white font-medium mb-2" htmlFor="contact-email">Email</label>
              <input id="contact-email" type="email" className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-fixed" placeholder="your@email.com" />
            </div>
          </div>
          <div>
            <label className="block text-white font-medium mb-2" htmlFor="contact-subject">Subject</label>
            <select id="contact-subject" className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-fixed">
              <option>General Inquiry</option>
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>Privacy / Legal</option>
            </select>
          </div>
          <div>
            <label className="block text-white font-medium mb-2" htmlFor="contact-message">Message</label>
            <textarea id="contact-message" rows={5} className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-fixed" placeholder="Tell us how we can help..."></textarea>
          </div>
          <button type="button" className="px-8 py-4 bg-primary-fixed text-on-primary-fixed font-bold rounded-xl hover:bg-primary-fixed/90 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
