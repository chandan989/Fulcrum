# 🏗️ The Equilibrium Design System (Light Mode)

**"Theme: Clinical Precision"**

> A comprehensive design language for Fulcrum that combines the clarity of technical blueprints with the precision of laboratory instruments. Every element is measured, every line has purpose.

---

## Table of Contents

1. [Core Philosophy](#1-core-philosophy-the-master-blueprint)
2. [Color Palette](#2-color-palette-ceramic--ink)
3. [Typography](#3-typography-patent--typewriter)
4. [UI Components](#4-ui-components-technical-drawings)
5. [Visual Motifs](#5-visual-motifs-drafting-tools)
6. [Spacing & Layout](#6-spacing--layout-the-grid-system)
7. [Animation & Transitions](#7-animation--transitions-mechanical-precision)
8. [Accessibility](#8-accessibility-standards)
9. [CSS Framework](#9-css-framework--utilities)
10. [Component Library](#10-component-library)

---

## 1. Core Philosophy: "The Master Blueprint"

Instead of a control panel in the dark, this feels like a **lit drafting table** or a **sterile laboratory**.

### Design Principles

#### **Visibility**
Everything is illuminated. Shadows are sharp and precise, like an object under a surgical lamp. No element should hide in darkness; clarity is paramount.

#### **Ink on Paper**
High contrast between the background and the content. Borders act like technical ink lines on architectural drawings. Every boundary is deliberate and distinct.

#### **Transparency**
Use subtle blurring and glass textures to represent the "Zero-Knowledge" (ZK) aspect—seeing the proof without touching the data. The interface reveals structure while maintaining privacy.

#### **Measured Precision**
Every spacing value is deliberate. Every alignment is intentional. The interface feels engineered, not decorated.

#### **Technical Honesty**
Show the mechanics. Don't hide complexity behind oversimplification. Users should understand the system's structure at a glance.

---

## 2. Color Palette: "Ceramic & Ink"

### Primary Colors: The Structure (Backgrounds)

#### **Drafting Paper** `#F4F6F8`
- **Usage:** Main application background, page canvas
- **RGB:** `244, 246, 248`
- **HSL:** `210°, 20%, 96%`
- **Purpose:** Reduces eye strain compared to pure white while maintaining brightness
- **Accessibility:** WCAG AAA compliant when paired with dark text

#### **Ceramic White** `#FFFFFF`
- **Usage:** Cards, input fields, modals, elevated surfaces
- **RGB:** `255, 255, 255`
- **Purpose:** Pure, clean white for primary interactive elements
- **Layering:** Always sits on top of Drafting Paper

#### **Guide Grey** `#E1E4E8`
- **Usage:** Grid lines, structural dividers, subtle borders, disabled states
- **RGB:** `225, 228, 232`
- **HSL:** `214°, 14%, 90%`
- **Purpose:** Provides visual structure without competing with content

#### **Porcelain** `#F9FAFB`
- **Usage:** Alternate row backgrounds, subtle highlights, hover states
- **RGB:** `249, 250, 251`
- **Purpose:** Creates visual rhythm in data tables and lists

---

### Secondary Colors: The Ink (Contrast)

#### **Obsidian** `#0B0C10`
- **Usage:** Primary text, heavy borders, structural elements, icons
- **RGB:** `11, 12, 16`
- **HSL:** `225°, 18%, 5%`
- **Contrast Ratio:** 19.8:1 against white (WCAG AAA)
- **Purpose:** Formerly the dark mode background, now provides maximum contrast

#### **Graphite** `#4A5568`
- **Usage:** Body text, secondary information, captions, labels
- **RGB:** `74, 85, 104`
- **HSL:** `218°, 17%, 35%`
- **Contrast Ratio:** 8.6:1 against white (WCAG AAA)
- **Purpose:** Softer text hierarchy without sacrificing readability

#### **Steel** `#6B7280`
- **Usage:** Placeholder text, subtle labels, tertiary information
- **RGB:** `107, 114, 128`
- **HSL:** `220°, 9%, 46%`
- **Purpose:** Lowest priority text while maintaining accessibility

---

### Accent Colors: The Energy

#### **Safety Orange** `#FF4F00`
- **Usage:** Primary CTAs, active states, critical actions, focus indicators
- **RGB:** `255, 79, 0`
- **HSL:** `19°, 100%, 50%`
- **Purpose:** Commands attention like safety markings on laboratory equipment
- **Variants:**
  - **Hover:** `#FF6A1F` (lighter, 20% increase)
  - **Active:** `#E64700` (darker, 10% decrease)
  - **Disabled:** `#FFB899` (50% opacity)

#### **Cobalt Blue** `#0077CC`
- **Usage:** Links, verification badges, informational states, secondary actions
- **RGB:** `0, 119, 204`
- **HSL:** `205°, 100%, 40%`
- **Purpose:** Technical, trustworthy color for system feedback
- **Variants:**
  - **Hover:** `#0088E6` (lighter)
  - **Active:** `#0066B3` (darker)

#### **Success Green** `#10A37F`
- **Usage:** Success messages, completion states, positive indicators
- **RGB:** `16, 163, 127`
- **HSL:** `165°, 82%, 35%`

#### **Warning Amber** `#F59E0B`
- **Usage:** Warning messages, pending states, cautionary information
- **RGB:** `245, 158, 11`
- **HSL:** `38°, 92%, 50%`

#### **Error Red** `#DC2626`
- **Usage:** Error messages, destructive actions, critical alerts
- **RGB:** `220, 38, 38`
- **HSL:** `0°, 73%, 51%`

---

### Semantic Color Usage

```css
:root {
  /* Backgrounds */
  --bg-canvas: #F4F6F8;
  --bg-surface: #FFFFFF;
  --bg-surface-alt: #F9FAFB;
  --bg-overlay: rgba(11, 12, 16, 0.05);
  
  /* Borders */
  --border-primary: #0B0C10;
  --border-secondary: #E1E4E8;
  --border-subtle: #F0F2F5;
  
  /* Text */
  --text-primary: #0B0C10;
  --text-secondary: #4A5568;
  --text-tertiary: #6B7280;
  --text-on-accent: #FFFFFF;
  
  /* Accents */
  --accent-primary: #FF4F00;
  --accent-secondary: #0077CC;
  --accent-success: #10A37F;
  --accent-warning: #F59E0B;
  --accent-error: #DC2626;
}
```

---

## 3. Typography: "Patent & Typewriter"

### Font Families

#### **Display: Chakra Petch**
- **Usage:** Page titles, section headers, hero text, card titles
- **Import:** `@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&display=swap');`
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
- **Character:** Geometric, technical, slightly futuristic
- **Style:** Uppercase for major headings, wide tracking

**Alternative:** **Archivo**
- **Import:** `@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap');`
- **Character:** More traditional, archival quality

#### **Body: Inter**
- **Usage:** Paragraphs, descriptions, UI labels, navigation
- **Import:** `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
- **Character:** Highly legible, optimized for screens
- **Features:** Enable `font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';` for improved readability

#### **Monospace: JetBrains Mono**
- **Usage:** Code blocks, technical labels, data tables, IDs, addresses, timestamps
- **Import:** `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');`
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
- **Character:** Designed for developers, excellent ligatures
- **Purpose:** Reinforces the "technical instrument" aesthetic

---

### Type Scale

Based on a **1.250 (Major Third)** scale with 16px base:

```css
:root {
  /* Font Sizes */
  --text-xs: 0.64rem;    /* 10.24px - Fine print, labels */
  --text-sm: 0.8rem;     /* 12.8px - Captions, metadata */
  --text-base: 1rem;     /* 16px - Body text */
  --text-lg: 1.25rem;    /* 20px - Subheadings */
  --text-xl: 1.563rem;   /* 25px - Section titles */
  --text-2xl: 1.953rem;  /* 31.25px - Page titles */
  --text-3xl: 2.441rem;  /* 39.06px - Hero text */
  --text-4xl: 3.052rem;  /* 48.83px - Major displays */
  
  /* Line Heights */
  --leading-tight: 1.2;
  --leading-snug: 1.4;
  --leading-normal: 1.6;
  --leading-relaxed: 1.8;
  
  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;
}
```

---

### Typography Styles

#### **H1 - Document Title**
```css
.h1 {
  font-family: 'Chakra Petch', sans-serif;
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-primary);
}
```

#### **H2 - Section Header**
```css
.h2 {
  font-family: 'Chakra Petch', sans-serif;
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-primary);
}
```

#### **H3 - Subsection**
```css
.h3 {
  font-family: 'Chakra Petch', sans-serif;
  font-size: var(--text-xl);
  font-weight: 600;
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-normal);
  color: var(--text-primary);
}
```

#### **Body - Regular Text**
```css
.body {
  font-family: 'Inter', sans-serif;
  font-size: var(--text-base);
  font-weight: 400;
  line-height: var(--leading-normal);
  color: var(--text-secondary);
}
```

#### **Label - UI Elements**
```css
.label {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-sm);
  font-weight: 500;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-primary);
}
```

#### **Technical Reference**
```css
.tech-ref {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--accent-primary);
}
```

---

## 4. UI Components: "Technical Drawings"

### A. Cards (The Schematics)

Cards are the primary container for content. They should feel like technical specification sheets.

#### **Standard Card**

```css
.fulcrum-card {
  background: var(--bg-surface);
  border: 2px solid var(--border-primary);
  border-radius: 0; /* Sharp corners for technical feel */
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  
  /* Hard shadow for elevation */
  box-shadow: 6px 6px 0px var(--border-secondary);
  
  position: relative;
  padding: 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.fulcrum-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px var(--border-secondary);
}

/* Technical Reference Label */
.fulcrum-card::before {
  content: attr(data-ref);
  position: absolute;
  top: -14px;
  right: 16px;
  background: var(--bg-surface);
  padding: 0 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: var(--tracking-wider);
  border-left: 2px solid var(--border-primary);
  border-right: 2px solid var(--border-primary);
  color: var(--accent-primary);
  text-transform: uppercase;
}
```

**HTML Usage:**
```html
<div class="fulcrum-card" data-ref="ZK-01">
  <h3>Zero-Knowledge Proof</h3>
  <p>Verify transactions without revealing data.</p>
</div>
```

#### **Card Variants**

**Elevated Card** (Higher priority content):
```css
.fulcrum-card--elevated {
  border-width: 3px;
  box-shadow: 8px 8px 0px var(--border-secondary);
}
```

**Muted Card** (Background information):
```css
.fulcrum-card--muted {
  background: var(--bg-surface-alt);
  border-color: var(--border-secondary);
  box-shadow: 4px 4px 0px var(--border-subtle);
}
```

**Accent Card** (Important notifications):
```css
.fulcrum-card--accent {
  border-color: var(--accent-primary);
  box-shadow: 6px 6px 0px rgba(255, 79, 0, 0.2);
}
```

---

### B. Buttons (The Switches)

Buttons are decisive action triggers with clear affordances.

#### **Primary Button**
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  background: var(--accent-primary);
  color: var(--text-on-accent);
  border: 2px solid var(--accent-primary);
  border-radius: 0;
  
  padding: 12px 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.btn-primary:hover {
  background: #FF6A1F;
  border-color: #FF6A1F;
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px var(--border-primary);
}

.btn-primary:active {
  background: #E64700;
  border-color: #E64700;
  transform: translate(0, 0);
  box-shadow: 2px 2px 0px var(--border-primary);
}

.btn-primary:disabled {
  background: #FFB899;
  border-color: #FFB899;
  cursor: not-allowed;
  opacity: 0.6;
}
```

#### **Secondary Button (Outline)**
```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 2px solid var(--border-primary);
  border-radius: 0;
  
  padding: 12px 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--bg-surface-alt);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px var(--border-secondary);
}
```

#### **Tertiary Button (Text)**
```css
.btn-tertiary {
  background: transparent;
  color: var(--accent-secondary);
  border: none;
  
  padding: 8px 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  text-decoration: underline;
  text-underline-offset: 4px;
  
  cursor: pointer;
  transition: color 0.2s ease;
}

.btn-tertiary:hover {
  color: #0088E6;
}
```

#### **Icon Button**
```css
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  width: 40px;
  height: 40px;
  background: var(--bg-surface);
  border: 2px solid var(--border-primary);
  border-radius: 0;
  
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background: var(--bg-surface-alt);
  box-shadow: 3px 3px 0px var(--border-secondary);
}
```

---

### C. Form Elements

#### **Input Fields**
```css
.input {
  width: 100%;
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 2px solid var(--border-secondary);
  border-radius: 0;
  
  padding: 12px 16px;
  font-family: 'Inter', sans-serif;
  font-size: var(--text-base);
  
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input:hover {
  border-color: var(--border-primary);
}

.input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(255, 79, 0, 0.1);
}

.input::placeholder {
  color: var(--text-tertiary);
  font-style: italic;
}

/* With Label */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-primary);
}
```

#### **Select Dropdown**
```css
.select {
  width: 100%;
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 2px solid var(--border-secondary);
  border-radius: 0;
  
  padding: 12px 16px;
  font-family: 'Inter', sans-serif;
  font-size: var(--text-base);
  
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%230B0C10' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}
```

#### **Checkbox**
```css
.checkbox {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-primary);
  background: var(--bg-surface);
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox:checked {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
}

.checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 14px;
}
```

---

### D. Data Display (The Lab Report)

#### **Tables**
```css
.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 2px solid var(--border-primary);
  background: var(--bg-surface);
  font-family: 'Inter', sans-serif;
}

.data-table thead {
  background: var(--bg-canvas);
  border-bottom: 2px solid var(--border-primary);
}

.data-table th {
  padding: 12px 16px;
  text-align: left;
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-primary);
  border-right: 1px solid var(--border-secondary);
}

.data-table th:last-child {
  border-right: none;
}

.data-table tbody tr {
  border-bottom: 1px solid var(--border-secondary);
}

.data-table tbody tr:nth-child(even) {
  background: var(--bg-surface-alt);
}

.data-table tbody tr:hover {
  background: rgba(255, 79, 0, 0.05);
}

.data-table td {
  padding: 12px 16px;
  font-size: var(--text-sm);
  color: var(--text-secondary);
  border-right: 1px solid var(--border-secondary);
}

.data-table td:last-child {
  border-right: none;
}

/* Monospace data columns (addresses, IDs, etc.) */
.data-table td.mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-xs);
}
```

#### **Code Blocks**
```css
.code-block {
  background: #F0F2F5;
  border: 2px solid var(--border-secondary);
  border-left: 4px solid var(--accent-secondary);
  padding: 16px;
  overflow-x: auto;
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: #24292E;
}

.code-block code {
  font-family: inherit;
  font-size: inherit;
}

/* Inline code */
.code-inline {
  background: #F0F2F5;
  border: 1px solid var(--border-secondary);
  padding: 2px 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9em;
  color: var(--accent-secondary);
}
```

#### **Badge/Tag**
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  
  padding: 4px 12px;
  background: var(--bg-canvas);
  border: 1px solid var(--border-primary);
  
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-primary);
}

.badge--success {
  background: rgba(16, 163, 127, 0.1);
  border-color: var(--accent-success);
  color: var(--accent-success);
}

.badge--warning {
  background: rgba(245, 158, 11, 0.1);
  border-color: var(--accent-warning);
  color: var(--accent-warning);
}

.badge--error {
  background: rgba(220, 38, 38, 0.1);
  border-color: var(--accent-error);
  color: var(--accent-error);
}
```

---

### E. Navigation

#### **Top Navigation Bar**
```css
.navbar {
  background: var(--bg-surface);
  border-bottom: 2px solid var(--border-primary);
  padding: 16px 24px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.navbar-brand {
  font-family: 'Chakra Petch', sans-serif;
  font-size: var(--text-xl);
  font-weight: 700;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-primary);
}

.navbar-nav {
  display: flex;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-link {
  padding: 8px 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: none;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.navbar-link:hover {
  color: var(--text-primary);
  border-bottom-color: var(--accent-primary);
}

.navbar-link.active {
  color: var(--accent-primary);
  border-bottom-color: var(--accent-primary);
}
```

#### **Sidebar Navigation**
```css
.sidebar {
  width: 280px;
  background: var(--bg-surface);
  border-right: 2px solid var(--border-primary);
  padding: 24px 0;
  
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-item {
  padding: 12px 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: none;
  border-left: 3px solid transparent;
  transition: all 0.2s ease;
}

.sidebar-item:hover {
  background: var(--bg-surface-alt);
  color: var(--text-primary);
}

.sidebar-item.active {
  background: rgba(255, 79, 0, 0.05);
  color: var(--accent-primary);
  border-left-color: var(--accent-primary);
}
```

---

### F. Modals & Overlays

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(11, 12, 16, 0.6);
  backdrop-filter: blur(4px);
  
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1000;
}

