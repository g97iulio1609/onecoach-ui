/**
 * Dark Mode Classes Utility - ENHANCED
 *
 * Centralized dark mode class strings following DRY principle.
 * These constants can be reused across components to maintain consistency.
 * Enhanced with additional utilities and composable patterns.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Core dark mode classes for different surface levels and states
 */
export const darkModeClasses = {
  // Backgrounds - Extended
  bg: {
    // Base surfaces
    base: 'bg-white dark:bg-neutral-900',
    elevated: 'bg-white dark:bg-neutral-800',
    subtle: 'bg-neutral-50 dark:bg-neutral-800/50',
    muted: 'bg-neutral-100 dark:bg-neutral-800',

    // Interactive states
    hover: 'hover:bg-neutral-50 dark:hover:bg-neutral-800',
    active: 'bg-blue-50 dark:bg-blue-900/20',
    selected: 'bg-primary-50 dark:bg-primary-900/20',

    // Overlays
    overlay: 'bg-black/40 dark:bg-black/60',
    overlayLight: 'bg-white dark:bg-neutral-900/90 dark:bg-neutral-900/90',
    backdrop: 'bg-black/50 dark:bg-black/70 backdrop-blur-sm',

    // Gradients
    gradient:
      'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-neutral-900 dark:to-neutral-800',
    gradientPrimary:
      'bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600',

    // Disabled
    disabled: 'bg-neutral-100 dark:bg-neutral-800/50 cursor-not-allowed',
  },

  // Text colors - Extended
  text: {
    primary: 'text-neutral-900 dark:text-neutral-100',
    secondary: 'text-neutral-700 dark:text-neutral-300',
    tertiary: 'text-neutral-600 dark:text-neutral-400',
    muted: 'text-neutral-500 dark:text-neutral-500',
    disabled: 'text-neutral-400 dark:text-neutral-600',
    inverse: 'text-white dark:text-neutral-900',
    link: 'text-primary-600 dark:text-primary-400',
    linkHover: 'hover:text-primary-700 dark:hover:text-primary-300',
    brand: 'text-primary-600 dark:text-primary-400',
  },

  // Borders - Extended
  border: {
    base: 'border-neutral-200 dark:border-neutral-700',
    strong: 'border-neutral-300 dark:border-neutral-600',
    subtle: 'border-neutral-100 dark:border-neutral-800',
    focus: 'focus:border-primary-500 dark:focus:border-primary-400',
    hover: 'hover:border-neutral-300 dark:hover:border-neutral-600',
    error: 'border-red-300 dark:border-red-700',
    success: 'border-green-300 dark:border-green-700',
    warning: 'border-yellow-300 dark:border-yellow-700',
  },

  // Interactive elements - Enhanced
  interactive: {
    hover: 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
    active: 'active:bg-neutral-200 dark:active:bg-neutral-700',
    focus: 'focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
    focusVisible:
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  },

  // Cards and containers - Enhanced
  card: {
    base: 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700',
    elevated: 'bg-white dark:bg-neutral-800 shadow-lg dark:shadow-2xl dark:shadow-neutral-950/50',
    hover: 'hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200',
    interactive:
      'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-lg transition-all duration-300',
    glass:
      'bg-white dark:bg-neutral-900/80 dark:bg-neutral-800/80 backdrop-blur-md border-neutral-200 dark:border-neutral-700',
  },

  // Input elements - Enhanced
  input: {
    base: 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100',
    placeholder: 'placeholder-neutral-400 dark:placeholder-neutral-500',
    disabled:
      'bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-600 cursor-not-allowed',
    error: 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500',
    success:
      'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-500',
  },

  // Navigation - Enhanced
  nav: {
    link: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200',
    active:
      'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium',
    activeAlt: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    icon: 'text-neutral-500 dark:text-neutral-400',
    iconActive: 'text-primary-600 dark:text-primary-400',
    iconActiveAlt: 'text-blue-600 dark:text-blue-400',
  },

  // Semantic colors - Enhanced
  semantic: {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      bgSolid: 'bg-green-500 dark:bg-green-600',
      text: 'text-green-700 dark:text-green-400',
      textSolid: 'text-white dark:text-white',
      border: 'border-green-200 dark:border-green-800',
      hover: 'hover:bg-green-100 dark:hover:bg-green-900/30',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      bgSolid: 'bg-yellow-500 dark:bg-yellow-600',
      text: 'text-yellow-700 dark:text-yellow-400',
      textSolid: 'text-white dark:text-neutral-900',
      border: 'border-yellow-200 dark:border-yellow-800',
      hover: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/30',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      bgSolid: 'bg-red-500 dark:bg-red-600',
      text: 'text-red-700 dark:text-red-400',
      textSolid: 'text-white dark:text-white',
      border: 'border-red-200 dark:border-red-800',
      hover: 'hover:bg-red-100 dark:hover:bg-red-900/30',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      bgSolid: 'bg-blue-500 dark:bg-blue-600',
      text: 'text-blue-700 dark:text-blue-400',
      textSolid: 'text-white dark:text-white',
      border: 'border-blue-200 dark:border-blue-800',
      hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
    },
  },

  // Shadows - Enhanced
  shadow: {
    sm: 'shadow-sm dark:shadow-neutral-900/20',
    md: 'shadow-md dark:shadow-neutral-900/30',
    lg: 'shadow-lg dark:shadow-neutral-900/40',
    xl: 'shadow-xl dark:shadow-neutral-900/50',
    '2xl': 'shadow-2xl dark:shadow-neutral-950/60',
    inner: 'shadow-inner dark:shadow-neutral-950/40',
  },

  // Table specific
  table: {
    header:
      'bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700',
    row: 'border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
    rowOdd: 'bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
    rowEven:
      'bg-neutral-50 dark:bg-neutral-800/30 hover:bg-neutral-100 dark:hover:bg-neutral-800/60',
    cell: 'text-neutral-900 dark:text-neutral-100',
  },

  // Scrollbar
  scrollbar: {
    base: 'scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-neutral-100 dark:scrollbar-track-neutral-800',
  },

  // Divider
  divider: {
    base: 'border-neutral-200 dark:border-neutral-700',
    strong: 'border-neutral-300 dark:border-neutral-600',
    subtle: 'border-neutral-100 dark:border-neutral-800',
  },

  // List items - Structural patterns
  list: {
    container: 'divide-y divide-neutral-100 dark:divide-neutral-800',
    item: 'flex items-center gap-3 sm:gap-4 p-3 sm:p-4 transition-colors',
    itemHover: 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
    itemActive: 'bg-neutral-50 dark:bg-neutral-800/50',
    itemSelected: 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400',
  },

  // Transaction/Activity items
  transaction: {
    container:
      'rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm dark:shadow-2xl dark:shadow-neutral-950/50',
    header: 'border-b border-neutral-200 dark:border-neutral-700 p-3 sm:p-4',
    item: 'flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors',
    iconPositive:
      'rounded-full bg-green-100 dark:bg-green-900/40 p-2 border border-green-200 dark:border-green-800',
    iconNegative:
      'rounded-full bg-red-100 dark:bg-red-900/40 p-2 border border-red-200 dark:border-red-800',
    iconNeutral:
      'rounded-full bg-neutral-100 dark:bg-neutral-700/50 p-2 border border-neutral-200 dark:border-neutral-600',
    title: 'font-medium text-neutral-900 dark:text-neutral-100',
    subtitle: 'text-xs sm:text-sm text-neutral-500 dark:text-neutral-400',
    amountPositive: 'text-sm sm:text-base font-bold text-green-600 dark:text-green-400',
    amountNegative: 'text-sm sm:text-base font-bold text-red-600 dark:text-red-400',
    balance: 'text-xs text-neutral-500 dark:text-neutral-400',
  },

  // Icon badges - Structural
  iconBadge: {
    base: 'rounded-full p-2 flex items-center justify-center',
    success:
      'bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400',
    error:
      'bg-red-100 dark:bg-red-900/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400',
    warning:
      'bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400',
    info: 'bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400',
    neutral:
      'bg-neutral-100 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400',
    purple:
      'bg-purple-100 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400',
  },

  // Empty states
  emptyState: {
    container:
      'rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-8 sm:p-12 text-center shadow-sm dark:shadow-2xl dark:shadow-neutral-950/50',
    icon: 'mx-auto h-10 w-10 text-neutral-400 dark:text-neutral-600 sm:h-12 sm:w-12',
    text: 'mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400',
  },

  // Loading states
  loading: {
    skeleton: 'animate-pulse rounded bg-neutral-200 dark:bg-neutral-700',
    container:
      'rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4 sm:p-6',
  },

  // Chat specific - Deep dark mode
  chat: {
    container:
      'rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-xl dark:shadow-2xl dark:shadow-neutral-950/50',
    messageArea: 'bg-white dark:bg-neutral-800',
    welcomeBubble:
      'rounded-2xl border-2 border-purple-100 dark:border-purple-800/50 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/30 dark:to-neutral-800 p-4 shadow-sm dark:shadow-lg dark:shadow-purple-950/30 sm:p-6',
    suggestionBox:
      'rounded-lg border border-purple-200 dark:border-purple-800/50 bg-purple-100 dark:bg-purple-900/40 p-3 shadow-sm dark:shadow-lg dark:shadow-purple-950/30',
    suggestionText: 'text-purple-900 dark:text-purple-200',
    suggestionSubtext: 'text-purple-800 dark:text-purple-300',
    inputArea:
      'border-t-2 border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800/50 dark:to-neutral-800',
    inputField:
      'border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm focus-within:border-purple-500 dark:focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-200 dark:focus-within:ring-purple-900/50',
    userBubble:
      'bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-800',
    assistantBubble:
      'bg-neutral-50 dark:bg-neutral-800/50 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700',
    timestamp: 'text-neutral-500 dark:text-neutral-500',
  },

  // Settings panel - Deep dark mode
  settings: {
    panel:
      'rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm dark:shadow-lg dark:shadow-neutral-950/30',
    header:
      'border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50',
    content: 'bg-white dark:bg-neutral-800',
    toggle: 'bg-neutral-100 dark:bg-neutral-700',
  },
} as const;

/**
 * Helper function to combine dark mode classes with stable ordering
 * Uses clsx for conditional classes and tailwind-merge for deduplication
 * @param classes - Array of class strings to combine
 * @returns Combined class string with stable ordering
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}

/**
 * Type exports for TypeScript autocomplete
 */
export type DarkModeClasses = typeof darkModeClasses;
