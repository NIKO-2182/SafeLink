export interface PredictRequest {
  url: string;
}

export interface PredictResponse {
  url: string;
  prediction: 'PHISHING' | 'LEGITIMATE';
  confidence: string; // e.g. "94.2%"
  detected_features: Record<string, number>;
  status: number;
}

export interface ApiError {
  error: string;
  status: number;
}

export type ScanStatus = 'idle' | 'scanning' | 'success' | 'error';

export interface HistoryItem {
  id: string;
  url: string;
  prediction: 'PHISHING' | 'LEGITIMATE';
  confidence: string;
  timestamp: number;
}
