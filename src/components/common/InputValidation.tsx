import { AlertCircle } from 'lucide-react';

interface InputValidationProps {
  error: string | null;
  className?: string;
}

export default function InputValidation({ error, className = '' }: InputValidationProps) {
  if (!error) return null;

  return (
    <div className={`flex items-center gap-2 text-red-400 text-xs mt-1 ${className}`} role="alert">
      <AlertCircle className="w-3 h-3" />
      <span>{error}</span>
    </div>
  );
}