import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/features/Header';
import { Scanner } from './components/features/Scanner';
import { Results } from './components/features/Results';
import { useUrlScanner } from './hooks/useUrlScanner';
import { Shield, Lock, Eye, Cpu, CheckCircle } from 'lucide-react';
import { Card } from './components/ui/Card';

const MainContent: React.FC = () => {
  const {
    url,
    setUrl,
    status,
    result,
    errorMessage,
    warnings,
    history,
    scanUrl,
    resetScanner,
  } = useUrlScanner();

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 md:p-6 lg:p-8">
      <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto w-full">
        {/* SafeLink Brand Header */}
        <Header />

        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400 text-xs font-semibold"
          >
            <Shield className="w-3.5 h-3.5" />
            Tactile Cyber Threat Prevention
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100"
          >
            Detect malicious links before they compromise you.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto"
          >
            Powered by trained machine learning models to inspect domain telemetry, certificate legitimacy, and URL cloaking mechanisms.
          </motion.p>
        </div>

        {/* Scanner Input Component */}
        <Scanner
          url={url}
          setUrl={setUrl}
          status={status}
          errorMessage={errorMessage}
          warnings={warnings}
          history={history}
          onScan={scanUrl}
          onReset={resetScanner}
        />

        {/* Results Component */}
        <AnimatePresence mode="wait">
          {result && (
            <Results
              key={result.url}
              result={result}
              onReset={resetScanner}
            />
          )}
        </AnimatePresence>

        {/* Security Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 max-w-4xl mx-auto">
          <Card variant="raised-sm" className="p-5 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              14-Vector Feature Extraction
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Analyzes character entropy, anchor tags, IP formats, and subdomain depths in milliseconds.
            </p>
          </Card>

          <Card variant="raised-sm" className="p-5 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Zero-Trust Verification
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Evaluates SSL validity, shortening services, and DNS registrations to expose deceptive homoglyphs.
            </p>
          </Card>

          <Card variant="raised-sm" className="p-5 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Neomorphic Soft UI
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tactile extruded surfaces, physical spring clicks, and accessible WCAG-compliant high-contrast modes.
            </p>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-300/40 dark:border-slate-800/60 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
        <p className="flex items-center justify-center gap-1.5 font-medium">
          <CheckCircle className="w-3.5 h-3.5 text-amber-500" />
          SafeLink AI Security Intelligence System
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          Backend connected to Flask port 6007 &bull; Vite + React + TypeScript + Tailwind
        </p>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
};

export default App;
