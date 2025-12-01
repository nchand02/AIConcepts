/**
 * Central Diagram Theme Configuration
 * 
 * Comprehensive Mermaid.js theme configuration ensuring:
 * - Consistent visual styling across all diagrams
 * - WCAG AA accessibility compliance (4.5:1 contrast for normal text)
 * - Responsive design (320px mobile to 1920px+ desktop)
 * - Professional appearance with semantic color mapping
 */

// ========== COLOR PALETTE ==========
// Primary semantic colors with WCAG AA compliant contrasts
export const colors = {
  // Semantic theme colors
  primary: {
    light: '#3b82f6',      // Blue for primary elements
    dark: '#60a5fa',       // Lighter blue for dark mode
  },
  secondary: {
    light: '#10b981',      // Green for secondary elements
    dark: '#34d399',       // Lighter green for dark mode
  },
  accent: {
    light: '#f59e0b',      // Orange for accents/highlights
    dark: '#fbbf24',       // Lighter orange for dark mode
  },
  neutral: {
    light: '#64748b',      // Slate gray for neutral elements
    dark: '#94a3b8',       // Lighter slate for dark mode
  },
  
  // Backgrounds
  background: {
    light: '#ffffff',
    lightSecondary: '#f8fafc',
    dark: '#1e293b',
    darkSecondary: '#334155',
  },
  
  // Text colors (high contrast)
  text: {
    light: '#0f172a',      // Near-black for light backgrounds
    dark: '#f1f5f9',       // Near-white for dark backgrounds
  },
  
  // Borders
  border: {
    light: '#cbd5e1',      // Light gray borders
    dark: '#475569',       // Darker borders for dark mode
  },
  
  // Semantic concept colors (for AI-specific diagrams)
  concepts: {
    perception: {
      light: '#3b82f6',    // Blue - input/perception
      dark: '#60a5fa',
    },
    reasoning: {
      light: '#10b981',    // Green - processing/reasoning
      dark: '#34d399',
    },
    learning: {
      light: '#f59e0b',    // Orange - learning/training
      dark: '#fbbf24',
    },
    generation: {
      light: '#8b5cf6',    // Purple - output/generation
      dark: '#a78bfa',
    },
  },
};

// ========== TYPOGRAPHY ==========
export const typography = {
  // Font settings
  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  
  // Font sizes (responsive)
  fontSize: {
    base: 15,              // Base font size in px
    large: 16,             // For important labels
    small: 13,             // For secondary labels
    min: 12,               // Minimum readable size (accessibility)
  },
  
  // Line height for readability
  lineHeight: 1.5,
};

// ========== SPACING ==========
export const spacing = {
  // Node spacing (distance between nodes)
  nodeSpacing: {
    horizontal: 64,        // Horizontal space between nodes
    vertical: 56,          // Vertical space between nodes
  },
  
  // Node internal padding
  nodePadding: {
    horizontal: 16,        // Left/right padding inside nodes
    vertical: 12,          // Top/bottom padding inside nodes
  },
  
  // Canvas padding
  canvasPadding: 32,       // Padding around entire diagram
};

// ========== NODE STYLES ==========
export const nodeStyles = {
  // Border radius for rounded rectangles
  borderRadius: 10,        // 8-12px range for modern look
  
  // Border width
  borderWidth: 1.5,        // Slightly thicker than default
  
  // Node minimum dimensions
  minWidth: 120,
  minHeight: 48,
};

// ========== EDGE STYLES ==========
export const edgeStyles = {
  // Line width for connections
  lineWidth: 2,            // 1.5-2px for visibility
  
  // Arrow size
  arrowSize: 8,
  
  // Curve style (default: 'basis' for smooth curves)
  curve: 'basis',
};

// ========== RESPONSIVE BREAKPOINTS ==========
export const breakpoints = {
  mobile: 320,             // Minimum mobile width
  tablet: 768,             // Tablet breakpoint
  desktop: 1200,           // Desktop breakpoint
  wide: 1920,              // Wide desktop
};

// ========== CANVAS DIMENSIONS ==========
export const canvasDimensions = {
  desktop: {
    width: 1200,
    height: 700,
  },
  tablet: {
    width: 768,
    height: 600,
  },
  mobile: {
    width: 360,
    height: 500,
  },
};

// ========== MERMAID THEME CONFIGURATIONS ==========

/**
 * Light theme configuration for Mermaid diagrams
 */
