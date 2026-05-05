/**
 * Design System - Main Export
 * 
 * This file provides a centralized export for all design system constants.
 * Import from here for easy access to colors, typography, spacing, and more.
 * 
 * @example
 * import { colors, spacing, fontSize } from '@/lib';
 */

// Design System Core
export * from './design-system';
export * from './typography';
export * from './spacing';

// Re-export commonly used items for convenience
export { colors, borderRadius, shadows, zIndex, transitions, easings } from './design-system';
export { fontFamily, fontSize, fontWeight, lineHeight, textStyles } from './typography';
export { spacing, componentSpacing, touchTarget, iconSize, getSpacing, getSpacingPx } from './spacing';
