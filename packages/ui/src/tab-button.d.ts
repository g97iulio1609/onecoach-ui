/**
 * TabButton Component - Web
 *
 * Componente atomico per tab navigation
 * Segue SRP
 */
import type { LucideIcon } from 'lucide-react';
import React from 'react';
import type { TabButtonSharedProps } from './tab-button.shared';
export interface TabButtonProps extends TabButtonSharedProps {
    icon: LucideIcon | React.ReactElement;
    className?: string;
}
export declare const TabButton: ({ active, onClick, icon: Icon, label, count, className }: TabButtonProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=tab-button.d.ts.map