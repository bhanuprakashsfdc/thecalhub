import { FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { APP_NAME } from '@/src/data/data';

export default function TermsOfService() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tighter mb-4">Terms of Service</h1>
        <p className="text-neutral-400 text-lg">Last updated: April 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">Acceptance of Terms</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            By accessing and using {APP_NAME}, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using {APP_NAME}'s services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">Use License</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed mb-4">
            Permission is granted to temporarily use {APP_NAME} for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside text-neutral-400 space-y-2 ml-4">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Transfer the materials to another person</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
          </ul>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">Disclaimer</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            The materials on {APP_NAME} are provided on an 'as is' basis. {APP_NAME} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">Limitations</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            In no event shall {APP_NAME} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on {APP_NAME}, even if {APP_NAME} or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section className="bg-surface-container-low border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-primary-fixed" />
            <h2 className="text-xl font-bold text-white">Governing Law</h2>
          </div>
          <p className="text-neutral-400 leading-relaxed">
            These terms and conditions are governed by and construed in accordance with the laws of United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </section>
      </div>
    </div>
  );
}