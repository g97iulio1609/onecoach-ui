/**
 * Drawer Shared Logic
 *
 * Common types and utilities for both web and native drawers
 * Following DRY principle to eliminate duplication
 */

import type React from 'react';

export type DrawerPosition = 'left' | 'right' | 'bottom' | 'top';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  position?: DrawerPosition;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdropClick?: boolean;
  showCloseButton?: boolean;
  mobileFullScreen?: boolean;
}

/**
 * Get drawer size styles based on position and size
 */
export function getDrawerSizeStyles(
  position: DrawerPosition,
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full'
): {
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
} {
  if (position === 'bottom' || position === 'top') {
    // Horizontal drawer (bottom/top)
    const heightStyles = {
      sm: { height: '40vh', maxHeight: '40vh' },
      md: { height: '60vh', maxHeight: '60vh' },
      lg: { height: '80vh', maxHeight: '80vh' },
      xl: { height: '90vh', maxHeight: '90vh' },
      full: { height: '100vh', maxHeight: '100vh' },
    };
    return heightStyles[size];
  } else {
    // Vertical drawer (left/right)
    const widthStyles = {
      sm: { width: '20rem', maxWidth: '20rem' },
      md: { width: '28rem', maxWidth: '28rem' },
      lg: { width: '32rem', maxWidth: '32rem' },
      xl: { width: '40rem', maxWidth: '40rem' },
      full: { width: '100%', maxWidth: '100%' },
    };
    return widthStyles[size];
  }
}
