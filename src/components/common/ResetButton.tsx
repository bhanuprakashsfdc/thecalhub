import { RotateCcw } from 'lucide-react';

interface ResetButtonProps {
  onReset: () => void;
  className?: string;
}

export default function ResetButton({ onReset, className = '' }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-neutral-400 hover:text-white transition-all text-sm font-medium ${className}`}
      aria-label="Reset calculator"
    >
      <RotateCcw className="w-4 h-4" />
      <span>Reset</span>
    </button>
  );
}