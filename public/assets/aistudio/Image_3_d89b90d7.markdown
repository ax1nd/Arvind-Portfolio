---
name: Kinetic Neo-Brutalist Architecture
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c5c9ac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8f9378'
  outline-variant: '#444932'
  surface-tint: '#b0d500'
  primary: '#ffffff'
  on-primary: '#2a3400'
  primary-container: '#caf300'
  on-primary-container: '#596c00'
  inverse-primary: '#536600'
  secondary: '#ffb1c4'
  on-secondary: '#65002e'
  secondary-container: '#ff4a8d'
  on-secondary-container: '#590028'
  tertiary: '#ffffff'
  on-tertiary: '#00363a'
  tertiary-container: '#7df4ff'
  on-tertiary-container: '#006f77'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#caf300'
  primary-fixed-dim: '#b0d500'
  on-primary-fixed: '#171e00'
  on-primary-fixed-variant: '#3e4c00'
  secondary-fixed: '#ffd9e1'
  secondary-fixed-dim: '#ffb1c4'
  on-secondary-fixed: '#3f001a'
  on-secondary-fixed-variant: '#8f0044'
  tertiary-fixed: '#7df4ff'
  tertiary-fixed-dim: '#00dbe9'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f54'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-hero:
    fontFamily: Syne
    fontSize: 96px
    fontWeight: '800'
    lineHeight: 96px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.03em
  headline-xl:
    fontFamily: Syne
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 68px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Syne
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Syne
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-mono:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.06em
  badge-mono:
    fontFamily: Space Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
spacing:
  gutter: 0px
  gutter-loose: 1.5rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 2rem
  space-xl: 4rem
  space-2xl: 8rem
---

## Brand & Style

This design system synthesizes avant-garde exhibition graphics with high-performance creative engineering. It rejects decorative soft gradients, skeuomorphic shading, and conventional corporate safety in favor of raw structural clarity, stark spatial tension, and relentless visual precision.

The identity serves high-caliber creative developers, interactive studios, and digital artists. It evokes an uncompromising, gallery-grade atmosphere where every coordinate, grid intersection, and typographic anchor is deliberate and exposed. The emotional response is immediate and visceral: high-octane technical authority, aggressive digital edge, and immaculate compositional discipline.

## Colors

The palette operates under an extreme contrast, void-level dark mode architecture:

- **Primary (`#d4ff00` - Electric Lime):** The apex focal point. Reserved strictly for primary callouts, high-priority interactive states, active indicators, and critical navigational highlights.
- **Secondary (`#ff007f` - Harsh Cyber Magenta):** Used as an abrasive accent for contrasting badges, inverted hover accents, and destructive or critical state indicators.
- **Tertiary (`#00f0ff` - Cyan Tracer):** Secondary telemetry markers, technical wireframe overlays, and live status signals.
- **Neutral Palette:**
  - `Canvas Void`: `#0a0a0a` (Deep absolute base)
  - `Surface Tier 1`: `#121212` (Elevated modules, card backgrounds)
  - `Surface Tier 2`: `#1c1c1c` (Hover states, nested code blocks)
  - `Structural Gridlines / Borders`: `#2a2a2a` (Default passive), `#f5f5f5` (Active high-contrast borders)
  - `Text Stark White`: `#f5f5f5` (High-contrast titles, primary copy)
  - `Text Technical Muted`: `#8e8e8e` (Metadata, coordinates, secondary specs)

Maintain absolute starkness. Do not blend colors using multi-stop linear gradients. Colors change abruptly at 0-width thresholds or through hard raster grid boundaries.

## Typography

The typographic hierarchy is structured on absolute friction between wide sculptural brutalism and disciplined technical instrumentation:

- **Display & Headlines (`Syne`):** Set heavy and tight. Tracking is negative to fuse letterforms together into graphic silhouettes. Headlines command immediate visual dominance and are frequently styled in uppercase for section banners.
- **Body & Documentation (`Geist`):** Set in clean, neutral geometric precision to guarantee flawless readability against the dark void. Avoid heavy weights in long-form paragraphs; let the stark white text provide clarity.
- **Telemetry, Badges & Metadata (`Space Mono`):** All dates, categories, structural coordinates, specs, and status indicators must be styled in uppercase monospace. This reinforces the exposed developer terminal and industrial blueprint aesthetic.

## Layout & Spacing

The layout model is anchored by an exposed, monolithic 12-column architectural matrix:

