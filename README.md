# Banor Group

Integrated redevelopment ecosystem website—Foundation, Development, and Capital under one platform.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Radix UI** / shadcn-style components
- **Lucide Icons**
- **Static export** (GitHub Pages compatible)

## Architecture

- **100% data-driven**: All content in `/data` as JSON
- **SEO optimized**: Metadata + JSON-LD structured data
- **Static export**: No server, no API routes, no dynamic runtime

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
npm run build
```

Output is generated in the `/out` directory.

## Deploying to GitHub Pages

### 1. Configure repository

- Repository name: `your-username.github.io` (user/org site) or any repo for project sites
- For project sites: site will be at `https://your-username.github.io/your-repo/`

### 2. Base path (automatic for project sites)

The deploy workflow automatically sets `basePath` and `assetPrefix` from the repo name. No config changes needed—CSS and images will load correctly at `https://your-username.github.io/your-repo/`.

**Custom domain:** If you use a custom domain (e.g. `banorgroup.com`), add `NEXT_PUBLIC_BASE_PATH=` to the Build step env in `.github/workflows/deploy.yml` so assets load from the root.

### 3. GitHub Actions workflow

Create `.github/workflows/deploy.yml` (see file in this repo). Push to `main` to trigger deployment.

### 4. Enable GitHub Pages

- Settings → Pages → Source: **GitHub Actions**

## Images

Add images to `/public`:

- Hero images: `/public/hero-home.jpg`, `/public/hero-model.jpg`, etc.
- Projects: `/public/projects/`
- Team: `/public/team/`
- OG image: `/public/og-image.jpg` (1200×630)

Use `/placeholder.svg` for temporary placeholders.

## Content Updates

Edit JSON in `/data`:

- `site-config.json` — Site-wide config
- `pages/*.json` — Page content
- `content/projects.json` — Projects
- `content/team.json` — Team
- `content/insights.json` — Blog/thought leadership
- `authors.json` — Author bios for insights

## License

Proprietary — Banor Group
