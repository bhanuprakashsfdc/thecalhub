# Design Spec: New Footer Design (Hashnode/Dribbble Style)

**Date:** 2024-04-17  
**Topic:** Rebuilding the footer to match a specific Dribbble design (Hashnode style) with a modern, high-contrast dark aesthetic.

## 1. Overview
The goal is to replace the current footer in `src/components/Footer.tsx` with a new design that follows the strict layout and visual style of the provided Dribbble reference. The new footer will feature a clean grid, better typography, and an updated "All systems operational" status indicator.

## 2. Architecture & Components
The footer will be implemented as a single functional component for simplicity, but logically divided into sections:
- **Brand Section**: Logo, description, social links, and status badge.
- **Link Columns**: Categorized links (Product, Explore, Company, Blogs, Support).
- **Bottom Bar**: Copyright and legal links (Privacy Policy, Terms, Code of Conduct).

## 3. Visual Design (Tailwind CSS)
- **Background**: `bg-surface-container-lowest` or `#0d0e10` (as per `index.css`).
- **Typography**: 
  - Titles: `text-white font-bold text-sm`
  - Links: `text-neutral-400 hover:text-white transition-colors text-sm`
  - Logo Text: `text-lg font-black tracking-widest`
- **Spacing**: `pt-20 pb-10 px-6 md:px-12`
- **Status Badge**: Small pill with a green dot, matching the Dribbble reference.

## 4. Content Strategy
We will map the existing footer content to the new layout:
- **Brand**: TheCalHub (Logo) + "All your calculators in one place..."
- **Product**: All Calculators, Popular, Scientific, Financial, Health & Fitness.
- **Explore**: Featured, Recent, Top Rated, Blog.
- **Company**: About, Careers, Logos, Changelog. (Placeholders as per current content)
- **Support**: Support docs, Contact, Join Discord.

## 5. Implementation Plan
1. Update `src/components/Footer.tsx` with the new JSX structure.
2. Apply Tailwind classes for grid layout (`grid-cols-1 md:grid-cols-2 lg:grid-cols-5`).
3. Implement the status badge component.
4. Add the bottom copyright bar with a flexible layout (`flex justify-between`).

## 6. Verification
- Verify responsiveness on mobile, tablet, and desktop.
- Check all links and hover states.
- Ensure the "All systems operational" badge looks identical to the reference.
