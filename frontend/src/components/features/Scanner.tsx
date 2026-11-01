import React from 'react';
import { Globe, AlertTriangle, Sparkles, History, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { HistoryItem, ScanStatus } from '../../types/api';

export interface ScannerProps {
  url: string;
  setUrl: (url: string) => void;
  status: ScanStatus;
  errorMessage: string | null;
  warnings: string[];
  history: HistoryItem[];
  onScan: (targetUrl?: string) => void;
  onReset: () => void;
}

const SAMPLE_URLS = [
  { label: 'Google (Legitimate)', url: 'https://google.com', type: 'legit' },
  { label: 'GitHub (Legitimate)', url: 'https://github.com', type: 'legit' },
  { label: 'Paypal Verification (Phishing)', url: 'http://paypal-verification-account-update.com/login', type: 'phish' },
  { label: 'Suspicious IP Host', url: 'http://192.168.1.100/secure-login', type: 'phish' },
];

export const Scanner: React.FC<ScannerProps> = ({
  url,
  setUrl,
  status,
  errorMessage,
  warnings,
  history,
  onScan,
  onReset,
}) => {
  const isScanning = status === 'scanning';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onScan();
  };

  const handleSampleClick = (sampleUrl: string) => {
    setUrl(sampleUrl);
    onScan(sampleUrl);
  };

  return (
    <Card variant="raised-lg" className="w-full max-w-4xl mx-auto p-6 md:p-8 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400">
            Real-Time Analysis Engine
          </span>
          {history.length > 0 && (
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <History className="w-3.5 h-3.5" />
              {history.length} recent {history.length === 1 ? 'scan' : 'scans'}
            </span>
          )}
        </div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          Inspect any link for malicious traits
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Evaluates lexical patterns, domain age, security certificates, and redirection behaviors using XGBoost machine learning.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch gap-3.5">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Paste or enter target URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onClear={onReset}
              error={errorMessage || undefined}
              icon={<Globe className="w-5 h-5" />}
              disabled={isScanning}
              autoComplete="off"
              autoFocus
            />
          </div>
          <Button
            type="submit"
            variant="convex"
            size="lg"
            isLoading={isScanning}
            disabled={!url.trim()}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="shrink-0"
          >
            {isScanning ? 'Analyzing...' : 'Scan URL'}
          </Button>
        </div>

        {/* Real-time client warnings */}
        {warnings.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5 animate-fadeIn">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Preliminary Risk Heuristics</span>
            </div>
            <ul className="text-xs text-amber-700 dark:text-amber-300/90 list-disc list-inside space-y-0.5">
              {warnings.map((warn, i) => (
                <li key={i}>{warn}</li>
              ))}
            </ul>
          </div>
        )}
      </form>

      {/* Quick Test Samples */}
      <div className="pt-2 border-t border-slate-300/40 dark:border-slate-800/60 space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick Test Presets:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_URLS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSampleClick(sample.url)}
              disabled={isScanning}
              className="text-xs px-3 py-1.5 rounded-xl font-medium cursor-pointer transition-all duration-200
                bg-nm-light-surface dark:bg-nm-dark-surface
                shadow-nm-raised-sm dark:shadow-nm-dark-raised-sm
                hover:shadow-nm-inset-sm dark:hover:shadow-nm-dark-inset-sm
                text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400
                border border-white/50 dark:border-white/5 active:scale-95"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent History Quick Bar */}
      {history.length > 0 && (
        <div className="pt-2 border-t border-slate-300/40 dark:border-slate-800/60 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <History className="w-3.5 h-3.5" />
              Recent Scans
            </span>
          </div>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
            {history.slice(0, 5).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSampleClick(item.url)}
                className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-xl bg-nm-light-surface dark:bg-nm-dark-surface shadow-nm-flat dark:shadow-nm-dark-flat border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:border-amber-400/40 transition-colors"
              >
                <Badge
                  size="sm"
                  variant={item.prediction === 'PHISHING' ? 'danger' : 'success'}
                >
                  {item.prediction === 'PHISHING' ? 'PHISH' : 'SAFE'}
                </Badge>
                <span className="truncate max-w-[150px] font-mono">{item.url}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