.modal {
  background: var(--bg-surface);
  border: 3px solid var(--border-primary);
  box-shadow: 12px 12px 0px var(--border-secondary);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-header {
  padding: 24px;
  border-bottom: 2px solid var(--border-secondary);
  
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-family: 'Chakra Petch', sans-serif;
  font-size: var(--text-xl);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-primary);
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 24px;
  border-top: 2px solid var(--border-secondary);
  
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
```

---

## 5. Visual Motifs: "Drafting Tools"

### A. The Grid (Graph Paper Background)

```css
.canvas-grid {
  background-color: var(--bg-canvas);
  background-image: 
    linear-gradient(var(--border-secondary) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-secondary) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: -1px -1px;
}

/* Heavier grid lines every 100px */
.canvas-grid--measured {
  background-color: var(--bg-canvas);
  background-image: 
    linear-gradient(var(--border-secondary) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-secondary) 1px, transparent 1px),
    linear-gradient(rgba(11, 12, 16, 0.1) 2px, transparent 2px),
    linear-gradient(90deg, rgba(11, 12, 16, 0.1) 2px, transparent 2px);
  background-size: 20px 20px, 20px 20px, 100px 100px, 100px 100px;
  background-position: -1px -1px, -1px -1px, -2px -2px, -2px -2px;
}
```

---

### B. Rulers & Measurements

```css
.ruler-horizontal {
  height: 30px;
  background: var(--bg-surface);
  border-bottom: 2px solid var(--border-primary);
  position: relative;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
}

