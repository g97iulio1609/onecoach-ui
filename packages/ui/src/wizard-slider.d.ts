/**
 * WizardSlider - Premium Range Slider Component
 *
 * A styled range slider with value display, min/max labels, and consistent dark mode support.
 */
export interface WizardSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
    valueLabel?: string;
    minLabel?: string;
    maxLabel?: string;
    description?: string;
    className?: string;
    color?: 'blue' | 'green' | 'purple';
}
export declare function WizardSlider({ label, value, min, max, step, onChange, valueLabel, minLabel, maxLabel, description, className, color, }: WizardSliderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=wizard-slider.d.ts.map