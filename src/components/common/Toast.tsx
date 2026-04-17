import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useToast, ToastType } from '../../contexts/ToastContext';

const iconMap: Record<ToastType, React.FC<{ className?: string }>> = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const typeStyles: Record<ToastType, { bg: string; border: string; icon: string }> = {
  success: {
    bg: 'bg-green-500/90 dark:bg-green-600/90',
    border: 'border-green-400/30',
    icon: 'text-green-100',
  },
  error: {
    bg: 'bg-red-500/90 dark:bg-red-600/90',
    border: 'border-red-400/30',
    icon: 'text-red-100',
  },
  info: {
    bg: 'bg-blue-500/90 dark:bg-blue-600/90',
    border: 'border-blue-400/30',
    icon: 'text-blue-100',
  },
  warning: {
    bg: 'bg-yellow-500/90 dark:bg-yellow-600/90',
    border: 'border-yellow-400/30',
    icon: 'text-yellow-100',
  },
};

interface ToastItemProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ message, type, onClose }) => {
  const Icon = iconMap[type];
  const styles = typeStyles[type];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`${styles.bg} backdrop-blur-sm ${styles.border} border rounded-xl shadow-lg p-4 pr-10 relative max-w-sm w-full`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${styles.icon}`} />
        <p className="text-sm font-medium text-white flex-1">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1 rounded-lg hover:bg-white/20 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4 text-white/80" />
      </button>
    </motion.div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <ToastItem
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;