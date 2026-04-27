import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  size?: number;
  innerRadius?: number;
  outerRadius?: number;
  centerText?: string;
}

export function DonutChart({ 
  data, 
  size = 160, 
  innerRadius = 50, 
  outerRadius = 70,
  centerText 
}: DonutChartProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {centerText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Total</span>
          <span className="text-lg font-black text-white">{centerText}</span>
        </div>
      )}
    </div>
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
      <h3 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-surface-container-highest p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">{faq.question}</h4>
            <p className="text-neutral-400 text-sm leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface AboutSectionProps {
  title: string;
  description: string;
  features?: string[];
  formula?: string;
}

export function AboutSection({ title, description, features, formula }: AboutSectionProps) {
  return (
    <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
      <h3 className="text-lg font-bold text-white mb-4">About {title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed mb-4">{description}</p>
      {features && features.length > 0 && (
        <>
          <h4 className="text-white font-medium mb-2">Key Features</h4>
          <ul className="space-y-2 mb-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-neutral-400 text-sm">
                <span className="text-primary-fixed mt-1">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </>
      )}
      {formula && (
        <>
          <h4 className="text-white font-medium mb-2">Formula</h4>
          <div className="bg-surface-container-highest p-4 rounded-lg">
            <code className="text-primary-fixed font-mono text-sm">{formula}</code>
          </div>
        </>
      )}
    </div>
  );
}