/**
 * Z-Index Tokens - Centralized z-index values
 *
 * Follows a consistent scale to prevent overlapping issues.
 * Higher values = closer to user (top of stacking context)
 *
 * SCALE:
 * - Base content: 0-10
 * - Sticky elements: 100-199
 * - Dropdowns/Popovers: 200-299
 * - Sidebars/Drawers: 300-399
 * - Modals/Dialogs: 400-499
 * - Toasts/Notifications: 500-599
 * - Copilot/AI Assistant: 9000-9999 (always on top)
 *
 * @module design-system/z-index
 */

export const Z_INDEX = {
  // Base content layer
  base: 0,
  content: 1,

  // Sticky headers, footers
  sticky: 100,
  header: 110,
  footer: 105,

  // Dropdowns, tooltips, popovers
  dropdown: 200,
  tooltip: 210,
  popover: 220,

  // Navigation drawers, sidebars
  drawer: 300,
  sidebar: 310,
  navigation: 320,

  // Modal/Dialog layer
  modalBackdrop: 400,
  modal: 410,
  dialog: 420,
  sheet: 430,

  // Toast notifications
  toast: 500,
  notification: 510,
  alert: 520,

  // Copilot/AI Assistant - ALWAYS ON TOP
  copilotBackdrop: 9900,
  copilotSheet: 9910,
  copilotFab: 9999,
} as const;

export type ZIndexKey = keyof typeof Z_INDEX;

/**
 * Get z-index value by key
 */
export function getZIndex(key: ZIndexKey): number {
  return Z_INDEX[key];
}

/**
 * Tailwind CSS z-index classes mapping
 */
export const Z_INDEX_CLASSES = {
  base: 'z-0',
  content: 'z-[1]',
  sticky: 'z-[100]',
  header: 'z-[110]',
  footer: 'z-[105]',
  dropdown: 'z-[200]',
  tooltip: 'z-[210]',
  popover: 'z-[220]',
  drawer: 'z-[300]',
  sidebar: 'z-[310]',
  navigation: 'z-[320]',
  modalBackdrop: 'z-[400]',
  modal: 'z-[410]',
  dialog: 'z-[420]',
  sheet: 'z-[430]',
  toast: 'z-[500]',
  notification: 'z-[510]',
  alert: 'z-[520]',
  copilotBackdrop: 'z-[9900]',
  copilotSheet: 'z-[9910]',
  copilotFab: 'z-[9999]',
} as const;

export type ZIndexClass = (typeof Z_INDEX_CLASSES)[ZIndexKey];
