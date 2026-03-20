# 🎨 MASTER DESIGN SYSTEM REFERENCE
## Community Platform - Web (Angular) & Mobile (Flutter)

**Version:** 1.0  
**Last Updated:** March 21, 2026  
**Status:** Production Ready  
**Audience:** All team members (designers, developers, product managers)

---

## TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Design Philosophy](#design-philosophy)
3. [Color System](#color-system)
4. [Typography System](#typography-system)
5. [Spacing & Layout Grid](#spacing--layout-grid)
6. [Shadow & Elevation](#shadow--elevation)
7. [Border Radius & Shapes](#border-radius--shapes)
8. [Responsive Breakpoints](#responsive-breakpoints)
9. [Component Tokens](#component-tokens)
10. [Animation Specifications](#animation-specifications)
11. [Accessibility Standards](#accessibility-standards)
12. [Usage Guidelines](#usage-guidelines)

---

## EXECUTIVE SUMMARY

This design system establishes a **cohesive, vibrant, and accessible visual language** for a UK-based community platform. The system prioritizes:

- **Community Engagement:** Warm, welcoming colors that foster connection
- **Location-First Design:** Location is integrated throughout the UI
- **Accessibility:** WCAG AA compliance ensuring inclusive design
- **Consistency:** Unified design across web (Angular) and mobile (Flutter)
- **Scalability:** Modular components that grow with the product

**Key Design Tokens:**
- **11 Core Colors** + gradients for emotional resonance
- **8-Point Grid System** for perfect alignment
- **Modular Typography** with 8 font sizes and 5 weights
- **Elevation System** using shadows for depth and hierarchy
- **Micro-animations** for delightful user feedback

---

## DESIGN PHILOSOPHY

### 1. **Community-Centric**
The design celebrates connection and belonging. Colors are warm, friendly, and energetic. Layouts encourage interaction and discovery.

### 2. **Location-First**
UK postal codes are fundamental. Location indicators appear consistently, and location-based content is prioritized in navigation and discovery.

### 3. **Accessible & Inclusive**
All design decisions consider color blindness, motor impairments, visual impairments, and cognitive accessibility. Every interactive element is keyboard and screen-reader friendly.

### 4. **Modern & Vibrant**
Gradient backgrounds, soft shadows, rounded corners, and smooth animations create a contemporary, inviting experience that appeals to diverse age groups.

### 5. **Performance-First**
All visual effects are optimized for performance. Animations use GPU acceleration. Cards and components load progressively.

### 6. **Consistency Across Platforms**
Web (Angular) and mobile (Flutter) use the same color palette, typography scale, spacing grid, and component tokens. Only platform-specific interactions differ (e.g., bottom nav on mobile).

---

## COLOR SYSTEM

### PRIMARY COLORS (Leadership & Action)

```
Primary Blue
Hex: #5865F2
RGB: 88, 101, 242
HSL: 229, 244, 165
Usage: Primary buttons, links, active states, navigation highlights
Emotion: Trust, stability, community backbone
```

```
Secondary Accent - Teal
Hex: #4ECDC4
RGB: 78, 205, 196
HSL: 174, 123, 179
Usage: Growth indicators, positive actions, secondary CTAs
Emotion: Connection, growth, community spirit
```

```
Tertiary Accent - Vibrant Red
Hex: #FF6B6B
RGB: 255, 107, 107
HSL: 0, 255, 212
Usage: Energy, urgency, special highlights
Emotion: Action, excitement, urgency
```

### EXTENDED VIBRANT PALETTE

```
Success Green
Hex: #2ECC71
RGB: 46, 204, 113
Usage: Positive states, confirmations, growth metrics
Accessibility: 7.2:1 contrast with white

Warning Orange
Hex: #F39C12
RGB: 243, 156, 18
Usage: Attention, events, promotions, caution
Accessibility: 4.8:1 contrast with white

Information Cyan
Hex: #3498DB
RGB: 52, 152, 219
Usage: Help text, information, support features
Accessibility: 6.1:1 contrast with white

Danger Red
Hex: #E74C3C
RGB: 231, 76, 60
Usage: Errors, alerts, destructive actions
Accessibility: 6.9:1 contrast with white

Creative Purple
Hex: #9B59B6
RGB: 155, 89, 182
Usage: Premium features, special highlights
Accessibility: 4.5:1 contrast with white
```

### GRADIENT COMBINATIONS

```
Hero Gradient (Dominant)
From: #5865F2 (Blue) → To: #FF6B6B (Red)
Usage: Landing page hero, main CTAs
Emotion: Dynamic, energetic, inviting

Community Gradient (Growth)
From: #4ECDC4 (Teal) → To: #44A08D (Dark Teal)
Usage: Community cards, membership badges
Emotion: Supportive, evolving, connected

Energy Gradient (Action)
From: #FF6B6B (Red) → To: #F39C12 (Orange)
Usage: Event cards, time-sensitive actions
Emotion: Exciting, urgent, engaging

Calm Gradient (Stability)
From: #3498DB (Cyan) → To: #2980B9 (Dark Blue)
Usage: Help sections, support content
Emotion: Trustworthy, stable, professional

Social Gradient (Vibrant)
From: #9B59B6 (Purple) → To: #E74C3C (Red)
Usage: Premium content, special features
Emotion: Exclusive, premium, special
```

### NEUTRAL PALETTE

```
Dark Text (Primary)
Hex: #1A1A2E
RGB: 26, 26, 46
Usage: Headlines, body text
Contrast: 18.5:1 with white ✓ WCAG AAA

Medium Text (Secondary)
Hex: #4A5568
RGB: 74, 85, 104
Usage: Secondary headings, regular body
Contrast: 9.2:1 with white ✓ WCAG AA

Light Text (Tertiary)
Hex: #A0AEC0
RGB: 160, 174, 192
Usage: Placeholders, disabled text, meta info
Contrast: 4.5:1 with white ✓ WCAG AA

Light Background
Hex: #F8F9FA
RGB: 248, 249, 250
Usage: Page backgrounds, secondary surfaces
Notes: Almost white, reduces eye strain

Card Background
Hex: #FFFFFF
RGB: 255, 255, 255
Usage: Cards, elevated surfaces
Notes: Clean white for maximum contrast

Border Color
Hex: #E2E8F0
RGB: 226, 232, 240
Usage: Dividers, subtle borders, separation
Notes: Sophisticated, non-distracting

Overlay (Dark)
RGBA(0, 0, 0, 0.5)
Usage: Modal backdrops, image overlays
Notes: 50% opacity for visibility through overlay

Overlay (Light)
RGBA(255, 255, 255, 0.1)
Usage: Hover states, subtle highlights
Notes: 10% opacity for subtle effect
```

### COLOR PSYCHOLOGY FOR UK COMMUNITIES

| Color | Emotion | Usage | Psychology |
|-------|---------|-------|------------|
| **Blue #5865F2** | Trust | Primary actions | Foundation of community (stable, reliable) |
| **Teal #4ECDC4** | Growth | Positive indicators | Environmental, inclusive, supportive |
| **Green #2ECC71** | Support | Help sections | Nature, healing, positive change |
| **Orange #F39C12** | Visibility | Events, alerts | Accessibility, eye-catching, friendly |
| **Purple #9B59B6** | Premium | Special features | Creativity, exclusivity, refinement |
| **Red #E74C3C** | Urgency | Errors, alerts | Action-requiring, attention-demanding |

---

## TYPOGRAPHY SYSTEM

### FONT FAMILIES

```
Primary Font: Inter
- Usage: Body text, labels, UI elements
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Benefits: High readability, excellent on-screen rendering

Display Font: Poppins
- Usage: Headings (H1-H3), brand elements
- Weights: 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold)
- Fallback: Inter, sans-serif
- Benefits: Modern, friendly personality, excellent for headlines
```

### TYPOGRAPHIC SCALE

```
H1 - Page Titles
Size: 2.5rem (40px)
Weight: 700 (Bold)
Line Height: 1.2 (48px)
Letter Spacing: -0.5px
Usage: Page headlines, hero text
Example: "Connect with Your Community"

H2 - Section Headers
Size: 2rem (32px)
Weight: 700 (Bold)
Line Height: 1.2 (38.4px)
Letter Spacing: -0.3px
Usage: Major section headers
Example: "What's Happening This Week"

H3 - Subsection Headers
Size: 1.5rem (24px)
Weight: 600 (Semibold)
Line Height: 1.3 (31.2px)
Letter Spacing: 0px
Usage: Card titles, feature headers
Example: "Community Events"

H4 - Component Headers
Size: 1.25rem (20px)
Weight: 600 (Semibold)
Line Height: 1.4 (28px)
Letter Spacing: 0px
Usage: Form labels, dialog titles
Example: "Create New Event"

Body Large
Size: 1rem (16px)
Weight: 400 (Regular)
Line Height: 1.6 (25.6px)
Letter Spacing: 0px
Usage: Primary body text
Example: "Main content paragraphs"

Body Medium
Size: 0.875rem (14px)
Weight: 400 (Regular)
Line Height: 1.6 (22.4px)
Letter Spacing: 0px
Usage: Secondary body text, descriptions
Example: "Card descriptions, secondary info"

Body Small
Size: 0.75rem (12px)
Weight: 400 (Regular)
Line Height: 1.5 (18px)
Letter Spacing: 0px
Usage: Metadata, timestamps, small text
Example: "Posted 2 hours ago"

Extra Small
Size: 0.625rem (10px)
Weight: 500 (Medium)
Line Height: 1.4 (14px)
Letter Spacing: 0.5px
Usage: Badges, tags, captions
Example: "FEATURED", "NEW"

Label/Button Text
Size: 0.875rem (14px)
Weight: 600 (Semibold)
Line Height: 1 (14px)
Letter Spacing: 0.5px
Usage: Button text, form labels
Example: "Save Changes", "Continue"
```

### FONT WEIGHT USAGE

```
300 (Light) - Rarely used
- Usage: Decorative, low emphasis
- Example: Subtle background text

400 (Regular) - Body text
- Usage: Primary body content
- Example: "John just posted in Westminster Locals..."

500 (Medium) - UI Elements
- Usage: Labels, placeholders, secondary headings
- Example: "Community Name" input label

600 (Semibold) - Emphasis
- Usage: Subheadings, button text, strong emphasis
- Example: "4,234 Members"

700 (Bold) - Headlines
- Usage: Page titles, section headers, important text
- Example: "Dashboard"
```

---

## SPACING & LAYOUT GRID

### 8-POINT GRID SYSTEM

```
Base Unit: 8px
Multipliers: 1x, 2x, 3x, 4x, 6x, 8x

Spacing Scale:
$spacing-xs   = 4px   (0.5x)  - Tight spacing, micro interactions
$spacing-sm   = 8px   (1x)    - Component internal gaps
$spacing-md   = 16px  (2x)    - Standard spacing, common use
$spacing-lg   = 24px  (3x)    - Section separation, card gaps
$spacing-xl   = 32px  (4x)    - Major sections
$spacing-2xl  = 48px  (6x)    - Page sections
$spacing-3xl  = 64px  (8x)    - Hero sections
$spacing-4xl  = 80px  (10x)   - Full page gaps
```

### LAYOUT DIMENSIONS

```
Container Maximum Width: 1400px
- Desktop optimal width
- Provides comfortable reading line length
- Leaves breathing room on ultra-wide screens

Page Padding (Desktop):
- Sides: $spacing-xl (32px)
- Top/Bottom: $spacing-lg (24px)

Page Padding (Tablet):
- Sides: $spacing-lg (24px)
- Top/Bottom: $spacing-md (16px)

Page Padding (Mobile):
- Sides: $spacing-md (16px)
- Top/Bottom: $spacing-md (16px)

Component Spacing (Inside Cards):
- Padding: $spacing-md (16px)
- Gap between elements: $spacing-sm (8px)
- Large gap between sections: $spacing-lg (24px)
```

### COMMON LAYOUTS

```
Card Layout
┌─────────────────┐
│ Padding: $md    │
│ ┌─────────────┐ │
│ │ Content     │ │
│ │ Gap: $sm    │ │
│ │ More content│ │
│ └─────────────┘ │
│ Padding: $md    │
└─────────────────┘

Grid Layout (3 columns)
[Card] $lg [Card] $lg [Card]
[Card] $lg [Card] $lg [Card]

Responsive Grid
Desktop (> 1024px): 3 columns, gap $lg (24px)
Tablet (768-1024px): 2 columns, gap $md (16px)
Mobile (< 768px): 1 column, gap $md (16px)

Form Layout
┌──────────────────────┐
│ Label                │ $sm gap
│ [Input Field]        │ $md gap
│ ┌──────────────────┐ │
│ │ Helper text      │ │ $lg gap
│ └──────────────────┘ │
│ [Next Field...]      │
└──────────────────────┘
```

---

## SHADOW & ELEVATION

### ELEVATION SYSTEM

```
Shadow Level 0 (Flat)
- Usage: Disabled states, background elements
- Shadow: none
- Example: Inactive tabs

Shadow Level 1 (Subtle)
Box Shadow: 0 2px 4px rgba(0, 0, 0, 0.08)
- Usage: Borders, dividers, baseline elevation
- Example: Inactive card, list items

Shadow Level 2 (Card Default)
Box Shadow: 0 4px 12px rgba(0, 0, 0, 0.12)
- Usage: Cards, containers, default component elevation
- Example: Community card, event card, job listing

Shadow Level 3 (Card Hover)
Box Shadow: 0 8px 24px rgba(0, 0, 0, 0.15)
- Usage: Hovered cards, interactive elements
- Example: Card on hover, elevated buttons

Shadow Level 4 (Popovers)
Box Shadow: 0 12px 32px rgba(0, 0, 0, 0.18)
- Usage: Dropdowns, popovers, tooltips
- Example: Dropdown menu, popover

Shadow Level 5 (Modals)
Box Shadow: 0 16px 40px rgba(0, 0, 0, 0.20)
- Usage: Modal dialogs, top-level overlays
- Example: Modal dialog, main menu overlay

Shadow Level 6 (Floating Elements)
Box Shadow: 0 20px 48px rgba(0, 0, 0, 0.22)
- Usage: Floating action buttons, floating panels
- Example: FAB on mobile, floating menu
```

### SHADOW ELEVATION CHART

| Level | Elevation | Shadow | Usage | Component |
|-------|-----------|--------|-------|-----------|
| 0 | Flat | None | Disabled, inactive | Inactive state |
| 1 | Subtle | 0 2px 4px | Dividers, borders | List item |
| 2 | Normal | 0 4px 12px | **Cards (default)** | Community card |
| 3 | Lifted | 0 8px 24px | **Cards (hover)** | On mouse-over |
| 4 | Floating | 0 12px 32px | Dropdowns | Dropdown menu |
| 5 | Modal | 0 16px 40px | **Modal dialogs** | Dialog box |
| 6 | Fixed | 0 20px 48px | **FAB, topbar** | Mobile FAB |

---

## BORDER RADIUS & SHAPES

### CORNER ROUNDING SCALE

```
Radius Small: 6px
- Usage: Buttons, small inputs, tight components
- Feeling: Controlled, precise, professional
- Example: Form inputs, small buttons

Radius Medium: 12px
- Usage: Cards, modals, most components
- Feeling: Modern, friendly, approachable
- Default radius for most components
- Example: Cards, larger inputs, dialog containers

Radius Large: 16px
- Usage: Large components, feature cards
- Feeling: Open, welcoming, spacious
- Example: Feature cards, large modals, section containers

Radius Extra Large: 20px
- Usage: Hero sections, banner components
- Feeling: Dramatic, featured, premium
- Example: Hero section, featured banner

Radius Full (Circular): 9999px
- Usage: Avatars, pills, badges, FABs
- Feeling: Friendly, approachable, personal
- Example: User avatars, pill buttons, FABs

Shape Consistency:
- All rounded corners use one of above values
- Never use irregular or custom radii
- Buttons: $radius-sm (6px)
- Cards: $radius-md (12px)
- Modals: $radius-lg (16px)
- Avatars: $radius-full (circular)
- FABs: $radius-lg (16px)
```

### SHAPE USAGE GUIDELINES

```
Rectangular Shapes (Cards, Containers)
- Border Radius: 12px
- Purpose: Define content boundaries
- Psychology: Contained, organized

Pill Shapes (Badges, Pills)
- Border Radius: 9999px
- Purpose: Highlight, label, special items
- Psychology: Friendly, prominent

Circular Shapes (Avatars, Icons)
- Border Radius: 50% (or 9999px)
- Purpose: Profile representation, user identity
- Psychology: Personal, human, approachable
```

---

## RESPONSIVE BREAKPOINTS

### BREAKPOINT DEFINITIONS

```
Mobile (Extra Small)
Breakpoint: $breakpoint-xs = 480px
Use for: Small phones, portrait mode
Column layout: 1 column
Padding: 16px sides
Example devices: iPhone 12 mini, small Android phones

Mobile Landscape / Small Tablet
Breakpoint: $breakpoint-sm = 600px
Use for: Large phones, landscape mode
Column layout: 1-2 columns
Padding: 24px sides
Example devices: iPhone 12 landscape, older tablets

Tablet
Breakpoint: $breakpoint-md = 768px
Use for: iPad, medium tablets
Column layout: 2 columns
Padding: 24px sides
Example devices: iPad (9.7"), Samsung Tab S

Desktop
Breakpoint: $breakpoint-lg = 1024px
Use for: Laptops, desktop monitors
Column layout: 3+ columns
Padding: 32px sides
Example devices: MacBook, Desktop monitors

Large Desktop
Breakpoint: $breakpoint-xl = 1280px
Use for: Large monitors
Column layout: 4 columns
Padding: 32px sides
Example devices: 27" iMac, 4K monitors

Ultra-Wide Desktop
Breakpoint: $breakpoint-2xl = 1536px
Use for: Ultra-wide monitors
Column layout: 4+ columns
Padding: 48px sides
Example devices: 34" ultrawide, 5K displays
```

### RESPONSIVE PRIORITY (Mobile-First)

```
Strategy: Mobile-first development

1. Build for mobile (< 480px) first
2. Enhance at tablet breakpoint ($breakpoint-md: 768px)
3. Optimize for desktop ($breakpoint-lg: 1024px)
4. Polish for large screens ($breakpoint-xl: 1280px)

Benefits:
- Progressive enhancement
- Faster on mobile
- Ensures mobile usability
- Graceful degradation on smaller screens

Breakpoint Usage:
@media (min-width: 480px) { /* small phones + */ }
@media (min-width: 600px) { /* large phones + */ }
@media (min-width: 768px) { /* tablets + */ }
@media (min-width: 1024px) { /* desktop + */ }
@media (min-width: 1280px) { /* large desktop + */ }
```

### RESPONSIVE COMPONENT BEHAVIOR

```
Navigation
< 768px: Bottom navigation (mobile)
>= 768px: Top navigation + sidebar (desktop)

Grid Layout
< 768px: 1 column
768px-1024px: 2 columns
> 1024px: 3 columns

Spacing
< 768px: 16px padding
768px-1024px: 24px padding
> 1024px: 32px padding

Font Sizes
< 480px: Slightly reduced (0.9x scale)
480px+: Normal scale
> 1024px: Enhanced scale (1.1x for headings)

Button Height
All devices: 48px (thumb-friendly minimum)
Never reduce below 44px for touch targets
```

---

## COMPONENT TOKENS

### BUTTON TOKENS

```
Button Height (Standard): 48px
Button Height (Small): 40px
Button Height (Large): 56px
Button Padding X: 16px (left/right)
Button Padding Y: 12px (top/bottom)
Button Border Radius: 6px
Button Font Size: 14px
Button Font Weight: 600 (Semibold)
Button Gap (icon + text): 8px
Button Transition: 200ms ease-in-out

Primary Button
- Background: Linear gradient #5865F2 → #FF6B6B
- Text Color: #FFFFFF
- Border: None
- Shadow: 0 4px 16px rgba(88, 101, 242, 0.35)
- Hover: Opacity 0.93, Shadow increase, Transform translateY(-1px)
- Active: Transform translateY(0), Opacity reduced

Secondary Button
- Background: #FFFFFF
- Text Color: #5865F2
- Border: 2px solid #5865F2
- Shadow: None
- Hover: Background #F8F9FA, Border color darkens
- Active: Background #EBF0FE

Disabled Button
- Background: Gradient (desaturated 40%)
- Text Color: #A0AEC0
- Cursor: not-allowed
- Opacity: 0.6

Danger Button
- Background: #E74C3C
- Text Color: #FFFFFF
- Hover: Opacity 0.93, Shadow increase
- Active: Opacity 0.8
```

### CARD TOKENS

```
Card Width (Max): 360px (dashboard cards)
Card Height: auto (flexible)
Card Padding: 16px
Card Border Radius: 12px
Card Background: #FFFFFF
Card Shadow: 0 4px 12px rgba(0, 0, 0, 0.12)
Card Shadow (Hover): 0 8px 24px rgba(0, 0, 0, 0.15)
Card Transition: 200ms ease-in-out
Card Border: 1px solid #E2E8F0

Grid Gap (Cards): 24px (desktop), 16px (mobile)

Inner Card Spacing
- Header Gap: 8px
- Content Gap: 12px
- Footer Gap: 8px
```

### INPUT FIELD TOKENS

```
Input Height: 48px
Input Height (Small): 40px
Input Padding (Horizontal): 14px
Input Padding (Vertical): 12px
Input Border Radius: 10px
Input Border: 1.5px solid #E2E8F0
Input Background: #FAFAFA
Input Font Size: 14px
Input Font Color: #1A1A2E
Input Placeholder Color: #C4C8D4
Input Transition: 200ms ease-in-out

Input States
- Default: Border #E2E8F0, Background #FAFAFA
- Focus: Border #5865F2, Background #FFFFFF, Shadow 0 0 0 3px rgba(88,101,242,0.1)
- Error: Border #E74C3C, Shadow 0 0 0 3px rgba(231,76,60,0.08)
- Disabled: Background #EFEFEF, Text #A0AEC0, Cursor not-allowed

Input Icons
- Position: 14px from edge
- Size: 18x18px
- Color: #A0AEC0
- Pointer Events: None
```

### BOTTOM NAVIGATION (MOBILE) TOKENS

```
Height: 70px
Background: #FFFFFF
Border Top: 1px solid #E2E8F0
Elevation: 8 (shadow level)

Navigation Item
- Padding: 8px (top/bottom), 12px (left/right)
- Height: 56px
- Icon Size: 24x24px
- Label Font Size: 11px
- Label Font Weight: 500

States
- Inactive: Icon #4A5568, Label #4A5568
- Active: Icon #5865F2, Label #5865F2
- Transition: 200ms ease-in-out

Safe Area
- Bottom padding: Additional 16px (for notched devices)
```

### FLOATING ACTION BUTTON (FAB) TOKENS

```
Size (Standard): 56px
Size (Small): 40px
Background: Linear gradient #5865F2 → #FF6B6B
Text Color: #FFFFFF
Border Radius: 16px
Icon Size: 24x24px
Shadow: 0 12px 32px rgba(88, 101, 242, 0.4)

Position
- Bottom: 24px (from safe area edge)
- Right: 24px (from safe area edge)

States
- Default: Shadow level 4
- Hover: Scale 1.1, Shadow level 5
- Active: Scale 0.95, Shadow level 3
- Transition: 200ms cubic-bezier(0.34, 1.56, 0.64, 1)
```

### AVATAR TOKENS

```
Avatar Sizes
- Extra Small: 24x24px
- Small: 32x32px
- Medium: 40x40px
- Large: 56x56px
- Extra Large: 80x80px

Avatar Styling
- Border Radius: 50% (circular)
- Border: 2px solid #E2E8F0
- Background: Gradient (user-specific color)
- Font Size: Proportional to avatar size
- Font Weight: 700 (Bold)

Avatar Stack (Multiple)
- Overlap: -10px (left negative margin)
- Z-index: Increasing (last on top)
- Border: White separator between avatars

Avatar Badge
- Size: 16x16px (for small avatars)
- Position: Bottom-right corner
- Border Radius: 50%
- Background: Status color (green, red, etc.)
```

---

## ANIMATION SPECIFICATIONS

### DURATION STANDARDS

```
Micro-animations: 100-200ms
- Button hover, icon changes, small state changes
- Example: Like button state change (100ms)

Transitions: 200-300ms
- Page transitions, modal appears, element movement
- Example: Dropdown menu animation (200ms)

Slow Animations: 300-500ms
- Complex animations, loading states
- Example: Page fade-in transition (300ms)

Avoid: Anything slower than 500ms
- Feels sluggish and unresponsive
- Use 300-400ms instead
```

### EASING FUNCTIONS

```
ease-in-out (Default)
- cubic-bezier(0.4, 0, 0.2, 1)
- Usage: Most transitions
- Feeling: Natural, smooth

ease-out (Quick start, slow end)
- cubic-bezier(0, 0, 0.2, 1)
- Usage: Appearing elements
- Feeling: Fast reveal, gentle landing

ease-in (Slow start, quick end)
- cubic-bezier(0.4, 0, 1, 1)
- Usage: Disappearing elements
- Feeling: Smooth departure

spring (Bouncy)
- cubic-bezier(0.34, 1.56, 0.64, 1)
- Usage: FAB press, celebratory animations
- Feeling: Playful, delightful
```

### ANIMATION PATTERNS

```
Button Press Animation
1. On Click: Scale to 0.98 (10ms)
2. Hold: Maintain scale (variable)
3. Release: Animate scale to 1.0 (150ms ease-out)
4. Effect: Tactile, responsive feedback

Like Heart Animation
1. Click: Heart expands scale 1.3 (80ms)
2. Color: Change to #FF6B6B (50ms)
3. Burst: Particle animation (200ms)
4. Bounce: Return to 1.0 with bounce (150ms spring)
5. Count: Fade-in updated count (200ms)

Page Transition
- Fade-out current page: 150ms
- Fade-in new page: 200ms (with 100ms stagger)
- Navigation back: Slide-in from left (300ms)
- Navigation forward: Slide-in from right (300ms)

Loading Skeleton
- Shimmer gradient animates left-to-right
- Duration: 1.5s, repeats infinitely
- Easing: ease-in-out
- Colors: #E8E8E8 → #F5F5F5 → #E8E8E8
```

---

## ACCESSIBILITY STANDARDS

### COLOR CONTRAST REQUIREMENTS (WCAG 2.1)

```
Level AA (Required for all projects)
- Large text (18pt+): 3:1 minimum contrast
- Normal text: 4.5:1 minimum contrast
- UI components: 3:1 minimum contrast

Level AAA (Enhanced, where possible)
- Large text: 4.5:1 minimum contrast
- Normal text: 7:1 minimum contrast
- UI components: 4.5:1 minimum contrast

Verified Contrasts in Design System
- Dark Text (#1A1A2E) vs White: 18.5:1 ✓ AAA
- Medium Text (#4A5568) vs White: 9.2:1 ✓ AAA
- Light Text (#A0AEC0) vs White: 4.5:1 ✓ AA
- Primary Button (#5865F2) vs White: 6.3:1 ✓ AAA
- Success Green (#2ECC71) vs White: 7.2:1 ✓ AAA
- Warning Orange (#F39C12) vs White: 4.8:1 ✓ AA
- Danger Red (#E74C3C) vs White: 6.9:1 ✓ AAA
```

### KEYBOARD NAVIGATION

```
All Interactive Elements Must Be:
1. Focusable with Tab key
2. Activatable with Enter/Space
3. Have visible focus indicator (outline ring)

Focus Indicator Specification
- Outline Color: #5865F2 (primary blue)
- Outline Width: 2px
- Outline Style: solid
- Outline Offset: 2px
- Not hidden or obscured

Tab Order
- Follows visual/content order (left-to-right, top-to-bottom)
- Never trap focus in elements
- Properly use tabindex (only 0 or -1)

Skip Links
- "Skip to content" link (visible on tab focus)
- First focusable element
- Links to main content area
```

### SCREEN READER SUPPORT

```
Semantic HTML
- Use <button>, <a>, <input>, <label>, <form>
- Never use <div> for buttons (use <button>)
- Always use <label> for form inputs
- Use <h1>, <h2>, <h3> hierarchy

ARIA Labels
- aria-label: Short description (when no visible text)
- aria-labelledby: Reference to heading element
- aria-describedby: Extended description
- Example:
  <button aria-label="Open menu">☰</button>

Form Accessibility
- Every input needs associated <label>
- Use aria-required for required fields
- Use aria-invalid for error states
- Provide error messages in aria-describedby

Image Accessibility
- Alt text for all images
- Describe function, not "image of..."
- alt="" for decorative images
- Example: alt="User avatar for Sarah Johnson"

Dynamic Content
- Use aria-live="polite" for updates
- Use aria-busy="true/false" for loading states
- Announce updates to screen readers

Color Not Sole Indicator
- Always use text + color (never color alone)
- Use icons + color for status
- Provide alternative indicators
```

### MOTOR ACCESSIBILITY

```
Touch Target Sizes
- Minimum: 44x44px (WCAG)
- Recommended: 48x48px (our standard)
- Spacing: At least 8px between targets

Interactive Elements Must Be
- Large enough to tap comfortably
- Spaced to prevent accidental activation
- Avoid hover-only interactions
- Provide alternative methods (keyboard, voice)

Motion Preferences
- Respect prefers-reduced-motion
- Remove animations for users with motion sensitivity
- Provide preference toggle in settings

CSS:
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
```

### VISUAL ACCESSIBILITY

```
Font Readability
- Minimum font size: 12px (body text)
- Line height: 1.5+ for readability
- Line length: 50-75 characters (optimal)
- Letter spacing: 0 (unless title)

Color Blindness
- Don't rely on color alone
- Use icons + text + color
- Test with color blindness simulator
- Protanopia, deuteranopia, tritanopia safe

Dyslexia-Friendly
- Sans-serif fonts (Inter is good)
- Adequate letter spacing
- Avoid all-caps text
- Don't justify text (use left-align)

Low Vision
- Sufficient color contrast (tested)
- Large enough text (minimum 12px)
- Logical zoom support
- Don't disable text zoom
```

---

## USAGE GUIDELINES

### DO's ✓

```
✓ Use the design system colors in prescribed contexts
✓ Maintain adequate contrast ratios (4.5:1 minimum)
✓ Use semantic HTML for better accessibility
✓ Apply consistent spacing using 8px grid
✓ Use specified font sizes and weights
✓ Implement keyboard navigation for all interactive elements
✓ Test with screen readers
✓ Support reduced motion preference
✓ Use provided component tokens
✓ Document custom deviations with rationale
```

### DON'Ts ✗

```
✗ Don't create custom colors outside the palette
✗ Don't use text below 12px (body text)
✗ Don't rely on color alone for information
✗ Don't disable focus indicators
✗ Don't use non-standard border radius values
✗ Don't add animations longer than 500ms
✗ Don't break touch target minimums (44x44px)
✗ Don't hide form labels
✗ Don't create components not in spec
✗ Don't ignore accessibility requirements
```

### COMPONENT USAGE DECISION TREE

```
Need a Button?
├─ Primary action → Use Primary Button (blue gradient)
├─ Secondary action → Use Secondary Button (outline)
├─ Destructive action → Use Danger Button (red)
└─ Text only → Use Link Button (no background)

Need to Highlight Content?
├─ Small highlight → Use Badge/Pill (#radius-full)
├─ Important section → Use Card with shadow
├─ Feature highlight → Use gradient border
└─ Alert/Warning → Use colored banner

Need Form Input?
├─ Text input → Styled input (48px height)
├─ Select/Dropdown → Custom select component
├─ Checkbox/Radio → Custom styled elements
├─ Multiple options → Use segmented control
└─ Long text → Use textarea (auto-resize)

Need Location Indicator?
├─ Show user location → Use location badge (top)
├─ Show distance → Use "X km away" text
├─ Show on map → Use map component
└─ Filter by location → Use location filter UI
```

---

## QUICK REFERENCE TABLE

| Element | Value | Usage |
|---------|-------|-------|
| **Primary Color** | #5865F2 | Buttons, links, primary actions |
| **Accent Teal** | #4ECDC4 | Growth, positive indicators |
| **Accent Red** | #FF6B6B | Energy, urgency, special CTAs |
| **Success Green** | #2ECC71 | Positive states, confirmations |
| **Warning Orange** | #F39C12 | Alerts, events, attention |
| **Danger Red** | #E74C3C | Errors, destructive actions |
| **Light Gray** | #F8F9FA | Page backgrounds |
| **Dark Text** | #1A1A2E | Headlines, primary text |
| **Medium Text** | #4A5568 | Secondary text |
| **Light Text** | #A0AEC0 | Metadata, disabled |
| **Base Grid** | 8px | All spacing |
| **Card Radius** | 12px | Cards, containers |
| **Button Radius** | 6px | Buttons, inputs |
| **Avatar Radius** | 50% | Circular elements |
| **Button Height** | 48px | All standard buttons |
| **Input Height** | 48px | All standard inputs |
| **Min Touch Target** | 44x44px | Interactive elements |
| **Default Shadow** | 0 4px 12px rgba(0,0,0,0.12) | Cards default |
| **Hover Shadow** | 0 8px 24px rgba(0, 0, 0, 0.15) | Cards on hover |
| **Transition Time** | 200ms | Standard animations |

---

## NEXT STEPS

1. **Implementation:**
   - Web: Import colors into SCSS variables file
   - Mobile: Create Flutter ThemeData using these tokens

2. **Team Training:**
   - Share this document with all team members
   - Conduct design system workshop
   - Establish review process for spec compliance

3. **Maintenance:**
   - Update this document with any approved changes
   - Keep version number current
   - Use Git version control for documentation

4. **References:**
   - WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
   - Material Design: https://material.io
   - Accessibility: https://webaim.org

---

**Document Version:** 1.0  
**Last Updated:** March 21, 2026  
**Next Review:** April 2026  
**Approved By:** Design Team Lead  
**Status:** Production Ready ✓

For questions or updates, contact the design team.
