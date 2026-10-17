# Smart City India — interactive exploration library

A Next.js App Router project with TypeScript, an accessible responsive gallery, topic filters, search, dedicated model pages, and isolated interactive HTML players.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production server, run `npm run build` then `npm start`. `npm run typecheck` checks TypeScript.

## Add another preview

1. Put a self-contained, trusted HTML animation in `public/previews/your-model.html`. Keep all assets here or use root-relative paths. Do not refer to files outside the project.
2. Add a thumbnail in `public/images/your-model.svg` (PNG/WebP also work).
3. Add an entry to `lib/previews.ts` with a unique URL slug, title, category, image, source, and lesson notes.
4. Include `<script src="/previews/embed-bridge.js"></script>` at the end of the HTML. It reports its height to the parent viewer so controls remain visible on small screens.
5. Run the build. The gallery, categories, search, detail route, metadata, and related links derive from the catalog automatically.

Only trusted author-created HTML should be placed in `public/previews`. It is hosted on the same origin and can execute JavaScript; this is not an upload system for untrusted user content.

## Layout

- `app/page.tsx`: homepage and editorial sections
- `app/preview/[slug]/page.tsx`: generated exploration pages
- `components/library.tsx`: search and topic filters
- `components/preview-player.tsx`: iframe lifecycle, resizing, restart and fullscreen
- `lib/previews.ts`: single catalog for all models
- `public/previews`: portable copies of the original two animations
- `public/images`: illustrations exported from the actual models
- `scripts/import-previews.mjs`: records how the two initial artifacts were imported; takes source paths as arguments, not required for normal development

The initial chip animation includes source attribution and simplification notes. The caching model uses illustrative timings. Original artifacts outside this project remain unchanged.

No account, database, or third-party service is needed. The model files ship with the application. Google Fonts is optional; system fallbacks keep the site usable without it.
