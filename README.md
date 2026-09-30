# Phonixia Fund

An interactive, slide-based proposal and crowdfunding presentation platform built for the Phonixia ecosystem. Designed to showcase venture goals, structure equity/crowdfunding tiers, and engage backers through a seamless interactive interface.

## 🚀 Live Demo
* **Production App:** [https://phonixiafund-1c7dbdac42f6.herokuapp.com/](https://phonixiafund-1c7dbdac42f6.herokuapp.com/)[cite: 6]
* **Custom Domain:** `phonixia.fund` *(DNS mapping in progress)*

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Tailwind CSS (via `@tailwindcss/postcss`)
* **Routing / Components:** Modular slide architecture (`Slide*` component hierarchy)
* **Hosting & Deployment:** Heroku (Node.js buildpack)

---

## 📦 Project Structure

```text
├── public/                # Static assets, logos, and favicons
├── src/
│   ├── components/
│   │   ├── slides/        # Individual presentation/proposal slide modules
│   │   │   └── Slide8CrowdfundingBacker.tsx
│   │   └── ...
│   ├── App.tsx            # Main application layout and slide controller
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles & Tailwind configuration
├── postcss.config.mjs     # PostCSS runner configuration
├── vite.config.ts         # Vite bundler configuration
└── package.json           # Dependencies and scripts