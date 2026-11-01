import { useState, useCallback, useRef } from 'react';
import type { PredictResponse, ScanStatus, HistoryItem } from '../types/api';
import { validateUrl } from '../utils/urlValidator';

const HISTORY_KEY = 'safelink-scan-history';

export function useUrlScanner() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const saveToHistory = useCallback((res: PredictResponse) => {
    const item: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      url: res.url,
      prediction: res.prediction,
      confidence: res.confidence,
      timestamp: Date.now(),
    };
    setHistory((prev) => {
      const updated = [item, ...prev.filter((h) => h.url !== res.url)].slice(0, 8);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  }, []);

  const handleInputChange = useCallback((newUrl: string) => {
    setUrl(newUrl);
    setErrorMessage(null);
    if (newUrl.trim()) {
      const validation = validateUrl(newUrl);
      setWarnings(validation.warnings);
    } else {
      setWarnings([]);
    }
  }, []);

  const scanUrl = useCallback(
    async (urlToScan?: string) => {
      const target = (urlToScan ?? url).trim();

      const validation = validateUrl(target);
      if (!validation.isValid) {
        setErrorMessage(validation.error || 'Please enter a valid URL.');
        setStatus('error');
        return;
      }

      setWarnings(validation.warnings);
      setErrorMessage(null);
      setStatus('scanning');

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch('/api/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: validation.sanitizedUrl }),
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Server responded with error status ${response.status}`);
        }

        const validResult: PredictResponse = {
          url: data.url || validation.sanitizedUrl,
          prediction: data.prediction || 'LEGITIMATE',
          confidence: data.confidence || '90.0%',
          detected_features: data.detected_features || {},
          status: data.status || 200,
        };

        setResult(validResult);
        setStatus('success');
        saveToHistory(validResult);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        const message = err instanceof Error ? err.message : 'Failed to connect to phishing scanner API.';
        setErrorMessage(message);
        setStatus('error');
      } finally {
        abortControllerRef.current = null;
      }
    },
    [url, saveToHistory]
  );

  const resetScanner = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setUrl('');
    setResult(null);
    setErrorMessage(null);
    setWarnings([]);
    setStatus('idle');
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      // Ignore
    }
  }, []);

  return {
    url,
    setUrl: handleInputChange,
    status,
    result,
    errorMessage,
    warnings,
    history,
    scanUrl,
    resetScanner,
    clearHistory,
  };
}