/* Generate tick marks */
.ruler-horizontal::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-image: repeating-linear-gradient(
    to right,
    var(--border-primary) 0px,
    var(--border-primary) 1px,
    transparent 1px,
    transparent 10px
  );
}

/* Vertical ruler */
.ruler-vertical {
  width: 30px;
  background: var(--bg-surface);
  border-right: 2px solid var(--border-primary);
  position: relative;
}

.ruler-vertical::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-image: repeating-linear-gradient(
    to bottom,
    var(--border-primary) 0px,
    var(--border-primary) 1px,
    transparent 1px,
    transparent 10px
  );
}
```

---

### C. Connector Lines (Dotted Paths)

```css
/* Connector lines to show relationships */
.connector-line {
  position: absolute;
  border-top: 2px dotted var(--accent-secondary);
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Show on hover of connected elements */
.connected-element:hover ~ .connector-line,
.connector-line:hover {
  opacity: 1;
}

/* Animated dotted line */
@keyframes dash {
  to {
    stroke-dashoffset: -20;
  }
}

.connector-svg {
  stroke: var(--accent-secondary);
  stroke-width: 2;
  stroke-dasharray: 5, 5;
  animation: dash 0.5s linear infinite;
  fill: none;
}
```

---

### D. Corner Brackets (Registration Marks)

```css
/* Corner brackets for emphasis */
.bracket-corners {
  position: relative;
}

.bracket-corners::before,
.bracket-corners::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid var(--accent-primary);
}

