import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";

export const Route = createFileRoute("/")({
  component: Home,
});

const features = [
  {
    title: "TanStack Start",
    description:
      "Full-stack React framework with SSR, streaming, and file-based routing out of the box.",
    badge: "SSR + CSR",
  },
  {
    title: "React 19",
    description: "Latest React with server components support, actions, and optimistic updates.",
    badge: "Latest",
  },
  {
    title: "shadcn/ui",
    description: "Beautiful, accessible components built on Base UI. Copy, paste, and customize.",
    badge: "Base UI",
  },
  {
    title: "Tailwind CSS v4",
    description:
      "Utility-first CSS with oklch colors, CSS-first config, and lightning-fast builds.",
    badge: "v4",
  },
  {
    title: "Vite+ Toolchain",
    description: "Unified CLI wrapping Vite, Rolldown, Vitest, tsdown, Oxlint, and Oxfmt.",
    badge: "All-in-one",
  },
  {
    title: "Monorepo Ready",
    description:
      "pnpm workspaces with centralized dependency catalog. Share UI components across apps.",
    badge: "pnpm",
  },
];

const techStack = [
  "TanStack Start",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "shadcn/ui",
  "Vite+",
  "Vitest",
  "Oxlint",
  "pnpm",
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center md:py-32">
        <Badge variant="secondary" className="mb-4">
          Vite+ Monorepo Template
        </Badge>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Build modern web apps
          <span className="text-muted-foreground"> at full speed</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          A production-ready monorepo template with TanStack Start, React 19, shadcn/ui, and
          Tailwind CSS — powered by the Vite+ unified toolchain.
        </p>
        <div className="mt-8 flex gap-3">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            GitHub
          </Button>
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Everything you need</h2>
          <p className="mt-3 text-muted-foreground">
            A carefully curated stack for building scalable web applications.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{feature.title}</CardTitle>
                  <Badge variant="outline">{feature.badge}</Badge>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Project Structure */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Project Structure</h2>
          <p className="mt-3 text-muted-foreground">
            Clean monorepo layout with shared packages and apps.
          </p>
        </div>
        <Card>
          <CardContent>
            <pre className="overflow-x-auto text-sm leading-relaxed text-muted-foreground">
              {`├── apps/
│   ├── web/              # TanStack Start (SSR + CSR)
│   └── website/          # Vanilla Vite app
├── packages/
│   ├── ui/               # Shared shadcn/ui components
│   └── utils/            # Reusable TypeScript library
├── vite.config.ts        # Root config (lint, hooks, fmt)
└── pnpm-workspace.yaml   # Dependency catalog`}
            </pre>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Tech Stack */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Tech Stack</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {techStack.map((name) => (
            <Badge key={name} variant="secondary" className="px-3 py-1 text-sm">
              {name}
            </Badge>
          ))}
        </div>
      </section>

      <Separator />

      {/* Quick Start */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Quick Start</h2>
          <p className="mt-3 text-muted-foreground">Get up and running in seconds.</p>
        </div>
        <Card>
          <CardContent>
            <pre className="overflow-x-auto text-sm leading-relaxed">
              {`# Clone the template
gh repo create my-app --template Michael0520/modern-monorepo-template--vite-plus

# Install and run
vp install
vp run web#dev`}
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        Built with Vite+ Monorepo Template. MIT License.
      </footer>
    </div>
  );
}
