# Mu Theta Lambda Alumni Chapter
### Black Greek Alumni Chapter Digital Model & Portfolio

> An architectural web prototype embodying the **Shopify Midnight Bazaar under Mint Lanterns** dark-mode design system. Built with vanilla HTML5, CSS3, and JavaScript, prioritizing visual restraint, clear spatial rhythm, and responsive mobile-first craftsmanship.

---

## 🏛️ Project Overview

**Mu Theta Lambda Alumni Chapter** represents a digital headquarters for a distinguished Black Greek-letter alumni organization (founded and chartered December 4, 1978). The platform bridges fraternal heritage, collegiate mentorship, philanthropic endowment, and active civic service across the greater metropolitan area.

---

## ✨ Design Language & Aesthetic Foundations

This prototype adheres strictly to the **Shopify Midnight Bazaar** design reference:

| Token | Hex / Value | Architectural Role |
| :--- | :--- | :--- |
| **Abyssal Ink** | `#02090a` | Page canvas & hero background with deep forest undertones |
| **Forest Floor** | `#041e18` | Elevated card panels and content containers |
| **Deep Canopy** | `#072720` | Secondary card elevations, nav surfaces, and modal chrome |
| **Midnight Tinge** | `#000a1e` | Sectional cooler dark for alternating rhythm |
| **Iron Veil** | `#1e2c31` | Hairline borders and glass-edge card outlines |
| **Moss Border** | `#093329` | Atmospheric list dividers and card inset accents |
| **Mint Signal** | `#36f4a4` | Brand semantic punctuation, keyword highlights, active dots (*Never used as a button fill*) |
| **Pure White** | `#ffffff` | High-contrast primary CTA fill (`#02090a` text) and display typography |

### Typography Voice
- **Display Headlines**: Set at whisper-weight **330** at 34px–76px with generous letter-spacing (0.015em–0.04em). Authority through restraint rather than shouting at bold weights.
- **Micro-copy & Buttons**: Inter-Variable (weight 550, 0.05em uppercase letter-spacing) with OpenType features (`"ss03"` alternate glyphs).

---

## 📱 Mobile-First & Spacing Refactor

The navigation and layouts have been re-engineered for clarity and space:

- **Uncluttered Desktop Navigation**:
  - Balanced 3-column header: Left-aligned chapter crest with charter badge, centered navigation links with generous breathing room (`Impact`, `Initiatives`, `Leadership`, `Auxiliaries`, `Foundation`), and right-aligned action cluster.
  - Dedicated **Intranet** text action, ghost outline **Scholarship** action, and the signature white pill **Pay Dues** button.
- **Mobile-First Experience**:
  - Compact header for mobile screens with a quick-action "Pay Dues" pill and an animated 3-bar hamburger button that morphs into an `X`.
  - Full frosted-glass mobile drawer (`backdrop-filter: blur(24px)`) containing large touch-friendly links (minimum 52px height) with chevron indicators.
  - Quick action panel for full-width payment, scholarship application, and member authentication.
  - 16px form inputs prevent unwanted iOS Safari auto-zoom.
  - Smooth horizontal scrolling for lineage tabs and the historical past presidents roster table.

---

## 🧩 Key Functional Modules

1. **Global Header & Intranet**
   - Fraternal Crest vector with Greek letters **ΜΘΛ**, torch of guidance, and laurel wreath.
   - Quick triggers for Member Intranet, Scholarship Application, and Dues.

2. **Cinematic Hero**
   - High-resolution photograph of chapter brothers in formal black-tie tuxedos at the annual alumni gala.
   - Whisper-weight display headline overlaid in the lower-left quadrant with ambient mint lantern glow.
   - Quick statistical summary strip.