export const lightTheme = {
  theme: 'base',
  themeVariables: {
    // Primary colors
    primaryColor: colors.primary.light,
    primaryTextColor: colors.text.light,
    primaryBorderColor: colors.border.light,
    
    // Background colors
    mainBkg: colors.background.light,
    secondaryBkg: colors.background.lightSecondary,
    tertiaryBkg: colors.background.lightSecondary,
    
    // Text
    textColor: colors.text.light,
    fontSize: `${typography.fontSize.base}px`,
    fontFamily: typography.fontFamily,
    
    // Borders
    lineColor: colors.border.light,
    border1: colors.border.light,
    border2: colors.border.light,
    
    // Node-specific colors
    nodeBorder: colors.border.light,
    nodeTextColor: colors.text.light,
    
    // Edge colors
    edgeLabelBackground: colors.background.light,
    
    // Specific node types
    clusterBkg: colors.background.lightSecondary,
    clusterBorder: colors.border.light,
    
    // Class/type colors (for semantic mapping)
    classText: colors.text.light,
    
    // Git/sequence diagram colors
    signalColor: colors.primary.light,
    signalTextColor: colors.text.light,
    
    // Contrast and readability
    contrast: '#000000',
    darkMode: false,
  },
  flowchart: {
    htmlLabels: true,
    curve: edgeStyles.curve,
    padding: spacing.nodePadding.horizontal,
    nodeSpacing: spacing.nodeSpacing.horizontal,
    rankSpacing: spacing.nodeSpacing.vertical,
    diagramPadding: spacing.canvasPadding,
    useMaxWidth: true,
  },
};

/**
 * Dark theme configuration for Mermaid diagrams
 */
export const darkTheme = {
  theme: 'base',
  themeVariables: {
    // Primary colors
    primaryColor: colors.primary.dark,
    primaryTextColor: colors.text.dark,
    primaryBorderColor: colors.border.dark,
    
    // Background colors
    mainBkg: colors.background.dark,
    secondaryBkg: colors.background.darkSecondary,
    tertiaryBkg: colors.background.darkSecondary,
    
    // Text
    textColor: colors.text.dark,
    fontSize: `${typography.fontSize.base}px`,
    fontFamily: typography.fontFamily,
    
    // Borders
    lineColor: colors.border.dark,
    border1: colors.border.dark,
    border2: colors.border.dark,
    
    // Node-specific colors
    nodeBorder: colors.border.dark,
    nodeTextColor: colors.text.dark,
    
    // Edge colors
    edgeLabelBackground: colors.background.dark,
    
    // Specific node types
    clusterBkg: colors.background.darkSecondary,
    clusterBorder: colors.border.dark,
    
    // Class/type colors
    classText: colors.text.dark,
    
    // Git/sequence diagram colors
    signalColor: colors.primary.dark,
    signalTextColor: colors.text.dark,
    
    // Contrast and readability
    contrast: '#ffffff',
    darkMode: true,
  },
  flowchart: {
    htmlLabels: true,
    curve: edgeStyles.curve,
    padding: spacing.nodePadding.horizontal,
    nodeSpacing: spacing.nodeSpacing.horizontal,
    rankSpacing: spacing.nodeSpacing.vertical,
    diagramPadding: spacing.canvasPadding,
    useMaxWidth: true,
  },
};

// ========== ACCESSIBILITY ==========
export const a11y = {
  // Minimum contrast ratios (WCAG AA)
  minContrast: {
    normalText: 4.5,       // WCAG AA for normal text
    largeText: 3.0,        // WCAG AA for large text (18pt+)
  },
  
  // Focus indicators
  focusOutline: {
    width: 3,
    color: colors.primary.light,
    offset: 2,
  },
  
  // ARIA labels
  ariaLabels: {
    diagram: 'Interactive diagram',
    node: 'Diagram node',
    edge: 'Connection',
  },
};

// ========== SEMANTIC NODE CLASSES ==========
// CSS classes for semantic coloring in diagrams
export const nodeClasses = {
  perception: {
    fill: colors.concepts.perception.light,
    stroke: colors.border.light,
    color: colors.text.light,
  },
  reasoning: {
    fill: colors.concepts.reasoning.light,
    stroke: colors.border.light,
    color: colors.text.light,
  },
  learning: {
    fill: colors.concepts.learning.light,
    stroke: colors.border.light,
    color: colors.text.light,
  },
  generation: {
    fill: colors.concepts.generation.light,
    stroke: colors.border.light,
    color: colors.text.light,
  },
};

// ========== UTILITY FUNCTIONS ==========

/**
 * Get appropriate theme based on current color scheme
 */
export function getTheme(isDark: boolean) {
  return isDark ? darkTheme : lightTheme;
}

/**
 * Calculate responsive font size based on viewport width
 */
export function getResponsiveFontSize(viewportWidth: number): number {
  if (viewportWidth < breakpoints.tablet) {
    return Math.max(typography.fontSize.small, typography.fontSize.min);
  } else if (viewportWidth < breakpoints.desktop) {
    return typography.fontSize.base;
  }
  return typography.fontSize.large;
}

/**
 * Get canvas dimensions based on viewport width
 */
export function getCanvasDimensions(viewportWidth: number) {
  if (viewportWidth < breakpoints.tablet) {
    return canvasDimensions.mobile;
  } else if (viewportWidth < breakpoints.desktop) {
    return canvasDimensions.tablet;
  }
  return canvasDimensions.desktop;
}

/**
 * Generate Mermaid initialization config
 */
export function getMermaidConfig(isDark: boolean) {
  return {
    startOnLoad: true,
    theme: isDark ? 'dark' : 'default',
    themeVariables: isDark ? darkTheme.themeVariables : lightTheme.themeVariables,
    flowchart: isDark ? darkTheme.flowchart : lightTheme.flowchart,
    securityLevel: 'loose',
    fontFamily: typography.fontFamily,
    logLevel: 'error',
  };
}
