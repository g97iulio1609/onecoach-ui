/**
 * Button Component - Shared Logic
 *
 * Common types and utilities for both web and native buttons
 * Following DRY principle to eliminate duplication
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'default' | 'outline' | 'success' | 'info' | 'glass' | 'gradient-primary' | 'gradient-secondary';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm';
export interface ButtonSharedProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    iconPosition?: 'left' | 'right';
    iconOnly?: boolean;
    children?: React.ReactNode;
    fullWidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
}
/**
 * Get icon size based on button size
 */
export declare function getIconSize(size: ButtonSize): number;
/**
 * Get minimum height for button size (touch-friendly, minimum 44x44px)
 */
export declare function getMinHeight(size: ButtonSize): number;
//# sourceMappingURL=button.shared.d.ts.map