# jakubheidtke.com

Personal portfolio website built with Next.js, React, and Tailwind CSS v4.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

To create a production build:

```bash
npm run build
```

The build generates `out/`. Deploy that directory to a static host configured to
serve clean URLs (for example, `/cs/projects` serves `out/cs/projects.html`).
Do not use an SPA fallback that serves the root detection page for every URL.
`next start` does not serve an `output: "export"` build.

To preview the exported files locally:

```bash
node tests/serve-export.mjs
```

Open http://127.0.0.1:4173.

## Localization

All portfolio pages live under `/en` or `/cs`, including about, experience and
every project detail. The URL determines the language. Only `/` detects a
language in the browser: valid `preferredLocale` in localStorage, then the first
supported entry in `navigator.languages`, then English. Only an explicit navbar
language switch writes the stored preference. Storage restrictions do not prevent
navigation. The entry page is noindex and displays only a spinner while redirecting.

- `i18n/routing.ts`: supported locales, default locale and mandatory prefixes.
- `i18n/navigation.ts`: locale-aware links, pathname and router helpers.
- `messages/{en,cs}.json`: reusable UI strings and page metadata.
- `data/content.{en,cs}.json`: structured portfolio data, checked against `Content`.
- `data/TRANSLATION_REVIEW.md`: exact Czech case-study values awaiting review.

The `(entry)` and `[locale]` layouts are separate root layouts so exported HTML
has the correct language without client-side changes to the document. They share
the original theme document in `components/SiteDocument.tsx`. Pages remain Server
Components; only UI messages needed by existing client components are serialized.

This Next.js 16.2 implementation uses `setRequestLocale` on each localized page
and layout, plus `generateStaticParams`, following the supported
[next-intl static rendering setup](https://next-intl.dev/docs/routing/setup#with-setrequestlocale-legacy).
It does not enable experimental root params or introduce middleware, cookies or
server-side language detection. Project parameters are generated for each parent locale.

## Validation

```bash
npm run lint
npm run typecheck
npm run test:localization
```

`npm test` runs locale resolver and storage unit tests with the existing Playwright
runner, without launching a browser or server. `npm run test:localization` runs
those tests, builds a fresh production export, checks the generated HTML files,
and runs browser coverage. For an already built export, use `npm run test:static`
and `npm run test:e2e` separately. Tests are grouped by helpers, static export,
browser preferences, localized rendering/navigation, and existing routing coverage.

Browser tests serve the actual static export, without a live Next.js server.
They use installed Microsoft Edge
on Windows; on other platforms, install Chromium with `npx playwright install chromium`.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
