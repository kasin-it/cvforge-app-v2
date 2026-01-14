# UI.md

> Visual design system and guidelines for CVForge.

---

## Design Philosophy

CVForge uses a **warm, professional aesthetic** that feels approachable yet polished. The design balances modern minimalism with subtle warmth through amber/copper accents and cream backgrounds.

---

## Color Palette

### Primary Colors

| Color             | Value                     | Usage                               |
| ----------------- | ------------------------- | ----------------------------------- |
| **Primary**       | Rich amber/copper         | CTAs, links, active states, accents |
| **Primary Light** | Primary at 10-20% opacity | Badges, highlighted backgrounds     |

### Neutral Colors

| Color          | Usage                                      |
| -------------- | ------------------------------------------ |
| **Background** | Warm cream base for all pages              |
| **Foreground** | Near-black for body text                   |
| **Muted**      | Warm gray for secondary text, placeholders |
| **Border**     | Subtle warm gray for dividers and outlines |

### Semantic Colors

| Color           | Usage                                     |
| --------------- | ----------------------------------------- |
| **Destructive** | Red for errors, delete actions, warnings  |
| **Success**     | Green for completed states, confirmations |

### Dark Mode

Dark mode inverts the palette while maintaining warmth:

- Dark charcoal backgrounds
- Light cream text
- Lightened primary amber for better contrast

---

## Typography

### Font Families

| Font                 | Usage                                      |
| -------------------- | ------------------------------------------ |
| **Playfair Display** | Display headings, hero text, brand moments |
| **DM Sans**          | Body text, UI elements, buttons, labels    |

### Type Scale

| Level     | Size    | Weight   | Usage                       |
| --------- | ------- | -------- | --------------------------- |
| Display   | 4xl-7xl | Bold     | Hero headlines, page titles |
| Heading 1 | 3xl     | Semibold | Section titles              |
| Heading 2 | 2xl     | Semibold | Card titles, subsections    |
| Heading 3 | xl      | Medium   | Group labels                |
| Body      | base    | Regular  | Paragraphs, descriptions    |
| Small     | sm      | Regular  | Labels, captions, metadata  |
| Tiny      | xs      | Regular  | Badges, timestamps          |

### Text Colors

- **Primary text**: Full foreground color
- **Secondary text**: Muted foreground (reduced opacity)
- **Disabled text**: 50% opacity
- **Link text**: Primary color with hover darkening

---

## Spacing System

### Base Unit

All spacing derives from a **4px base unit**.

### Common Spacing

| Token | Value | Usage                      |
| ----- | ----- | -------------------------- |
| xs    | 4px   | Tight gaps, icon padding   |
| sm    | 8px   | Button padding, input gaps |
| md    | 12px  | Card padding, form gaps    |
| lg    | 16px  | Section gaps               |
| xl    | 24px  | Component separation       |
| 2xl   | 32px  | Section separation         |
| 3xl   | 48px  | Page section margins       |

### Container Widths

| Context       | Max Width               |
| ------------- | ----------------------- |
| Wizard pages  | 64rem (1024px)          |
| Landing pages | 72rem (1152px)          |
| Cards         | Full width of container |

---

## Border Radius

| Size | Value  | Usage                            |
| ---- | ------ | -------------------------------- |
| sm   | 4px    | Small badges, tags               |
| md   | 6px    | Inputs, small buttons            |
| lg   | 8px    | Cards, large buttons             |
| xl   | 12px   | Modal dialogs, panels            |
| full | 9999px | Pills, avatars, circular buttons |

---

## Shadows & Elevation

### Shadow Scale

| Level    | Usage                           |
| -------- | ------------------------------- |
| **None** | Default state for most elements |
| **sm**   | Subtle lift on hover            |
| **md**   | Cards, dropdowns                |
| **lg**   | Modals, popovers                |
| **xl**   | Floating elements on hover      |

### Elevation Pattern

- Rest state: No shadow or subtle border
- Hover state: Add shadow + slight Y-axis lift (-1px to -4px)
- Active/Focus: Ring outline instead of shadow

---

## Component Styles

### Buttons

| Variant         | Style                                    |
| --------------- | ---------------------------------------- |
| **Primary**     | Solid primary background, light text     |
| **Secondary**   | Muted background, dark text              |
| **Outline**     | Transparent with border                  |
| **Ghost**       | Transparent, no border, hover background |
| **Destructive** | Red background for dangerous actions     |

**Sizes**: Small (32px height), Default (36px), Large (40px)

**States**:

- Hover: Slightly darker background
- Focus: 3px ring in primary color
- Disabled: 50% opacity, no pointer events

### Cards

