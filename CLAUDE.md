# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Development server with Turbopack (http://localhost:3000)
npm run build     # Production build
npm start         # Production server
npm run lint      # ESLint via Next.js
```

No test framework is configured.

## Architecture

**Next.js 15 (App Router) + React 19** frontend for SCG Services, a home repair/construction company in Atlanta, GA. Content is served from an external **Strapi CMS** backend.

### Data Flow

- All content fetched from Strapi via `NEXT_PUBLIC_API_URL` (e.g., `/api/home?populate=*`, `/api/categories`)
- Images hosted on Cloudinary (`res.cloudinary.com` is allowlisted in `next.config.mjs`)
- Contact form (`src/components/footerContactForm.js`) POSTs to `/api/sendEmail` → SendGrid

### Server vs Client Components

Most components are **server components** (async, fetch on server). Components requiring interactivity are marked `"use client"`:
- `src/components/navbar/navbar.js` — dropdown menu state
- `src/components/footerContactForm.js` — form validation/submission
- `src/components/searchProjects.js` — filtering state

### Routing Structure

```
app/
├── page.js                    # Home — fetches /api/home
├── about/page.js              # About page
├── category/[id]/page.js      # Dynamic category (uses generateMetadata)
├── project/page.js            # Projects listing
├── project/[id]/page.js       # Dynamic project detail
├── service/[id]/page.js       # Dynamic service detail
└── api/sendEmail/route.js     # Email API (SendGrid)
```

Dynamic pages use `generateMetadata()` for SEO. The root layout (`app/layout.js`) wraps all pages with `<Navbar>` and `<Footer>`.

### Required Environment Variables

```
NEXT_PUBLIC_API_URL           # Strapi CMS base URL
NEXT_PUBLIC_SEND_GRID_KEY     # SendGrid API key
NEXT_PUBLIC_FROM_EMAIL        # Sender email address
```

SendGrid template IDs are also referenced in `src/app/api/sendEmail/route.js`.

### Path Alias

`@/` maps to `src/` (configured in `jsconfig.json`).
