# Joseph Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A modern, dual-path portfolio application built with the latest web technologies. This project showcases a unique dichotomy between a **Creative/Artistic** persona and a **Professional/Corporate** profile, allowing users to explore different facets of my work and skills.

## 🌟 Features

- **Dual Experience**: A landing page that splits into two distinct paths:
  - **Experimental & Artistic**: A creative showcase with unique interactions and visual flair.
  - **Formal & Corporate**: A clean, professional presentation of skills, experience, and projects.
- **Internationalization (i18n)**: Fully localized support for multiple languages (English/Spanish) using `next-intl`.
- **Modern UI/UX**:
  - **Smooth Scrolling**: Integrated `lenis` for buttery smooth scroll experiences.
  - **Animations**: Powered by CSS and React transitions.
  - **Responsive Design**: Mobile-first approach using Tailwind CSS v4.
- **Tech Stack**: Built on the bleeding edge with Next.js 16 (App Router) and React 19.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)

## 📂 Project Structure

The project follows a standard Next.js App Router structure, organized to separate the "Creative" and "Professional" aspects:

```
my-portfolio/
├── app/
│   ├── [locale]/            # Localized routes (e.g., /en, /es)
│   │   ├── page.tsx         # 🎨 Creative Landing Page (Main Entry)
│   │   ├── hr/
│   │   │   └── page.tsx     # 💼 Professional/Corporate Page
│   │   ├── layout.tsx       # Root layout with i18n provider
│   │   └── ...
│   ├── api/                 # API routes
│   └── not-found.tsx        # 404 Page
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── home/            # 🎨 Components for the Creative Landing Page
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   └── ...
│   │   ├── hr/              # 💼 Components for the Professional Page
│   │   │   ├── Hero.tsx
│   │   │   ├── Experience.tsx
│   │   │   └── ...
│   │   ├── layout/          # Shared layout components (Header, Footer)
│   │   └── ui/              # Generic UI elements (Buttons, Cards, etc.)
│   ├── i18n/                # i18n configuration
│   ├── messages/            # 🌍 Translation JSON files
│   │   ├── en.json          # English translations
│   │   └── es.json          # Spanish translations
│   └── navigation.ts        # Navigation configuration
├── public/                  # Static assets (images, fonts)
└── ...
```

## 📝 How to Modify

### 1. Editing Content (Text & Translations)
All text content is managed via `next-intl` in the `src/messages/` directory.
- **To change text**: Open `src/messages/en.json` (for English) or `src/messages/es.json` (for Spanish) and find the relevant key.
- **Structure**: Keys are nested by component or page (e.g., `Home.Hero.title`, `HR.Experience.role`).

### 2. Styling
The project uses **Tailwind CSS v4**.
- **Global Styles**: Defined in `app/globals.css`.
- **Component Styles**: Applied directly via `className` props in the component files.
- **Theme Config**: Tailwind v4 uses CSS variables for configuration, found in `app/globals.css`.

### 3. Adding/Modifying Pages
- **Creative Page**: Edit `app/[locale]/page.tsx` and its components in `src/components/home/`.
- **Professional Page**: Edit `app/[locale]/hr/page.tsx` and its components in `src/components/hr/`.
- **New Page**: Create a new folder in `app/[locale]/` (e.g., `app/[locale]/blog/page.tsx`).

### 4. Components
- **New Components**: Add them to `src/components/`. If it's specific to a feature, put it in a subfolder (e.g., `src/components/blog/`).
- **Reusable UI**: Check `src/components/ui/` for existing base components before creating new ones.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jpalomino502/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by Joseph Palomino