- Warm cream background (slightly lighter than page)
- Subtle border in border color
- 8px border radius
- Padding: 16-24px
- Hover: Border darkens, subtle shadow, slight lift

### Inputs

- White/cream background
- 1px border in border color
- 6px border radius
- Padding: 8px 12px
- Focus: Border changes to primary, 3px ring
- Error: Border and ring in destructive red

### Badges

| Variant         | Style                                   |
| --------------- | --------------------------------------- |
| **Default**     | Primary background at 10%, primary text |
| **Secondary**   | Muted background, muted text            |
| **Outline**     | Transparent with border                 |
| **Destructive** | Red background at 10%, red text         |

### Progress Indicators

- Track: Muted background
- Fill: Primary color
- Animated shimmer on active state

---

## Layout Patterns

### Page Structure

```
┌─────────────────────────────────────┐
│  Header (sticky, blur backdrop)     │
├─────────────────────────────────────┤
│  Banner (optional, dismissible)     │
├─────────────────────────────────────┤
│                                     │
│         Main Content                │
│      (centered, max-width)          │
│                                     │
├─────────────────────────────────────┤
│  Footer (muted text, centered)      │
└─────────────────────────────────────┘
```

### Grid System

- **1 column**: Mobile default
- **2 columns**: Tablet (640px+)
- **3-4 columns**: Desktop (1024px+)
- Gap: 16-24px between items

### Responsive Breakpoints

| Breakpoint | Width  | Target                      |
| ---------- | ------ | --------------------------- |
| sm         | 640px  | Large phones, small tablets |
| md         | 768px  | Tablets                     |
| lg         | 1024px | Laptops, desktops           |

---

## Animation & Motion

### Principles

1. **Subtle**: Animations should enhance, not distract
2. **Fast**: Keep durations under 500ms for UI interactions
3. **Purposeful**: Every animation should communicate state change

### Entry Animations

| Animation      | Duration | Use Case                       |
| -------------- | -------- | ------------------------------ |
| Fade in + rise | 500ms    | Page sections, cards appearing |
| Scale in       | 600ms    | Modals, popovers               |
| Slide up       | 700ms    | Bottom sheets, notifications   |

### Micro-interactions

| Animation    | Duration | Use Case                     |
| ------------ | -------- | ---------------------------- |
| Button press | 100ms    | Scale down slightly on click |
| Hover lift   | 200ms    | Cards, interactive elements  |
| Focus ring   | 150ms    | Input focus state            |

### Loading States

| Animation | Use Case                     |
| --------- | ---------------------------- |
| Pulse     | Skeleton loaders             |
| Spin      | Icon spinners                |
| Shimmer   | Progress bars, loading cards |

### Stagger Pattern

When multiple items appear together, stagger their entry by **80ms** each for a cascading effect.

---

## Iconography

### Style

- **Line icons** (not filled)
- **1.5px stroke** weight
- **Rounded** line caps and joins

### Sizes

| Size | Dimensions | Usage                       |
| ---- | ---------- | --------------------------- |
| sm   | 12x12px    | Inline with small text      |
| md   | 16x16px    | Buttons, inputs, default    |
| lg   | 20x20px    | Feature highlights          |
| xl   | 24x24px    | Empty states, hero sections |

### Colors

- Default: Inherit text color
- Muted: Muted foreground
- Primary: Primary color for emphasis
- Interactive: Primary on hover

---

## Visual Accents

### Background Decorations

- **Gradient orbs**: Large, blurred circles in primary color at 5-15% opacity
- **Grid pattern**: Subtle dot or line grid at 2-3% opacity
- **Noise texture**: Fractal noise overlay at 2-3% opacity for depth

### Dividers

- Use border color at full opacity
- 1px height
- Full width or inset with padding

### Focus States

- **Ring style**: 3px solid ring in primary color at 50% opacity
- **Offset**: 2px from element edge
- Never remove focus indicators

---

## Dark Mode Considerations

### Adjustments

- Reduce shadow intensity (shadows less visible on dark)
- Increase border contrast slightly
- Lighten primary color for better visibility
- Reduce background decoration opacity

### Preserved Elements

- Same border radius values
- Same spacing system
- Same typography scale
- Same animation timings

---

## Do's and Don'ts

### Do

- Use warm, cream-toned neutrals
- Apply subtle hover states to interactive elements
- Maintain consistent spacing rhythm
- Use primary color sparingly for emphasis
- Provide clear focus indicators

### Don't

- Use pure white (#fff) or pure black (#000)
- Over-animate UI elements
- Mix different border radius styles
- Use more than 2 type families
- Remove focus states for aesthetics
