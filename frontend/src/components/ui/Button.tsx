import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'convex';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'py-2 px-3.5 text-xs rounded-xl gap-1.5',
    md: 'py-3 px-6 text-sm md:text-base rounded-2xl gap-2',
    lg: 'py-4 px-8 text-base md:text-lg rounded-2xl gap-2.5',
  }[size];

  const variantStyles = {
    primary: cn(
      'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold',
      'shadow-nm-raised-sm dark:shadow-nm-dark-raised-sm active:shadow-nm-inset-sm',
      'border border-amber-400/50 shadow-amber-500/20'
    ),
    secondary: cn(
      'bg-nm-light-surface dark:bg-nm-dark-surface',
      'text-slate-700 dark:text-slate-200 font-semibold',
      'shadow-nm-raised dark:shadow-nm-dark-raised',
      'active:shadow-nm-inset hover:text-amber-600 dark:hover:text-amber-400',
      'border border-white/60 dark:border-white/10'
    ),
    convex: cn(
      'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold',
      'shadow-nm-raised dark:shadow-nm-dark-raised active:shadow-nm-inset',
      'border border-amber-300/40 shadow-amber-500/30'
    ),
    danger: cn(
      'bg-red-600 hover:bg-red-700 text-white font-semibold',
      'shadow-nm-raised-sm dark:shadow-nm-dark-raised-sm active:shadow-nm-inset-sm',
      'border border-red-500/50 shadow-red-500/20'
    ),
    ghost: cn(
      'bg-transparent text-slate-600 dark:text-slate-400 font-medium',
      'hover:bg-slate-200/50 dark:hover:bg-slate-800/50',
      'active:scale-95'
    ),
  }[variant];

  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { translateY: -1 } : undefined}
      whileTap={!disabled && !isLoading ? { scale: 0.98, translateY: 1 } : undefined}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center select-none font-medium transition-all duration-200 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        sizeStyles,
        variantStyles,
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};
