/**
 * Date Picker - Shared Logic
 *
 * Common types and utilities for both web and native date pickers.
 * Following DRY principle to eliminate duplication.
 */

export interface DatePickerProps {
  /** Currently selected date */
  value: Date | undefined;
  /** Callback when date changes */
  onChange: (date: Date | undefined) => void;
  /** Placeholder text when no date selected */
  placeholder?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Additional class name for styling */
  className?: string;
  /** Translations object (optional, uses defaults if not provided) */
  translations?: DatePickerTranslations;
}

export interface DatePickerTranslations {
  selectDate: string;
  today: string;
  previousMonth: string;
  nextMonth: string;
  weekdays: {
    short: string[];
  };
  months: string[];
}

/** Default English translations */
export const defaultTranslations: DatePickerTranslations = {
  selectDate: 'Select date',
  today: 'Today',
  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  weekdays: {
    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  },
  months: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ],
};

/**
 * Format date for display (e.g., "Jan 15, 2026")
 */
export function formatDateDisplay(date: Date, months: string[]): string {
  const month = months[date.getMonth()] ?? '';
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month.slice(0, 3)} ${day}, ${year}`;
}

/**
 * Format date to ISO string (YYYY-MM-DD)
 */
export function formatDateISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Generate calendar days for a given month
 * Returns a 2D array representing weeks (rows) and days (columns)
 */
export function generateCalendarDays(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const weeks: (Date | null)[][] = [];
  let currentWeek: (Date | null)[] = [];

  // Fill in empty days at start
  for (let i = 0; i < startingDayOfWeek; i++) {
    currentWeek.push(null);
  }

  // Fill in actual days
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(new Date(year, month, day));

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Fill in empty days at end
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return weeks;
}

/**
 * Check if date is within min/max bounds
 */
export function isDateInRange(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate && date < minDate) {
    return false;
  }
  if (maxDate && date > maxDate) {
    return false;
  }
  return true;
}
