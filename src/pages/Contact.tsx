import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tighter mb-4">Contact Us</h1>
        <p className="text-neutral-400 text-lg">Have questions? We'd love to hear from you.</p>
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
            For general inquiries and support, email us anytime. We typically respond within 24-48 hours.
          </p>
        </div>

        <div className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-primary-fixed" />
            </div>
            <div>
              <h3 className="text-white font-bold">Live Chat</h3>
              <p className="text-neutral-400 text-sm">Available 9AM - 6PM EST</p>
            </div>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            Chat with us in real-time for quick answers to your questions about our calculators.
          </p>
        </div>

        <div className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary-fixed" />
            </div>
            <div>
              <h3 className="text-white font-bold">Phone</h3>
              <p className="text-neutral-400 text-sm">1-800-CAL-HUB</p>
            </div>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            Available for premium users during business hours. Standard response time: 1-2 hours.
          </p>
        </div>

        <div className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary-fixed" />
            </div>
            <div>
              <h3 className="text-white font-bold">Mailing Address</h3>
              <p className="text-neutral-400 text-sm">LinearBytes Inc.</p>
            </div>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            123 Innovation Drive<br />
            San Francisco, CA 94102<br />
            United States
          </p>
        </div>
      </div>

      <div className="mt-12 bg-surface-container-low border border-white/5 rounded-2xl p-8">
        <h2 className="text-2xl font-black text-white mb-6">Send us a Message</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Name</label>
              <input type="text" className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-fixed" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Email</label>
              <input type="email" className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-fixed" placeholder="your@email.com" />
            </div>
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Subject</label>
            <select className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-fixed">
              <option>General Inquiry</option>
              <option>Technical Support</option>
              <option>Feedback</option>
              <option>Partnership</option>
            </select>
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Message</label>
            <textarea rows={5} className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-fixed" placeholder="Tell us how we can help..."></textarea>
          </div>
          <button type="button" className="px-8 py-4 bg-primary-fixed text-on-primary-fixed font-bold rounded-xl hover:bg-primary-fixed/90 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}