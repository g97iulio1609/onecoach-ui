import React from 'react';
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    /**
     * Label for the radio
     */
    label?: React.ReactNode;
    /**
     * Helper text
     */
    helperText?: string;
    /**
     * Size variant
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Color variant
     */
    variant?: 'primary' | 'secondary';
}
export declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=radio.d.ts.map