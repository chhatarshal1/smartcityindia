# Nearby

A location-first social app centered on Chandigarh, built with React/Vinext on Cloudflare Workers. Accounts and product data live in D1 (SQLite); uploaded media lives in R2.

## Features

- Email + unique username + password registration, login by email or username, server sessions, logout, password changes and single-use recovery codes.
- Scrypt password hashes with per-user salts (N=32768, r=8, p=3), hashed session/recovery tokens, HttpOnly/SameSite cookies, Secure cookies over HTTPS, origin checks and database-backed request throttling.
- Server-persisted posts, media uploads, likes, bookmarks, comments and profile/home-neighbourhood settings. Ownership checks on every modification.
- Chandigarh map with activity intensity based on database counts, neighbourhood/content/search filters, recent/popular ordering, pagination and periodic feed refresh.
- Real uploads up to 20 MB, file-signature and type validation, private object keys, streaming media with byte-range support. Supported: JPG, PNG, GIF, WebP, MP4, WebM, OGG, MP3, WAV and M4A.
- Responsive map/feed views, empty/loading/error states, keyboard-friendly forms and dialog focus containment.

## Animated neighbourhood atlas

Select a marker, a map location, or a neighbourhood card to see **Zoom into this area** and **View local stories**. Zoom opens a parchment-style illustrated map with four fictional named walkers and fading footprints. Drag or use arrow keys to pan; use the buttons or +/− to zoom. Pause/resume, reset, highlight a walker, and return to the selected area’s real feed. Escape closes the dialog and restores focus. Reduced-motion preferences start animation paused; animation stops when the dialog closes.

The atlas is explicitly illustrative, not street-accurate or live tracking. It never reads GPS, infers user movement, or uses account names for fictional walkers.

## Run locally

1. `npm run install:ci`
2. `npm run build`
3. Apply pending SQL migrations once, in order:
   `node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_closed_korvac.sql`
4. `npm run dev` — use the printed local URL.

`npm start -- --port 5173` serves the built Worker. Dev and built preview share `.wrangler/state`; local and hosted databases are separate.

## Checks

- `npx tsc --noEmit`
- `node tests/integration.mjs` while the local server runs on port 5173. Set `NEARBY_TEST_URL` for another loopback port. Tests refuse remote URLs and create synthetic accounts in the local database. Run against an isolated test database; repeated runs in a 15-minute window may intentionally trigger authentication throttles.
- `npm run build`

The integration suite covers registration validation/uniqueness, credentials, sessions, CSRF, ownership, likes, private bookmarks, comments, media validation/upload/ranges/deletion, profile persistence, password rotation, recovery-code invalidation and throttling.

## Hosting and privacy

The Site remains owner-private for testing, as requested. Its ChatGPT access gate is separate from Nearby's own email/password accounts. Accounts created locally are not copied into the hosted database. No demo users or fictional news are inserted into the hosted database.

Passwords are never stored as plaintext; session tokens are stored hashed and expire after seven days. Recovery codes are shown once and rotated after use. User emails are returned only by the current-user endpoint; public post feeds expose usernames and broad neighbourhoods only. No device geolocation is collected.

## Current release boundaries

This is a functional private-testing release, not an audited public launch. Email delivery/verification and email-based password reset are not configured; account recovery works using a saved recovery code. There is no moderation/reporting service, malware/transcoding pipeline, account deletion/export interface, or configured operational monitoring/backups beyond the hosting provider. Authentication throttling is provided, but a public rollout should add edge abuse controls and concurrency/load testing. Unattached uploads after interrupted requests can remain in object storage and need a scheduled retention policy before public launch.

Map scripts and tiles require internet access. OpenStreetMap attribution is included. Media uploaded by users is stored by the app; production does not depend on illustrative demo media.

## Password hashing references

The scrypt parameters follow the OWASP password-storage guidance: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
Implementation: https://github.com/paulmillr/noble-hashes
