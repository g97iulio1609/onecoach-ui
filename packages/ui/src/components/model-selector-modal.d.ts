export interface ModelOption {
    id: string;
    name: string;
    provider: string;
}
interface ModelSelectorModalProps {
    value: string | null | undefined;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}
export declare function ModelSelectorModal({ value, onChange, placeholder, className, }: ModelSelectorModalProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=model-selector-modal.d.ts.map