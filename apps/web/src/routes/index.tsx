import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@repo/ui/components/button";

// @ts-expect-error route path validated after TanStack Start generates routeTree
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