.bracket-corners::before {
  top: -4px;
  left: -4px;
  border-right: none;
  border-bottom: none;
}

.bracket-corners::after {
  top: -4px;
  right: -4px;
  border-left: none;
  border-bottom: none;
}

/* Bottom corners with pseudo-elements on a wrapper */
.bracket-wrapper::before,
.bracket-wrapper::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid var(--accent-primary);
}

.bracket-wrapper::before {
  bottom: -4px;
  left: -4px;
  border-right: none;
  border-top: none;
}

.bracket-wrapper::after {
  bottom: -4px;
  right: -4px;
  border-left: none;
  border-top: none;
}
```

---

### E. Technical Diagrams (SVG Icons)

Use sharp, geometric SVG icons with 2px strokes. Avoid rounded corners.

```css
.technical-icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: square;
  stroke-linejoin: miter;
  fill: none;
}
```

**Recommended icon sets:**
- **Lucide Icons** (with `stroke-linecap="square"`)
- **Heroicons** (Outline variant)
- Custom technical diagrams

---

## 6. Spacing & Layout: "The Grid System"

### Spacing Scale

Based on **8px baseline grid**:

```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px - Base unit */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.5rem;   /* 24px */
  --space-6: 2rem;     /* 32px */
  --space-8: 3rem;     /* 48px */
  --space-10: 4rem;    /* 64px */
  --space-12: 6rem;    /* 96px */
  --space-16: 8rem;    /* 128px */
}
```

### Container Widths

```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--space-5);
}

