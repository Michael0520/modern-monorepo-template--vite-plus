# TanStack Start + shadcn/ui Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add `apps/web` (TanStack Start + React 19) and `packages/ui` (shared shadcn v4 components) to the monorepo.

**Architecture:** New `packages/ui` provides shared shadcn components (source-level exports, no build step). New `apps/web` consumes them via workspace dependency. Existing `apps/website` and `packages/utils` are unchanged.

**Tech Stack:** TanStack Start, React 19, Tailwind CSS v4, shadcn v4 (Base UI, Vega style, lucide icons), Vite+

---

### Task 1: Add shared dependencies to pnpm catalog

**Files:**

- Modify: `pnpm-workspace.yaml`

**Step 1: Add React, TanStack, Tailwind, shadcn dependencies to catalog**

Add these entries to the `catalog:` section in `pnpm-workspace.yaml`:

```yaml
catalog:
  # existing entries...
  "@types/node": ^24
  typescript: ^5
  vite: npm:@voidzero-dev/vite-plus-core@latest
  vitest: npm:@voidzero-dev/vite-plus-test@latest
  vite-plus: latest

  # React
  react: ^19.2.4
  react-dom: ^19.2.4
  "@types/react": ^19.2.14
  "@types/react-dom": ^19.2.3

  # TanStack
  "@tanstack/react-start": ^1.166.17
  "@tanstack/react-router": ^1.167.5

  # Vite plugins
  "@vitejs/plugin-react": ^6.0.1
  "@tailwindcss/vite": ^4.2.2

  # Tailwind & shadcn
  tailwindcss: ^4.2.2
  shadcn: ^4.0.8
  clsx: ^2.1.1
  tailwind-merge: ^3.5.0
  class-variance-authority: ^0.7.1
  lucide-react: ^0.577.0
```

**Step 2: Run install**

Run: `pnpm install`
Expected: lockfile updated, no errors

**Step 3: Commit**

```bash
git add pnpm-workspace.yaml pnpm-lock.yaml
git commit -m "feat: add React, TanStack, Tailwind, shadcn to pnpm catalog"
```

---

### Task 2: Create packages/ui package

**Files:**

- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/lib/utils.ts`
- Create: `packages/ui/styles/base.css`
- Create: `packages/ui/components/.gitkeep`
- Create: `packages/ui/hooks/.gitkeep`
- Create: `packages/ui/components.json`

**Step 1: Create package.json**

Create `packages/ui/package.json`:

```json
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    "./*": "./*.ts",
    "./styles/base.css": "./styles/base.css",
    "./components/*": "./components/*.tsx"
  },
  "scripts": {
    "ui": "pnpm dlx shadcn@latest"
  },
  "dependencies": {
    "class-variance-authority": "catalog:",
    "clsx": "catalog:",
    "lucide-react": "catalog:",
    "tailwind-merge": "catalog:"
  },
  "devDependencies": {
    "@types/react": "catalog:",
    "@types/react-dom": "catalog:",
    "tailwindcss": "catalog:",
    "typescript": "catalog:"
  },
  "peerDependencies": {
    "react": "catalog:",
    "react-dom": "catalog:"
  }
}
```

**Step 2: Create tsconfig.json**

Create `packages/ui/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "paths": {
      "@repo/ui/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

**Step 3: Create lib/utils.ts**

Create `packages/ui/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Step 4: Create styles/base.css**

Create `packages/ui/styles/base.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --radius: 0.625rem;
  --sidebar-background: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --sidebar-background: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.985 0 0);
  --sidebar-primary-foreground: oklch(0.205 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-sidebar-background: var(--sidebar-background);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**Step 5: Create placeholder directories**

Create `packages/ui/components/.gitkeep` (empty file)
Create `packages/ui/hooks/.gitkeep` (empty file)

**Step 6: Create components.json**

Create `packages/ui/components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "styles/base.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@repo/ui/components",
    "utils": "@repo/ui/lib/utils",
    "ui": "@repo/ui/components",
    "lib": "@repo/ui/lib",
    "hooks": "@repo/ui/hooks"
  }
}
```

**Step 7: Install dependencies**

Run: `pnpm install`
Expected: packages/ui dependencies resolved

**Step 8: Commit**

```bash
git add packages/ui/
git commit -m "feat: add packages/ui with shadcn v4 config and Tailwind base styles"
```

---

### Task 3: Create apps/web TanStack Start app

**Files:**

- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/vite.config.ts`
- Create: `apps/web/.gitignore`
- Create: `apps/web/components.json`

**Step 1: Create package.json**

Create `apps/web/package.json`:

```json
{
  "name": "@repo/web",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vp dev",
    "build": "vp build",
    "preview": "vp preview",
    "start": "node .output/server/index.mjs",
    "ui": "pnpm dlx shadcn@latest"
  },
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@tanstack/react-router": "catalog:",
    "@tanstack/react-start": "catalog:",
    "react": "catalog:",
    "react-dom": "catalog:"
  },
  "devDependencies": {
    "@tailwindcss/vite": "catalog:",
    "@types/react": "catalog:",
    "@types/react-dom": "catalog:",
    "@vitejs/plugin-react": "catalog:",
    "tailwindcss": "catalog:",
    "typescript": "catalog:",
    "vite": "catalog:"
  }
}
```

**Step 2: Create tsconfig.json**

Create `apps/web/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "paths": {
      "~/*": ["./src/*"],
      "@repo/ui/*": ["../../packages/ui/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

**Step 3: Create vite.config.ts**

Create `apps/web/vite.config.ts`:

```ts
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
  plugins: [tanstackStart(), viteReact(), tailwindcss()],
});
```

**Step 4: Create .gitignore**

Create `apps/web/.gitignore`:

```
.output
.vinxi
.tanstack
```

**Step 5: Create components.json**

Create `apps/web/components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "../../packages/ui/styles/base.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "~/components",
    "utils": "@repo/ui/lib/utils",
    "ui": "@repo/ui/components",
    "lib": "@repo/ui/lib",
    "hooks": "@repo/ui/hooks"
  }
}
```

**Step 6: Install dependencies**

Run: `pnpm install`
Expected: apps/web dependencies resolved

**Step 7: Commit**

```bash
git add apps/web/package.json apps/web/tsconfig.json apps/web/vite.config.ts apps/web/.gitignore apps/web/components.json
git commit -m "feat: add apps/web package with TanStack Start + Tailwind v4 config"
```

---

### Task 4: Create TanStack Start app source files

**Files:**

- Create: `apps/web/src/router.tsx`
- Create: `apps/web/src/routes/__root.tsx`
- Create: `apps/web/src/routes/index.tsx`
- Create: `apps/web/src/styles.css`

**Step 1: Create router.tsx**

Create `apps/web/src/router.tsx`:

```tsx
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
  return createTanStackRouter({
    routeTree,
    scrollRestoration: true,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
```

**Step 2: Create \_\_root.tsx**

Create `apps/web/src/routes/__root.tsx`:

```tsx
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vite+ App" },
    ],
    links: [{ rel: "icon", href: "/favicon.ico" }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
```

**Step 3: Create styles.css**

Create `apps/web/src/styles.css`:

```css
@import "@repo/ui/styles/base.css";
```

**Step 4: Import styles in \_\_root.tsx**

Update `apps/web/src/routes/__root.tsx` to import styles. Replace the head function:

```tsx
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import styles from "~/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vite+ App" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: styles },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
```

**Step 5: Create index.tsx**

Create `apps/web/src/routes/index.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Vite+ App</h1>
        <p className="mt-4 text-muted-foreground">
          TanStack Start + React + Tailwind CSS + shadcn/ui
        </p>
      </div>
    </div>
  );
}
```

**Step 6: Commit**

```bash
git add apps/web/src/
git commit -m "feat: add TanStack Start app source with root layout and index route"
```

---

### Task 5: Add a shadcn Button component to verify the setup

**Files:**

- Create: `packages/ui/components/button.tsx` (via shadcn CLI)
- Modify: `apps/web/src/routes/index.tsx`

**Step 1: Add button component via shadcn CLI**

Run from packages/ui:

```bash
cd packages/ui && pnpm dlx shadcn@latest add button
```

Expected: `packages/ui/components/button.tsx` created

If CLI has issues, manually create the button component based on shadcn's output.

**Step 2: Update index.tsx to use Button**

Update `apps/web/src/routes/index.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@repo/ui/components/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Vite+ App</h1>
        <p className="mt-4 text-muted-foreground">
          TanStack Start + React + Tailwind CSS + shadcn/ui
        </p>
        <Button className="mt-6" size="lg">
          Get Started
        </Button>
      </div>
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add packages/ui/components/ apps/web/src/routes/index.tsx
git commit -m "feat: add shadcn Button component and use in index page"
```

---

### Task 6: Update root config and verify

**Files:**

- Modify: `package.json` (root)
- Modify: `vite.config.ts` (root)

**Step 1: Add dev:web script to root package.json**

Add `"dev:web": "vp run web#dev"` to the scripts section in root `package.json`.

**Step 2: Update root vite.config.ts lint plugins**

Add React lint plugin to root `vite.config.ts` if needed for the web app.

**Step 3: Run dev server to verify**

Run: `pnpm exec vp run web#dev`
Expected: TanStack Start dev server starts on port 3000, page renders with styled Button

**Step 4: Run build to verify SSR**

Run: `cd apps/web && pnpm exec vp build`
Expected: Build succeeds, .output directory created

**Step 5: Commit**

```bash
git add package.json vite.config.ts
git commit -m "feat: add dev:web script and update root config"
```

---

### Task 7: Update README and CI

**Files:**

- Modify: `README.md`
- Modify: `.github/workflows/ci.yml`

**Step 1: Update README project structure**

Add `apps/web` and `packages/ui` to the project structure section. Add `dev:web` command.

**Step 2: Update CI to build all workspaces**

The existing CI already uses `vp run build -r` which builds all workspaces recursively. Verify no changes needed.

**Step 3: Commit**

```bash
git add README.md
git commit -m "docs: update README with apps/web and packages/ui"
```
