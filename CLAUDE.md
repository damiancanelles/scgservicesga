# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

There is no test suite configured in this project.

## Environment Variables

A `.env` file is required. The following variables are used throughout the app:

- `NEXT_PUBLIC_API_URL` — Base URL of the Strapi backend (used in all client and server fetches)
- `NEXT_PUBLIC_SEND_GRID_KEY` — SendGrid API key for email sending
- `NEXT_PUBLIC_FROM_EMAIL` — Verified SendGrid sender email
- `NEXT_PUBLIC_TEMPLATE_ID` — SendGrid template ID for admin notification emails
- `NEXT_PUBLIC_TEMPLATE_ID_CLIENT` — SendGrid template ID for client confirmation emails

## Architecture

This is a **Next.js 15 frontend** that consumes a **Strapi CMS backend**. All content (categories, services, homepage data, etc.) is fetched from Strapi via REST API using Strapi v5's `documentId`-based routing.

### Data Flow

- Pages fetch data from `NEXT_PUBLIC_API_URL/api/...` using Strapi's populate API
- Dynamic routes (`/category/[id]`, `/service/[id]`) use Strapi `documentId` as the URL segment
- `generateStaticParams` is used on dynamic route pages to pre-build all known category/service pages at build time
- `generateMetadata` fetches SEO data from Strapi's `seo` field (with `seoTitle`, `seoDescription`) for dynamic pages

### Auth

Authentication uses Strapi's built-in `POST /api/auth/local` endpoint. The JWT returned is stored in `localStorage` and managed globally via `AuthContext` (`src/contexts/AuthContext.js`). The `useAuth()` hook exposes `{ isLoggedIn, login, logout }`.

### Key Architectural Patterns

- **Page files are thin**: Route files in `src/app/` handle metadata and static params, then delegate rendering to client components in `src/components/pages/`
- **"use client" boundary**: Page-level route files that export `generateMetadata` or `generateStaticParams` must remain Server Components; the actual interactive UI lives in `src/components/pages/` as client components
- **No state management library**: Global state is handled only through `AuthContext` using React Context API
- **Images**: Cloudinary is the CDN for images served from Strapi. `next.config.mjs` allowlists `res.cloudinary.com`
- **Email**: Contact form submissions hit the internal Next.js API route `POST /api/sendEmail`, which sends via SendGrid — one email to admin, one confirmation to the client

### Directory Map

```
src/
  app/                  # Next.js App Router
    page.js             # Home page (client component)
    layout.js           # Root layout — wraps all pages with AuthProvider, Navbar, Footer
    login/page.js
    signup/page.js
    about/page.js
    category/[id]/page.js   # Dynamic category page (generateStaticParams + generateMetadata)
    service/[id]/page.js    # Dynamic service page (generateStaticParams + generateMetadata)
    api/sendEmail/route.js  # Server-side email API route
  components/
    navbar/navbar.js    # Fetches categories from Strapi for Services dropdown; reads auth state
    banner/             # Hero banner and contact bar components
    pages/              # Full-page client components (login, signup, category, service, about)
    categories.js       # Services grid section
    header.js           # Construction banner section
    partners.js
    reviews.js
    footer.js
  contexts/
    AuthContext.js      # JWT auth state (localStorage-backed)
```
