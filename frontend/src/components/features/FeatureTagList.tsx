import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  ShieldCheck,
  Ruler,
  Scissors,
  AtSign,
  Split,
  Minus,
  Network,
  AlertTriangle,
  Anchor,
  Clock,
  Globe,
  Layers,
  Search,
  FileText,
  Info,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatFeatureKey } from '../../utils/formatters';

export interface FeatureTagListProps {
  features: Record<string, number>;
}

// Icon mapper helper
const getIcon = (iconName: string) => {
  const props = { className: 'w-4 h-4' };
  switch (iconName) {
    case 'Ruler': return <Ruler {...props} />;
    case 'Scissors': return <Scissors {...props} />;
    case 'AtSign': return <AtSign {...props} />;
    case 'Split': return <Split {...props} />;
    case 'Minus': return <Minus {...props} />;
    case 'Network': return <Network {...props} />;
    case 'ShieldAlert': return <ShieldAlert {...props} />;
    case 'AlertTriangle': return <AlertTriangle {...props} />;
    case 'Anchor': return <Anchor {...props} />;
    case 'Clock': return <Clock {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'Layers': return <Layers {...props} />;
    case 'Search': return <Search {...props} />;
    case 'FileText': return <FileText {...props} />;
    default: return <Info {...props} />;
  }
};

export const FeatureTagList: React.FC<FeatureTagListProps> = ({ features }) => {
  const entries = Object.entries(features);

  if (entries.length === 0) {
    return (
      <Card variant="inset" className="p-5 text-center space-y-2">
        <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto" />
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          No Anomalous Features Triggered
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          The link did not exhibit common heuristic indicators like suspicious redirections, unencrypted transport, or shortened destinations.
        </p>
      </Card>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
          Detected Heuristic Signals ({entries.length})
        </h4>
        <span className="text-xs text-slate-400">Model Feature Extraction</span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        {entries.map(([key, value]) => {
          const meta = formatFeatureKey(key);
          const badgeVariant =
            meta.severity === 'high'
              ? 'danger'
              : meta.severity === 'medium'
              ? 'warning'
              : 'info';

          return (
            <motion.div key={key} variants={itemVariants}>
              <Card
                variant="raised-sm"
                className="p-4 h-full flex flex-col justify-between space-y-2 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-nm-light-surface dark:bg-nm-dark-surface shadow-nm-inset-sm text-slate-600 dark:text-slate-300">
                      {getIcon(meta.iconName)}
                    </div>
                    <div>
                      <h5 className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {meta.label}
                      </h5>
                      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                        Raw value: {value}
                      </span>
                    </div>
                  </div>

                  <Badge variant={badgeVariant} size="sm">
                    {meta.severity.toUpperCase()}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {meta.description}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
