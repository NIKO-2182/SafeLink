import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../utils/cn';

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={cn(
        'relative w-11 h-11 rounded-2xl flex items-center justify-center cursor-pointer',
        'bg-nm-light-surface dark:bg-nm-dark-surface',
        'shadow-nm-raised dark:shadow-nm-dark-raised',
        'hover:shadow-nm-flat dark:hover:shadow-nm-dark-flat active:shadow-nm-inset dark:active:shadow-nm-dark-inset',
        'border border-white/60 dark:border-white/10 text-slate-700 dark:text-slate-200 transition-shadow duration-200',
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-amber-400"
          >
            <Moon className="w-5 h-5 fill-amber-400/20" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-amber-500"
          >
            <Sun className="w-5 h-5 fill-amber-500/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
