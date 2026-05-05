/**
 * Design System Example Component
 * 
 * This file demonstrates how to use the design system constants in React components.
 * It serves as both documentation and a visual reference for the design system.
 */

import React from 'react';
import { colors, borderRadius, shadows } from './design-system';
import { fontSize, fontWeight, textStyles } from './typography';
import { spacing, componentSpacing, touchTarget } from './spacing';

/**
 * Example: Color Palette Display
 */
export const ColorPaletteExample: React.FC = () => {
  return (
    <div style={{ padding: spacing[4] }}>
      <h2 style={textStyles.h2}>Color Palette</h2>
      
      <div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap', marginTop: spacing[3] }}>
        {/* Primary Colors */}
        <ColorSwatch color={colors.deepBlue} name="Deep Blue" />
        <ColorSwatch color={colors.accentBlue} name="Accent Blue" />
        <ColorSwatch color={colors.softOrange} name="Soft Orange" />
        
        {/* Status Colors */}
        <ColorSwatch color={colors.successGreen} name="Success Green" />
        <ColorSwatch color={colors.errorRed} name="Error Red" />
        <ColorSwatch color={colors.warningOrange} name="Warning Orange" />
      </div>
    </div>
  );
};

const ColorSwatch: React.FC<{ color: string; name: string }> = ({ color, name }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: color,
          borderRadius: borderRadius.card,
          boxShadow: shadows.card,
        }}
      />
      <p style={{ ...textStyles.caption, marginTop: spacing[1] }}>{name}</p>
      <p style={{ ...textStyles.caption, color: colors.secondaryText }}>{color}</p>
    </div>
  );
};

/**
 * Example: Typography Styles
 */
export const TypographyExample: React.FC = () => {
  return (
    <div style={{ padding: spacing[4] }}>
      <h1 style={textStyles.h1}>Heading 1</h1>
      <h2 style={textStyles.h2}>Heading 2</h2>
      <h3 style={textStyles.h3}>Heading 3</h3>
      <h4 style={textStyles.h4}>Heading 4</h4>
      <h5 style={textStyles.h5}>Heading 5</h5>
      <h6 style={textStyles.h6}>Heading 6</h6>
      
      <p style={textStyles.body}>
        This is body text. It uses the base font size of 16px with normal weight and 1.5 line height for optimal readability.
      </p>
      
      <p style={textStyles.bodySmall}>
        This is small body text, useful for secondary information.
      </p>
      
      <p style={textStyles.caption}>
        This is caption text, typically used for labels and metadata.
      </p>
    </div>
  );
};

/**
 * Example: Button Variants
 */
export const ButtonExample: React.FC = () => {
  const buttonBaseStyle: React.CSSProperties = {
    padding: `${componentSpacing.buttonPaddingY} ${componentSpacing.buttonPaddingX}`,
    borderRadius: borderRadius.button,
    border: 'none',
    cursor: 'pointer',
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    minHeight: touchTarget.minimum,
    transition: 'all 200ms ease-in-out',
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: colors.deepBlue,
    color: colors.white,
    boxShadow: shadows.button,
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: colors.white,
    color: colors.deepBlue,
    border: `2px solid ${colors.deepBlue}`,
  };

  const accentButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: colors.softOrange,
    color: colors.white,
    boxShadow: shadows.button,
  };

  return (
    <div style={{ padding: spacing[4] }}>
      <h2 style={textStyles.h2}>Button Variants</h2>
      
      <div style={{ display: 'flex', gap: spacing[2], marginTop: spacing[3], flexWrap: 'wrap' }}>
        <button style={primaryButtonStyle}>Primary Button</button>
        <button style={secondaryButtonStyle}>Secondary Button</button>
        <button style={accentButtonStyle}>Accent Button</button>
      </div>
    </div>
  );
};

/**
 * Example: Card Component
 */
export const CardExample: React.FC = () => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: colors.white,
    borderRadius: borderRadius.card,
    padding: componentSpacing.cardPadding,
    boxShadow: shadows.card,
    transition: 'box-shadow 200ms ease-in-out',
  };

  return (
    <div style={{ padding: spacing[4] }}>
      <h2 style={textStyles.h2}>Card Component</h2>
      
      <div style={{ marginTop: spacing[3], maxWidth: '400px' }}>
        <div
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = shadows.cardHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = shadows.card;
          }}
        >
          <h3 style={textStyles.h3}>Card Title</h3>
          <p style={{ ...textStyles.body, marginTop: spacing[2], color: colors.secondaryText }}>
            This is a card component with proper padding, border radius, and shadow following the design system.
            Hover over it to see the elevation change.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Example: Spacing Grid
 */
export const SpacingExample: React.FC = () => {
  return (
    <div style={{ padding: spacing[4] }}>
      <h2 style={textStyles.h2}>Spacing Scale (8pt Grid)</h2>
      
      <div style={{ marginTop: spacing[3] }}>
        {Object.entries(spacing).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: spacing[2] }}>
            <span style={{ ...textStyles.bodySmall, width: '100px' }}>
              spacing[{key}]
            </span>
            <div
              style={{
                width: value,
                height: '24px',
                backgroundColor: colors.accentBlue,
                marginLeft: spacing[2],
              }}
            />
            <span style={{ ...textStyles.caption, marginLeft: spacing[2], color: colors.secondaryText }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Complete Design System Showcase
 */
export const DesignSystemShowcase: React.FC = () => {
  return (
    <div style={{ backgroundColor: colors.lightBackground, minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ padding: spacing[4] }}>
          <h1 style={textStyles.h1}>Travellor Buddy Design System</h1>
          <p style={{ ...textStyles.body, marginTop: spacing[2], color: colors.secondaryText }}>
            A comprehensive design system for consistent and beautiful UI components.
          </p>
        </div>
        
        <ColorPaletteExample />
        <TypographyExample />
        <ButtonExample />
        <CardExample />
        <SpacingExample />
      </div>
    </div>
  );
};
