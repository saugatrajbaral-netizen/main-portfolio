# Saugat Raj Baral - Portfolio Website

A modern, high-performance developer portfolio built with **Vite**, **React**, and **Vanilla CSS**.

---

## ✨ Features

- ⚡ **Vite + React**: Lightning-fast build times and instant Hot Module Replacement (HMR).
- 🎨 **Modern Design System**: Sleek dark/light theme switching with smooth transitions and glassmorphism.
- 📱 **Fully Responsive**: Optimized for mobile, tablet, laptop, and desktop viewports.
- 🏷️ **Filterable Projects**: Category filters (Full Stack, Frontend, UI/UX) with live demo & GitHub repository links.
- 🛠️ **Categorized Skills Grid**: Tech stack categorized by Frontend, Backend, Databases, and DevOps.
- 🚀 **Interactive Hero & Contact**: Animated role typewriter, status indicators, and interactive contact form.
- 📂 **Centralized Data**: Easily update your bio, skills, projects, and work history in `src/data/portfolioData.js`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
portfolio/
├── index.html                  # HTML entry point with fonts & SEO meta tags
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite configuration
├── .gitignore                  # Git ignore rules
└── src/
    ├── main.jsx                # React root rendering
    ├── App.jsx                 # App layout, theme state, and section container
    ├── index.css               # Design system, CSS variables, and styling
    ├── data/
    │   └── portfolioData.js    # Centralized portfolio content
    └── components/
        ├── Navbar.jsx          # Glass navbar with mobile drawer & theme switcher
        ├── Hero.jsx            # Dynamic hero section with action buttons & socials
        ├── About.jsx           # Bio, metrics, and highlights
        ├── Skills.jsx          # Categorized technical skill cards
        ├── Projects.jsx        # Project gallery with category filters
        ├── Experience.jsx      # Career and work experience timeline
        ├── Contact.jsx         # Contact form and direct communication channels
        └── Footer.jsx          # Footer with quick links & back-to-top button
```

---

## 🛠️ Customization

Edit [src/data/portfolioData.js](file:///c:/Users/DELL/Desktop/portfolio/src/data/portfolioData.js) to customize your name, roles, bio, social links, skills, projects, and work history.
