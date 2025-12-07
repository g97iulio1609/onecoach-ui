/**
 * Animation Utilities
 *
 * Centralized animation classes for consistent transitions
 * Mobile-optimized with reduced motion support
 */

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
export function getAnimation(animation: keyof typeof animations): string {
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return 'transition-opacity duration-200';
    }
  }
  return animations[animation] as string;
}
