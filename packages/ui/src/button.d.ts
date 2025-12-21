/**
 * Button Component - Web
 *
 * Mobile-first, touch-friendly button with design tokens
 * Minimum 44x44px hit area, WCAG AA compliant
 */
import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { type ButtonSharedProps } from './button.shared';
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>, ButtonSharedProps {
    /** Icon can be a LucideIcon component OR a React element */
    icon?: LucideIcon | React.ReactElement;
    className?: string;
    children?: React.ReactNode;
    /** React Native/Tamagui-style onPress (translated to onClick on web) */
    onPress?: React.MouseEventHandler<HTMLButtonElement>;
}
export type { ButtonVariant, ButtonSize } from './button.shared';
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=button.d.ts.map