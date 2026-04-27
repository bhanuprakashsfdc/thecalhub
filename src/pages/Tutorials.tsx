
import { Play, Video, Clock } from 'lucide-react';

const tutorials = [
  {
    id: 1,
    title: 'Getting Started with TheCalHub',
    description: 'Learn how to navigate and use all the calculators available on TheCalHub.',
    duration: '2:30',
    category: 'Getting Started',
  },
  {
    id: 2,
    title: 'How to Calculate EMI',
    description: 'Step-by-step guide to calculating loan EMIs using our EMI calculator.',
    duration: '3:45',
    category: 'Financial',
  },
  {
    id: 3,
    title: 'Understanding BMI',
    description: 'Learn what BMI is, how it is calculated, and what your results mean.',
    duration: '4:15',
    category: 'Health',
  },
  {
    id: 4,
    title: 'Compound Interest Explained',
    description: 'Visual guide to understanding how compound interest works and grows your money.',
    duration: '5:00',
    category: 'Financial',
  },
  {
    id: 5,
    title: 'Using the Scientific Calculator',
    description: 'Tutorial on advanced functions available in our scientific calculator.',
    duration: '6:20',
    category: 'Math',
  },
  {
    id: 6,
    title: 'Planning Retirement with Our Calculator',
    description: 'How to use the retirement calculator to plan your future savings goals.',
    duration: '4:50',
    category: 'Financial',
  },
];

export default function Tutorials() {
  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Video className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Video Guides</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Calculator Tutorials</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Watch step-by-step video tutorials on how to use our calculators effectively.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="bg-surface-container-low rounded-xl border border-white/5 hover:border-primary-fixed/50 hover:bg-surface-container-high transition-all group overflow-hidden"
          >
            <div className="aspect-video bg-surface-container-highest flex items-center justify-center relative">
              <div className="absolute inset-0 bg-primary-fixed/5"></div>
              <button className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center hover:bg-primary-fixed/90 transition-colors relative z-10">
                <Play className="w-6 h-6 text-on-primary-fixed ml-1" />
              </button>
              <span className="absolute bottom-3 right-3 text-[10px] font-mono text-white bg-black/50 px-2 py-1 rounded flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {tutorial.duration}
              </span>
            </div>
            <div className="p-5">
              <span className="text-[10px] font-mono text-primary-fixed uppercase tracking-widest mb-2 block">
                {tutorial.category}
              </span>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-fixed transition-colors">
                {tutorial.title}
              </h3>
              <p className="text-neutral-400 text-sm">
                {tutorial.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-surface-container-low rounded-xl border border-white/5">
        <h3 className="text-lg font-bold text-white mb-2">More Tutorials Coming Soon</h3>
        <p className="text-neutral-400 text-sm">
          We are working on adding more video tutorials covering all calculator categories. Subscribe to our newsletter to get notified about new content.
        </p>
      </div>
    </div>
  );
}
