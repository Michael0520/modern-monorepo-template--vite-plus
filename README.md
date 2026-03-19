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
│   └── website/          # Vite web application
├── packages/
│   └── utils/            # Reusable TypeScript library
├── vite.config.ts        # Root config (lint, hooks)
├── pnpm-workspace.yaml   # Workspace definition
└── tsconfig.json         # Shared TypeScript config
```

## Development

```bash
vp run dev              # Start dev server
vp check                # Format + lint + typecheck
vp run test -r          # Run all tests
vp run build -r         # Build all packages
vp run ready            # Full validation pipeline
```

## Tech Stack

- **Runtime:** Node.js >= 22
- **Package Manager:** pnpm (managed via `vp`)
- **Build:** Vite + Rolldown
- **Library Bundler:** tsdown
- **Testing:** Vitest
- **Linting:** Oxlint (type-aware)
- **Formatting:** Oxfmt
- **Language:** TypeScript

## License

[MIT](LICENSE)
