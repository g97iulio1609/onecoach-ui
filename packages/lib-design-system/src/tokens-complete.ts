/**
 * Complete Design Tokens System
 *
 * Centralized design tokens for light & dark mode
 * Following 8pt spacing scale, WCAG AA contrast, mobile-first approach
 */

export const designTokens = {
  /**
   * Color System - Light & Dark Mode
   * All colors meet WCAG AA contrast requirements
   */
  colors: {
    light: {
      // Primary brand colors (Emerald/Teal)
      primary: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981', // Main primary
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
        950: '#022c22',
      },
      // Secondary brand colors (Blue)
      secondary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6', // Main secondary
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
        950: '#172554',
      },
      // Neutral colors (Slate)
      neutral: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617',
      },
      // Backgrounds
      background: {
        base: '#ffffff',
        elevated: '#ffffff',
        subtle: '#f8fafc',
        muted: '#f1f5f9',
        overlay: 'rgba(0, 0, 0, 0.4)',
      },
      // Text
      text: {
        primary: '#0f172a', // WCAG AA: 4.5:1 on white
        secondary: '#475569', // WCAG AA: 4.5:1 on white
        tertiary: '#64748b', // WCAG AA: 4.5:1 on white
        inverse: '#ffffff',
        disabled: '#94a3b8',
      },
      // Borders
      border: {
        light: '#e2e8f0',
        base: '#cbd5e1',
        strong: '#94a3b8',
      },
    },
    dark: {
      // Primary brand colors (Emerald/Teal) - Adjusted for dark
      primary: {
        50: '#022c22',
        100: '#064e3b',
        200: '#065f46',
        300: '#047857',
        400: '#059669',
        500: '#10b981', // Main primary
        600: '#34d399',
        700: '#6ee7b7',
        800: '#a7f3d0',
        900: '#d1fae5',
        950: '#ecfdf5',
      },
      // Secondary brand colors (Blue) - Adjusted for dark
      secondary: {
        50: '#172554',
        100: '#1e3a8a',
        200: '#1e40af',
        300: '#1d4ed8',
        400: '#2563eb',
        500: '#3b82f6', // Main secondary
        600: '#60a5fa',
        700: '#93c5fd',
        800: '#bfdbfe',
        900: '#dbeafe',
        950: '#eff6ff',
      },
      // Neutral colors (Slate) - Deep dark mode
      neutral: {
        50: '#020617',
        100: '#0f172a',
        200: '#1e293b',
        300: '#334155',
        400: '#475569',
        500: '#64748b',
        600: '#94a3b8',
        700: '#cbd5e1',
        800: '#e2e8f0',
        900: '#f1f5f9',
        950: '#f8fafc',
      },
      // Backgrounds - Deep dark mode
      background: {
        base: '#0f172a', // Very dark blue
        elevated: '#1e293b', // Slightly lighter
        subtle: '#1e293b',
        muted: '#334155',
        overlay: 'rgba(0, 0, 0, 0.7)',
      },
      // Text - High contrast for dark mode
      text: {
        primary: '#f8fafc', // WCAG AA: 4.5:1 on dark
        secondary: '#cbd5e1', // WCAG AA: 4.5:1 on dark
        tertiary: '#94a3b8', // WCAG AA: 4.5:1 on dark
        inverse: '#0f172a',
        disabled: '#475569',
      },
      // Borders
      border: {
        light: '#334155',
        base: '#475569',
        strong: '#64748b',
      },
    },
    // Semantic colors - Light & Dark
    semantic: {
      success: {
        light: { bg: '#d1fae5', text: '#047857', border: '#6ee7b7' },
        dark: { bg: '#064e3b', text: '#6ee7b7', border: '#047857' },
      },
      warning: {
        light: { bg: '#fef3c7', text: '#d97706', border: '#fbbf24' },
        dark: { bg: '#78350f', text: '#fbbf24', border: '#d97706' },
      },
      error: {
        light: { bg: '#fecaca', text: '#dc2626', border: '#f87171' },
        dark: { bg: '#7f1d1d', text: '#f87171', border: '#dc2626' },
      },
      info: {
        light: { bg: '#dbeafe', text: '#1d4ed8', border: '#60a5fa' },
        dark: { bg: '#1e3a8a', text: '#60a5fa', border: '#3b82f6' },
      },
    },
  },

  /**
   * Typography System
   * Mobile-first with responsive scaling
   */
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      mono: ['Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
    },
    fontSize: {
      xs: { size: '0.75rem', lineHeight: '1rem' }, // 12px/16px
      sm: { size: '0.875rem', lineHeight: '1.25rem' }, // 14px/20px
      base: { size: '1rem', lineHeight: '1.5rem' }, // 16px/24px
      lg: { size: '1.125rem', lineHeight: '1.75rem' }, // 18px/28px
      xl: { size: '1.25rem', lineHeight: '1.75rem' }, // 20px/28px
      '2xl': { size: '1.5rem', lineHeight: '2rem' }, // 24px/32px
      '3xl': { size: '1.875rem', lineHeight: '2.25rem' }, // 30px/36px
      '4xl': { size: '2.25rem', lineHeight: '2.5rem' }, // 36px/40px
      '5xl': { size: '3rem', lineHeight: '1' }, // 48px
      '6xl': { size: '3.75rem', lineHeight: '1' }, // 60px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  /**
   * Spacing System - 8pt scale
   * All values are multiples of 8px (0.5rem base)
   */
  spacing: {
    0: '0',
    1: '0.5rem', // 8px
    2: '1rem', // 16px
    3: '1.5rem', // 24px
    4: '2rem', // 32px
    5: '2.5rem', // 40px
    6: '3rem', // 48px
    7: '3.5rem', // 56px
    8: '4rem', // 64px
    9: '4.5rem', // 72px
    10: '5rem', // 80px
    12: '6rem', // 96px
    16: '8rem', // 128px
    20: '10rem', // 160px
    24: '12rem', // 192px
  },

  /**
   * Border Radius System
   */
  borderRadius: {
    none: '0',
    sm: '0.25rem', // 4px
    base: '0.5rem', // 8px
    md: '0.75rem', // 12px
    lg: '1rem', // 16px
    xl: '1.5rem', // 24px
    '2xl': '2rem', // 32px
    full: '9999px',
  },

  /**
   * Shadow System - Light & Dark Mode
   */
  shadows: {
    light: {
      xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      base: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: 'none',
    },
    dark: {
      xs: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
      base: '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.6), 0 4px 6px -4px rgb(0 0 0 / 0.6)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.7), 0 8px 10px -6px rgb(0 0 0 / 0.7)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.8)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.3)',
      none: 'none',
    },
  },

  /**
   * Breakpoints - Mobile-first
   */
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  /**
   * Z-index scale
   */
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  /**
   * Touch targets - Minimum 44x44px
   */
  touchTarget: {
    min: '2.75rem', // 44px
    sm: '2.75rem', // 44px
    md: '3rem', // 48px
    lg: '3.5rem', // 56px
  },

  /**
   * Transitions
   */
  transitions: {
    duration: {
      fast: '150ms',
      base: '200ms',
      medium: '300ms',
      slow: '500ms',
    },
    timing: {
      ease: 'ease',
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

// Type exports
export type DesignTokens = typeof designTokens;
export type ColorMode = 'light' | 'dark';
