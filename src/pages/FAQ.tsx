import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'Are these calculators free to use?',
    answer: 'Yes, all calculators on TheCalHub are completely free to use. We believe everyone should have access to accurate financial and health calculations.',
  },
  {
    question: 'How accurate are the calculations?',
    answer: 'Our calculators use precise mathematical formulas and high-precision arithmetic to ensure accurate results. However, these calculations are for informational purposes only and should not be considered as professional financial or medical advice.',
  },
  {
    question: 'Is my data saved when using these calculators?',
    answer: 'No, all calculations are performed locally in your browser. We do not collect, store, or transmit any personal data. Your inputs are never sent to our servers.',
  },
  {
    question: 'Can I use these calculators on mobile devices?',
    answer: 'Yes, TheCalHub is fully responsive and works on desktop computers, tablets, and mobile phones. All calculators are optimized for touch input on mobile devices.',
  },
  {
    question: 'How do I calculate EMI for my loan?',
    answer: 'To calculate EMI, you need the principal loan amount, interest rate, and loan tenure. Enter these values in our EMI Calculator and it will instantly compute your monthly installment, total interest, and total payment.',
  },
  {
    question: 'What is the difference between simple and compound interest?',
    answer: 'Simple interest is calculated only on the principal amount. Compound interest is calculated on both the principal and the accumulated interest from previous periods, leading to faster growth of the investment or loan amount.',
  },
  {
    question: 'How is BMI calculated?',
    answer: 'BMI is calculated by dividing your weight in kilograms by the square of your height in meters. For example, if you weigh 70kg and are 1.75m tall, your BMI is 70 / (1.75)² = 22.86.',
  },
  {
    question: 'What interest rate should I use for calculations?',
    answer: 'Use the annual interest rate offered by your bank or lender. For FD/RD calculations, use the current prevailing rates. Our calculators use annual percentage rates by default.',
  },
  {
    question: 'Can I embed these calculators on my website?',
    answer: 'Currently, embedding our calculators is not supported. We are working on providing embeddable widgets in future updates.',
  },
  {
    question: 'How often are the calculators updated?',
    answer: 'We regularly update our calculators to ensure they follow the latest mathematical standards and tax regulations. Tax calculators are updated whenever tax laws change.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left hover:text-primary-fixed transition-colors"
      >
        <span className="text-white font-medium pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-primary-fixed shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neutral-500 shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-5 text-neutral-400 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <HelpCircle className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Support</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Calculator FAQs</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Find answers to common questions about using our calculators.
        </p>
      </div>

      <div className="max-w-3xl">
        <div className="bg-surface-container-low rounded-xl border border-white/5 p-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-8 p-6 bg-surface-container-low rounded-xl border border-white/5">
          <h3 className="text-lg font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-neutral-400 text-sm">
            If you cannot find the answer to your question, please check our blog section for detailed guides or contact us for further assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
