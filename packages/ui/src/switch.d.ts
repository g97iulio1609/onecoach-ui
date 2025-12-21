import React from 'react';
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    /**
     * Label for the switch
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
    variant?: 'primary' | 'secondary' | 'success';
    /**
     * Label position
     */
    labelPosition?: 'left' | 'right';
    /**
     * Callback opzionale che restituisce direttamente il valore booleano
     */
    onCheckedChange?: (checked: boolean) => void;
}
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=switch.d.ts.map