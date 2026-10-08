import { FileText, AlertCircle, CheckCircle, Scale, Link2, RefreshCw } from 'lucide-react';
import { APP_NAME } from '@/src/data/data';
import { PageSEO } from '@/src/components/layout/PageSEO';

export default function TermsOfService() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-4xl mx-auto">
      <PageSEO
        title="Terms of Service"
        description={`The terms and conditions governing your use of ${APP_NAME}, including our informational-purposes-only disclaimer, accuracy caveat and limitation of liability.`}
        keywords="terms of service, disclaimer, calculator accuracy, liability"
        path="/terms-of-service.html"
      />

      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tighter mb-4">Terms of Service</h1>
        <p className="text-neutral-400 text-lg">Last updated: October 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            By accessing and using {APP_NAME} (the "Website"), you accept and agree to be bound by these Terms of Service and by our <a className="text-primary-fixed hover:underline" href="/privacy-policy.html">Privacy Policy</a>. If you do not agree with any part of these terms, do not use the Website. When using the Website you must also comply with any posted guidelines, rules, or applicable law.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">2. Permitted Use</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed mb-4">
            {APP_NAME} grants you a personal, non-exclusive, non-transferable, revocable licence to access and use the calculators and content on the Website for lawful, personal, and informational purposes. You agree not to:
          </p>
          <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
            <li>Use the Website for any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>Attempt to gain unauthorised access to any part of the Website, its servers, or its data</li>
            <li>Interfere with or disrupt the Website, including introducing viruses or overloading the service</li>
            <li>Scrape, crawl, or systematically copy Website content for republication without permission</li>
            <li>Reverse engineer any software used on the Website, or remove proprietary notices</li>
            <li>Use the Website in a way that infringes the rights of, or causes harm to, any person or entity</li>
          </ul>
          <p className="text-neutral-400 leading-relaxed mt-4">
            We may suspend or terminate access for anyone who abuses the service or violates these terms.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">3. Informational Purposes Only — Not Professional Advice</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed mb-4">
            <strong className="text-white">All calculators, tools, charts, and content on {APP_NAME} are provided for general informational and educational purposes only.</strong> They are not, and must not be relied upon as, financial, investment, medical, health, legal, accounting, or tax advice.
          </p>
          <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
            <li><strong className="text-white">Not financial or investment advice</strong> — results are estimates based on the inputs you provide and published formulas; they are not a recommendation to buy, sell, or hold any security, loan, or insurance product.</li>
            <li><strong className="text-white">Not medical or health advice</strong> — health-related outputs are general approximations and are not a diagnosis, treatment plan, or substitute for a qualified healthcare professional.</li>
            <li><strong className="text-white">Not legal or tax advice</strong> — nothing on the Website creates an attorney-client or accountant-client relationship.</li>
          </ul>
          <p className="text-neutral-400 leading-relaxed mt-4">
            Before making any financial, medical, legal, or tax decision, consult a qualified professional who can consider your individual circumstances.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">4. Accuracy of Calculator Results</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            We work to keep our calculators accurate and up to date, but we make no representation, warranty, or guarantee that results are complete, current, error-free, or suitable for your purpose. Outputs depend entirely on the values you enter, on rounding conventions, on the formulas and rate assumptions we publish, and on third-party data (such as interest rates or tax percentages) that may change without notice. You are responsible for verifying any result before acting on it. Rounding differences of small amounts are expected and normal.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">5. Disclaimer of Warranties</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            The Website and all content are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Website will be uninterrupted, secure, or free of errors or viruses, or that defects will be corrected.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">6. Limitation of Liability</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            To the maximum extent permitted by law, {APP_NAME}, its owners, contributors, and suppliers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, goodwill, or business opportunity, arising out of or in connection with your use of (or inability to use) the Website or reliance on any calculator result. Your sole remedy is to stop using the Website. In jurisdictions that do not allow certain limitations, our liability is limited to the fullest extent permitted by law. Nothing in these terms excludes liability that cannot be excluded by law.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Link2 className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">7. External Links</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            The Website may contain links to third-party websites, services, or advertisements that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites. You access such links at your own risk, and you should review the applicable terms and privacy policies of those sites. Inclusion of a link does not imply endorsement.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">8. Intellectual Property</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            Unless otherwise stated, the Website's design, text, graphics, logos, and original explanations are owned by or licensed to {APP_NAME}. You may not reproduce, distribute, or create derivative works from them without prior written permission, except for fair use as permitted by applicable law. Third-party trademarks (such as the names of products or services we reference) belong to their respective owners.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">9. Changes to These Terms</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            We may revise these Terms of Service at any time. When we do, we will update the "Last updated" date above and, for material changes, post a prominent notice on the Website. Continued use of the Website after changes take effect constitutes acceptance of the revised terms. If you do not agree, stop using the Website.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">10. Governing Law and Contact</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            These terms are governed by the laws applicable in the jurisdiction where the operator is established, without regard to conflict-of-law principles. If any provision of these terms is found unenforceable, the remaining provisions will remain in effect. Questions about these terms can be sent to{' '}
            <a className="text-primary-fixed hover:underline" href="mailto:support@thecalhub.com">support@thecalhub.com</a> or via the <a className="text-primary-fixed hover:underline" href="/contact.html">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
