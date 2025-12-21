import React from 'react';
import { type CheckboxProps } from './checkbox';
export interface CheckboxGroupProps {
    /**
     * Selected values
     */
    value?: string[];
    /**
     * Default values
     */
    defaultValue?: string[];
    /**
     * Change handler
     */
    onChange?: (values: string[]) => void;
    /**
     * Disabled state
     */
    disabled?: boolean;
    /**
     * Label for the group
     */
    label?: string;
    /**
     * Error state
     */
    error?: boolean;
    /**
     * Error message
     */
    errorMessage?: string;
    /**
     * Helper text
     */
    helperText?: string;
    /**
     * Orientation
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * Spacing between items
     */
    spacing?: 'sm' | 'md' | 'lg';
    className?: string;
    children: React.ReactNode;
}
export declare const CheckboxGroup: React.FC<CheckboxGroupProps>;
export interface CheckboxGroupOptionProps extends Omit<CheckboxProps, 'checked' | 'onChange'> {
    value: string;
    checked?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
export declare const CheckboxGroupOption: React.FC<CheckboxGroupOptionProps>;
//# sourceMappingURL=checkbox-group.d.ts.map