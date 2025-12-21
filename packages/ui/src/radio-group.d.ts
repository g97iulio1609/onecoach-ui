import React from 'react';
import { type RadioProps } from './radio';
export interface RadioGroupProps {
    /**
     * Group name
     */
    name?: string;
    /**
     * Selected value
     */
    value?: string;
    /**
     * Default value
     */
    defaultValue?: string;
    /**
     * Change handler
     */
    onChange?: (value: string) => void;
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
export declare const RadioGroup: React.FC<RadioGroupProps>;
export interface RadioGroupOptionProps extends Omit<RadioProps, 'name' | 'checked' | 'onChange'> {
    value: string;
}
export declare const RadioGroupOption: React.FC<RadioGroupOptionProps>;
//# sourceMappingURL=radio-group.d.ts.map