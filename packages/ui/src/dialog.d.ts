/**
 * Dialog Components
 *
 * - New Radix-based API: Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose
 * - Simple alert/confirm/prompt dialog exported come SimpleDialog (ex LegacyDialog, compat mantenuta)
 */
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { type DialogProps as SimpleDialogProps } from './dialog.shared';
export type { DialogType, DialogProps as SimpleDialogProps } from './dialog.shared';
declare const Dialog: React.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogContent: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    size?: "sm" | "md" | "lg" | "xl" | "full";
    mobileFullScreen?: boolean;
    showCloseButton?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closeOnBackdropClick?: boolean;
    showCloseButton?: boolean;
    mobileFullScreen?: boolean;
    className?: string;
}
export declare const Modal: ({ isOpen, onClose, title, children, size, closeOnBackdropClick, showCloseButton, mobileFullScreen, className }: ModalProps) => import("react/jsx-runtime").JSX.Element;
declare const DialogHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DialogTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const SimpleDialog: ({ isOpen, onClose, type, title, message, confirmLabel, cancelLabel, onConfirm, onCancel, defaultValue, placeholder, size, closeOnBackdropClick, inputValue: controlledInputValue, onInputChange, }: SimpleDialogProps & {
    inputValue?: string;
    onInputChange?: (value: string) => void;
}) => import("react/jsx-runtime").JSX.Element | null;
export declare const getDialogInputValue: () => string;
export declare const ModalFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose, DialogOverlay, DialogPortal, SimpleDialog, SimpleDialog as LegacyDialog, };
export type { ModalProps };
//# sourceMappingURL=dialog.d.ts.map