# utils

Reusable TypeScript utilities for this monorepo.

## Development

```bash
vp install              # Install workspace dependencies
vp run utils#test       # Run tests
vp run utils#build      # Build the library (tsdown)
vp run utils#dev        # Rebuild on change
```

## Release

```bash
pnpm --filter utils release    # bumpp + publish
```
