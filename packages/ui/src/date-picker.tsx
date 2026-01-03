/**
 * DatePicker Component - Web
 *
 * Modern, accessible date picker with visual calendar UI.
 * Uses Radix Popover for overlay, consistent with design system.
 *
 * Features:
 * - Visual calendar grid with month/year navigation
 * - Keyboard navigation (arrows, Enter, Escape)
 * - i18n support for all labels
 * - Dark mode support
 * - Min/max date constraints
 */

'use client';

import * as React from 'react';
import { useState, useCallback, useMemo } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@onecoach/lib-design-system';
import {
  type DatePickerProps,
  defaultTranslations,
  formatDateDisplay,
  generateCalendarDays,
  isSameDay,
  isToday,
  isDateInRange,
} from './date-picker.shared';

export type { DatePickerProps, DatePickerTranslations } from './date-picker.shared';

const triggerVariants = cva(
  'inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: [
          'border-neutral-200 bg-white text-neutral-700 shadow-sm',
          'hover:border-neutral-300 hover:bg-neutral-50',
          'focus-visible:ring-blue-500',
          'dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200',
          'dark:hover:border-neutral-600 dark:hover:bg-neutral-800',
        ],
        outline: [
          'border-neutral-300 bg-transparent text-neutral-700',
          'hover:bg-neutral-100',
          'dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800',
        ],
        ghost: [
          'border-transparent bg-transparent text-neutral-700',
          'hover:bg-neutral-100',
          'dark:text-neutral-300 dark:hover:bg-neutral-800',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface DatePickerComponentProps
  extends DatePickerProps,
    VariantProps<typeof triggerVariants> {}

export function DatePicker({
  value,
  onChange,
  placeholder,
  minDate,
  maxDate,
  disabled = false,
  className,
  translations = defaultTranslations,
  variant = 'default',
}: DatePickerComponentProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => value ?? new Date());

  const t = translations;

  const weeks = useMemo(
    () => generateCalendarDays(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  );

  const handlePreviousMonth = useCallback(() => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const handleSelectDate = useCallback(
    (date: Date) => {
      if (!isDateInRange(date, minDate, maxDate)) return;
      onChange(date);
      setOpen(false);
    },
    [onChange, minDate, maxDate]
  );

  const handleToday = useCallback(() => {
    const today = new Date();
    if (isDateInRange(today, minDate, maxDate)) {
      onChange(today);
      setViewDate(today);
      setOpen(false);
    }
  }, [onChange, minDate, maxDate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, date: Date | null) => {
      if (!date) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelectDate(date);
      }
    },
    [handleSelectDate]
  );

  const displayValue = value ? formatDateDisplay(value, t.months) : placeholder ?? t.selectDate;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        disabled={disabled}
        className={cn(
          triggerVariants({ variant }),
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <Calendar className="h-4 w-4 text-blue-500" />
        <span className={cn(!value && 'text-neutral-400 dark:text-neutral-500')}>
          {displayValue}
        </span>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={8}
          className={cn(
            'z-50 w-[280px] max-w-[94vw] rounded-xl border border-neutral-200 bg-white p-3 shadow-xl',
            'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'dark:border-neutral-700 dark:bg-neutral-900'
          )}
        >
          {/* Header with navigation */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePreviousMonth}
              aria-label={t.previousMonth}
              className="rounded-lg p-1.5 text-neutral-600 transition hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {t.months[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              aria-label={t.nextMonth}
              className="rounded-lg p-1.5 text-neutral-600 transition hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="mb-1 grid grid-cols-7 gap-1">
            {t.weekdays.short.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-neutral-500 dark:text-neutral-400"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1">
                {week.map((date, dayIndex) => {
                  if (!date) {
                    return <div key={dayIndex} className="h-8 w-8" />;
                  }

                  const isSelected = value && isSameDay(date, value);
                  const isTodayDate = isToday(date);
                  const isDisabled = !isDateInRange(date, minDate, maxDate);

                  return (
                    <button
                      key={dayIndex}
                      type="button"
                      onClick={() => handleSelectDate(date)}
                      onKeyDown={(e) => handleKeyDown(e, date)}
                      disabled={isDisabled}
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-all duration-150',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                        isSelected
                          ? 'bg-blue-600 text-white shadow-sm'
                          : isTodayDate
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                            : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800',
                        isDisabled && 'cursor-not-allowed opacity-30 hover:bg-transparent'
                      )}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Today button */}
          <div className="mt-3 border-t border-neutral-100 pt-3 dark:border-neutral-800">
            <button
              type="button"
              onClick={handleToday}
              className="w-full rounded-lg py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
            >
              {t.today}
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
