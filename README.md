# 🚀 Vite Vue Pinata

![Project Banner](https://placehold.co/1200x400/4f46e5/white?text=Vite+Vue+Pinata)

A sleek, professional Vue 3 starter template with a comprehensive suite of modern tools for rapid
development, code quality, and testing out of the box.

---

## ✨ Features at a Glance

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; margin: 20px 0;">

### 🏗️ Core Stack

<div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #4f46e5;">

- ![Vue](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js) — Reactive UI Framework
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript) — Static typing
- ![Pinia](https://img.shields.io/badge/Pinia-2.0-FFD02F?logo=pinia) — State management
- ![Vue Router](https://img.shields.io/badge/Vue_Router-4.0-4FC08D) — Routing solution
- ![SCSS](https://img.shields.io/badge/SCSS-1.62-CC6699?logo=sass) — Enhanced styling

</div>

### ⚡ Build Tools

<div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #4f46e5;">

- ![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite) — Lightning-fast dev server and
  build tool
- ![Vitest](https://img.shields.io/badge/Vitest-1.0-6E9F18?logo=vitest) — Blazing fast unit testing
- ![Playwright](https://img.shields.io/badge/Playwright-1.40-2EAD33?logo=playwright) — Robust
  end-to-end testing

</div>

### 🔍 Linting & Formatting

<div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #4f46e5;">

- ![ESLint](https://img.shields.io/badge/ESLint-8.56-4B32C3?logo=eslint) — Enforces code standards
- ![Prettier](https://img.shields.io/badge/Prettier-3.0-F7B93E?logo=prettier) — Code formatter
- ![Commitlint](https://img.shields.io/badge/Commitlint-18.4-000000) — Validates commit messages

</div>

### 🔧 Git Automation

<div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #4f46e5;">

- ![Husky](https://img.shields.io/badge/Husky-8.0-000000?logo=husky) — Git hooks for pre-commit
  checks
- ![Lint-staged](https://img.shields.io/badge/Lint--staged-13.0-000000) — Run linters only on staged
  files
- ![Commitizen](https://img.shields.io/badge/Commitizen-4.3-000000) — Interactive commit CLI

</div>

</div>

---

## 🛠️ Getting Started

### Installation

```bash
git clone https://github.com/your-repo/vue-modern-starter.git
cd vue-modern-starter
npm install
npm run husky  # Setup Git hooks
```

### Start Development Server

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Project Structure

```text
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Global Vue components
├── composables/     # Vue composables (reusable logic)
├── router/          # Vue Router configuration
├── services/        # External API services or logic
├── stores/          # Pinia state stores
├── views/           # Route-level views
├── App.vue          # Root component
└── main.ts          # App entry point
```

---

## 🧪 Testing

### Unit Tests (Vitest)

```bash
npm run test:unit        # Run all unit tests
npm run test:unit:ui     # Run tests in UI mode
npm run test:unit:watch  # Watch mode for development
```

### End-to-End Tests (Playwright)

```bash
npm run test:e2e         # Run all E2E tests
npm run test:e2e:ui      # UI mode (interactive)
npm run test:e2e:headed  # Headed browser mode
```

---

## 🔄 Git Workflow

This project follows the Conventional Commits specification.

Use the interactive commit CLI:

```bash
npm run commit
```

ℹ️ Important: To ensure Commitizen works properly, you may need to disable scoped lowercase
enforcement:

```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog",
    "disableScopeLowerCase": true,
    "disableSubjectLowerCase": true
  }
}
```

---

## 🛡 Code Quality

- Automatic linting on commit
- Commit message validation
- Code formatting with Prettier
- Type checking with TypeScript
- Testing (unit + E2E) integrated into the dev cycle

---

## 🧭 What's Next?

This template provides a robust starting point, but it's fully extensible. You can easily integrate:

- TailwindCSS or UnoCSS
- UI libraries like Vuetify or Element Plus
- i18n for localization
- Axios or other HTTP clients
- CI/CD pipelines (GitHub Actions, etc.)

---

Feel free to fork or contribute. Built for scalability and modern developer experience.

Happy coding! 🎯
