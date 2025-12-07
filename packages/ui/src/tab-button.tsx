/**
 * TabButton Component - Web
 *
 * Componente atomico per tab navigation
 * Segue SRP
 */

'use client';

import type { LucideIcon } from 'lucide-react';
import { Button } from './button';
import type { TabButtonSharedProps } from './tab-button.shared';

export interface TabButtonProps extends TabButtonSharedProps {
  icon: LucideIcon;
}

export const TabButton = ({ active, onClick, icon: Icon, label, count }: TabButtonProps) => {
  return (
    <Button
      variant={active ? 'primary' : 'ghost'}
      size="md"
      icon={Icon}
      onClick={onClick}
      className={active ? 'scale-105 shadow-lg' : ''}
    >
      <span className="hidden sm:inline">{label}</span>
      {count !== undefined && (
        <span
          className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
            active
              ? 'bg-white/20 text-white'
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
          }`}
        >
          {count}
        </span>
      )}
    </Button>
  );
};
