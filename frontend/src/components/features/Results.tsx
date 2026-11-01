import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  AlertOctagon,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { FeatureTagList } from './FeatureTagList';
import type { PredictResponse } from '../../types/api';
import { formatConfidence } from '../../utils/formatters';
import { cn } from '../../utils/cn';

export interface ResultsProps {
  result: PredictResponse;
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ result, onReset }) => {
  const isPhishing = result.prediction === 'PHISHING';
  const confidenceScore = formatConfidence(result.confidence);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `SafeLink Threat Report\nURL: ${result.url}\nVerdict: ${result.prediction}\nConfidence: ${result.confidence}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.section
      aria-live="polite"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      <Card
        variant="raised-lg"
        className={cn(
          'p-6 md:p-8 space-y-6 overflow-hidden relative',
          isPhishing
            ? 'shadow-nm-threat-glow dark:shadow-nm-threat-dark-glow border-red-500/30'
            : 'shadow-nm-safe-glow dark:shadow-nm-safe-dark-glow border-emerald-500/30'
        )}
      >
        {/* Header verdict bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-300/40 dark:border-slate-800/60">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'w-16 h-16 rounded-2xl flex items-center justify-center shrink-0',
                'shadow-nm-inset dark:shadow-nm-dark-inset border',
                isPhishing
                  ? 'border-red-500/40 text-red-600 dark:text-red-400 bg-red-500/10'
                  : 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
              )}
            >
              {isPhishing ? (
                <ShieldAlert className="w-9 h-9 animate-pulse" />
              ) : (
                <ShieldCheck className="w-9 h-9" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md',
                    isPhishing
                      ? 'bg-red-500/20 text-red-600 dark:text-red-400'
                      : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  )}
                >
                  Verdict Classification
                </span>
                <span className="text-xs text-slate-400 font-mono">Status: {result.status}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                {isPhishing ? 'Malicious Phishing Detected' : 'Verified Legitimate Link'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              leftIcon={copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            >
              {copied ? 'Copied' : 'Share Report'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onReset}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              New Scan
            </Button>
          </div>
        </div>

        {/* URL Display */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Target Scanned URL
          </span>
          <div className="p-3.5 rounded-2xl bg-nm-light-surface dark:bg-nm-dark-surface shadow-nm-inset dark:shadow-nm-dark-inset border border-slate-300/40 dark:border-slate-800/60 flex items-center justify-between gap-3">
            <code className="text-xs md:text-sm font-mono text-slate-800 dark:text-slate-200 truncate select-all">
              {result.url}
            </code>
            {!isPhishing && (
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 inline-flex items-center gap-1 font-semibold shrink-0"
              >
                Visit <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Confidence Gauge & Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Confidence Meter Card */}
          <Card
            variant="inset"
            className="p-4 md:p-5 flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Model Confidence
              </span>
              <Badge
                variant={isPhishing ? 'danger' : 'success'}
                size="sm"
              >
                {result.confidence}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                  {confidenceScore}%
                </span>
                <span className="text-xs text-slate-400">Certainty Index</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700/60 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidenceScore}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={cn(
                    'h-full rounded-full',
                    isPhishing ? 'bg-red-500' : 'bg-emerald-500'
                  )}
                />
              </div>
            </div>
          </Card>

          {/* Risk Level Assessment */}
          <Card
            variant="inset"
            className="p-4 md:p-5 flex flex-col justify-between space-y-3"
          >
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Risk Severity
            </span>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {isPhishing ? (
                  <AlertOctagon className="w-5 h-5 text-red-500 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                )}
                <span className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {isPhishing ? 'Critical Hazard' : 'Low / Safe Profile'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {isPhishing
                  ? 'High probability of credentials harvesting or impersonation.'
                  : 'Meets standard SSL and domain credibility metrics.'}
              </p>
            </div>
          </Card>

          {/* Actionable Advice */}
          <Card
            variant="inset"
            className="p-4 md:p-5 flex flex-col justify-between space-y-3"
          >
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Recommended Protocol
            </span>
            <div className="space-y-1">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {isPhishing ? 'Do Not Open Link' : 'Safe to Browse'}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {isPhishing
                  ? 'Avoid entering credentials, one-time passwords, or downloading attachments.'
                  : 'Always verify TLS padlock in browser address bar before transacting.'}
              </p>
            </div>
          </Card>
        </div>

        {/* Detailed Extracted Features */}
        <div className="pt-4 border-t border-slate-300/40 dark:border-slate-800/60">
          <FeatureTagList features={result.detected_features} />
        </div>
      </Card>
    </motion.section>
  );
};
