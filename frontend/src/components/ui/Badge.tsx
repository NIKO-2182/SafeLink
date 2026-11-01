import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'danger' | 'success' | 'warning' | 'info' | 'inset';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  icon,
  className,
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 rounded-full gap-1',
    md: 'text-xs md:text-sm px-3.5 py-1 rounded-full gap-1.5',
  }[size];

  const variantStyles = {
    default: cn(
      'bg-nm-light-surface dark:bg-nm-dark-surface',
      'text-slate-700 dark:text-slate-300',
      'shadow-nm-raised-sm dark:shadow-nm-dark-raised-sm',
      'border border-slate-200/50 dark:border-slate-700/50'
    ),
    inset: cn(
      'bg-nm-light-surface dark:bg-nm-dark-surface',
      'text-slate-600 dark:text-slate-400',
      'shadow-nm-inset-sm dark:shadow-nm-dark-inset-sm',
      'border border-slate-300/30 dark:border-slate-800/60'
    ),
    danger: cn(
      'bg-red-500/15 text-red-700 dark:text-red-400',
      'border border-red-500/30 dark:border-red-500/30',
      'shadow-nm-raised-sm dark:shadow-nm-dark-raised-sm'
    ),
    success: cn(
      'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
      'border border-emerald-500/30 dark:border-emerald-500/30',
      'shadow-nm-raised-sm dark:shadow-nm-dark-raised-sm'
    ),
    warning: cn(
      'bg-amber-500/15 text-amber-700 dark:text-amber-400',
      'border border-amber-500/30 dark:border-amber-500/30',
      'shadow-nm-raised-sm dark:shadow-nm-dark-raised-sm'
    ),
    info: cn(
      'bg-blue-500/15 text-blue-700 dark:text-blue-400',
      'border border-blue-500/30 dark:border-blue-500/30',
      'shadow-nm-raised-sm dark:shadow-nm-dark-raised-sm'
    ),
  }[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium select-none',
        sizeStyles,
        variantStyles,
        className
      )}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
