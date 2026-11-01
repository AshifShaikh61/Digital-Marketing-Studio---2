---
name: Digital Marketing Management System
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#5c00ca'
  on-tertiary: '#ffffff'
  tertiary-container: '#7531e6'
  on-tertiary-container: '#e4d4ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#d2bbff'
  on-tertiary-fixed: '#25005a'
  on-tertiary-fixed-variant: '#5a00c6'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  title:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: '0'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-xs:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
  metric-stat:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system targets high-efficiency operational management across specialized local industries: clinics, fitness clubs, and hospitality venues. The user demographic comprises agency account managers, marketing operators, and busy business owners who require rapid status assessment and clear performance analytics.

The aesthetic follows modern B2B SaaS paradigms—combining the surgical precision of Linear with the balanced clarity of Stripe. The interface emphasizes structural hygiene, neutral canvas surfaces, crisp structural dividing lines, and high-legibility typographic hierarchies. Visual density balances data throughput with breathing room, allowing multi-location campaign performance, social publishing states, and lead acquisition metrics to be processed without cognitive overload.

Key attributes:
- **Disciplined Precision:** Information architecture prioritizes density and visual hierarchy over ornamentation.
- **Operational Clarity:** High-contrast status signifiers and tabular data formats provide instantaneous system awareness.
- **Modern Professionalism:** Slate neutrals ground the experience, while structured indigo accents highlight primary workflows.

## Colors

The color palette is engineered for high-density transactional surfaces and administrative dashboards.

### Canvas & Surface Hierarchy
- **Canvas Base:** `#F8FAFC` (Slate-50) serves as the primary window background, creating separation from content containers.
- **Surface Elevation 0 (Card/Panel):** `#FFFFFF` provides clean separation for modules, tables, and metric cards.
- **Surface Muted:** `#F1F5F9` (Slate-100) indicates inactive table rows, read-only field fills, or subtle segment backgrounds.
- **Dividers & Borders:** `#E2E8F0` (Slate-200) defines panel bounds, structural grid lines, and interactive field edges.

### Brand Accents
- **Primary Interactive:** `#4F46E5` (Indigo-600) drives primary buttons, selected tabs, and active state indicators.
- **Primary Hover:** `#4338CA` (Indigo-700).
- **Primary Subtle:** `#EEF2FF` (Indigo-50) for selected row backgrounds and active navigation pill fills.
- **Secondary Accent:** `#0EA5E9` (Sky-500) signifies neutral system states, deep links, and informational callouts.
- **Tertiary Accent:** `#7C3AED` (Violet-600) handles secondary workflow highlights, such as multi-channel automation tags.

### Semantic Status Palette
Each semantic tier pairs a high-contrast ink color with an ultra-light tint background:
- **Published / Success:** Text `#047857` (Emerald-700) on `#ECFDF5` (Emerald-50) with border `#A7F3D0` (Emerald-200). Core metric dot `#10B981`.
- **Pending / Scheduled:** Text `#B45309` (Amber-700) on `#FFFBEB` (Amber-50) with border `#FDE68A` (Amber-200). Core metric dot `#F59E0B`.
- **Rejected / Error:** Text `#B91C1C` (Rose-700) on `#FEF2F2` (Rose-50) with border `#FECACA` (Rose-200). Core metric dot `#EF4444`.
- **Info / In Review:** Text `#0369A1` (Sky-700) on `#F0F9FF` (Sky-50) with border `#BAE6FD` (Sky-200). Core metric dot `#0EA5E9`.

## Typography

The typography relies on Inter across all applications, leveraging its calibrated geometric structures and tabular figures for high-volume dashboard utilities.

### Principles & Features
- **Tabular Figures (`tnum`):** All numeric displays—including KPI values, currency figures, conversion rates, and timestamps—must activate OpenType tabular numbers (`font-variant-numeric: tabular-nums;`). This prevents alignment jitter during live filtering, table updates, and sorting operations.
- **Negative Letter Spacing:** Headings and numeric stat blocks feature subtle tracking reduction (`-0.01em` to `-0.025em`) to retain a sharp, compact editorial presence.
- **Weight Restraint:** Weights are strictly constrained to 400 (Body text, subtext), 500 (Form labels, button text, table column headers), 600 (Section titles, KPI metrics), and 700 (Display headers).

## Layout & Spacing

The system implements a fluid 12-column grid anchored inside a fixed max-width container (`1440px`), paired with a collapsible 260px administrative navigation sidebar.

### Grid & Breakpoints
- **Desktop (>= 1280px):** 12 columns, 24px (`1.5rem`) gutters, 32px (`2rem`) margins. Content blocks map cleanly into 3-column metric cards, 6-column charts, or 8/4 split dashboard views.
- **Tablet (768px - 1279px):** 8 columns, 16px (`1rem`) gutters, 24px (`1.5rem`) margins. Navigation collapses to an icon bar or expandable drawer. Metric cards reflow to 4-column blocks (2x2).
- **Mobile (< 768px):** 4 columns, 12px (`0.75rem`) gutters, 16px (`1rem`) margins. Metric groups and action bars stack to full-width (4 columns).

