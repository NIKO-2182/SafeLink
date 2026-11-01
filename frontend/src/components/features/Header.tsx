import React from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Card } from '../ui/Card';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl mx-auto pt-8 pb-6 px-4 flex items-center justify-between">
      <div className="flex items-center gap-3.5">
        <Card
          variant="raised"
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-amber-500 dark:text-amber-400 p-0"
        >
          <div className="relative">
            <ShieldCheck className="w-7 h-7" />
            <ShieldAlert className="w-3.5 h-3.5 absolute -bottom-1 -right-1 text-red-500" />
          </div>
        </Card>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100">
              Safe<span className="text-amber-500 dark:text-amber-400">Link</span>
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-amber-500/10 text-amber-500 dark:text-amber-400 rounded-md border border-amber-500/20">
              v2.0
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Next-Gen Neomorphic Phishing Intelligence
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
};
