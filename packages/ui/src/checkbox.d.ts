import React from 'react';
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    /**
     * Label for the checkbox
     */
    label?: React.ReactNode;
    /**
     * Helper text
     */
    helperText?: string;
    /**
     * Error state
     */
    error?: boolean;
    /**
     * Error message
     */
    errorMessage?: string;
    /**
     * Size variant
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Color variant
     */
    variant?: 'primary' | 'secondary' | 'success' | 'error';
}
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=checkbox.d.ts.map