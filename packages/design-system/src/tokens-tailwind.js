/**
 * Design Tokens for Tailwind v4
 *
 * Estratti da globals.css e configurati per uso cross-platform
 */

const theme = {
  colors: {
    // Primary Colors (Violet - Premium Tech)
    primary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6', // Main primary
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
      950: '#2e1065',
    },
    // Secondary Colors (Fuchsia - Vibrant Accents)
    secondary: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef', // Main secondary
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
      950: '#4a044e',
    },
    // Neutral Colors (Zinc - Premium Neutral)
    neutral: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    },
    // Semantic Colors
    success: {
      DEFAULT: '#10b981',
      light: '#d1fae5',
      dark: '#064e3b',
    },
    warning: {
      DEFAULT: '#f59e0b',
      light: '#fef3c7',
      dark: '#78350f',
    },
    error: {
      DEFAULT: '#ef4444',
      light: '#fecaca',
      dark: '#7f1d1d',
    },
    info: {
      DEFAULT: '#3b82f6',
      light: '#dbeafe',
      dark: '#1e3a8a',
    },
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    'modal-backdrop': 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

module.exports = {
  theme,
};
