/**
 * Design System - Spacing
 * 
 * This file defines spacing constants following an 8pt grid system.
 * All spacing values are multiples of 8px for consistent layout rhythm.
 */

/**
 * Base Spacing Unit
 * 8px base unit for the grid system
 */
export const BASE_UNIT = 8;

/**
 * Spacing Scale
 * Following the 8pt grid system (multiples of 8px)
 */
export const spacing = {
  0: '0',
  1: '0.5rem',   // 8px  - 1 unit
  2: '1rem',     // 16px - 2 units
  3: '1.5rem',   // 24px - 3 units
  4: '2rem',     // 32px - 4 units
  5: '2.5rem',   // 40px - 5 units
  6: '3rem',     // 48px - 6 units
  7: '3.5rem',   // 56px - 7 units
  8: '4rem',     // 64px - 8 units
  9: '4.5rem',   // 72px - 9 units
  10: '5rem',    // 80px - 10 units
  12: '6rem',    // 96px - 12 units
  16: '8rem',    // 128px - 16 units
  20: '10rem',   // 160px - 20 units
  24: '12rem',   // 192px - 24 units
} as const;

/**
 * Component-Specific Spacing
 * Pre-defined spacing for common component patterns
 */
export const componentSpacing = {
  // Card padding
  cardPaddingSmall: spacing[2],    // 16px
  cardPadding: spacing[3],         // 24px
  cardPaddingLarge: spacing[4],    // 32px
  
  // Section spacing
  sectionGap: spacing[4],          // 32px
  sectionPadding: spacing[3],      // 24px
  
  // List item spacing
  listItemGap: spacing[2],         // 16px
  listItemPadding: spacing[2],     // 16px
  
  // Button padding
  buttonPaddingX: spacing[3],      // 24px
  buttonPaddingY: spacing[2],      // 16px
  buttonPaddingSmallX: spacing[2], // 16px
  buttonPaddingSmallY: spacing[1], // 8px
  
  // Input padding
  inputPaddingX: spacing[2],       // 16px
  inputPaddingY: spacing[2],       // 16px
  
  // Modal spacing
  modalPadding: spacing[3],        // 24px
  modalGap: spacing[3],            // 24px
  
  // Page layout
  pageMargin: spacing[3],          // 24px
  pagePadding: spacing[2],         // 16px
  
  // Grid gaps
  gridGapSmall: spacing[2],        // 16px
  gridGap: spacing[3],             // 24px
  gridGapLarge: spacing[4],        // 32px
  
  // Stack spacing
  stackGapTight: spacing[1],       // 8px
  stackGap: spacing[2],            // 16px
  stackGapLoose: spacing[3],       // 24px
} as const;

/**
 * Container Max Widths
 * Responsive container sizes
 */
export const containerMaxWidth = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
} as const;

/**
 * Touch Target Sizes
 * Minimum sizes for interactive elements (accessibility)
 */
export const touchTarget = {
  minimum: '44px',  // WCAG minimum touch target size
  comfortable: '48px',
  large: '56px',
} as const;

/**
 * Icon Sizes
 * Consistent icon sizing
 */
export const iconSize = {
  xs: '16px',
  sm: '20px',
  base: '24px',
  lg: '32px',
  xl: '40px',
  '2xl': '48px',
} as const;

/**
 * Helper function to get spacing value
 * @param multiplier - Number of base units (8px)
 * @returns Spacing value in rem
 */
export function getSpacing(multiplier: number): string {
  return `${(multiplier * BASE_UNIT) / 16}rem`;
}

/**
 * Helper function to get pixel value
 * @param multiplier - Number of base units (8px)
 * @returns Spacing value in pixels
 */
export function getSpacingPx(multiplier: number): number {
  return multiplier * BASE_UNIT;
}

export type SpacingKey = keyof typeof spacing;
export type ComponentSpacingKey = keyof typeof componentSpacing;
export type ContainerMaxWidthKey = keyof typeof containerMaxWidth;
export type IconSizeKey = keyof typeof iconSize;
