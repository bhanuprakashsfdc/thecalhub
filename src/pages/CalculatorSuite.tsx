import { motion } from 'motion/react';
import StandardCalc from '@/src/components/calculators/StandardCalc';
import FinancialCalc from '@/src/components/calculators/FinancialCalc';
import ScientificCalc from '@/src/components/calculators/ScientificCalc';
import ProgrammingCalc from '@/src/components/calculators/ProgrammingCalc';
import { Sparkles, LayoutGrid } from 'lucide-react';

export default function CalculatorSuite() {
  return (
    <div className="mt-14 p-6 md:p-10 flex-1 overflow-y-auto">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Suite</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4 flex items-center gap-4">
          Calculator Grid <LayoutGrid className="w-8 h-8 text-neutral-700" />
        </h2>
        <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
          A unified workspace featuring high-precision instruments for every domain. Reusable, modular, and reactive.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StandardCalc />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FinancialCalc />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ScientificCalc />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ProgrammingCalc />
        </motion.div>
      </div>

      <div className="mt-12 p-6 rounded-xl bg-primary-fixed/5 border border-primary-fixed/10">
        <h4 className="text-primary-fixed font-bold mb-2">Developer Note</h4>
        <p className="text-sm text-neutral-400 leading-relaxed">
          These components are built with modularity in mind. Each calculator is self-contained and can be dropped into any layout. 
          They use the shared <code className="text-primary-fixed font-mono">@/src/lib/utils</code> for styling consistency.
        </p>
      </div>
    </div>
  );
}
