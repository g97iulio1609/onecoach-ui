'use client';

import React from 'react';

export interface NutritionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function NutritionHeader({ title, subtitle, actions, className = '' }: NutritionHeaderProps) {
  return (
    <header
      className={`flex flex-col gap-3 overflow-x-hidden sm:gap-4 md:flex-row md:items-center md:justify-between ${className}`}
    >
      <div className="min-w-0 flex-1">
        <h1 className="text-xl font-bold break-words text-neutral-900 sm:text-2xl lg:text-3xl dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-xs break-words text-neutral-600 sm:text-sm dark:text-neutral-200">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:flex-nowrap">{actions}</div>
      )}
    </header>
  );
}
