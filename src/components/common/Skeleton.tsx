import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  animation = 'pulse',
}) => {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  const animationClasses = {
    pulse: 'animate-pulse bg-primary-fixed/20',
    wave: 'relative overflow-hidden bg-primary-fixed/20 after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:animate-shimmer',
    none: 'bg-primary-fixed/20',
  };

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

interface SkeletonCardProps {
  lines?: number;
  showAvatar?: boolean;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  lines = 3,
  showAvatar = true,
}) => {
  return (
    <div className="bg-surface-container-low p-5 rounded-xl border border-white/5">
      {showAvatar && (
        <div className="flex items-center gap-4 mb-4">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1">
            <Skeleton variant="text" width="60%" height={20} className="mb-2" />
            <Skeleton variant="text" width="40%" height={16} />
          </div>
        </div>
      )}
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} variant="text" width={i === lines - 1 ? '70%' : '100%'} height={16} />
        ))}
      </div>
    </div>
  );
};

export const SkeletonCalculator: React.FC = () => {
  return (
    <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={120} height={24} />
      </div>
      <div className="space-y-4 mb-6">
        <div>
          <Skeleton variant="text" width={80} height={14} className="mb-2" />
          <Skeleton variant="rectangular" width="100%" height={44} />
        </div>
        <div>
          <Skeleton variant="text" width={80} height={14} className="mb-2" />
          <Skeleton variant="rectangular" width="100%" height={44} />
        </div>
      </div>
      <Skeleton variant="rectangular" width="100%" height={48} />
      <div className="mt-6 pt-6 border-t border-white/5">
        <Skeleton variant="rectangular" width="100%" height={80} />
      </div>
    </div>
  );
};

export default Skeleton;