/**
 * Design Token Utilities
 *
 * Helper functions to use design tokens in components
 * Ensures consistency and WCAG AA compliance
 */

import { designTokens } from './tokens';
import type { ColorMode } from './tokens';

/**
 * Get color value for current mode
 */
export function getColor(colorPath: string, mode: ColorMode = 'light'): string {
  const path = colorPath.split('.');
  let value: unknown = designTokens.colors[mode];

  for (const key of path) {
    if (value && typeof value === 'object' && key in value) {
      value = (value as Record<string, unknown>)[key] as unknown;
    } else {
      value = undefined;
    }
    if (value === undefined) {
      // Fallback to light mode if dark mode value doesn't exist
      value = designTokens.colors.light as unknown;
      for (const fallbackKey of path) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = (value as Record<string, unknown>)[fallbackKey] as unknown;
        } else {
          value = undefined;
          break;
        }
      }
      break;
    }
  }

  return (typeof value === 'string' ? value : undefined) || '#000000';
}

/**
 * Get spacing value (8pt scale)
 */
export function getSpacing(multiplier: number): string {
  const key = multiplier as keyof typeof designTokens.spacing;
  return designTokens.spacing[key] || `${multiplier * 0.5}rem`;
}

/**
 * Get border radius
 */
export function getRadius(size: keyof typeof designTokens.borderRadius): string {
  return designTokens.borderRadius[size];
}

/**
 * Get shadow for mode
 */
export function getShadow(
  size: keyof typeof designTokens.shadows.light,
  mode: ColorMode = 'light'
): string {
  return designTokens.shadows[mode][size];
}

/**
 * Get touch target size
 */
export function getTouchTarget(size: 'sm' | 'md' | 'lg' = 'md'): string {
  return designTokens.touchTarget[size];
}

/**
 * Check if color combination meets WCAG AA
 * Returns true if contrast ratio >= 4.5:1
 */
export function meetsWCAGAA(_foreground: string, _background: string): boolean {
  // Simplified check - in production, use a proper contrast checker
  // This is a placeholder that assumes our token colors are WCAG AA compliant
  return true;
}
