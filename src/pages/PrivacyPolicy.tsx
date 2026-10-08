import { Shield, Lock, Eye, Mail, Globe, Clock, Cookie, BarChart3, Target, Users, Baby, Settings } from 'lucide-react';
import { APP_NAME } from '@/src/data/data';
import { PageSEO } from '@/src/components/layout/PageSEO';

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-4xl mx-auto">
      <PageSEO
        title="Privacy Policy"
        description={`How ${APP_NAME} collects, uses and protects information, including cookies, Google Analytics and Google AdSense. Read our full privacy policy.`}
        keywords="privacy policy, cookies, google analytics, google adsense, data collection"
        path="/privacy-policy.html"
      />

      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tighter mb-4">Privacy Policy</h1>
        <p className="text-neutral-400 text-lg">Last updated: October 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">1. Introduction</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed mb-4">
            {APP_NAME} ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website at https://thecalhub.com (the "Website"). It also describes the choices you have about your data.
          </p>
          <p className="text-neutral-400 leading-relaxed">
            By using the Website you agree to the practices described here. If you do not agree, please do not use the Website. This policy applies only to information collected through this Website and does not apply to information collected offline or through third-party websites that we may link to.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed mb-4">
            Our calculators work in your browser and do not require an account. We do not ask you to register and we do not intentionally collect personal information such as your name, address or payment details.
          </p>
          <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
            <li><strong className="text-white">Information you provide voluntarily</strong> — for example, your email address or message content when you contact us via the Contact page.</li>
            <li><strong className="text-white">Information collected automatically</strong> — such as your IP address, browser type and version, device type, operating system, referring URL, pages viewed, and the date and time of your visit. This data is collected by our hosting provider and by the analytics and advertising services described below.</li>
            <li><strong className="text-white">Information you enter into calculators</strong> — numbers and options you type are processed locally in your browser. They are not transmitted to our servers, unless a specific tool explicitly states otherwise.</li>
          </ul>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">3. Cookies and Similar Technologies</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed mb-4">
            Cookies are small text files stored on your device by your browser. We and certain third parties use cookies, localStorage and similar technologies to:
          </p>
          <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
            <li>Keep the Website working (for example, remembering your theme, language or recent calculator choices)</li>
            <li>Understand how visitors use the Website so we can improve it</li>
            <li>Measure advertising performance and show ads that are relevant to you</li>
          </ul>
          <p className="text-neutral-400 leading-relaxed mt-4">
            You can control or delete cookies at any time through your browser settings. Blocking some cookies may affect the functionality of parts of the Website. For more information about behavioural advertising, visit <a className="text-primary-fixed hover:underline" href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer nofollow">https://aboutads.info/choices/</a>.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">4. Google Analytics</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed mb-4">
            We use Google Analytics, a web analytics service provided by Google LLC ("Google"), to understand how visitors use the Website — for example, which pages are visited most often and how long visitors stay. Google Analytics uses cookies and collects information such as your IP address and usage data.
          </p>
          <p className="text-neutral-400 leading-relaxed mb-4">
            The information generated is transmitted to and stored by Google. Google uses this information to evaluate your use of the Website, compile reports on website activity, and provide other services relating to website activity and internet usage. Google may also transfer this information to third parties where required to do so by law, or where third parties process information on Google's behalf.
          </p>
          <p className="text-neutral-400 leading-relaxed">
            You can opt out of Google Analytics by installing the <a className="text-primary-fixed hover:underline" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer nofollow">Google Analytics Opt-out Browser Add-on</a>, by adjusting your Google Ads settings, or by disabling cookies in your browser. More information is available at <a className="text-primary-fixed hover:underline" href="https://policies.google.com/technologies/partners" target="_blank" rel="noopener noreferrer nofollow">Google's policy on the use of data from partner sites</a>.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">5. Google AdSense and the DoubleClick DART Cookie</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed mb-4">
            Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this Website and other websites. Google's use of advertising cookies (including the DoubleClick DART cookie) enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the internet.
          </p>
          <p className="text-neutral-400 leading-relaxed mb-4">
            You may opt out of personalised advertising by visiting <a className="text-primary-fixed hover:underline" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer nofollow">Google Ads Settings</a>. You may also opt out of a third-party vendor's use of cookies for personalised advertising at <a className="text-primary-fixed hover:underline" href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer nofollow">aboutads.info/choices</a> or <a className="text-primary-fixed hover:underline" href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer nofollow">optout.aboutads.info</a>.
          </p>
          <p className="text-neutral-400 leading-relaxed">
            Third-party vendors, including Google, may also use cookies to collect information about your activities on this and other websites to offer personalised advertising. Google'sDoubleClick cookie may continue to function even where you have opted out.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">6. Third-Party Vendors and Their Own Policies</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed mb-4">
            Third parties may supply content, perform analytics, or deliver advertising on this Website. These parties may set or access cookies, collect information, and track your activity — including across websites over time. Examples of third parties we work with include:
          </p>
          <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
            <li><strong className="text-white">Google</strong> — Google Analytics, Google AdSense/DoubleClick (see <a className="text-primary-fixed hover:underline" href="https://policies.google.com/technologies/partners" target="_blank" rel="noopener noreferrer nofollow">policies.google.com</a> and <a className="text-primary-fixed hover:underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer nofollow">policies.google.com/privacy</a>)</li>
            <li><strong className="text-white">Our hosting and CDN provider</strong> — server logs containing IP address, browser and request data</li>
            <li><strong className="text-white">Any other advertising partners</strong> that may be activated through AdSense</li>
          </ul>
          <p className="text-neutral-400 leading-relaxed mt-4">
            This Privacy Policy does not cover the privacy or data practices of these third parties. We encourage you to review their own privacy policies.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">7. Your Choices and Opt-Out</h2>
          </div>
          <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
            <li><strong className="text-white">Opt out of interest-based ads:</strong> <a className="text-primary-fixed hover:underline" href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer nofollow">https://aboutads.info/choices/</a></li>
            <li><strong className="text-white">Opt out of participating advertising networks:</strong> <a className="text-primary-fixed hover:underline" href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer nofollow">https://optout.aboutads.info/</a></li>
            <li><strong className="text-white">Google Ads Settings:</strong> <a className="text-primary-fixed hover:underline" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer nofollow">https://www.google.com/settings/ads</a></li>
            <li><strong className="text-white">Google Analytics opt-out:</strong> browser add-on at <a className="text-primary-fixed hover:underline" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer nofollow">tools.google.com/dlpage/gaoptout</a></li>
            <li><strong className="text-white">Browser controls:</strong> block or delete cookies through your browser settings at any time</li>
            <li><strong className="text-white">Do Not Track:</strong> see the section below</li>
          </ul>
          <p className="text-neutral-400 leading-relaxed mt-4">
            You can also stop us processing your voluntary information by contacting us and requesting deletion.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Baby className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">8. Children's Privacy (COPPA)</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            The Website is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete that information promptly. We comply with the Children's Online Privacy Protection Act (COPPA). If you are a parent or guardian and believe your child has provided us with personal information, please contact us at support@thecalhub.com.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">9. Do Not Track and Global Privacy Control</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            Some browsers broadcast a "Do Not Track" (DNT) signal. Because there is no common industry standard for interpreting DNT signals, the Website does not change its behaviour in response to them. Where legally required to honour Global Privacy Control (GPC) signals, we will treat them as a valid opt-out request for the browser/device making the signal.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">10. Data Retention, Security and International Transfers</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            We retain information only for as long as necessary for the purposes described in this policy, including to comply with legal obligations. We use reasonable technical measures to protect information, but no method of transmission over the Internet is completely secure. Where data is processed outside your country (for example, by Google or our hosting provider), it may be subject to different laws; we rely on those providers' contractual and legal safeguards.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">11. Changes to This Policy</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. Your continued use of the Website after changes are posted means you accept those changes.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">12. Contact Us</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            If you have questions, concerns, or requests regarding this Privacy Policy or your data, email us at{' '}
            <a className="text-primary-fixed hover:underline" href="mailto:support@thecalhub.com">support@thecalhub.com</a>{' '}
            or use the <a className="text-primary-fixed hover:underline" href="/contact.html">Contact page</a>. We aim to respond within 2–3 business days.
          </p>
        </section>
      </div>
    </div>
  );
}
