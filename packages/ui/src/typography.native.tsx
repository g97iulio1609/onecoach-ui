/**
 * Typography Components - React Native
 *
 * Design system typography components for React Native
 * Cross-platform compatible with web version
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

// ============================================================================
// HEADING COMPONENT
// ============================================================================

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  align?: 'left' | 'center' | 'right';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'brand';
  gradient?: boolean;
  truncate?: boolean;
  children: React.ReactNode;
  style?: RNTextProps['style'];
}

const getHeadingSize = (size: string | undefined, level: number) => {
  const defaultSizes: Record<number, number> = {
    1: 32,
    2: 28,
    3: 24,
    4: 20,
    5: 18,
    6: 16,
  };

  const sizeMap: Record<string, number> = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    '6xl': 40,
  };

  return size ? sizeMap[size] : defaultSizes[level] || 16;
};

const getHeadingWeight = (weight: string) => {
  const weightMap: Record<string, RNTextProps['style']> = {
    light: { fontWeight: '300' },
    normal: { fontWeight: '400' },
    medium: { fontWeight: '500' },
    semibold: { fontWeight: '600' },
    bold: { fontWeight: '700' },
    extrabold: { fontWeight: '800' },
  };
  return weightMap[weight] || { fontWeight: '700' };
};

const getHeadingVariant = (variant: string) => {
  const variantMap: Record<string, string> = {
    primary: '#171717',
    secondary: '#404040',
    tertiary: '#525252',
    inverse: '#FFFFFF',
    brand: '#10B981',
  };
  return { color: variantMap[variant] || '#171717' };
};

export const Heading = React.forwardRef<RNText, HeadingProps>(
  (
    {
      level = 2,
      size,
      weight = 'bold',
      align = 'left',
      variant = 'primary',
      gradient = false,
      truncate = false,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const fontSize = getHeadingSize(size, level);
    const weightStyle = getHeadingWeight(weight);
    const variantStyle = getHeadingVariant(variant);

    return (
      <RNText
        ref={ref}
        style={[
          {
            fontSize,
            textAlign: align,
            ...weightStyle,
            ...variantStyle,
          },
          truncate && { numberOfLines: 1, ellipsizeMode: 'tail' },
          style,
        ]}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);

Heading.displayName = 'Heading';

// ============================================================================
// TEXT COMPONENT
// ============================================================================

export interface TextProps {
  as?: 'p' | 'span' | 'div' | 'label' | 'small' | 'strong' | 'em';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'muted'
    | 'inverse'
    | 'link'
    | 'success'
    | 'warning'
    | 'error'
    | 'info';
  truncate?: boolean;
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  style?: RNTextProps['style'];
}

const getTextSize = (size: string) => {
  const sizeMap: Record<string, number> = {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
  };
  return sizeMap[size] || 16;
};

const getTextWeight = (weight: string) => {
  const weightMap: Record<string, RNTextProps['style']> = {
    light: { fontWeight: '300' },
    normal: { fontWeight: '400' },
    medium: { fontWeight: '500' },
    semibold: { fontWeight: '600' },
    bold: { fontWeight: '700' },
  };
  return weightMap[weight] || { fontWeight: '400' };
};

const getTextVariant = (variant: string) => {
  const variantMap: Record<string, string> = {
    primary: '#171717',
    secondary: '#404040',
    tertiary: '#525252',
    muted: '#737373',
    inverse: '#FFFFFF',
    link: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  };
  return { color: variantMap[variant] || '#171717' };
};

export const Text = React.forwardRef<RNText, TextProps>(
  (
    {
      size = 'base',
      weight = 'normal',
      align = 'left',
      variant = 'primary',
      truncate = false,
      lineClamp,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const fontSize = getTextSize(size);
    const weightStyle = getTextWeight(weight);
    const variantStyle = getTextVariant(variant);

    return (
      <RNText
        ref={ref}
        style={[
          {
            fontSize,
            textAlign: align,
            ...weightStyle,
            ...variantStyle,
          },
          truncate && { numberOfLines: 1, ellipsizeMode: 'tail' },
          lineClamp && { numberOfLines: lineClamp, ellipsizeMode: 'tail' },
          style,
        ]}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);

Text.displayName = 'Text';

// ============================================================================
// LABEL COMPONENT
// ============================================================================

export interface LabelProps {
  size?: 'sm' | 'base' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  required?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  style?: RNTextProps['style'];
}

const getLabelSize = (size: string) => {
  const sizeMap: Record<string, number> = {
    sm: 12,
    base: 14,
    lg: 16,
  };
  return sizeMap[size] || 14;
};

const getLabelWeight = (weight: string) => {
  const weightMap: Record<string, RNTextProps['style']> = {
    normal: { fontWeight: '400' },
    medium: { fontWeight: '500' },
    semibold: { fontWeight: '600' },
    bold: { fontWeight: '700' },
  };
  return weightMap[weight] || { fontWeight: '500' };
};

export const Label = React.forwardRef<RNText, LabelProps>(
  (
    {
      size = 'base',
      weight = 'medium',
      required = false,
      disabled = false,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const fontSize = getLabelSize(size);
    const weightStyle = getLabelWeight(weight);
    const color = disabled ? '#A3A3A3' : '#404040';

    return (
      <RNText
        ref={ref}
        style={[
          {
            fontSize,
            marginBottom: 6,
            ...weightStyle,
            color,
          },
          style,
        ]}
        {...props}
      >
        {children}
        {required && <RNText style={{ color: '#EF4444', marginLeft: 4 }}>*</RNText>}
      </RNText>
    );
  }
);

Label.displayName = 'Label';

// ============================================================================
// HELPER TEXT COMPONENT
// ============================================================================

export interface HelperTextProps {
  variant?: 'default' | 'error' | 'success' | 'warning';
  children: React.ReactNode;
  style?: RNTextProps['style'];
}

const getHelperTextVariant = (variant: string) => {
  const variantMap: Record<string, string> = {
    default: '#737373',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  };
  return { color: variantMap[variant] || '#737373' };
};

export const HelperText = React.forwardRef<RNText, HelperTextProps>(
  ({ variant = 'default', style, children, ...props }, ref) => {
    const variantStyle = getHelperTextVariant(variant);

    return (
      <RNText
        ref={ref}
        style={[
          {
            fontSize: 12,
            lineHeight: 16,
            marginTop: 6,
            ...variantStyle,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);

HelperText.displayName = 'HelperText';

// ============================================================================
// CODE COMPONENT
// ============================================================================

export interface CodeProps {
  block?: boolean;
  language?: string;
  children: React.ReactNode;
  style?: RNTextProps['style'];
}

export const Code = React.forwardRef<RNText, CodeProps>(
  ({ block = false, language, style, children, ...props }, ref) => {
    const baseStyle = {
      fontFamily: 'monospace',
      fontSize: 14,
      backgroundColor: '#F5F5F5',
      color: '#171717',
      padding: block ? 16 : 4,
      borderRadius: 8,
      ...(block && { paddingVertical: 16, paddingHorizontal: 16 }),
    };

    return (
      <RNText ref={ref} style={[baseStyle, style]} {...props}>
        {children}
      </RNText>
    );
  }
);

Code.displayName = 'Code';
