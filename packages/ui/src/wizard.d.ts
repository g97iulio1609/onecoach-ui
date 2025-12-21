import React from 'react';
/**
 * WizardStepper - Horizontal progress indicator
 */
export interface WizardStepperProps {
    steps: {
        title: string;
    }[];
    currentStep: number;
    onStepClick?: (index: number) => void;
    className?: string;
}
export declare const WizardStepper: ({ steps, currentStep, onStepClick, className }: WizardStepperProps) => import("react/jsx-runtime").JSX.Element;
/**
 * WizardContainer - Main glassmorphism layout for wizard content
 */
export interface WizardContainerProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}
export declare const WizardContainer: ({ children, header, footer, className }: WizardContainerProps) => import("react/jsx-runtime").JSX.Element;
/**
 * WizardActions - Navigation buttons
 */
export interface WizardActionsProps {
    onBack: () => void;
    onNext: () => void;
    canBack: boolean;
    canNext: boolean;
    isLastStep: boolean;
    nextLabel?: string;
    generateLabel?: string;
    className?: string;
}
export declare const WizardActions: ({ onBack, onNext, canBack, canNext, isLastStep, nextLabel, generateLabel, className }: WizardActionsProps) => import("react/jsx-runtime").JSX.Element;
/**
 * WizardRadioGroup - Premium Segmented Control for wizard choices
 */
export interface WizardRadioOption {
    id: string | number;
    label: string;
}
export interface WizardRadioGroupProps {
    options: WizardRadioOption[];
    value: string | number;
    onChange: (value: any) => void;
    className?: string;
}
export declare const WizardRadioGroup: ({ options, value, onChange, className }: WizardRadioGroupProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=wizard.d.ts.map