### Rhythm Hierarchy
- Padding inside cards, panels, and data tables adheres to the standard 8px base rhythm:
  - Form field internal spacing: `space-sm` (8px) vertically, `space-md` (16px) horizontally.
  - Card internal padding: `space-lg` (24px) for standard panels, condensed to `space-md` (16px) for compact data tables.
  - Section stack separation: `space-xl` (32px) desktop, `space-lg` (24px) mobile.

## Elevation & Depth

Visual depth is achieved through delicate surface separation, single-pixel slate borders, and diffuse ambient shadows rather than dramatic drop shadows.

### Elevation Levels
- **Level 0 (Flat Canvas):** `#F8FAFC`. Background layer for dashboard viewports. No shadow, no border.
- **Level 1 (Cards, Metric Containers, Data Tables):** `#FFFFFF` fill with a `1px solid #E2E8F0` border. Shadow is ambient and ground-level: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
- **Level 2 (Hover States, Interactive Cards, Dropdowns):** `#FFFFFF` fill with `1px solid #CBD5E1`. Shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Modals, Overlays, Command Palettes):** `#FFFFFF` fill with `1px solid #E2E8F0`. Shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.06)`. Backdrops use `rgba(15, 23, 42, 0.4)` with an optional 4px blur (`backdrop-filter: blur(4px)`).

## Shapes

The design system standardizes on Roundedness Level 2, balancing approachable ergonomics with structural precision.

- **Base Radius (`rounded-md`, 8px / 0.5rem):** Standard for interactive controls, inputs, select triggers, buttons, and alert strips.
- **Large Radius (`rounded-lg`, 16px / 1rem):** Used for interior modules, nested card groups, and medium panels.
- **Extra-Large Radius (`rounded-xl`, 24px / 1.5rem):** Used for top-level dashboard cards, stat containers, and modal window borders.
- **Pill Radius (`rounded-full`, 9999px):** Strictly reserved for status tags, workflow badges, avatar containers, and contextual metric chips.

## Components

### Buttons
- **Primary:** Solid `#4F46E5` background, `#FFFFFF` text, `rounded-md` (8px). 1px border colored `rgba(0, 0, 0, 0.08)` inset. Hover changes to `#4338CA`. Active scales to 0.98.
- **Secondary / Outline:** `#FFFFFF` background, `#0F172A` text, `1px solid #E2E8F0` border. Hover background `#F8FAFC`, border `#CBD5E1`.
- **Ghost:** Transparent background, `#475569` text. Hover background `#F1F5F9`, text `#0F172A`.
- **Destructive:** Solid `#EF4444` background, `#FFFFFF` text. Hover `#DC2626`.

### Status Badges & Chips
- **Geometry:** Height 22px, `rounded-full`, padding `0 10px`. Font: `label-xs` (`11px`, 600 weight).
- **Indicators:** Leading 6px circular dot (`rounded-full`) showing the semantic status color.
- **Variants:**
  - *Published / Active:* `#ECFDF5` background, `#047857` text, `#A7F3D0` border. Dot `#10B981`.
  - *Pending Review / Scheduled:* `#FFFBEB` background, `#B45309` text, `#FDE68A` border. Dot `#F59E0B`.
  - *Rejected / Inactive:* `#FEF2F2` background, `#B91C1C` text, `#FECACA` border. Dot `#EF4444`.
  - *Draft / Idle:* `#F1F5F9` background, `#475569` text, `#E2E8F0` border. Dot `#94A3B8`.

### Input Fields & Controls
- **Text Inputs:** Height 38px, `rounded-md`, `#FFFFFF` background, border `1px solid #E2E8F0`. Padding `8px 12px`. Text `#0F172A`, placeholder `#94A3B8`. Focus state applies a `1px solid #4F46E5` border with an outer ring: `box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15)`.
- **Checkboxes & Radios:** 16x16px, `rounded-sm` (4px for checkboxes, full circle for radios). Unchecked border `1.5px solid #CBD5E1`. Checked background `#4F46E5` with `#FFFFFF` checkmark or center pip. Focus ring matches input style.

### Cards & Metric Panels
- **Structure:** Level 1 elevation (`rounded-xl` / 24px radius, `1px solid #E2E8F0`, `#FFFFFF` fill).
- **Metric Card Anatomy:** 
  - Top row: Metric label (`label-sm`, `#64748B`) aligned left; optional semantic icon or status pill aligned right.
  - Middle row: Numerical KPI value (`metric-stat`, `#0F172A`, `font-variant-numeric: tabular-nums`).
  - Bottom row: Trend indicator (e.g., `+12.4% vs last mo`) styled with positive (`#047857`) or negative (`#B91C1C`) micro-labels.

### Data Tables
- **Container:** Wrapped in a standard Level 1 card container with `overflow-hidden` and `rounded-xl`.
- **Header:** `#F8FAFC` background, height 40px, border-bottom `1px solid #E2E8F0`. Text formatted in `label-xs` uppercase (`#64748B`).
- **Rows:** Height 48px to 56px, background `#FFFFFF`, border-bottom `1px solid #F1F5F9`. Hover state shifts row background to `#F8FAFC`. Selected row uses `#EEF2FF`. Numeric cells align right with `tabular-nums`. Text columns align left. Status indicators center or align left.