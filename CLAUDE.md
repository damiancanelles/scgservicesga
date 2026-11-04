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

**Next.js (App Router) + React 19**, built as a **fully static site** (`output: "export"` in `next.config.mjs`) for SCG Services, a home repair/construction company in Atlanta, GA. `npm run build` writes plain HTML to `out/`, which Netlify publishes (`netlify.toml`). There is no backend.

### Content

- All content lives in JSON files under `src/data/` (a snapshot of the former Strapi CMS). Edit them directly to change the site.
- Access content only through the helpers in `src/lib/content.js` (`getHome`, `getCategory(id)`, `getService(id)`, etc.).
- Rich-text fields are Strapi "blocks" JSON, rendered with `@strapi/blocks-react-renderer` (`src/components/strapiDescription.js`).
- Images are hosted on Cloudinary; components add resize params to the URL. `images.unoptimized` is on because static export has no image server.
- Contact form (`src/components/footerContactForm.js`) submits to **Netlify Forms**. `public/__forms.html` is the static copy Netlify detects at deploy, so keep its field names in sync with the component.

### Server vs Client Components

Data is read in server components and passed as props to the client components:
- `src/components/navbar/navbar.js` — dropdown state; gets `categories` from `app/layout.js`
- `src/components/reviews.js` — carousel; gets `reviews` from `app/page.js`
- `src/components/footerContactForm.js` — form validation/submission
- `src/components/seachProjects.js` — filtering state

### Routing Structure

```
app/
├── page.js                    # Home
├── about/page.js              # About page
├── category/[id]/page.js      # Category (generateStaticParams, dynamicParams = false)
├── project/page.js            # Projects listing
├── project/[id]/page.js       # Project detail
├── service/[id]/page.js       # Service detail
├── sitemap.js / robots.js     # Static, use NEXT_PUBLIC_BASE_URL (defaults to https://scgservicesatlanta.com)
```

Dynamic routes must export `generateStaticParams()`. IDs are the Strapi `documentId` values, kept so existing URLs don't change. API routes, server actions and request-time features don't work under static export.

### Path Alias

`@/` maps to `src/` (configured in `jsconfig.json`).
