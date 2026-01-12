# Forest International School - Engineering Documentation

This document is for developers and maintainers of the Forest International School website.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Content Editing Guide](#content-editing-guide)
3. [Multilingual System](#multilingual-system)
4. [Adding New Pages](#adding-new-pages)
5. [Styling System](#styling-system)
6. [Image Management](#image-management)
7. [Video Embedding](#video-embedding)
8. [Deployment](#deployment)
9. [Common Tasks](#common-tasks)
10. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### Tech Stack
- **Framework**: Astro 5.x (Static Site Generator)
- **Styling**: Tailwind CSS 4.x
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Icons**: Inline SVG
- **Hosting**: Cloudflare Pages

### Key Directories
```
src/
├── components/          # Reusable UI components
│   ├── Navigation.astro # Main navigation (multilingual)
│   └── Footer.astro     # Site footer (multilingual)
├── layouts/
│   └── Layout.astro     # Base HTML layout
├── pages/
│   ├── en/              # English pages
│   ├── fr/              # French pages
│   └── index.astro      # Redirects to /en
├── styles/
│   └── global.css       # Global styles & Tailwind config
└── assets/
    └── images/          # Site images
public/
└── images/              # Static images (directly accessible)
```

---

## Content Editing Guide

### For Principal / Non-Technical Users

**Option 1: Request Changes via Email**
Send change requests to the developer with:
- Which page to modify (e.g., "About page")
- Exact text to change (old text → new text)
- Any new images (attach files)
- Changes needed in BOTH English AND French

**Option 2: Use AI Assistance (Claude)**
1. Open the file you want to edit
2. Describe changes to Claude
3. Claude will provide updated code
4. Copy-paste into the file

### For Developers

Each page is a `.astro` file containing:
- Frontmatter (---) with imports
- HTML with Tailwind classes
- Component usage

Example edit:
```astro
// Before
<p class="text-gray-600">Old text here</p>

// After
<p class="text-gray-600">New text here</p>
```

---

## Multilingual System

### CRITICAL: EN/FR Synchronization

**Every content change MUST be made in BOTH languages!**

| English File | French File |
|--------------|-------------|
| `src/pages/en/index.astro` | `src/pages/fr/index.astro` |
| `src/pages/en/about.astro` | `src/pages/fr/about.astro` |
| `src/pages/en/early-years.astro` | `src/pages/fr/early-years.astro` |
| `src/pages/en/primary.astro` | `src/pages/fr/primary.astro` |
| `src/pages/en/middle-school.astro` | `src/pages/fr/middle-school.astro` |
| `src/pages/en/admissions.astro` | `src/pages/fr/admissions.astro` |
| `src/pages/en/tuition.astro` | `src/pages/fr/tuition.astro` |
| `src/pages/en/summer-camp.astro` | `src/pages/fr/summer-camp.astro` |
| `src/pages/en/contact.astro` | `src/pages/fr/contact.astro` |

### Language Switcher
Located in `src/components/Navigation.astro`:
- Automatically switches between `/en/*` and `/fr/*`
- Uses `hreflang` tags for SEO

### Translation Components
Navigation and Footer have built-in translations:
```javascript
const translations = {
  en: { home: 'Home', about: 'About', ... },
  fr: { home: 'Accueil', about: 'A Propos', ... }
};
```

---

## Adding New Pages

### Step 1: Create English Version
Create `src/pages/en/new-page.astro`:
```astro
---
import Layout from '../../layouts/Layout.astro';
---

<Layout title="Page Title" lang="en">
  <!-- Content here -->
</Layout>
```

### Step 2: Create French Version
Create `src/pages/fr/new-page.astro`:
```astro
---
import Layout from '../../layouts/Layout.astro';
---

<Layout title="Titre de Page" lang="fr">
  <!-- Contenu ici -->
</Layout>
```

### Step 3: Update Navigation
Edit `src/components/Navigation.astro`:
1. Add to `translations` object
2. Add link in navigation menu

---

## Styling System

### Color Palette
```css
--color-forest-green: #2d5a3d;   /* Primary */
--color-forest-light: #4a7c5c;   /* Secondary */
--color-forest-dark: #1e3d29;    /* Dark accent */
--color-cream: #faf8f5;          /* Background */
--color-warm-brown: #8b7355;     /* Wood accent */
--color-gold: #c9a962;           /* Highlight */
```

### Utility Classes (defined in global.css)
```css
.btn-primary    /* Green button */
.btn-secondary  /* Outlined button */
.section-title  /* Large headings */
.card           /* Card container */
```

### Responsive Breakpoints
- `sm:` 640px+
- `md:` 768px+
- `lg:` 1024px+
- `xl:` 1280px+

---

## Image Management

### Image Locations
```
public/images/           # Static images (use /images/filename.jpg)
src/assets/images/       # Processed images (import in Astro)
```

### Adding New Images
1. Place image in `public/images/`
2. Reference in HTML:
```html
<img src="/images/hero-forest.jpg" alt="Description" class="w-full h-auto" />
```

### Image Optimization Tips
- Use WebP format when possible
- Compress images before uploading
- Add meaningful alt text for accessibility
- Use lazy loading for below-fold images:
```html
<img src="/images/photo.jpg" alt="..." loading="lazy" />
```

---

## Video Embedding

### YouTube Videos
```html
<div class="aspect-video">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    class="w-full h-full rounded-xl"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>
```

### Vimeo Videos
```html
<div class="aspect-video">
  <iframe
    src="https://player.vimeo.com/video/VIDEO_ID"
    class="w-full h-full rounded-xl"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>
```

### Self-Hosted Videos
```html
<video controls class="w-full rounded-xl">
  <source src="/videos/school-tour.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

---

## Deployment

### Cloudflare Pages (Automatic)
1. Push changes to GitHub
2. Cloudflare automatically rebuilds and deploys

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to Cloudflare Pages
```

### Environment Variables
Currently none required. If needed, add to Cloudflare Pages dashboard.

---

## Common Tasks

### Change Contact Information
1. Edit `src/components/Footer.astro` (both address and phone)
2. Edit `src/pages/en/contact.astro` and `src/pages/fr/contact.astro`

### Update Tuition Fees
1. Edit `src/pages/en/tuition.astro`
2. Edit `src/pages/fr/tuition.astro` (translate new amounts)

### Add News/Announcement
Consider creating a news component or adding an announcement banner to Layout.astro

### Change School Logo
1. Replace `public/favicon.svg`
2. Update logo in `Navigation.astro`

---

## Troubleshooting

### Build Fails
```bash
# Check for errors
npm run build

# Common issues:
# - Missing closing tags in .astro files
# - Import path errors
# - Invalid Tailwind classes
```

### Styles Not Updating
```bash
# Restart dev server
npm run dev

# Clear cache
rm -rf node_modules/.vite
```

### Images Not Showing
- Check file path (case-sensitive)
- Ensure image is in `public/` folder
- Verify file extension matches

### Dev Server Won't Start
```bash
# Use correct Node version
nvm use 20.18

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Support Contacts

- **Technical Issues**: Contact developer
- **Content Updates**: Contact school administration
- **AI Assistance**: Use Claude (claude.ai) for code help

---

Last Updated: January 2025