.container--sm { max-width: 640px; }
.container--md { max-width: 768px; }
.container--lg { max-width: 1024px; }
.container--xl { max-width: 1280px; }
.container--2xl { max-width: 1536px; }
```

### Layout Grid

```css
.grid {
  display: grid;
  gap: var(--space-5);
}

.grid--2 { grid-template-columns: repeat(2, 1fr); }
.grid--3 { grid-template-columns: repeat(3, 1fr); }
.grid--4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive */
.grid--responsive {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

---

## 7. Animation & Transitions: "Mechanical Precision"

### Timing Functions

```css
:root {
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-mechanical: cubic-bezier(0.45, 0.05, 0.55, 0.95);
}
```

### Standard Transitions

```css
/* Button/Interactive elements */
transition: all 0.2s var(--ease-out);

/* Layout shifts */
transition: all 0.3s var(--ease-in-out);

/* Modals/Overlays */
transition: all 0.4s var(--ease-mechanical);
```

### Keyframe Animations

#### **Slide In From Right**
```css
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-right {
  animation: slideInRight 0.4s var(--ease-out);
}
```

#### **Fade In**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.3s var(--ease-out);
}
```

#### **Pulse (For active elements)**
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.pulse {
  animation: pulse 2s var(--ease-in-out) infinite;
}
```

