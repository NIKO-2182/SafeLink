import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'raised' | 'inset' | 'flat' | 'raised-sm' | 'raised-lg';
  as?: React.ElementType;
}

export const Card: React.FC<CardProps> = ({
  variant = 'raised',
  className,
  children,
  as: Component = 'div',
  ...props
}) => {
  const variantStyles = {
    raised: 'shadow-nm-raised dark:shadow-nm-dark-raised',
    'raised-sm': 'shadow-nm-raised-sm dark:shadow-nm-dark-raised-sm',
    'raised-lg': 'shadow-nm-raised-lg dark:shadow-nm-dark-raised-lg',
    inset: 'shadow-nm-inset dark:shadow-nm-dark-inset',
    flat: 'shadow-nm-flat dark:shadow-nm-dark-flat',
  }[variant];

  return (
    <Component
      className={cn(
        'bg-nm-light-surface dark:bg-nm-dark-surface',
        'border border-white/40 dark:border-white/5',
        'rounded-3xl transition-all duration-300',
        variantStyles,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
