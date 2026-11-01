export interface FeatureMetadata {
  label: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'info';
  iconName: string;
}

const FEATURE_DICTIONARY: Record<string, FeatureMetadata> = {
  URLURL_Length: {
    label: 'Excessive URL Length',
    description: 'URLs exceeding 54 characters are frequently used to obfuscate true destinations or embed tokens.',
    severity: 'medium',
    iconName: 'Ruler',
  },
  Shortining_Service: {
    label: 'URL Shortener Detected',
    description: 'Uses a link shortening service (e.g. bit.ly, tinyurl) which hides the final domain destination.',
    severity: 'high',
    iconName: 'Scissors',
  },
  having_At_Symbol: {
    label: 'Embedded Credentials / @ Symbol',
    description: 'Contains an "@" symbol, which browsers interpret as credentials and ignores preceding hostname.',
    severity: 'high',
    iconName: 'AtSign',
  },
  double_slash_redirecting: {
    label: 'Double Slash Redirection',
    description: 'Contains "//" in the URL path, often used to redirect victims to another third-party site.',
    severity: 'high',
    iconName: 'Split',
  },
  Prefix_Suffix: {
    label: 'Hyphenated Domain (Prefix/Suffix)',
    description: 'Phishing domains frequently include hyphens (e.g. paypal-verify.com) to mimic genuine brands.',
    severity: 'medium',
    iconName: 'Minus',
  },
  having_Sub_Domain: {
    label: 'Deep Subdomain Nesting',
    description: 'Multiple levels of subdomains detected, typical in credential harvesting infrastructure.',
    severity: 'medium',
    iconName: 'Network',
  },
  SSLfinal_State: {
    label: 'Insecure / Missing SSL Certificate',
    description: 'The connection is not secured via standard TLS/HTTPS encryption.',
    severity: 'high',
    iconName: 'ShieldAlert',
  },
  Domain_registeration_length: {
    label: 'Domain Name Length',
    description: 'Length metric of the domain identifier.',
    severity: 'info',
    iconName: 'FileText',
  },
  Request_URL: {
    label: 'Suspicious Action Keyword',
    description: 'Contains keywords commonly associated with urgent account actions (login, verify, secure, update).',
    severity: 'high',
    iconName: 'AlertTriangle',
  },
  URL_of_Anchor: {
    label: 'Anchor Tag / Hash Fragment Anomaly',
    description: 'Uses hash anchors or internal references that may bypass standard domain inspections.',
    severity: 'low',
    iconName: 'Anchor',
  },
  age_of_domain: {
    label: 'Recently Registered Domain',
    description: 'Newly created domains (less than 6-12 months old) present significantly higher risk of malicious activity.',
    severity: 'high',
    iconName: 'Clock',
  },
  DNSRecord: {
    label: 'Active DNS Resolution',
    description: 'DNS query resolves to an active host.',
    severity: 'info',
    iconName: 'Globe',
  },
  web_traffic: {
    label: 'Path Depth & Traversal',
    description: 'Number of nested URL path segments analyzed.',
    severity: 'info',
    iconName: 'Layers',
  },
  Google_Index: {
    label: 'Search Engine Index Indicators',
    description: 'Presence of indexing or search pattern tokens in the target URL.',
    severity: 'low',
    iconName: 'Search',
  },
};

export function formatFeatureKey(key: string): FeatureMetadata {
  if (FEATURE_DICTIONARY[key]) {
    return FEATURE_DICTIONARY[key];
  }

  // Fallback formatter for unmapped or new features
  const cleanLabel = key
    .replace(/^having_/, 'Has ')
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim();

  return {
    label: cleanLabel.charAt(0).toUpperCase() + cleanLabel.slice(1),
    description: `Analyzed security metric: ${key}`,
    severity: 'info',
    iconName: 'Info',
  };
}

export function formatConfidence(confidenceStr: string): number {
  const num = parseFloat(confidenceStr.replace('%', ''));
  return isNaN(num) ? 0 : Math.min(100, Math.max(0, num));
}
