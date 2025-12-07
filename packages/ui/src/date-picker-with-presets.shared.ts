/**
 * Date Picker With Presets - Shared Logic
 *
 * Common types and utilities for both web and native date pickers
 * Following DRY principle to eliminate duplication
 */

export interface Presets {
  [label: string]: Date;
}

export interface DatePickerWithPresetsProps {
  date: Date;
  onDateChange: (date: Date) => void;
  presets?: Presets;
}

/**
 * Format date to YYYY-MM-DD format (ISO date string)
 */
export function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse date string (YYYY-MM-DD) to Date object
 */
export function parseDateFromInput(dateString: string): Date | null {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
}

/**
 * Validate date string format
 */
export function isValidDateString(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }
  const date = parseDateFromInput(dateString);
  return date !== null;
}
