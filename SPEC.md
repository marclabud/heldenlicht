# Specification: Heldenlicht (HeroFest Photo Gallery)

## 1. Project Overview
- **Project Name:** Heldenlicht
- **Domain:** heldenlicht.ch
- **Purpose:** A high-performance, dark-mode photography portfolio and cosplay gallery tailored for HeroFest (Bernexpo).
- **Core Requirement:** Fast deployment, responsive masonry/grid layout, and dynamic asset loading via Cloudflare R2 to allow rapid photo uploads during the event.

## 2. Tech Stack & Architecture
- **Framework:** Nuxt 4 (Vue 3 Composition API, `<script setup>`)
- **Styling:** Tailwind CSS 4 with a custom dark-mode aesthetic (`bg-zinc-950`, zinc text scales, subtle accent glows).
- **Asset Storage:** Cloudflare R2 object storage mapped to a custom public CDN domain (`https://cdn.heldenlicht.ch`).
- **Hosting Target:** Cloudflare Pages (Static/Edge deployment).

## 3. Core Features & Components

### A. Main Gallery Page (`app.vue` or `pages/index.vue`)
- **Header / Hero Section:** Minimalist typography featuring the title **HELDENLICHT** and a subtitle (*HeroFest Photography & Cosplay*).
- **Responsive Grid:** A fluid CSS grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`) optimized for both mobile browsing at the convention and desktop screens.
- **Image Cards:** Rounded thumbnails with smooth hover scaling (`transition-transform duration-500 hover:scale-105`) and subtle gradient overlays revealing image titles or metadata on hover.
- **Lazy Loading:** Native `loading="lazy"` or Nuxt image optimizations to ensure instant page loads even on cellular data at Bernexpo.

### B. Interactive Lightbox Modal (`components/LightboxModal.vue`)
- **Trigger:** Clicking any thumbnail opens a full-screen, immersive overlay (`backdrop-blur-md bg-black/90`).
- **Controls:**
  - Close button (`Esc` key support).
  - Previous / Next navigation buttons (`ArrowLeft` / `ArrowRight` key support).
- **Display:** High-resolution rendering of the selected R2 asset with centered scaling and a caption area.

### C. R2 Asset Integration (`utils/gallery.ts` or Data Layer)
- **Environment Variable:** Utilize `NUXT_PUBLIC_R2_URL=https://cdn.heldenlicht.ch`.
- **Dynamic Manifest / Source:** Set up a clean data structure or JSON manifest of image objects so new HeroFest shots can be appended instantly without recompiling the entire application code.

## 4. Implementation Tasks for Antigravity
1. **Scaffold Components:** Create the main page layout, the photo grid loop, and the interactive lightbox component following the Nuxt 4 directory structure.
2. **Configure Tailwind Styling:** Ensure the dark-mode theme, custom aspect ratios (`aspect-[4/5]` or `aspect-square`), and subtle accent glows are fully wired using Tailwind CSS 4.
3. **Wire R2 Environment:** Implement runtime configuration to pull image URLs dynamically from `cdn.heldenlicht.ch`.
4. **Build Verification:** Ensure the project builds cleanly for Cloudflare Pages deployment with zero type errors.
