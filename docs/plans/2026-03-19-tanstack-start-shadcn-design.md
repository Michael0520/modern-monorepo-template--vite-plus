# TanStack Start + React + shadcn/ui Integration

## Decision

Add `apps/web` (TanStack Start + React 19) and `packages/ui` (shared shadcn v4 components) to the existing monorepo. Keep `apps/website` (vanilla TS) and `packages/utils` unchanged.

## Architecture

```
apps/
  website/              # Existing, vanilla TS + Vite
  web/                  # New, TanStack Start + React
    src/
      routes/
        __root.tsx
        index.tsx
      styles.css
      router.tsx
    components.json
    vite.config.ts
    tsconfig.json
    package.json

packages/
  ui/                   # New, shared shadcn components
    components/
    lib/utils.ts        # cn() helper
    hooks/
    styles/base.css     # Tailwind v4 CSS entry
    components.json
    tsconfig.json
    package.json
  utils/                # Existing
```

## Key Decisions

- **shadcn v4**: Base UI primitives, Vega style, lucide icons
- **packages/ui**: Source-level exports (no build step), React as peerDependency
- **Two components.json**: packages/ui for shared components, apps/web for app-specific components
- **Consumption**: `import { Button } from "@repo/ui/components/button"`

## Dependencies

### apps/web

- react, react-dom (React 19)
- @tanstack/react-start, @tanstack/react-router (SSR/CSR)
- @tailwindcss/vite, tailwindcss (Tailwind v4)
- @vitejs/plugin-react
- @repo/ui (workspace)

### packages/ui

- shadcn, clsx, tailwind-merge, class-variance-authority
- lucide-react
- react, react-dom (peerDependencies)
- tailwindcss (devDependency)

## Vite Plugins Order (apps/web)

1. tanstackStart() — TanStack Start SSR
2. viteReact() — React JSX transform
3. tailwindcss() — Tailwind v4
