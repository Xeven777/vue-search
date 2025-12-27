# vue-search

![ss](public/og-img.webp)
A small, component-driven Vue 3 + Vite search UI demo. This project implements the search tool UI and demonstrates component reusability, dynamic search results, basic animations, and simple pagination.

**Key features**

- **Search input**: `src/components/SearchBar.vue` with input debouncing (default 500ms).
- **Results list**: `src/components/SearchResultList.vue` featuring a responsive grid and pagination controls.
- **Result item**: `src/components/SearchResultItem.vue` — click to expand an item and reveal description + metadata with Vue transitions.
- **Loader / placeholder**: `src/components/LoaderComp.vue` shows skeletons while fetching.
- **Search service**: `src/lib/searchService.ts` calls a public search endpoint (Hacker News Algolia API) and normalizes results into `{ title, snippet, description, metadata }`.
- **Utilities**: `src/lib/utils.ts` exposes `cn()` for class merging (`clsx` + `tailwind-merge`).

Why this approach:

- Component-based design for reusability and easy composition.
- Debounce on the input to reduce network requests.
- Small, focused components that are straightforward to reuse in other pages.

Quick start

- Requirements: `bun` is recommended (the project was scaffolded with Bun in mind), node 20+ also works.

Install dependencies

```bash
bun install
```

Run dev server

```bash
bun dev
# or: bun run dev
```

Build for production

```bash
bun run build
```

Lint & format

```bash
bun run lint
bun run format
```

How to use the app

- Type into the search bar — the app debounces input and fetches search results.
- Results update while typing.
- Click any result card to expand it and reveal a longer description and metadata (author, points, created date).
- Use the Previous / Next buttons for basic pagination.

Files of interest

- `src/components/SearchBar.vue` — debounced search input and clear button.
- `src/components/SearchResultList.vue` — displays results, handles empty state and pagination.
- `src/components/SearchResultItem.vue` — expandable result card with transition.
- `src/components/LoaderComp.vue` — skeleton placeholders while loading.
- `src/lib/searchService.ts` — fetch + normalize search results from Algolia HN API.
- `src/lib/utils.ts` — helper utilities (class name merging).

Notes / Implementation details

- The app currently uses the Hacker News Algolia search API (`https://hn.algolia.com/api/v1/search`) as a working demo of fetching and normalizing search results. This replaces the example 'Postman Echo' suggestion from the task but preserves the same contract (title, snippet, description, metadata).
- Search is debounced in `SearchBar.vue` to reduce requests; pagination is simple (client-side page param passed to the service).
- Vue `<Transition>` and `<TransitionGroup>` are used for expand/collapse and list entrance animations.
- Styling uses utility classes (Tailwind + `clsx` + `tailwind-merge`) and small UI primitives under `src/components/ui/`.

Accessibility & responsiveness

- The layout is responsive (single-column on small screens, grid on larger screens).
- Interactive elements are keyboard-focusable (input, buttons). Further a11y improvements are suggested below.

Suggestions to scale / improve

- Cache search results (in-memory or via indexedDB) to reduce API usage and improve perceived speed.
- Upgrade pagination to infinite scroll or cursor-based loading for larger datasets.
- Implement offline fallback / service-worker for reliability.

Troubleshooting

- If you hit rate limits or offline issues with the Algolia HN API, replace `src/lib/searchService.ts` with a local mock (returns a small static array) to continue development.

Made with ❤️ by [Anish](https://anish7.me)
