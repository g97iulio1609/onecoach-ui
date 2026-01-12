import type { Config } from 'tailwindcss';
import { designTokens } from './tokens';

export const oneCoachPreset: Config = {
  content: [],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: designTokens.colors.primary,
        secondary: designTokens.colors.secondary,
        neutral: designTokens.colors.neutral,
        error: designTokens.colors.semantic.error,
        success: designTokens.colors.semantic.success,
        warning: designTokens.colors.semantic.warning,
        info: designTokens.colors.semantic.info,
        background: designTokens.colors.background,
      },
      fontFamily: {
        sans: designTokens.typography.fontFamily.sans,
        mono: designTokens.typography.fontFamily.mono,
      },
      fontSize: designTokens.typography.fontSize,
      fontWeight: designTokens.typography.fontWeight,
      letterSpacing: designTokens.typography.letterSpacing,
      spacing: designTokens.spacing,
      borderRadius: designTokens.borderRadius,
      boxShadow: designTokens.shadows,
      zIndex: designTokens.zIndex,
      transitionDuration: designTokens.transitions.duration,
      transitionTimingFunction: designTokens.transitions.timing,
      keyframes: designTokens.animations,
      animation: {
        fadeIn: designTokens.animations.fadeIn,
        fadeInUp: designTokens.animations.fadeInUp,
        slideInRight: designTokens.animations.slideInRight,
        slideInLeft: designTokens.animations.slideInLeft,
        pulse: designTokens.animations.pulse,
        shimmer: designTokens.animations.shimmer,
        typing: designTokens.animations.typing,
        bounce: designTokens.animations.bounce,
      },
    },
  },
  plugins: [],
};