3. **Primary Value Blocks**
   - **Our Impact**:
     - **14,850+** Community Service Hours Logged (viewport-triggered eased counter).
     - **$285,000+** High School Scholarships Awarded.
     - **620+** Mentoring Program Participants.
     - Breakdown pillars for active scholars, MLK meals, graduation rate, and advised chapters.
   - **Upcoming Initiatives**:
     - *47th Annual Black & Gold Scholarship Gala* (Featured media card with ticket booking).
     - *Metro Youth Leadership & STEM Summit* (Registration workflow).
     - *MLK Day of Service & Food Security Blitz*.
   - **Lineage & Leadership**:
     - Interactive tabbed directory switching between **Executive Officers**, **Past Presidents & Basilei**, and the **Charter Members Roster** (The Founding Nine).
   - **Undergraduate & Youth Auxiliaries**:
     - Collegiate Advisory Division (*Theta Alpha*, *Gamma Delta*, *Zeta Epsilon* campus chapters).
     - Youth Mentoring Auxiliary (*Mu Theta Alpha Achievers Academy*, Project Alpha, and Beautillion Cotillion) in an asymmetric media card layout (20px opposite corners).

4. **Dual Tax-Exempt Legal Compliance & Footer**
   - Autonomous local alumni entity disclaimer governed under its national fraternal constitution.
   - Dual status notice: **501(c)(7)** fraternal alumni chapter & **501(c)(3)** tax-deductible Educational Foundation (EIN: 58-2940192).
   - Interactive inquiry contact form and P.O. Box mailing headquarters.

5. **Interactive Portals (Modals)**
   - **Pay Dues Portal**: Interactive tier calculator (Regular Active, Life Member, Senior Brother, Reclamation) dynamically computing local operational vs. national per capita dues with live receipt updates.
   - **Scholarship Portal**: Foundation criteria checklist, unweighted GPA validation, and personal statement submission.
   - **Gala Ticket Reservations**: Individual patron, couples, table host, and benefactor sponsorship reservation tiers.

---

## 📂 Repository File Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline for Vercel
├── assets/
│   ├── hero_annual_gala.jpg    # High-resolution gala banquet photograph
│   └── youth_mentoring.jpg     # High-resolution youth STEM workshop photo
├── index.html                  # Accessible HTML5 structure with SEO metadata & modals
├── styles.css                  # Custom Shopify Midnight Bazaar CSS design system
├── script.js                   # Interactive client controllers (counters, tabs, modals, drawer)
├── vercel.json                 # Vercel routing, security headers & caching configuration
└── README.md                   # Project documentation & operational reference
```

---

## 🚀 Local Development

To run and preview the project locally, you can use any static HTTP server:

### Option A: Python (Built-in)
```bash
python -m http.server 8080 --directory "."
```
Visit `http://localhost:8080` in your web browser.

### Option B: Node.js (npx serve)
```bash
npx serve .
```

---

## ⚡ Vercel Deployment & Workflow

### 1. Zero-Config Deployment with Vercel CLI
```bash
# Login to Vercel
npx vercel login

# Deploy to preview
npx vercel

# Deploy to production
npx vercel --prod
```

### 2. GitHub Actions CI/CD (`.github/workflows/deploy.yml`)
The included workflow automatically deploys:
- **Preview Environments** on every Pull Request to `main`.
- **Production Deployments** on every direct push to `main`.

#### Required GitHub Secrets:
Add the following secrets under **Settings > Secrets and variables > Actions**:
1. `VERCEL_TOKEN` — Your personal access token from [Vercel Account Tokens](https://vercel.com/account/tokens).
2. `VERCEL_ORG_ID` — Your Vercel team or user ID (found in `.vercel/project.json` or team settings).
3. `VERCEL_PROJECT_ID` — Your Vercel project ID (found in Project Settings > General).

### 3. Vercel Configuration (`vercel.json`)
- Clean URLs enabled (`/initiatives` resolves cleanly).
- Caching headers: 1-year immutable cache on `/assets/`, 24-hour cache on CSS/JS with `stale-while-revalidate`.
- Standard security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`.

---

## 📜 Fraternal Governance Notice

Mu Theta Lambda Alumni Chapter is an autonomous regional affiliate. All fraternal emblems, insignias, and historical lineage markers are curated under authorized alumni stewardship.
