/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nm: {
          light: {
            bg: '#e6ecf5',
            surface: '#ffffff',
            border: '#d2dbe8',
            text: '#1e293b',
            muted: '#64748b',
          },
          dark: {
            bg: '#0d0f14',
            surface: '#15181f',
            border: '#2a2f3b',
            text: '#f1f5f9',
            muted: '#94a3b8',
          },
          accent: {
            DEFAULT: '#3b82f6',
            hover: '#2563eb',
            subtle: 'rgba(59, 130, 246, 0.12)',
          },
          danger: {
            DEFAULT: '#ef4444',
            hover: '#dc2626',
            light: '#f87171',
            glow: 'rgba(239, 68, 68, 0.35)',
          },
          warning: {
            DEFAULT: '#f59e0b',
            hover: '#d97706',
            light: '#fbbf24',
            glow: 'rgba(245, 152, 37, 0.45)',
          },
          safe: {
            DEFAULT: '#10b981',
            hover: '#059669',
            glow: 'rgba(16, 185, 129, 0.35)',
          },
        },
      },
      boxShadow: {
        // Light mode neomorphic shadows
        'nm-raised': '6px 6px 14px #c8d0e0, -6px -6px 14px #ffffff',
        'nm-raised-sm': '3px 3px 8px #c8d0e0, -3px -3px 8px #ffffff',
        'nm-raised-lg': '10px 10px 24px #c0c9da, -10px -10px 24px #ffffff',
        'nm-inset': 'inset 4px 4px 8px #c8d0e0, inset -4px -4px 8px #ffffff',
        'nm-inset-sm': 'inset 2px 2px 5px #c8d0e0, inset -2px -2px 5px #ffffff',
        'nm-flat': '4px 4px 10px #ccd4e4, -4px -4px 10px #ffffff',

        // Dark mode neomorphic shadows (threat theme)
        'nm-dark-raised': '6px 6px 14px #0a0c12, -6px -6px 14px #1a1e2a',
        'nm-dark-raised-sm': '3px 3px 8px #0a0c12, -3px -3px 8px #1a1e2a',
        'nm-dark-raised-lg': '10px 10px 24px #0a0c12, -10px -10px 24px #1a1e2a',
        'nm-dark-inset': 'inset 4px 4px 8px #0a0c12, inset -4px -4px 8px #1a1e2a',
        'nm-dark-inset-sm': 'inset 2px 2px 5px #0a0c12, inset -2px -2px 5px #1a1e2a',
        'nm-dark-flat': '4px 4px 10px #0a0c12, -4px -4px 10px #1a1e2a',

        // Alert glow shadows
        'nm-threat-glow': '0 0 24px rgba(239, 68, 68, 0.5), 6px 6px 14px #c8d0e0, -6px -6px 14px #ffffff',
        'nm-threat-dark-glow': '0 0 24px rgba(239, 68, 68, 0.5), 6px 6px 14px #080a0f, -6px -6px 14px #13151b',
        'nm-safe-glow': '0 0 24px rgba(16, 185, 129, 0.5), 6px 6px 14px #c8d0e0, -6px -6px 14px #ffffff',
        'nm-safe-dark-glow': '0 0 24px rgba(16, 185, 129, 0.5), 6px 6px 14px #080a0f, -6px -6px 14px #13151b',
        'nm-warning-glow': '0 0 24px rgba(245, 152, 37, 0.5), 6px 6px 14px #c8d0e0, -6px -6px 14px #ffffff',
        'nm-warning-dark-glow': '0 0 24px rgba(245, 152, 37, 0.5), 6px 6px 14px #080a0f, -6px -6px 14px #13151b',
      },
    },
  },
  plugins: [],
}