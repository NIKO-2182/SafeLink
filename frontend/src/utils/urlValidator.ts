export interface ValidationResult {
  isValid: boolean;
  sanitizedUrl: string;
  error?: string;
  warnings: string[];
}

// IP address regex
const IP_PATTERN = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// Domain regex
const DOMAIN_PATTERN = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function sanitizeUrl(input: string): string {
  let trimmed = input.trim();
  if (!trimmed) return '';
  // If no scheme is provided, prefix with https://
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }
  return trimmed;
}

export function validateUrl(rawInput: string): ValidationResult {
  const warnings: string[] = [];
  const trimmed = rawInput.trim();

  if (!trimmed) {
    return {
      isValid: false,
      sanitizedUrl: '',
      error: 'Please enter a URL to analyze.',
      warnings: [],
    };
  }

  const sanitized = sanitizeUrl(trimmed);

  try {
    const parsed = new URL(sanitized);

    // Protocol validation
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return {
        isValid: false,
        sanitizedUrl: sanitized,
        error: 'Only HTTP and HTTPS protocols are supported.',
        warnings: [],
      };
    }

    const hostname = parsed.hostname;

    // Check IP host
    if (IP_PATTERN.test(hostname)) {
      warnings.push('URL points directly to an IP address instead of a domain name.');
    } else if (!DOMAIN_PATTERN.test(hostname) && hostname !== 'localhost') {
      return {
        isValid: false,
        sanitizedUrl: sanitized,
        error: 'Please enter a valid domain name or IP address.',
        warnings: [],
      };
    }

    // Phishing heuristics client-side warnings
    if (sanitized.includes('@')) {
      warnings.push('URL contains an "@" symbol, which can disguise destination credentials.');
    }
    if (parsed.protocol === 'http:') {
      warnings.push('Unencrypted connection (HTTP instead of HTTPS).');
    }
    if (hostname.split('.').length > 4) {
      warnings.push('High number of subdomains detected.');
    }
    if (hostname.includes('-') && (hostname.includes('paypal') || hostname.includes('bank') || hostname.includes('login') || hostname.includes('verify'))) {
      warnings.push('Domain combines hyphens with sensitive brand terms.');
    }

    return {
      isValid: true,
      sanitizedUrl: sanitized,
      warnings,
    };
  } catch {
    return {
      isValid: false,
      sanitizedUrl: sanitized,
      error: 'Invalid URL format.',
      warnings: [],
    };
  }
}
