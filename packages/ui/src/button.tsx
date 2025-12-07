/**
 * Button Component - Web
 *
 * Mobile-first, touch-friendly button with design tokens
 * Minimum 44x44px hit area, WCAG AA compliant
 */

'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@OneCoach/lib-design-system';
import {
  type ButtonVariant,
  type ButtonSize,
  type ButtonSharedProps,
  getIconSize,
} from './button.shared';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>, ButtonSharedProps {
  icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
}

// Re-export types for convenience
export type { ButtonVariant, ButtonSize } from './button.shared';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'left',
      iconOnly = false,
      children,
      className = '',
      disabled,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const isIconButton = size === 'icon' || size === 'icon-sm' || iconOnly;
    // Variant styles using design tokens - WCAG AA compliant
    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 active:from-primary-700 active:to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300',
      secondary:
        'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 active:bg-neutral-100 dark:active:bg-neutral-600 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all duration-200',
      danger:
        'bg-gradient-to-r from-error-600 to-error-500 hover:from-error-500 hover:to-error-400 active:from-error-700 active:to-error-600 text-white shadow-lg shadow-error-500/30 hover:shadow-error-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300',
      ghost:
        'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700 text-neutral-700 dark:text-neutral-200',
      default:
        'bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-500 hover:to-secondary-400 active:from-secondary-700 active:to-secondary-600 text-white shadow-lg shadow-secondary-500/30 hover:shadow-secondary-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300',
      outline:
        'bg-transparent text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 active:bg-neutral-100 dark:active:bg-neutral-700 border-2 border-neutral-300 dark:border-neutral-600 hover:border-primary-500 dark:hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200',
      success:
        'bg-gradient-to-r from-success-600 to-success-500 hover:from-success-500 hover:to-success-400 active:from-success-700 active:to-success-600 text-white shadow-lg shadow-success-500/30 hover:shadow-success-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300',
      info: 'bg-gradient-to-r from-info-600 to-info-500 hover:from-info-500 hover:to-info-400 active:from-info-700 active:to-info-600 text-white shadow-lg shadow-info-500/30 hover:shadow-info-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300',
      glass:
        'glass hover:bg-white/80 dark:hover:bg-neutral-800/80 text-primary-700 dark:text-primary-300 shadow-lg shadow-primary-500/10 hover:shadow-glow backdrop-blur-md border border-white/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300',
    };

    // Size styles - Touch-friendly (minimum 44x44px)
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'min-h-[2.75rem] min-w-[2.75rem] px-3 py-2 text-sm rounded-lg', // 44px min
      md: 'min-h-[3rem] min-w-[3rem] px-5 py-2.5 text-base rounded-xl', // 48px min
      lg: 'min-h-[3.5rem] min-w-[3.5rem] px-8 py-3.5 text-lg rounded-2xl', // 56px min
      icon: 'min-h-[2.5rem] min-w-[2.5rem] px-0 rounded-full',
      'icon-sm': 'min-h-[2.25rem] min-w-[2.25rem] px-0 text-sm rounded-full',
    };

    const iconSize = getIconSize(size);

    const baseStyles = cn(
      'font-semibold tracking-wide transition-all duration-300',
      'inline-flex items-center justify-center gap-2.5',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
      'focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'disabled:hover:scale-100 disabled:active:scale-100 disabled:shadow-none disabled:hover:shadow-none',
      'touch-manipulation', // Optimize for touch
      fullWidth && 'w-full',
      isIconButton && 'aspect-square p-0'
    );

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {Icon && iconPosition === 'left' && (
          <Icon
            size={iconSize}
            className={cn('flex-shrink-0', Icon.name === 'Loader2' && 'animate-spin')}
            aria-hidden="true"
          />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon
            size={iconSize}
            className={cn('flex-shrink-0', Icon.name === 'Loader2' && 'animate-spin')}
            aria-hidden="true"
          />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
