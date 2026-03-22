# Vite+ Monorepo Starter

A monorepo template built with [Vite+](https://vite.dev/) — a unified toolchain wrapping Vite, Rolldown, Vitest, tsdown, Oxlint, and Oxfmt into a single `vp` CLI.

## Getting Started

Click **"Use this template"** on GitHub to create a new repository, then:

```bash
vp install
vp run dev
```

## Project Structure

```
├── apps/
│   ├── web/              # TanStack Start + React (SSR/CSR)
│   └── website/          # Vite web application (vanilla TS)
├── packages/
│   ├── ui/               # Shared UI components (shadcn/ui)
│   └── utils/            # Reusable TypeScript library
├── vite.config.ts        # Root config (lint, hooks)
├── pnpm-workspace.yaml   # Workspace definition & dependency catalog
└── tsconfig.json         # Shared TypeScript config
```

## Development

```bash
vp run dev              # Start website dev server
vp run web#dev          # Start TanStack Start dev server
vp check                # Format + lint + typecheck
vp run test -r          # Run all tests
vp run build -r         # Build all packages
vp run ready            # Full validation pipeline
```

### Adding shadcn/ui Components

```bash
# Add to shared UI package
cd packages/ui && pnpm dlx shadcn@latest add <component>

# Add app-specific component
cd apps/web && pnpm dlx shadcn@latest add <component>
```

## Tech Stack

- **Runtime:** Node.js >= 22
- **Package Manager:** pnpm (managed via `vp`)
- **Framework:** TanStack Start + React 19
- **UI Components:** shadcn/ui v4 (Base UI, Vega style)
- **Styling:** Tailwind CSS v4
- **Build:** Vite + Rolldown
- **Library Bundler:** tsdown
- **Testing:** Vitest
- **Linting:** Oxlint (type-aware)
- **Formatting:** Oxfmt
- **Language:** TypeScript

## License

[MIT](LICENSE)
