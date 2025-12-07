/**
 * ButtonLink Component
 *
 * Cross-platform link component styled as a button
 * Supports dark mode and color variants
 * Follows SRP and DRY principles
 */

import React from 'react';
import { Link } from 'app/navigation';
import type { LucideIcon } from 'lucide-react';

export interface ButtonLinkProps {
  href: string;
  children?: React.ReactNode;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  iconOnly?: boolean;
}

const variantStyles = {
  primary:
    'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500',
  secondary:
    'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-600 dark:text-white dark:hover:bg-neutral-500',
  info: 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500',
  success:
    'border-green-200 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-600 dark:bg-green-600 dark:text-white dark:hover:bg-green-500',
  warning:
    'border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-600 dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-500',
  danger:
    'border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-500',
};

const sizeStyles = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      href,
      children,
      icon: Icon,
      variant = 'primary',
      size = 'md',
      className = '',
      fullWidth = false,
      iconOnly = false,
      ...props
    },
    ref
  ) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={`inline-flex items-center justify-center gap-1.5 rounded-lg border font-medium transition-colors ${
          iconOnly ? 'p-1.5 sm:p-2' : 'whitespace-nowrap'
        } ${
          variantStyles[variant]
        } ${iconOnly ? '' : sizeStyles[size]} ${fullWidth ? 'w-full sm:w-auto' : ''} ${className}`}
        title={iconOnly ? (typeof children === 'string' ? children : undefined) : undefined}
        {...props}
      >
        {Icon && (
          <Icon
            className={`${iconOnly ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-3.5 w-3.5 sm:h-4 sm:w-4'} flex-shrink-0`}
          />
        )}
        {!iconOnly && <span className="truncate">{children}</span>}
      </Link>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';