---

## 8. Accessibility Standards

### Focus States

```css
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 3px solid var(--accent-primary);
  outline-offset: 2px;
}

/* Alternative ring style */
.focus-ring:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 79, 0, 0.3);
}
```

### Color Contrast

All text must meet **WCAG AA** standards minimum:
- **Large text (18pt+):** 3:1 contrast ratio
- **Normal text:** 4.5:1 contrast ratio

Aim for **WCAG AAA** where possible:
- **Large text:** 4.5:1
- **Normal text:** 7:1

### Screen Reader Support

```css
/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. CSS Framework & Utilities

### Reset & Base Styles

```css
/* Modern CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Inter', sans-serif;
  color: var(--text-secondary);
  background: var(--bg-canvas);
  line-height: var(--leading-normal);
  min-height: 100vh;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

button {
  cursor: pointer;
  background: none;
  border: none;
}

a {
  color: inherit;
  text-decoration: none;
}
```

### Utility Classes

```css
/* Display */
.block { display: block; }
.inline { display: inline; }
.inline-block { display: inline-block; }
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.grid { display: grid; }
.hidden { display: none; }

/* Flexbox */
.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-end { justify-content: flex-end; }
.gap-2 { gap: var(--space-2); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }

/* Spacing */
.p-2 { padding: var(--space-2); }
.p-4 { padding: var(--space-4); }
.p-6 { padding: var(--space-6); }
.m-2 { margin: var(--space-2); }
.m-4 { margin: var(--space-4); }
.m-6 { margin: var(--space-6); }

/* Text */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }
.uppercase { text-transform: uppercase; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }

/* Colors */
.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-accent { color: var(--accent-primary); }
.bg-surface { background: var(--bg-surface); }
.bg-canvas { background: var(--bg-canvas); }
```

---

## 10. Component Library

### Complete Card Example

```html
<div class="fulcrum-card" data-ref="TX-4892">
  <div class="flex items-center justify-between mb-4">
    <h3 class="h3">Transaction Details</h3>
    <span class="badge badge--success">Verified</span>
  </div>
  
  <div class="grid grid--2 gap-4">
    <div class="input-group">
      <label class="input-label">From Address</label>
      <input type="text" class="input" value="0x742d..." readonly>
    </div>
    
    <div class="input-group">
      <label class="input-label">To Address</label>
      <input type="text" class="input" value="0x89ab..." readonly>
    </div>
  </div>
  
  <div class="flex gap-4 mt-6">
    <button class="btn-primary">Approve</button>
    <button class="btn-secondary">Details</button>
  </div>