- **Grid Architecture:** Columns directly touch via `0px` gutters, divided visibly by continuous 1px or 2px solid horizontal and vertical structural lines (`#2a2a2a`). Interior padding (`space-md` to `space-xl`) isolates content within each rectangular cell.
- **Outer Canvas Margins:** Desktop layouts enforce a strict perimeter frame (`margin: 2rem`) offset from the browser edges, housing persistent viewport meta tags (screen coordinates, timecode, project indices).
- **Responsive Adaptations:**
  - **Desktop (1200px+):** Full 12-column matrix with continuous structural borders, horizontal ticker banners, and modular asymmetric card spans (e.g., 8+4, 4+4+4).
  - **Tablet (768px - 1199px):** Collapses into a 6-column matrix; section dividers retain exposed borders.
  - **Mobile (< 768px):** Reflows into a single-column stack. Outer margin shrinks to `1rem`. Structural borders transition to full-width card partitions. Tickers remain locked at full viewport width with edge-to-edge overflow.

## Elevation & Depth

This system outright eliminates blurred drop shadows, diffuse glows, and pseudo-skeuomorphic ambient light. Depth is generated strictly through graphic elevation, physical hard offsets, and stark surface contrast:

- **Hard Graphic Offsets:** Interactive elements elevate on hover not by fading a shadow, but by displacing physically along the X and Y axes (`translate(-4px, -4px)`) paired with a razor-sharp, unblurred backdrop shadow (`box-shadow: 4px 4px 0px 0px #d4ff00` or `#f5f5f5`).
- **Surface Layering:** Background plane (`#0a0a0a`) acts as the absolute floor. Contained workspaces sit on `#121212` with solid 2px borders (`#2a2a2a`).
- **Wireframe Z-Indexing:** Modal overlays, inspect panels, and sticky floating docks utilize stark high-contrast borders (`2px solid #f5f5f5`), dark solid fills, and no blur backdrops, commanding instant dominance over the baseline grid.

## Shapes

All elements enforce an uncompromising zero-radius rule (`0px`). Curves, pill shapes, and subtle rounded corners are forbidden.

- **Geometry:** Every button, card, modal, badge, and input field is an unyielding hard rectangle.
- **Chamfers & Angles:** In graphic stickers or specialized badge headers, 45-degree corner notches (cut corners via clip-path) may be used to evoke technical industrial schematics, retaining razor-sharp edges.
- **Borders:** Component boundaries rely on hard geometric strokes: 1px for subtle structural grids, 2px for standard elements, and 3px for focused or active focal selections.

## Components

### Buttons
- **Primary Action:** Solid `#d4ff00` fill, `#0a0a0a` text, font `Syne` (Bold, uppercase). Border: 2px solid `#d4ff00`. Hover state triggers a physical offset `transform: translate(-3px, -3px)` with a hard shadow `3px 3px 0px #f5f5f5`.
- **Secondary / Outline:** Transparent fill, `#f5f5f5` text, 2px solid `#f5f5f5`. On hover: instant color inversion (fill becomes `#f5f5f5`, text becomes `#0a0a0a`).
- **Destructive / Cyber Variant:** Transparent fill with 2px solid `#ff007f`. On hover: fill `#ff007f` with text `#0a0a0a`.

### Cards & Project Showcases
- Surface fill is `#121212` with a 2px solid `#2a2a2a` perimeter.
- Top banner features an exposed metadata strip set in `Space Mono` (`label-mono`) detailing category, index `[01/12]`, and timestamp.
- On card hover: border color snaps instantly from `#2a2a2a` to `#d4ff00`, and accompanying thumbnails invert or shift saturation.

### Chips & Brutalist Badges
- Raw rectangular tags using `badge-mono`.
- High-contrast execution: 1px or 2px solid outlines with raw solid fills (e.g., `#ff007f` text on `#0a0a0a` background with `#ff007f` border).
- Status chips include a blinking square glyph (`■`) in `#d4ff00` to indicate live system state.

### Input Fields & Controls
- **Inputs:** Dark `#121212` background, 2px solid `#2a2a2a`, text `#f5f5f5`, typed in `Space Mono`. Focus state snaps border immediately to 2px solid `#d4ff00` with no ambient outer glow.
- **Checkboxes & Radios:** Sharp square boxes (`0px` radius) with 2px solid borders. Selected state fills with `#d4ff00` with an inverted black checkmark or an inner solid square.

### Lists & Tables
- Border-collapsed rows separated by 1px solid `#2a2a2a`.
- Row hover triggers an immediate solid background swap to `#1c1c1c` and shifts the row index number to `#d4ff00`.

### Marquee Tickers & Infinite Strips
- Full-bleed horizontal conveyor belts framed by 2px top and bottom solid borders.
- Text rendered in massive uppercase `Syne` or rapid monospace telemetry, moving dynamically across viewports to inject mechanical rhythm.