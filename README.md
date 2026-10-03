# Phonixia Fund // Venture Proposal & Backer Platform

> **Live Production:** [https://www.phonixia.fund](https://www.phonixia.fund)  
> `root@phonixia:~# solo founder campaign // 6-month launch runway // EST. 2026`

---

## Overview

**Phonixia Fund** is an interactive, slide-based proposal and crowdfunding presentation platform engineered for the Phonixia ecosystem. 

Designed to showcase venture goals, structure equity and crowdfunding tiers, and engage backers through a seamless interactive interface, the application presents venture milestones, pedagogical architecture, and multi-tier funding pathways to backers, educators, and indie investors through a responsive terminal-grade interface.

---

## Technical Stack

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via `@tailwindcss/postcss`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Audio Effects:** Custom Web Audio API synthesizer modules
- **Hosting & Infrastructure:** [Heroku](https://www.heroku.com/)
- **DNS & SSL:** Exact Hosting (CNAME pointing to Heroku DNS target with Automated Certificate Management / Let's Encrypt)
- **Payment Gateway:** Stripe Payment Links (Flat-rate tier routing) & Direct Cash App Integration

---

## Key Modules & Architecture

The application implements a modular slide deck architecture (`Slide*` component hierarchy) managed via `App.tsx` to ensure static host compatibility and seamless interactive presentations.

* **`Slide8CrowdfundingBacker.tsx`:** Dynamic backer terminal with direct routing across 6 funding tiers ($25 Codex, $50 Beta Pioneer, $100 Founding Family, $250 Classroom Champion, $500 Master Architect, and $1,000 Guild Patron) hooked into individual Stripe payment links.
* **Payment Redundancy:** Integrated support for Credit/Debit Cards, Apple Pay, Google Pay, and Cash App (`$luvdinero`).
* **Live Progress Engine:** Client-side tracking with automated percentage calculations toward the $50,000 solo runway milestone.
* **Engine Architecture Slides:** Visual technical deep-dives into the clean-slate voxel engine, procedural reading parser, and 6-month delivery schedule.

---

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://git.heroku.com/phonixiafund.git](https://git.heroku.com/phonixiafund.git)
   cd phonixiafund