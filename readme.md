# ReNew Tech

A modern, responsive storefront for refurbished computers and accessories. Built with React and Vite, it fetches live product data and lets users browse, filter by category, and manage a shopping cart — all client-side, no backend required.

**Live demo:** [renew-tech.vercel.app](https://renew-tech.vercel.app) _(update after first deploy)_

---

## Features

- Live product catalog fetched from a remote JSON API
- Category filtering (Laptops, Tablets, Mobiles, Accessories)
- Shopping cart with quantity controls and order summary
- Sold-out state handling
- Fully responsive — mobile, tablet, and desktop
- Fast production build via Vite

---

## Tech Stack

| Layer      | Choice                           | Why                                         |
| ---------- | -------------------------------- | ------------------------------------------- |
| UI library | React 18                         | Component model, hooks                      |
| Build tool | Vite 6                           | Sub-second HMR, optimized production builds |
| Styling    | Plain CSS with custom properties | No runtime overhead, easy to read           |
| Data       | Fetch API → remote JSON          | No backend needed                           |
| Deployment | Vercel                           | Auto-deploy on push, PR preview URLs        |
| CI         | GitHub Actions                   | Build verification on every PR              |

---

## Project Structure

```
renew-tech/
├── index.html                  # Vite HTML entry point
├── vite.config.js              # Vite configuration
├── package.json
├── .github/
│   └── workflows/
│       └── ci.yml              # CI: build check on every PR and push
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Main app component + state management
    ├── App.css                 # Global styles and design tokens
    ├── components/
    │   ├── ProductCard.jsx     # Individual product tile
    │   └── CartPanel.jsx       # Slide-in cart overlay
    └── utils/
        └── helpers.js          # Constants, formatters, API URL
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The dev server supports hot module replacement — changes appear instantly without a full page reload.

### Build for production

```bash
npm run build
```

Output is written to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

---

## Deployment

This project is deployed via **Vercel** with automatic CI/CD.

### How it works

| Trigger             | Action                                       |
| ------------------- | -------------------------------------------- |
| Push to `main`      | Production deploy → live URL updated         |
| Pull request opened | Preview deploy → unique URL posted to the PR |
| CI check fails      | Deploy is blocked until the build passes     |

### First-time setup

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Vite — no configuration needed
4. Click **Deploy**

All subsequent pushes to `main` deploy automatically. No manual steps required.

### Manual deploy (optional)

```bash
npm install -g vercel
vercel --prod
```

---

## CI/CD Pipeline

Defined in [.github/workflows/ci.yml](.github/workflows/ci.yml).

**On every push and pull request:**

1. Install dependencies with `npm ci` (clean, reproducible installs)
2. Run `npm run build` to verify the project compiles without errors

A failing build blocks the PR from merging, ensuring `main` is always deployable.

---

## Scripts

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start local dev server at `localhost:5173`     |
| `npm run build`   | Build optimized production bundle to `dist/`   |
| `npm run preview` | Serve the production build locally for testing |
