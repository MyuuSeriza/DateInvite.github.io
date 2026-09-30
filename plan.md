# Implementation plan

## Product outcomes
- Build only the interactive retro pixel-art date invitation shown in the reference video.
- Support the invitation, celebration, date, activity, confirmation, and love-note states.
- Match the reference's pink/white 8-bit visual language while remaining responsive and keyboard accessible.

## Architecture
Use a dependency-free static SPA served by a small Node HTTP server on port 3000. The page is one route (`/`) with client-side state transitions; `/manus-routes.json` is a static route manifest. No server or database is needed because all state is local to the invitation session.

## Project structure
- `index.html` — semantic page shell, app mount, modal markup, favicon.
- `styles.css` — responsive pixel-art visual system, background scene, components, motion.
- `app.js` — finite-state flow, No-button behavior, date/activity state, modal behavior.
- `server.js` — static file server for Preview and production-like local serving.
- `public/manus-routes.json` — current website route manifest.
- `public/heart-icon.svg` — project-specific favicon/logo.
- `app.config.ts` — project logo metadata.

## Serving and caching
Static frontend delivery is sufficient. The development server serves the root and `public` assets; published output can use the static build contract. No API paths exist. Versioned/static assets are small and can be cached; HTML remains revalidatable.

## Verification
Run source checks, `node --check app.js`, start the server, request `/` and `/manus-routes.json`, and exercise interaction logic with a lightweight browserless DOM-independent smoke check of the served source. Use the existing Preview URL as the delivery surface; do not publish unless requested.
