import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  onClear?: () => void;
  showClear?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      onClear,
      showClear = true,
      className,
      value,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : 'nm-input');
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== null && String(value).length > 0;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-semibold tracking-wide transition-colors duration-200',
              isFocused
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400'
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4.5 pointer-events-none text-slate-400 dark:text-slate-500 transition-colors">
              {icon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            value={value}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              'w-full py-3.5 px-4 rounded-2xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500',
              'bg-nm-light-surface dark:bg-nm-dark-surface',
              'shadow-nm-inset dark:shadow-nm-dark-inset',
              'border border-slate-300/40 dark:border-slate-700/50',
              'focus:border-blue-500/60 dark:focus:border-blue-500/60 focus:outline-none',
              'transition-all duration-200 text-sm md:text-base font-medium',
              icon ? 'pl-12' : 'pl-4',
              hasValue && showClear ? 'pr-11' : 'pr-4',
              error && 'border-red-500/80 focus:border-red-500',
              className
            )}
            {...props}
          />

          {hasValue && showClear && onClear && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear input"
              className={cn(
                'absolute right-3.5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200',
                'bg-nm-light-surface dark:bg-nm-dark-surface',
                'shadow-nm-raised-sm dark:shadow-nm-dark-raised-sm active:shadow-nm-inset-sm transition-all',
                'focus:outline-none focus:ring-2 focus:ring-blue-500'
              )}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-xs font-medium text-red-500 dark:text-red-400 pl-1 animate-fadeIn"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
