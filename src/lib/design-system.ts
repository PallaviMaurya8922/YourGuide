/**
 * Design System - Color Palette
 * 
 * This file defines the core color palette for the Travellor Buddy application.
 * All colors follow the design system specification for consistent visual identity.
 */

export const colors = {
  // Primary Colors
  deepBlue: '#1E3A8A',
  accentBlue: '#3B82F6',
  softOrange: '#F97316',
  
  // Background Colors
  lightBackground: '#F9FAFB',
  white: '#FFFFFF',
  
  // Text Colors
  primaryText: '#111827',
  secondaryText: '#6B7280',
  
  // Status Colors
  successGreen: '#10B981',
  errorRed: '#EF4444',
  warningOrange: '#F59E0B',
  
  // Neutral Colors
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
} as const;

/**
 * Border Radius Constants
 * Following the design system specification for consistent rounded corners
 */
export const borderRadius = {
  card: '16px',
  button: '24px',
  chip: '20px',
  badge: '9999px', // fully rounded
  input: '12px',
  modal: '20px',
} as const;

/**
 * Shadow Definitions
 * Soft and subtle shadows for elevation following the design system
 */
export const shadows = {
  card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  cardHover: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  modal: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  button: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  none: 'none',
} as const;

/**
 * Z-Index Scale
 * Consistent layering for overlays and modals
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

/**
 * Transition Durations
 * Consistent animation timing for microinteractions
 */
export const transitions = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  verySlow: '500ms',
} as const;

/**
 * Transition Easings
 * Smooth easing functions for animations
 */
export const easings = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export type ColorKey = keyof typeof colors;
export type BorderRadiusKey = keyof typeof borderRadius;
export type ShadowKey = keyof typeof shadows;
export type ZIndexKey = keyof typeof zIndex;
