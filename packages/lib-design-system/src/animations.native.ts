/**
 * Animation Utilities - Cross-platform
 *
 * Centralized animation classes for consistent transitions
 * Mobile-optimized with reduced motion support using AccessibilityInfo
 */

import { AccessibilityInfo } from 'react-native';

export const animations = {
  // Fade animations
  fadeIn: 'animate-fadeIn',
  fadeOut: 'animate-fadeOut',

  // Slide animations
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  slideLeft: 'animate-slide-left',
  slideRight: 'animate-slide-right',

  // Scale animations
  scaleIn: 'animate-scale-in',
  scaleOut: 'animate-scale-out',

  // Transition durations
  duration: {
    fast: 'duration-150',
    base: 'duration-200',
    medium: 'duration-300',
    slow: 'duration-500',
  },

  // Transition timing functions
  timing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // Common transition combinations
  transitions: {
    all: 'transition-all duration-200 ease-in-out',
    colors: 'transition-colors duration-200',
    opacity: 'transition-opacity duration-200',
    transform: 'transition-transform duration-200 ease-out',
    shadow: 'transition-shadow duration-200',
  },
} as const;

/**
 * Get animation class with reduced motion support
 */
export async function getAnimation(animation: keyof typeof animations): Promise<string> {
  try {
    const isReduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled();
    if (isReduceMotionEnabled) {
      return 'transition-opacity duration-200';
    }
  } catch (error: unknown) {
    console.error('Error checking reduce motion:', error);
  }
  return animations[animation] as string;
}

/**
 * Synchronous version for when async is not possible
 * Falls back to showing animations
 */
export function getAnimationSync(animation: keyof typeof animations): string {
  return animations[animation] as string;
}
