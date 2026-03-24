# ANGULAR IMPLEMENTATION PLAN
## Community Platform Web Application (Angular 19)

**Version:** 1.0  
**Last Updated:** March 2026  
**Status:** Production Ready  
**Audience:** Angular/Web Development Team  

---

## TABLE OF CONTENTS

1. [Overview & Architecture](#overview--architecture)
2. [Technology Stack](#technology-stack)
3. [Project Structure & Organization](#project-structure--organization)
4. [SCSS Design System Implementation](#scss-design-system-implementation)
5. [Page-by-Page Implementation Specifications](#page-by-page-implementation-specifications)
6. [Core Features & Modules](#core-features--modules)
7. [API Integration Points](#api-integration-points)
8. [State Management (Signals)](#state-management-signals)
9. [Postcode/Location Integration](#postcode-location-integration)
10. [Testing Strategy](#testing-strategy)
11. [Performance Optimization](#performance-optimization)
12. [Deployment Checklist](#deployment-checklist)

---

## OVERVIEW & ARCHITECTURE

### Project Goals
- Redesign community platform with modern, vibrant UI aligned to new design system
- Implement location-based (postcode) functionality as core feature
- Create production-ready web application using Angular 19 with Signals
- Ensure WCAG AA accessibility compliance across all pages
- Support seamless API integration for backend connectivity

### Architecture Pattern
**Standalone Components + Signals Architecture**

```
┌─────────────────────────────────────────────────────┐
│                   APP SHELL                         │
│  (Bootstrap, Global Layout, Route Configuration)    │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
    ┌───▼────┐          ┌────▼────┐
    │ PUBLIC │          │ PRIVATE  │
    │ Routes │          │ Routes   │
    └────┬───┘          └────┬─────┘
         │                   │
    ┌────▼──────────────────▼────┐
    │   FEATURE MODULES          │
    │ (Auth, Dashboard,          │
    │  Communities, Events, Jobs,│
    │  Businesses, Admin)        │
    └────┬──────────────────┬────┘
         │                  │
    ┌────▼────┐      ┌─────▼─────┐
    │ SERVICES │      │ COMPONENTS│
    │ (API,    │      │ (UI,      │
    │ Location,│      │ Layout)   │
    │ Auth)    │      │           │
    └──────────┘      └───────────┘
         │                  │
    ┌────▼──────────────────▼────┐
    │   SHARED ASSETS            │
    │ (Styles, Variables,        │
    │  Tokens, Breakpoints)      │
    └────────────────────────────┘
```

### Key Architectural Decisions

| Decision | Rationale | Impact |
|----------|-----------|--------|
| **Standalone Components** | Modern Angular 19 approach, no NgModules, tree-shakeable | Smaller bundle, faster build times |
| **Signals over RxJS** | Better reactivity, built-in memoization, cleaner syntax | Improved performance, simpler state |
| **SCSS Design Tokens** | CSS-in-JS not required, variables enable consistency | Fast iteration, version control friendly |
| **Service-based Architecture** | Separation of concerns, testable, reusable | Maintainability, scalability |
| **Lazy Loading Routes** | Progressive loading of feature modules | Better initial load time, improved UX |

---

## TECHNOLOGY STACK

### Core Framework
- **Angular:** 19.x (latest LTS)
- **TypeScript:** 5.x
- **Node.js:** 18+
- **npm:** 9+

### UI & Styling
- **SCSS:** Design variables, mixins, breakpoint utilities
- **Material Design:** Token-based (custom, not Material library)
- **PostCSS:** Auto-prefixing, optimization

### State Management
- **Angular Signals:** For reactive state (Angular 19 feature)
- **Local Services:** For feature-level state

### HTTP & API
- **HttpClient:** API communication
- **Interceptors:** Authentication, error handling, request/response transformation

### Accessibility
- **ARIA Attributes:** Semantic HTML + ARIA roles
- **WCAG AA Compliance:** Color contrast, keyboard navigation, screen reader support

### Testing
- **Jasmine:** Unit tests
- **Karma:** Test runner
- **Cypress:** E2E tests

### Build & Deployment
- **Angular CLI:** Build, serve, optimize
- **webpack:** Module bundler
- **Compression:** gzip compression enabled

---

## PROJECT STRUCTURE & ORGANIZATION

### Directory Layout

```
src/
├── app/
│   ├── app.component.ts          (Root component)
│   ├── app.routes.ts             (Route configuration)
│   ├── app.config.ts             (App configuration)
│   │
│   ├── core/                     (Singleton services)
│   │   ├── services/
│   │   │   ├── api.service.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── location.service.ts
│   │   │   └── error.service.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── admin.guard.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   └── error.interceptor.ts
│   │   └── constants/
│   │       └── api.constants.ts
│   │
│   ├── shared/                   (Reusable components & utilities)
│   │   ├── components/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── input/
│   │   │   ├── modal/
│   │   │   ├── location-badge/
│   │   │   ├── location-selector/
│   │   │   ├── avatar/
│   │   │   ├── loading-spinner/
│   │   │   └── pagination/
│   │   ├── pipes/
│   │   │   ├── distance.pipe.ts
│   │   │   ├── date-format.pipe.ts
│   │   │   └── truncate.pipe.ts
│   │   ├── directives/
│   │   │   ├── click-outside.directive.ts
│   │   │   └── tooltip.directive.ts
│   │   └── utils/
│   │       ├── validation.utils.ts
│   │       └── formatting.utils.ts
│   │
│   ├── layout/                   (Global layout components)
│   │   ├── main-layout/
│   │   │   ├── main-layout.component.ts
│   │   │   ├── main-layout.component.html
│   │   │   └── main-layout.component.scss
│   │   ├── navbar/
│   │   │   ├── navbar.component.ts
│   │   │   ├── navbar.component.html
│   │   │   └── navbar.component.scss
│   │   ├── sidebar/
│   │   │   ├── sidebar.component.ts
│   │   │   ├── sidebar.component.html
│   │   │   └── sidebar.component.scss
│   │   └── footer/
│   │       ├── footer.component.ts
│   │       ├── footer.component.html
│   │       └── footer.component.scss
│   │
│   ├── features/                 (Feature-specific modules)
│   │   ├── landing/              (Public landing page)
│   │   │   ├── landing.component.ts
│   │   │   ├── landing.component.html
│   │   │   ├── landing.component.scss
│   │   │   └── landing.routes.ts
│   │   │
│   │   ├── auth/                 (Authentication flows)
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts
│   │   │   │   ├── login.component.html
│   │   │   │   └── login.component.scss
│   │   │   ├── signup/
│   │   │   │   ├── signup.component.ts
│   │   │   │   ├── signup.component.html
│   │   │   │   └── signup.component.scss
│   │   │   ├── forgot-password/
│   │   │   │   ├── forgot-password.component.ts
│   │   │   │   ├── forgot-password.component.html
│   │   │   │   └── forgot-password.component.scss
│   │   │   ├── verify-email/
│   │   │   │   ├── verify-email.component.ts
│   │   │   │   ├── verify-email.component.html
│   │   │   │   └── verify-email.component.scss
│   │   │   └── auth.routes.ts
│   │   │
│   │   ├── dashboard/            (User dashboard)
│   │   │   ├── dashboard.component.ts
│   │   │   ├── dashboard.component.html
│   │   │   ├── dashboard.component.scss
│   │   │   ├── dashboard.service.ts
│   │   │   └── dashboard.routes.ts
│   │   │
│   │   ├── communities/          (Communities discovery & management)
│   │   │   ├── communities-list/
│   │   │   ├── community-detail/
│   │   │   ├── create-community/
│   │   │   ├── communities.service.ts
│   │   │   └── communities.routes.ts
│   │   │
│   │   ├── events/               (Events module - NEW)
│   │   │   ├── events-list/
│   │   │   ├── event-detail/
│   │   │   ├── create-event/
│   │   │   ├── events.service.ts
│   │   │   └── events.routes.ts
│   │   │
│   │   ├── jobs/                 (Jobs module - NEW)
│   │   │   ├── jobs-list/
│   │   │   ├── job-detail/
│   │   │   ├── post-job/
│   │   │   ├── jobs.service.ts
│   │   │   └── jobs.routes.ts
│   │   │
│   │   ├── businesses/           (Businesses module - NEW)
│   │   │   ├── businesses-list/
│   │   │   ├── business-detail/
│   │   │   ├── create-business/
│   │   │   ├── businesses.service.ts
│   │   │   └── businesses.routes.ts
│   │   │
│   │   ├── profile/              (User profile)
│   │   │   ├── profile.component.ts
│   │   │   ├── profile.component.html
│   │   │   ├── profile.component.scss
│   │   │   ├── profile.service.ts
│   │   │   └── profile.routes.ts
│   │   │
│   │   └── admin/                (Admin dashboard)
│   │       ├── admin-dashboard/
│   │       ├── user-management/
│   │       ├── community-management/
│   │       ├── content-moderation/
│   │       ├── jobs-management/
│   │       ├── admin.service.ts
│   │       └── admin.routes.ts
│   │
│   └── app.routes.ts             (Root route configuration)
│
├── assets/
│   ├── styles/
│   │   ├── _variables.scss       (Design tokens)
│   │   ├── _breakpoints.scss     (Responsive mixins)
│   │   ├── _typography.scss      (Font scales)
│   │   ├── _spacing.scss         (Spacing utilities)
│   │   ├── _colors.scss          (Color palette)
│   │   ├── _components.scss      (Component tokens)
│   │   ├── _animations.scss      (Animation utilities)
│   │   ├── _utilities.scss       (Helper classes)
│   │   ├── _accessibility.scss   (A11y utilities)
│   │   ├── _common.scss          (Global styles)
│   │   └── styles.scss           (Main entry point)
│   ├── images/
│   │   ├── icons/
│   │   ├── illustrations/
│   │   └── logos/
│   └── data/
│       ├── postcodes.json        (UK postcode data)
│       └── mock-data.json        (Development mock data)
│
├── environments/
│   ├── environment.ts            (Development)
│   ├── environment.prod.ts       (Production)
│   └── environment.staging.ts    (Staging)
│
├── main.ts                       (Bootstrap entry point)
├── index.html                    (HTML entry)
└── styles.scss                   (Global styles import)
```

### Module Organization Strategy

**Feature modules use lazy loading:**

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES) },
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
  { path: 'communities', loadChildren: () => import('./features/communities/communities.routes').then(m => m.COMMUNITIES_ROUTES) },
  { path: 'events', loadChildren: () => import('./features/events/events.routes').then(m => m.EVENTS_ROUTES) },
  { path: 'jobs', loadChildren: () => import('./features/jobs/jobs.routes').then(m => m.JOBS_ROUTES) },
  { path: 'businesses', loadChildren: () => import('./features/businesses/businesses.routes').then(m => m.BUSINESSES_ROUTES) },
  { path: 'admin', canActivate: [AdminGuard], loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES) },
];
```

---

## SCSS DESIGN SYSTEM IMPLEMENTATION

### File Structure

Each SCSS file serves a specific purpose:

#### 1. `_variables.scss` - Design Tokens
Contains all color, spacing, typography, and shadow definitions.

```scss
// Colors (11-color palette)
$color-primary: #5865F2;
$color-primary-light: #7b82f6;
$color-primary-dark: #4752c4;

$color-teal: #4ECDC4;
$color-red: #FF6B6B;
$color-green: #2ECC71;
$color-orange: #F39C12;
$color-purple: #9B59B6;

$color-neutral-0: #FFFFFF;
$color-neutral-50: #F8F9FA;
$color-neutral-100: #E8EAED;
$color-neutral-200: #D0D5DD;
$color-neutral-500: #71717A;
$color-neutral-900: #18181B;

// Spacing (8-point grid)
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
$spacing-2xl: 48px;
$spacing-3xl: 64px;

// Typography
$font-family-display: 'Poppins', sans-serif;
$font-family-body: 'Inter', sans-serif;

$font-size-xs: 10px;
$font-size-sm: 12px;
$font-size-base: 14px;
$font-size-md: 16px;
$font-size-lg: 18px;
$font-size-xl: 24px;
$font-size-2xl: 32px;
$font-size-3xl: 40px;

$font-weight-light: 300;
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// Shadows (Elevation system)
$shadow-none: none;
$shadow-1: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-2: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
$shadow-3: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
$shadow-4: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
$shadow-5: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
$shadow-6: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

// Border radius
$border-radius-sm: 6px;
$border-radius-md: 12px;
$border-radius-lg: 16px;
$border-radius-xl: 20px;
$border-radius-full: 50%;

// Transitions
$transition-duration-fast: 150ms;
$transition-duration-base: 200ms;
$transition-duration-slow: 300ms;
$transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
```

#### 2. `_breakpoints.scss` - Responsive Mixins
Define breakpoints and reusable media query mixins.

```scss
// Breakpoints (Mobile-first)
$breakpoint-xs: 480px;    // Phones
$breakpoint-sm: 600px;    // Tablets (portrait)
$breakpoint-md: 768px;    // Tablets (landscape)
$breakpoint-lg: 1024px;   // Desktops
$breakpoint-xl: 1280px;   // Large desktops
$breakpoint-2xl: 1536px;  // Extra large

// Media query mixins
@mixin media-xs {
  @media (min-width: $breakpoint-xs) { @content; }
}

@mixin media-sm {
  @media (min-width: $breakpoint-sm) { @content; }
}

@mixin media-md {
  @media (min-width: $breakpoint-md) { @content; }
}

@mixin media-lg {
  @media (min-width: $breakpoint-lg) { @content; }
}

@mixin media-xl {
  @media (min-width: $breakpoint-xl) { @content; }
}

@mixin media-2xl {
  @media (min-width: $breakpoint-2xl) { @content; }
}

// For down queries (max-width)
@mixin media-down-sm {
  @media (max-width: $breakpoint-sm - 1px) { @content; }
}

@mixin media-down-md {
  @media (max-width: $breakpoint-md - 1px) { @content; }
}

@mixin media-down-lg {
  @media (max-width: $breakpoint-lg - 1px) { @content; }
}

// Range queries (between two breakpoints)
@mixin media-between($from, $to) {
  @media (min-width: $from) and (max-width: $to - 1px) { @content; }
}
```

#### 3. `_typography.scss` - Font Scales
Define typography scales and text utility classes.

```scss
// Display font styles
@mixin text-display-1 {
  font-family: $font-family-display;
  font-size: $font-size-3xl;     // 40px
  font-weight: $font-weight-bold; // 700
  line-height: 1.2;
  letter-spacing: -0.5px;
}

@mixin text-display-2 {
  font-family: $font-family-display;
  font-size: $font-size-2xl;     // 32px
  font-weight: $font-weight-semibold; // 600
  line-height: 1.25;
  letter-spacing: -0.3px;
}

// Heading styles
@mixin text-h1 {
  font-family: $font-family-display;
  font-size: $font-size-2xl;     // 32px
  font-weight: $font-weight-bold; // 700
  line-height: 1.25;
}

@mixin text-h2 {
  font-family: $font-family-display;
  font-size: $font-size-xl;      // 24px
  font-weight: $font-weight-bold; // 700
  line-height: 1.3;
}

@mixin text-h3 {
  font-family: $font-family-display;
  font-size: $font-size-lg;      // 18px
  font-weight: $font-weight-semibold; // 600
  line-height: 1.4;
}

@mixin text-h4 {
  font-family: $font-family-body;
  font-size: $font-size-md;      // 16px
  font-weight: $font-weight-semibold; // 600
  line-height: 1.5;
}

// Body text styles
@mixin text-body-lg {
  font-family: $font-family-body;
  font-size: $font-size-md;      // 16px
  font-weight: $font-weight-regular; // 400
  line-height: 1.5;
}

@mixin text-body-md {
  font-family: $font-family-body;
  font-size: $font-size-base;    // 14px
  font-weight: $font-weight-regular; // 400
  line-height: 1.5;
}

@mixin text-body-sm {
  font-family: $font-family-body;
  font-size: $font-size-sm;      // 12px
  font-weight: $font-weight-regular; // 400
  line-height: 1.4;
}

// Caption styles
@mixin text-caption {
  font-family: $font-family-body;
  font-size: $font-size-xs;      // 10px
  font-weight: $font-weight-regular; // 400
  line-height: 1.4;
  letter-spacing: 0.2px;
}
```

#### 4. `_spacing.scss` - Spacing Utilities
Generate margin and padding utility classes.

```scss
// Generates utility classes like .m-sm, .p-md, .mb-lg, etc.
$spacing-values: (
  'xs': $spacing-xs,
  'sm': $spacing-sm,
  'md': $spacing-md,
  'lg': $spacing-lg,
  'xl': $spacing-xl,
  '2xl': $spacing-2xl,
  '3xl': $spacing-3xl,
);

// Margin utilities
@each $name, $value in $spacing-values {
  .m-#{$name} { margin: $value; }
  .mt-#{$name} { margin-top: $value; }
  .mr-#{$name} { margin-right: $value; }
  .mb-#{$name} { margin-bottom: $value; }
  .ml-#{$name} { margin-left: $value; }
  .mx-#{$name} { margin-left: $value; margin-right: $value; }
  .my-#{$name} { margin-top: $value; margin-bottom: $value; }
}

// Padding utilities
@each $name, $value in $spacing-values {
  .p-#{$name} { padding: $value; }
  .pt-#{$name} { padding-top: $value; }
  .pr-#{$name} { padding-right: $value; }
  .pb-#{$name} { padding-bottom: $value; }
  .pl-#{$name} { padding-left: $value; }
  .px-#{$name} { padding-left: $value; padding-right: $value; }
  .py-#{$name} { padding-top: $value; padding-bottom: $value; }
}

// Gap utilities (for flexbox/grid)
@each $name, $value in $spacing-values {
  .gap-#{$name} { gap: $value; }
}
```

#### 5. `_colors.scss` - Color Palette
Export color variables and utility classes.

```scss
// Color utility classes for background and text
.bg-primary { background-color: $color-primary; }
.bg-primary-light { background-color: $color-primary-light; }
.bg-teal { background-color: $color-teal; }
.bg-red { background-color: $color-red; }
.bg-green { background-color: $color-green; }
.bg-orange { background-color: $color-orange; }
.bg-purple { background-color: $color-purple; }
.bg-neutral-50 { background-color: $color-neutral-50; }
.bg-neutral-100 { background-color: $color-neutral-100; }
.bg-neutral-900 { background-color: $color-neutral-900; }

.text-primary { color: $color-primary; }
.text-teal { color: $color-teal; }
.text-red { color: $color-red; }
.text-green { color: $color-green; }
.text-neutral-500 { color: $color-neutral-500; }
.text-neutral-900 { color: $color-neutral-900; }
```

#### 6. `_components.scss` - Component Token Styles
Component-level mixins for consistent styling.

```scss
// Button styles
@mixin btn-primary {
  background: linear-gradient(135deg, $color-primary 0%, $color-primary-dark 100%);
  color: white;
  border: none;
  border-radius: $border-radius-sm;
  padding: $spacing-md $spacing-lg;
  height: 48px;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  transition: all $transition-duration-base $transition-easing;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-3;
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: $shadow-2;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
}

@mixin btn-secondary {
  background: $color-neutral-100;
  color: $color-neutral-900;
  border: 1px solid $color-neutral-200;
  border-radius: $border-radius-sm;
  padding: $spacing-md $spacing-lg;
  height: 48px;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  transition: all $transition-duration-base $transition-easing;
  
  &:hover {
    background: $color-neutral-50;
    border-color: $color-neutral-500;
  }
}

// Card styles
@mixin card-base {
  background: $color-neutral-0;
  border-radius: $border-radius-md;
  box-shadow: $shadow-2;
  padding: $spacing-lg;
  transition: all $transition-duration-base $transition-easing;
  
  &:hover {
    box-shadow: $shadow-3;
  }
}

// Input styles
@mixin input-base {
  border: 1px solid $color-neutral-200;
  border-radius: $border-radius-sm;
  padding: $spacing-md;
  font-family: $font-family-body;
  font-size: $font-size-base;
  transition: all $transition-duration-base $transition-easing;
  
  &:focus {
    outline: none;
    border-color: $color-primary;
    box-shadow: 0 0 0 3px rgba($color-primary, 0.1);
  }
}
```

### Usage in Components

**Example: Button Component**
```typescript
// button.component.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button 
      [class]="'btn btn-' + variant()"
      [disabled]="disabled()"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary'>('primary');
  disabled = input(false);
}

// button.component.scss
@import '../../../assets/styles/variables';
@import '../../../assets/styles/components';

.btn {
  @include text-body-md;
  font-weight: $font-weight-semibold;
  border: none;
  cursor: pointer;
}

.btn-primary {
  @include btn-primary;
}

.btn-secondary {
  @include btn-secondary;
}
```

---

## PAGE-BY-PAGE IMPLEMENTATION SPECIFICATIONS

### 1. LANDING PAGE

**Purpose:** Public-facing marketing/onboarding page  
**Route:** `/`  
**Access:** Public (unauthenticated)  
**Redesign Status:** To be updated with new color palette

#### Layout Structure

```
┌────────────────────────────────────────────┐
│              NAVBAR                        │
│  Logo | Navigation Links | CTA Buttons    │
├────────────────────────────────────────────┤
│                                            │
│         HERO SECTION (Full Width)         │
│  Title + Subtitle + CTA Button            │
│  Background: Gradient (Primary → Teal)    │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│      FEATURES GRID (3 columns)            │
│  Feature Card 1 | Feature Card 2 | Card 3 │
│  (Postcode, Community, Safety)            │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│    HOW IT WORKS SECTION                   │
│  Step 1 | Step 2 | Step 3 | Step 4       │
│  (4 vertical cards with icons)            │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│    COMMUNITIES PREVIEW (Carousel)         │
│  Sample communities showcasing            │
│                                            │
├────────────────────────────────────────────┤
│    CTA SECTION                            │
│  "Ready to Join?" + Signup/Login CTAs    │
│                                            │
├────────────────────────────────────────────┤
│              FOOTER                        │
└────────────────────────────────────────────┘
```

#### Component Breakdown

| Component | Props | Styling | Responsive |
|-----------|-------|---------|------------|
| Navbar | logoUrl, links[] | sticky, shadow-2 | Fixed height varies by screen |
| Hero | title, subtitle, ctaText | Full width, gradient bg | Text size scales down |
| Feature Card | icon, title, description | 12px radius, shadow-2 | 1 col (mobile), 2 col (tablet), 3 col (desktop) |
| Step Card | stepNumber, title, description, icon | border-radius-md, primary color accent | Stack vertically mobile |
| Community Preview | community{} | card-base, image | Carousel on mobile, grid on desktop |
| Footer | copyrightText, links | bg-neutral-900, text-white | Single col mobile, multi col desktop |

#### Design Specifications

- **Hero Background:** Gradient from #5865F2 → #4ECDC4
- **Feature Card Icons:** Colorful (Teal, Red, Green)
- **Feature Card Background:** white with shadow-2
- **CTA Button Color:** Primary gradient
- **Typography:** Display-2 for hero title, H2 for section titles, Body-md for content

#### Code Structure

```typescript
// landing.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  features = [
    { icon: 'location', title: 'Location First', description: 'Find communities near you' },
    { icon: 'users', title: 'Local Communities', description: 'Connect with neighbors' },
    { icon: 'shield', title: 'Safe & Trusted', description: 'Verified members' }
  ];

  steps = [
    { number: 1, title: 'Sign Up', description: 'Create your account' },
    { number: 2, title: 'Add Postcode', description: 'Tell us where you are' },
    { number: 3, title: 'Explore', description: 'Find local communities' },
    { number: 4, title: 'Connect', description: 'Join conversations' }
  ];

  communities = [
    // Mock community data
  ];
}
```

---

### 2. AUTHENTICATION PAGES

**Purpose:** User registration and login  
**Routes:**
- `/auth/login` - Login
- `/auth/signup` - Signup (4-step)
- `/auth/forgot-password` - Forgot password
- `/auth/verify-email` - Email verification

#### 2.1 SIGNUP (4-Step)

**Status:** ✅ Already redesigned

```
STEP 1: Email
┌──────────────────────────────┐
│  Create Your Account         │
│                              │
│  Email Input Field           │
│  [     example@email.com   ] │
│                              │
│  [ Next → ]                  │
└──────────────────────────────┘

STEP 2: Profile
┌──────────────────────────────┐
│  Tell Us About You           │
│                              │
│  Full Name Input             │
│  [  John Doe              ]  │
│                              │
│  Avatar Upload (Optional)    │
│  [ Choose File ]             │
│                              │
│  [ ← Back ] [ Next → ]       │
└──────────────────────────────┘

STEP 3: Postcode & Interests
┌──────────────────────────────┐
│  Location & Interests        │
│                              │
│  Postcode Input              │
│  [ SW1A 1AA ]                │
│                              │
│  Location Badge              │
│  📍 London, Greater London   │
│                              │
│  Select Interests (Multi)    │
│  [x] Technology              │
│  [ ] Sports                  │
│  [x] Community               │
│                              │
│  [ ← Back ] [ Next → ]       │
└──────────────────────────────┘

STEP 4: Confirmation
┌──────────────────────────────┐
│  Verify Your Email           │
│                              │
│  Check your inbox for        │
│  verification link           │
│                              │
│  Resend Email (60s cooldown) │
│  [ Resend ]                  │
│                              │
│  [ Complete Signup ]         │
└──────────────────────────────┘
```

**Key Implementation Details:**

```typescript
// signup.component.ts
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  currentStep = signal(1);
  totalSteps = 4;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', Validators.required],
    avatar: [null],
    postcode: ['', [Validators.required, this.postcodeValidator]],
    interests: [[], Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  goToStep(step: number) {
    if (this.isStepValid()) {
      this.currentStep.set(step);
    }
  }

  isStepValid(): boolean {
    switch (this.currentStep()) {
      case 1: return this.form.get('email')?.valid || false;
      case 2: return this.form.get('fullName')?.valid || false;
      case 3: return this.form.get('postcode')?.valid && this.form.get('interests')?.value?.length > 0;
      case 4: return true;
      default: return false;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // Call auth service to register user
    }
  }

  postcodeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    // UK postcode validation regex
    const postcodeRegex = /^[A-Z]{1,2}\d{1,2}[A-Z\d]?\s*\d[A-Z]{2}$/i;
    return postcodeRegex.test(value) ? null : { invalidPostcode: true };
  }
}
```

**Styling Key Points:**
- Step indicator with connected dots
- Form fields with validation styling
- CTA buttons use primary gradient
- Background: Subtle gradient from #F8F9FA → white
- Cards use shadow-2 elevation

---

### 3. DASHBOARD (User)

**Purpose:** Main user hub after login  
**Route:** `/dashboard`  
**Access:** Authenticated users only  
**Components:**
- Welcome section with user's location badge
- Quick actions (Create post, Join community, etc.)
- Feed of posts/activities
- Sidebar with navigation

#### Layout Structure

```
┌────────────────────────────────────────┐
│         NAVBAR (w/ Location Badge)     │
│  Logo | Search | Location: SW1A 1AA  │
├─────────────┬────────────────────────────┤
│             │                            │
│  SIDEBAR    │      MAIN CONTENT          │
│  • Home     │                            │
│  • Communities  Welcome Card             │
│  • Events   │  Hi John!                 │
│  • Jobs     │  📍 London, UK            │
│  • Businesses   [ Create Post ]         │
│  • Messages │                            │
│  • Profile  │  QUICK ACTIONS             │
│  • Settings │  [ Join Comm. ] [ Find Event ]
│             │  [ Post Job ] [ Find Biz ] │
│             │                            │
│             │  YOUR FEED                 │
│             │  ┌──────────────────────┐  │
│             │  │ Post Card            │  │
│             │  │ by John (2h ago)     │  │
│             │  │ "Great event..."     │  │
│             │  │ [Like] [Comment][Share] │
│             │  └──────────────────────┘  │
│             │                            │
│             │  ┌──────────────────────┐  │
│             │  │ Event Notification   │  │
│             │  │ "Local Tech Meetup"  │  │
│             │  │ Tomorrow 6PM         │  │
│             │  │ [Join Event]         │  │
│             │  └──────────────────────┘  │
│             │                            │
└─────────────┴────────────────────────────┘
```

#### Components

| Component | Props | Purpose |
|-----------|-------|---------|
| User Welcome Card | user{}, location{} | Greeting + location display |
| Quick Actions | actions[] | 4 buttons to main features |
| Post Card | post{}, user{}, location{} | Display user post with interactions |
| Event Notification | event{}, location{} | Upcoming event alert |
| Activity Feed | posts[], events[], jobs[] | Combined activity stream |

#### Key Features

1. **Location Badge in Navbar:** Show current postcode, allow switching
2. **Location-based Feed:** Show nearby posts/events/jobs
3. **Distance Display:** Show distance to communities, events, jobs
4. **Quick Filters:** Filter by location radius (1km, 5km, 10km)

#### Implementation

```typescript
// dashboard.component.ts
import { Component, signal, computed, inject } from '@angular/core';
import { LocationService } from '@core/services/location.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private locationService = inject(LocationService);
  
  userPostcode = signal('SW1A 1AA');
  userLocation = signal({ area: 'London', district: 'Westminster' });
  selectedRadius = signal(10); // km
  
  posts = signal([]);
  events = signal([]);
  
  nearbyActivities = computed(() => {
    // Filter activities by distance based on selectedRadius
    return [...this.posts(), ...this.events()];
  });

  changeLocation(postcode: string) {
    this.locationService.validatePostcode(postcode).subscribe(
      (location) => {
        this.userPostcode.set(postcode);
        this.userLocation.set(location);
        // Refresh feed
        this.loadNearbyActivities();
      }
    );
  }

  loadNearbyActivities() {
    // Load activities filtered by location
  }

  createPost() {
    // Navigate to post creation
  }
}
```

---

### 4. COMMUNITIES PAGE

**Purpose:** Browse and manage communities  
**Route:** `/communities`  
**Sections:**
- Communities List (with location filtering)
- Community Detail Page
- Create Community

#### Communities List Layout

```
┌────────────────────────────────────────┐
│  SEARCH & FILTERS                      │
│  [🔍 Search communities...] [Filters▼] │
│                                        │
│  Location Filter:                      │
│  📍 SW1A 1AA  [5km] [10km] [25km]     │
│                                        │
│  Category Filter:                      │
│  [x] Tech [x] Sports [ ] Arts         │
│                                        │
├────────────────────────────────────────┤
│  COMMUNITY CARDS (Grid)                │
│                                        │
│ ┌──────────┐  ┌──────────┐  ┌────────┐│
│ │Community │  │Community │  │Community││
│ │Card 1    │  │Card 2    │  │Card 3  ││
│ │📍 1.2km  │  │📍 3.5km  │  │📍 8km  ││
│ │                                    ││
│ │[Join]   │  │[Join]    │  │[Join]   ││
│ └──────────┘  └──────────┘  └────────┘│
│                                        │
└────────────────────────────────────────┘
```

#### Community Card Component

```typescript
@Component({
  selector: 'app-community-card',
  standalone: true,
  template: `
    <div class="community-card">
      <img [src]="community().coverImage" alt="">
      <div class="content">
        <h3>{{ community().name }}</h3>
        <p class="category">{{ community().category }}</p>
        <app-location-badge 
          [postcode]="community().postcode"
          [distance]="community().distance"
        ></app-location-badge>
        <p class="description">{{ community().description }}</p>
        <button (click)="onJoin()" [disabled]="isJoined()">
          {{ isJoined() ? 'Joined' : 'Join Community' }}
        </button>
      </div>
    </div>
  `,
  styleUrl: './community-card.component.scss'
})
export class CommunityCardComponent {
  community = input.required<Community>();
  isJoined = signal(false);

  onJoin() {
    // Call service to join community
    this.isJoined.set(true);
  }
}
```

#### Community Detail Page

```
┌──────────────────────────────────────┐
│  BACK | COMMUNITY NAME               │
├──────────────────────────────────────┤
│ [Cover Image]                        │
├──────────────────────────────────────┤
│  Community Name                      │
│  Category | 📍 1.2km Away            │
│  Description text...                 │
│                                      │
│  [Join Community] [Share]            │
├──────────────────────────────────────┤
│  MEMBERS (5,230)                     │
│  [Avatar] [Avatar] [Avatar] [+View All]
│                                      │
│  ABOUT                               │
│  [Full description...]               │
│                                      │
│  RULES                               │
│  1. Be respectful                    │
│  2. No spam                          │
│  3. Keep it local                    │
│                                      │
│  POSTS/DISCUSSIONS                   │
│  [Post Card] [Post Card]             │
│                                      │
└──────────────────────────────────────┘
```

---

### 5. EVENTS PAGE (NEW)

**Purpose:** Discover and manage local events  
**Route:** `/events`  
**Features:**
- Events list/map view
- Event detail with RSVP
- Create event (for community admins)

#### Events List Layout

```
┌────────────────────────────────────────┐
│  [LIST VIEW] [MAP VIEW]                │
│  [🔍 Search events...] [Filters▼]      │
│                                        │
│  FILTERS:                              │
│  📍 Location: SW1A 1AA [5km radius]   │
│  📅 Date: This Week / Next Week / All  │
│  🏷️ Category: All / Tech / Sports     │
│                                        │
├────────────────────────────────────────┤
│  UPCOMING EVENTS (List View)           │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ Event Card                     │   │
│  │ Tech Meetup - Tonight 6PM      │   │
│  │ 📍 3.2km away                  │   │
│  │ 👥 24 attending                │   │
│  │ [RSVP] [Share]                 │   │
│  └────────────────────────────────┘   │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ Sports Game - Tomorrow 2PM     │   │
│  │ 📍 1.5km away                  │   │
│  │ 👥 18 attending                │   │
│  │ [RSVP] [Share]                 │   │
│  └────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘
```

#### Event Card Component

```typescript
@Component({
  selector: 'app-event-card',
  standalone: true,
  template: `
    <div class="event-card">
      <div class="date-badge">
        <span class="day">{{ event().date | date:'d' }}</span>
        <span class="month">{{ event().date | date:'MMM' }}</span>
      </div>
      <div class="content">
        <h3>{{ event().title }}</h3>
        <p class="time">🕐 {{ event().time }}</p>
        <app-location-badge [postcode]="event().postcode" [distance]="event().distance"></app-location-badge>
        <p class="attendees">👥 {{ event().attendeeCount }} attending</p>
        <button (click)="onRSVP()" [disabled]="isAttending()">
          {{ isAttending() ? 'Attending' : 'RSVP' }}
        </button>
      </div>
    </div>
  `,
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  event = input.required<Event>();
  isAttending = signal(false);
}
```

#### Event Detail Page

```
┌──────────────────────────────────────┐
│  [Cover Image/Map]                   │
├──────────────────────────────────────┤
│  Event Title                         │
│  🕐 Date & Time                      │
│  📍 Location (with map)              │
│  👥 Attendees (Avatars)              │
│                                      │
│  [RSVP] [Share] [Interested]         │
├──────────────────────────────────────┤
│  DESCRIPTION                         │
│  [Full event details...]             │
│                                      │
│  ORGANIZER                           │
│  [Avatar] John Doe                   │
│  [Contact Organizer]                 │
│                                      │
│  DISCUSSION                          │
│  [Comments and discussions...]       │
│                                      │
└──────────────────────────────────────┘
```

#### Event Data Model

```typescript
// Data models required
interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  postcode: string;
  location: string;
  latitude: number;
  longitude: number;
  maxAttendees: number;
  attendeeCount: number;
  attendeeList: User[];
  organizerId: string;
  organizer: User;
  category: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### 6. JOBS PAGE (NEW)

**Purpose:** Job board for local employment  
**Route:** `/jobs`  
**Features:**
- Jobs list with location filtering
- Job detail with application
- Post job (for verified users)

#### Jobs List Layout

```
┌────────────────────────────────────────┐
│  [🔍 Search jobs...] [Filters▼]        │
│  📍 SW1A 1AA [Radius ▼]               │
│  💼 Category [All ▼]                   │
│  💰 Salary Range [Any ▼]               │
│                                        │
├────────────────────────────────────────┤
│  JOB LISTINGS                          │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ Senior Developer               │   │
│  │ Acme Corp                      │   │
│  │ 📍 2.1km away                  │   │
│  │ 💰 £45,000 - £60,000 per year │   │
│  │ Full-time | London             │   │
│  │ [View Details] [Apply]         │   │
│  └────────────────────────────────┘   │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ Marketing Manager              │   │
│  │ TechStart Ltd                  │   │
│  │ 📍 5.3km away                  │   │
│  │ 💰 £30,000 - £40,000 per year │   │
│  │ Part-time | London             │   │
│  │ [View Details] [Apply]         │   │
│  └────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘
```

#### Job Card Component

```typescript
@Component({
  selector: 'app-job-card',
  standalone: true,
  template: `
    <div class="job-card">
      <div class="header">
        <h3>{{ job().title }}</h3>
        <span class="badge" [class.featured]="job().featured">
          {{ job().featured ? 'Featured' : 'New' }}
        </span>
      </div>
      <p class="company">{{ job().company }}</p>
      <app-location-badge [postcode]="job().postcode" [distance]="job().distance"></app-location-badge>
      <p class="salary">💰 {{ job().salaryMin | currency }} - {{ job().salaryMax | currency }}</p>
      <p class="type">{{ job().type }} | {{ job().location }}</p>
      <button (click)="onApply()">Apply Now</button>
    </div>
  `,
  styleUrl: './job-card.component.scss'
})
export class JobCardComponent {
  job = input.required<Job>();
}
```

#### Job Detail Page

```
┌──────────────────────────────────────┐
│  [BACK]                              │
├──────────────────────────────────────┤
│  Job Title                           │
│  Company Logo | Company Name         │
│                                      │
│  💼 Type: Full-time                  │
│  💰 Salary: £45k-£60k per year      │
│  📍 Location: 2.1km away             │
│  📅 Posted: 3 days ago               │
│                                      │
│  [Apply Now] [Save Job] [Share]      │
├──────────────────────────────────────┤
│  JOB DESCRIPTION                     │
│  [Full job details...]               │
│                                      │
│  REQUIREMENTS                        │
│  • 5+ years experience               │
│  • Angular expertise                 │
│  • Team player                       │
│                                      │
│  ABOUT THE COMPANY                   │
│  [Company description...]            │
│  [Visit Website]                     │
│                                      │
│  APPLICATION FORM                    │
│  [Name] [Email] [Phone]              │
│  [Cover Letter]                      │
│  [Submit Application]                │
│                                      │
└──────────────────────────────────────┘
```

#### Job Data Model

```typescript
interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  postcode: string;
  location: string;
  company: string;
  company_id: string;
  salary_min: number;
  salary_max: number;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  category: string;
  postedBy: string;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
}
```

---

### 7. BUSINESSES PAGE (NEW)

**Purpose:** Local business directory  
**Route:** `/businesses`  
**Features:**
- Business listings with location filtering
- Business detail page with reviews
- Add business (for business owners)

#### Businesses List Layout

```
┌────────────────────────────────────────┐
│  [🔍 Search businesses...] [Filters▼]  │
│  📍 SW1A 1AA [Radius ▼]               │
│  🏪 Category: All [▼]                  │
│                                        │
├────────────────────────────────────────┤
│  BUSINESS CARDS                        │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ [Business Image]               │   │
│  │ Coffee Shop Name               │   │
│  │ 📍 0.8km away                  │   │
│  │ ⭐ 4.5 (120 reviews)           │   │
│  │ ☎️ 020 1234 5678               │   │
│  │ Hours: 8AM - 6PM               │   │
│  │ [View Details] [Call] [Map]    │   │
│  └────────────────────────────────┘   │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ [Business Image]               │   │
│  │ Gym                            │   │
│  │ 📍 2.1km away                  │   │
│  │ ⭐ 4.2 (87 reviews)            │   │
│  │ ☎️ 020 9876 5432               │   │
│  │ Hours: 6AM - 10PM              │   │
│  │ [View Details] [Call] [Map]    │   │
│  └────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘
```

#### Business Detail Page

```
┌──────────────────────────────────────┐
│  [Images Carousel]                   │
│  [Image 1] [Image 2] [Image 3]       │
├──────────────────────────────────────┤
│  Business Name                       │
│  ⭐ 4.5 out of 5 (120 reviews)      │
│  Category: Coffee Shop               │
│  📍 0.8km away                       │
│  ☎️ 020 1234 5678                    │
│  🌐 www.business.com                 │
│  Hours: Mon-Fri 8AM-6PM, Sat-Sun 9-5│
│                                      │
│  [Call] [Website] [Directions]       │
│  [Save Business] [Share]             │
├──────────────────────────────────────┤
│  ABOUT                               │
│  [Business description...]           │
│                                      │
│  REVIEWS                             │
│  ┌──────────────────────────────┐    │
│  │ John D. ⭐⭐⭐⭐⭐          │    │
│  │ "Great coffee and atmosphere!"   │    │
│  │ 2 weeks ago                      │    │
│  └──────────────────────────────┘    │
│                                      │
│  [Load More Reviews]                 │
│  [Write Review]                      │
│                                      │
└──────────────────────────────────────┘
```

#### Business Card Component

```typescript
@Component({
  selector: 'app-business-card',
  standalone: true,
  template: `
    <div class="business-card">
      <img [src]="business().image" [alt]="business().name">
      <div class="content">
        <h3>{{ business().name }}</h3>
        <div class="rating">⭐ {{ business().rating }} ({{ business().reviewCount }})</div>
        <app-location-badge [postcode]="business().postcode" [distance]="business().distance"></app-location-badge>
        <p class="phone">☎️ {{ business().phone }}</p>
        <p class="hours">Hours: {{ business().hours }}</p>
        <button (click)="onViewDetails()">View Details</button>
      </div>
    </div>
  `,
  styleUrl: './business-card.component.scss'
})
export class BusinessCardComponent {
  business = input.required<Business>();
}
```

#### Business Data Model

```typescript
interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  postcode: string;
  location: string;
  latitude: number;
  longitude: number;
  phone: string;
  website?: string;
  hours: string;
  images: string[];
  rating: number;
  reviewCount: number;
  owner_id: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### 8. PROFILE PAGE

**Purpose:** User account management  
**Route:** `/profile` or `/profile/:id`

#### Profile Layout

```
┌──────────────────────────────────────┐
│  PROFILE HEADER                      │
│  [Avatar] John Doe                   │
│  📍 London, UK | Joined 3 months ago │
│  [Edit Profile] [Settings]           │
├──────────────────────────────────────┤
│  STATS                               │
│  ┌─────┐ ┌─────┐ ┌─────┐            │
│  │ 12  │ │ 8   │ │ 45  │            │
│  │Posts│ │Events│ │Followers        │
│  └─────┘ └─────┘ └─────┘            │
├──────────────────────────────────────┤
│  ABOUT                               │
│  Bio/Description...                  │
│  Interests: Tech, Sports, Community  │
│                                      │
│  COMMUNITIES                         │
│  [Community 1] [Community 2] [+More] │
│                                      │
│  RECENT ACTIVITY                     │
│  [Post] [Event RSVP] [Job Apply]    │
│                                      │
└──────────────────────────────────────┘
```

#### Edit Profile Component

```typescript
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" formControlName="fullName">
      </div>
      
      <div class="form-group">
        <label>Bio</label>
        <textarea formControlName="bio" rows="3"></textarea>
      </div>
      
      <div class="form-group">
        <label>Postcode</label>
        <input type="text" formControlName="postcode">
      </div>
      
      <div class="form-group">
        <label>Interests</label>
        <div class="checkbox-group">
          <label *ngFor="let interest of interests">
            <input type="checkbox" (change)="toggleInterest(interest)">
            {{ interest }}
          </label>
        </div>
      </div>
      
      <button type="submit" [disabled]="!form.valid">Save Changes</button>
    </form>
  `,
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  form = this.fb.group({
    fullName: ['', Validators.required],
    bio: [''],
    postcode: ['', Validators.required],
    interests: [[], Validators.required],
    avatar: [null],
  });

  interests = ['Technology', 'Sports', 'Community', 'Arts', 'Business'];

  constructor(private fb: FormBuilder) {}
}
```

---

### 9. ADMIN PANEL

**Purpose:** Platform administration and moderation  
**Route:** `/admin`  
**Access:** Admin users only  
**Sections:**
- Admin Dashboard (Overview)
- User Management
- Community Management
- Content Moderation
- Jobs/Events/Business Management

#### Admin Dashboard

```
┌────────────────────────────────────────┐
│  ADMIN DASHBOARD                       │
├────────────────────────────────────────┤
│  KEY METRICS (4 cards)                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │
│  │10,234│ │ 342  │ │ 1,245│ │ 98   │ │
│  │Users │ │Active│ │Posts │ │Reports
│  │      │ │Events│ │      │ │      │ │
│  └──────┘ └──────┘ └──────┘ └──────┘ │
├────────────────────────────────────────┤
│  RECENT REPORTS                        │
│  ┌────────────────────────────────┐   │
│  │ Post reported for spam         │   │
│  │ By: John D. | Status: Pending  │   │
│  │ [Review] [Approve] [Reject]    │   │
│  └────────────────────────────────┘   │
│                                        │
│  RECENT USER SIGNUPS                   │
│  [List of recent signups...]           │
│                                        │
│  ADMIN ACTIONS                         │
│  [User Management] [Communities]       │
│  [Moderation] [Reports]                │
│                                        │
└────────────────────────────────────────┘
```

#### User Management

```
┌────────────────────────────────────────┐
│  USER MANAGEMENT                       │
│  [Search users...] [Filter▼]           │
├────────────────────────────────────────┤
│  USER TABLE                            │
│  Name | Email | Joined | Status | Act │
│  ────────────────────────────────────  │
│  John | j@... | 1m ago | Active| [... │
│  Jane | j@... | 2m ago | Active| [... │
│  Bob  | b@... | 1w ago | Active| [... │
│                                        │
│  [View Details] [Edit] [Suspend] [Delete]
│                                        │
└────────────────────────────────────────┘
```

#### Content Moderation

```
┌────────────────────────────────────────┐
│  CONTENT MODERATION                    │
│  Reported Content | Pending Approval   │
├────────────────────────────────────────┤
│  REPORTS                               │
│  ┌────────────────────────────────┐   │
│  │ Post: "Great local event"      │   │
│  │ Reported by: 3 users           │   │
│  │ Reason: Spam                   │   │
│  │ Status: Pending Review         │   │
│  │ [Approve] [Remove] [Suspend]   │   │
│  └────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘
```

---

## CORE FEATURES & MODULES

### 1. Location System Integration

**Components:**
- LocationBadgeComponent
- LocationSelectorComponent
- PostcodeValidatorService

**Features:**
- UK postcode validation
- Postcode to coordinates conversion
- Distance calculation (Haversine formula)
- Area/district mapping
- Nearby activity filtering

**Implementation:**

```typescript
// location.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(private http: HttpClient) {}

  validatePostcode(postcode: string): Observable<LocationData> {
    // Call postcode validation API
    return this.http.post<LocationData>('/api/location/validate', { postcode });
  }

  getDistance(postcode1: string, postcode2: string): number {
    // Haversine formula to calculate distance
    // Return distance in km
  }

  getAreaName(postcode: string): string {
    // Return area name (e.g., "London", "Manchester")
  }

  getNearbyPostcodes(postcode: string, radiusKm: number): string[] {
    // Return array of postcodes within radius
  }
}

// location-badge.component.ts
@Component({
  selector: 'app-location-badge',
  standalone: true,
  template: `
    <div class="location-badge">
      <span class="icon">📍</span>
      <span class="postcode">{{ postcode() }}</span>
      <span class="area">{{ area() }}</span>
      <span *ngIf="distance() !== undefined" class="distance">
        {{ distance() }}km away
      </span>
    </div>
  `,
  styleUrl: './location-badge.component.scss'
})
export class LocationBadgeComponent {
  postcode = input.required<string>();
  area = input<string>('');
  distance = input<number | undefined>();
}
```

### 2. State Management with Signals

**Pattern:** Signal-based state with computed values

```typescript
// auth.service.ts
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<User | null>(null);
  private isLoading = signal(false);
  
  currentUser$ = computed(() => this.currentUser());
  isAuthenticated$ = computed(() => this.currentUser() !== null);
  isLoading$ = computed(() => this.isLoading());

  login(email: string, password: string): Observable<void> {
    this.isLoading.set(true);
    return this.http.post<User>('/api/auth/login', { email, password })
      .pipe(
        tap((user) => {
          this.currentUser.set(user);
          this.isLoading.set(false);
        }),
        catchError(() => {
          this.isLoading.set(false);
          throw new Error('Login failed');
        })
      );
  }

  logout(): void {
    this.currentUser.set(null);
  }
}
```

### 3. Reusable Component Library

Components to be created:
- Button (primary, secondary, disabled states)
- Card (with shadow elevation)
- Input (with validation)
- Modal
- LocationBadge
- LocationSelector
- Avatar
- LoadingSpinner
- Pagination
- Toast notification

---

## API INTEGRATION POINTS

### Auth Endpoints

```
POST   /api/auth/signup          → Register new user
POST   /api/auth/login           → User login
POST   /api/auth/refresh         → Refresh token
POST   /api/auth/logout          → Logout
POST   /api/auth/forgot-password → Request password reset
POST   /api/auth/reset-password  → Reset password with token
POST   /api/auth/verify-email    → Verify email address
```

### User Endpoints

```
GET    /api/users/:id             → Get user profile
PUT    /api/users/:id             → Update user profile
GET    /api/users/:id/communities → Get user's communities
GET    /api/users/:id/posts       → Get user's posts
GET    /api/users/:id/events      → Get user's events
GET    /api/users/:id/jobs        → Get user's job applications
```

### Community Endpoints

```
GET    /api/communities           → List all communities (paginated)
GET    /api/communities/:id       → Get community detail
POST   /api/communities           → Create new community
PUT    /api/communities/:id       → Update community
DELETE /api/communities/:id       → Delete community
POST   /api/communities/:id/join  → Join community
POST   /api/communities/:id/leave → Leave community
GET    /api/communities/search    → Search communities by location
GET    /api/communities/:id/posts → Get community posts
```

### Post/Comment Endpoints

```
GET    /api/posts                 → List posts (with filtering)
POST   /api/posts                 → Create post
PUT    /api/posts/:id             → Update post
DELETE /api/posts/:id             → Delete post
POST   /api/posts/:id/like        → Like post
POST   /api/posts/:id/comment     → Add comment
GET    /api/posts/:id/comments    → Get post comments
```

### Events Endpoints

```
GET    /api/events                → List events (paginated)
POST   /api/events                → Create event
GET    /api/events/:id            → Get event detail
PUT    /api/events/:id            → Update event
DELETE /api/events/:id            → Delete event
POST   /api/events/:id/rsvp       → RSVP to event
GET    /api/events/:id/attendees  → Get event attendees
GET    /api/events/search         → Search events by location
```

### Jobs Endpoints

```
GET    /api/jobs                  → List jobs
POST   /api/jobs                  → Post new job
GET    /api/jobs/:id              → Get job detail
PUT    /api/jobs/:id              → Update job
DELETE /api/jobs/:id              → Delete job
POST   /api/jobs/:id/apply        → Apply to job
GET    /api/jobs/:id/applications → Get job applications
GET    /api/jobs/search           → Search jobs by location
```

### Business Endpoints

```
GET    /api/businesses            → List businesses
POST   /api/businesses            → Register business
GET    /api/businesses/:id        → Get business detail
PUT    /api/businesses/:id        → Update business
DELETE /api/businesses/:id        → Delete business
POST   /api/businesses/:id/review → Post review
GET    /api/businesses/:id/reviews → Get business reviews
GET    /api/businesses/search     → Search businesses by location
```

### Location Endpoints

```
POST   /api/location/validate     → Validate UK postcode
GET    /api/location/:postcode    → Get location data
GET    /api/location/nearby       → Get nearby postcodes
```

---

## STATE MANAGEMENT (SIGNALS)

### App-Level State

```typescript
// app.state.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppState {
  // User state
  currentUser = signal<User | null>(null);
  isAuthenticated = signal(false);
  userRole = signal<'user' | 'admin' | null>(null);

  // Location state
  userPostcode = signal<string>('SW1A 1AA');
  userLocation = signal<LocationData>({ area: 'London' });
  selectedRadius = signal<number>(10); // km

  // UI state
  darkMode = signal(false);
  sidebarOpen = signal(true);
  mobileMenuOpen = signal(false);

  // Loading state
  isLoading = signal(false);
  error = signal<string | null>(null);
}
```

### Feature-Level State

Each feature module should maintain its own signals for:
- Data (posts, comments, events, jobs, etc.)
- Loading states
- Error states
- UI states (modal open, selected item, etc.)

---

## POSTCODE/LOCATION INTEGRATION

### Navigation Postcode Badge

The navbar should display current postcode with option to change:

```typescript
// navbar.component.ts
@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="navbar">
      <div class="logo">Logo</div>
      <div class="nav-links">
        <a routerLink="/">Home</a>
        <a routerLink="/communities">Communities</a>
        <a routerLink="/events">Events</a>
      </div>
      
      <div class="location-selector" (click)="openLocationModal()">
        <app-location-badge 
          [postcode]="appState.userPostcode()"
          [area]="appState.userLocation().area"
        ></app-location-badge>
        <span class="change-icon">📍</span>
      </div>
      
      <div class="user-menu">
        <img [src]="appState.currentUser()?.avatar" [alt]="appState.currentUser()?.name">
        [Menu items]
      </div>
    </nav>
  `,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  appState = inject(AppState);
  
  openLocationModal() {
    // Open location change modal
  }
}
```

### Location Change Modal

```typescript
@Component({
  selector: 'app-location-modal',
  standalone: true,
  template: `
    <app-modal [open]="open()">
      <div class="modal-content">
        <h2>Change Location</h2>
        
        <div class="form-group">
          <label>Postcode</label>
          <input 
            type="text" 
            [(ngModel)]="postcode"
            (input)="onPostcodeChange($event)"
            placeholder="Enter postcode (e.g., SW1A 1AA)"
          >
          <p *ngIf="locationData()" class="location-info">
            📍 {{ locationData().area }}, {{ locationData().district }}
          </p>
        </div>
        
        <button (click)="confirm()" [disabled]="!locationData()">
          Change Location
        </button>
      </div>
    </app-modal>
  `,
  styleUrl: './location-modal.component.scss'
})
export class LocationModalComponent {
  open = input(false);
  postcode = '';
  locationData = signal<LocationData | null>(null);
  
  locationService = inject(LocationService);
  appState = inject(AppState);

  onPostcodeChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.locationService.validatePostcode(value).subscribe(
      (data) => this.locationData.set(data),
      () => this.locationData.set(null)
    );
  }

  confirm() {
    if (this.locationData()) {
      this.appState.userPostcode.set(this.postcode);
      this.appState.userLocation.set(this.locationData()!);
      // Emit close event
    }
  }
}
```

---

## TESTING STRATEGY

### Unit Tests

Test services, pipes, validators:
```typescript
describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationService);
  });

  it('should validate UK postcode', () => {
    const result = service.validatePostcode('SW1A 1AA');
    expect(result).toBeTruthy();
  });

  it('should calculate distance between postcodes', () => {
    const distance = service.getDistance('SW1A 1AA', 'N1 1AA');
    expect(distance).toBeGreaterThan(0);
  });
});
```

### Component Tests

Test component inputs, outputs, interactions:
```typescript
describe('CommunityCardComponent', () => {
  let component: CommunityCardComponent;
  let fixture: ComponentFixture<CommunityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityCardComponent);
    component = fixture.componentInstance;
  });

  it('should display community name', () => {
    const mockCommunity = { id: '1', name: 'Tech Community' };
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('community', mockCommunity);
    });
    fixture.detectChanges();

    const name = fixture.nativeElement.querySelector('h3');
    expect(name.textContent).toContain('Tech Community');
  });

  it('should emit join event on button click', () => {
    spyOn(component.joinClicked, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.joinClicked.emit).toHaveBeenCalled();
  });
});
```

### E2E Tests

```typescript
describe('Community Features', () => {
  beforeEach(() => {
    cy.visit('/communities');
  });

  it('should search communities by location', () => {
    cy.get('[data-testid="search-input"]').type('London');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="community-card"]').should('have.length.greaterThan', 0);
  });

  it('should filter communities by distance', () => {
    cy.get('[data-testid="distance-filter"]').select('5km');
    cy.get('[data-testid="community-card"]').each(($card) => {
      cy.wrap($card).contains(/[0-5]\.[0-9]km/).should('exist');
    });
  });
});
```

---

## PERFORMANCE OPTIMIZATION

### Bundle Size

- **Code Splitting:** Lazy load feature modules
- **Tree Shaking:** Remove unused code
- **Minification:** Gzip compression on build
- **Polyfills:** Load only needed polyfills

### Runtime Performance

- **OnPush Strategy:** Use ChangeDetectionStrategy.OnPush for components
- **Signals:** Reduce unnecessary change detection
- **Virtual Scrolling:** For long lists (communities, jobs, events)
- **Image Optimization:** Lazy load images, use WebP format
- **HTTP Caching:** Implement cache-first strategy for static data

### Example: Virtual Scrolling

```typescript
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-jobs-list',
  imports: [ScrollingModule, CommonModule],
  template: `
    <cdk-virtual-scroll-viewport itemSize="120" class="jobs-viewport">
      <app-job-card *cdkVirtualFor="let job of jobs" [job]="job"></app-job-card>
    </cdk-virtual-scroll-viewport>
  `,
  styleUrl: './jobs-list.component.scss'
})
export class JobsListComponent {
  jobs = signal<Job[]>([]);
}
```

---

## DEPLOYMENT CHECKLIST

- [ ] Run `npm run build` - production build succeeds
- [ ] Run `npm run test` - all tests pass
- [ ] Run `npm run lint` - no linting errors
- [ ] Check bundle size - under 500KB gzipped
- [ ] Verify accessibility - WCAG AA compliance
- [ ] Test on mobile devices (iOS/Android)
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify API endpoints are correct for production
- [ ] Configure environment variables
- [ ] Set up CORS headers
- [ ] Enable HTTPS
- [ ] Configure CDN for static assets
- [ ] Set up monitoring/analytics
- [ ] Create deployment documentation

---

## NEXT STEPS

1. **Week 1-2:** Set up project structure, extend SCSS design system, create reusable components
2. **Week 2-3:** Implement authentication (signup 4-step, login, password reset)
3. **Week 3-4:** Build main dashboard and communities module
4. **Week 4-5:** Build events, jobs, and businesses modules
5. **Week 5-6:** Build admin panel and moderation tools
6. **Week 6-7:** Testing, accessibility checks, performance optimization
7. **Week 7-8:** Deployment preparation, documentation finalization

---

## References

- **Design System:** See `01_MASTER_DESIGN_SYSTEM_REFERENCE.md`
- **API Integration:** See `06_API_INTEGRATION_GUIDE.md`
- **Component Specs:** See `05_COMPONENT_SPECIFICATIONS.md`
- **Timeline:** See `04_IMPLEMENTATION_TIMELINE_ROADMAP.md`

---

**Document Version:** 1.0  
**Created:** March 2026  
**Last Updated:** March 2026  
**Status:** Production Ready  
**Audience:** Angular Development Team