</div>
```

### Complete Form Example

```html
<form class="fulcrum-card" data-ref="FORM-01">
  <h2 class="h2 mb-6">Create Intent</h2>
  
  <div class="flex flex-col gap-5">
    <div class="input-group">
      <label class="input-label" for="intent-name">Intent Name</label>
      <input 
        type="text" 
        id="intent-name" 
        class="input" 
        placeholder="Enter intent name..."
      >
    </div>
    
    <div class="input-group">
      <label class="input-label" for="chain-select">Target Chain</label>
      <select id="chain-select" class="select">
        <option>Select a chain...</option>
        <option>Ethereum</option>
        <option>Casper</option>
        <option>Polygon</option>
      </select>
    </div>
    
    <div class="input-group">
      <label class="input-label" for="gas-limit">Gas Limit</label>
      <input 
        type="number" 
        id="gas-limit" 
        class="input" 
        placeholder="21000"
      >
    </div>
    
    <div class="flex items-center gap-3">
      <input type="checkbox" id="zk-proof" class="checkbox">
      <label for="zk-proof" class="body">Enable Zero-Knowledge Proof</label>
    </div>
  </div>
  
  <div class="flex gap-4 mt-6">
    <button type="submit" class="btn-primary">Submit Intent</button>
    <button type="button" class="btn-secondary">Cancel</button>
  </div>
</form>
```

### Complete Data Table Example

```html
<div class="fulcrum-card" data-ref="TABLE-01">
  <h3 class="h3 mb-4">Recent Transactions</h3>
  
  <table class="data-table">
    <thead>
      <tr>
        <th>TX Hash</th>
        <th>From</th>
        <th>To</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="mono">0x7f3b...92ac</td>
        <td class="mono">0x742d...8ef1</td>
        <td class="mono">0x89ab...7c2d</td>
        <td>1.5 CSPR</td>
        <td><span class="badge badge--success">Confirmed</span></td>
      </tr>
      <tr>
        <td class="mono">0x8a4c...13bd</td>
        <td class="mono">0x612e...9fg2</td>
        <td class="mono">0x93bc...8d3e</td>
        <td>0.8 CSPR</td>
        <td><span class="badge badge--warning">Pending</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Import Google Fonts (Chakra Petch, Inter, JetBrains Mono)
- [ ] Set up CSS custom properties (colors, spacing, typography)
- [ ] Implement CSS reset and base styles
- [ ] Create grid background system

### Phase 2: Core Components
- [ ] Build card component with variants
- [ ] Create button system (primary, secondary, tertiary, icon)
- [ ] Implement form elements (input, select, checkbox, radio)
- [ ] Design data display components (table, code block, badge)

### Phase 3: Layout & Navigation
- [ ] Create navigation bar component
- [ ] Build sidebar navigation
- [ ] Implement modal/overlay system
- [ ] Set up container and grid utilities

### Phase 4: Visual Enhancement
- [ ] Add ruler and measurement decorations
- [ ] Implement connector line system
- [ ] Create corner bracket styling
- [ ] Design technical icon system

### Phase 5: Polish & Accessibility
- [ ] Implement focus states
- [ ] Add animation and transitions
- [ ] Test color contrast ratios
- [ ] Add reduced motion support
- [ ] Create utility class library

---

## Usage Guidelines

### Do's ✅
- Use the grid system for all layouts
- Maintain sharp corners and hard shadows
- Apply uppercase with letter-spacing for labels and headings
- Use monospace font for technical data (addresses, IDs, hashes)
- Keep borders heavy and distinct (2-3px)
- Add technical reference labels to cards
- Show system structure through connector lines

### Don'ts ❌
- Don't use rounded corners
- Don't use soft, blurred shadows
- Don't use low-contrast colors
- Don't mix typefaces outside the defined families
- Don't create gradients on backgrounds (use for accents only)
- Don't hide structural elements

---

## Browser Support

- **Chrome/Edge:** 90+
- **Firefox:** 88+
- **Safari:** 14+
- **Mobile:** iOS 14+, Android 9+

---

## Resources

### Fonts
- [Chakra Petch on Google Fonts](https://fonts.google.com/specimen/Chakra+Petch)
- [Inter on Google Fonts](https://fonts.google.com/specimen/Inter)
- [JetBrains Mono on Google Fonts](https://fonts.google.com/specimen/JetBrains+Mono)

### Tools
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Type Scale Calculator](https://type-scale.com/)
- [CSS Grid Generator](https://cssgrid-generator.netlify.app/)

---

**Version:** 1.0  
**Last Updated:** January 4, 2026  
**Maintained by:** Fulcrum Design Team
