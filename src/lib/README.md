# Design System Documentation

This directory contains the core design system constants for the Travellor Buddy application. The design system ensures visual consistency and maintainability across all components.

## Files Overview

### `design-system.ts`
Core design system constants including:
- **Colors**: Primary palette (Deep Blue, Accent Blue, Soft Orange), status colors, and neutral grays
- **Border Radius**: Consistent rounded corners for different component types
- **Shadows**: Soft elevation shadows for cards, modals, and buttons
- **Z-Index**: Layering scale for overlays and modals
- **Transitions**: Animation timing and easing functions

### `typography.ts`
Typography system including:
- **Font Families**: Inter/Poppins as primary fonts
- **Font Sizes**: Consistent scale from xs (12px) to 5xl (48px)
- **Font Weights**: Normal, medium, semibold, and bold
- **Line Heights**: Optimized for readability
- **Text Styles**: Pre-configured presets for headings, body text, buttons, etc.

### `spacing.ts`
Spacing system based on an 8pt grid:
- **Spacing Scale**: Multiples of 8px for consistent rhythm
- **Component Spacing**: Pre-defined spacing for common patterns
- **Touch Targets**: Minimum sizes for accessibility (44px minimum)
- **Icon Sizes**: Consistent icon sizing scale
- **Helper Functions**: `getSpacing()` and `getSpacingPx()` for custom spacing

## Usage Examples

### Using Colors

```typescript
import { colors } from '@/lib/design-system';

// In a component
<div style={{ backgroundColor: colors.deepBlue, color: colors.white }}>
  Primary Button
</div>

// With Tailwind (using CSS custom properties)
<div className="bg-deep-blue text-white">
  Primary Button
</div>
```

### Using Typography

```typescript
import { fontSize, fontWeight, textStyles } from '@/lib/typography';

// Direct usage
<h1 style={{ 
  fontSize: fontSize['4xl'], 
  fontWeight: fontWeight.bold 
}}>
  Heading
</h1>

// Using presets
<h1 style={textStyles.h1}>Heading</h1>

// With Tailwind
<h1 className="text-4xl font-bold">Heading</h1>
```

### Using Spacing

```typescript
import { spacing, componentSpacing, getSpacing } from '@/lib/spacing';

// Using predefined spacing
<div style={{ padding: spacing[3] }}>Content</div>

// Using component-specific spacing
<div style={{ padding: componentSpacing.cardPadding }}>Card Content</div>

// Using helper function for custom spacing
<div style={{ margin: getSpacing(5) }}>Custom Spacing</div>

// With Tailwind (using CSS custom properties)
<div className="p-3">Content</div>
```

### Using Border Radius

```typescript
import { borderRadius } from '@/lib/design-system';

// Card with rounded corners
<div style={{ borderRadius: borderRadius.card }}>Card</div>

// Button with rounded corners
<button style={{ borderRadius: borderRadius.button }}>Button</button>
```

### Using Shadows

```typescript
import { shadows } from '@/lib/design-system';

// Card with elevation
<div style={{ boxShadow: shadows.card }}>Card</div>

// Card with hover effect
<div 
  style={{ boxShadow: shadows.card }}
  onMouseEnter={(e) => e.currentTarget.style.boxShadow = shadows.cardHover}
  onMouseLeave={(e) => e.currentTarget.style.boxShadow = shadows.card}
>
  Interactive Card
</div>
```

## Tailwind Integration

The design system is integrated with Tailwind CSS v4 through CSS custom properties in `src/styles/theme.css`. You can use Tailwind utility classes that map to the design system:

### Color Classes
- `bg-deep-blue` - Primary color background
- `bg-accent-blue` - Secondary color background
- `bg-soft-orange` - Accent color background
- `text-primary-text` - Primary text color
- `text-secondary-text` - Secondary text color
- `bg-success-green` - Success state background
- `bg-error-red` - Error state background

### Spacing Classes
- `p-1` through `p-12` - Padding following 8pt grid
- `m-1` through `m-12` - Margin following 8pt grid
- `gap-1` through `gap-12` - Gap following 8pt grid

### Typography Classes
- `text-xs` through `text-5xl` - Font sizes
- `font-normal`, `font-medium`, `font-semibold`, `font-bold` - Font weights

## Design Principles

### 8pt Grid System
All spacing values are multiples of 8px to maintain consistent visual rhythm and alignment throughout the application.

### Color Usage
- **Deep Blue (#1E3A8A)**: Primary brand color, used for main CTAs and headers
- **Accent Blue (#3B82F6)**: Secondary actions, links, and interactive elements
- **Soft Orange (#F97316)**: Accent elements, highlights, and current state indicators
- **Success Green (#10B981)**: Success states, confirmations, verified badges
- **Error Red (#EF4444)**: Error states, destructive actions, warnings

### Typography Hierarchy
- Use heading styles (h1-h6) for content hierarchy
- Body text uses 16px base size for optimal readability
- Maintain consistent line heights (1.5 for body, 1.25 for headings)
- Use font weights to establish visual hierarchy (bold for headings, medium for buttons)

### Shadows and Elevation
- Use subtle shadows to create depth without overwhelming the design
- Card shadow for standard elevation
- Card hover shadow for interactive feedback
- Modal shadow for prominent overlays

### Accessibility
- All interactive elements have minimum 44x44px touch targets
- Color contrast ratios meet WCAG AA standards
- Focus indicators are visible for keyboard navigation
- Text scales properly without breaking layout

## Best Practices

1. **Always use design system constants** instead of hardcoded values
2. **Follow the 8pt grid** for all spacing and sizing
3. **Use semantic color names** (e.g., `successGreen` instead of `green`)
4. **Leverage Tailwind utilities** for rapid development
5. **Maintain consistency** across all components
6. **Test accessibility** with screen readers and keyboard navigation
7. **Use pre-configured text styles** for common typography patterns
8. **Apply shadows consistently** for elevation hierarchy

## Extending the Design System

When adding new values to the design system:

1. Follow existing naming conventions
2. Ensure values align with the 8pt grid (for spacing)
3. Update TypeScript types for autocomplete support
4. Add corresponding CSS custom properties in `theme.css`
5. Document the new values in this README
6. Test across different screen sizes and themes

## Migration Guide

If you're updating existing components to use the design system:

1. Replace hardcoded colors with design system colors
2. Update spacing to follow the 8pt grid
3. Apply consistent border radius values
4. Use typography presets for text styling
5. Replace custom shadows with design system shadows
6. Ensure touch targets meet minimum size requirements
7. Test the component for visual consistency

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [8pt Grid System](https://spec.fm/specifics/8-pt-grid)
