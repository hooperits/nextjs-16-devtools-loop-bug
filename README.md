# Next.js 16.1.1: DevTools causes infinite console error loop

## Reproduction Repository

This repository demonstrates a bug in Next.js 16.1.1 where the DevTools system causes an infinite console error loop.

## To Reproduce

1. Clone this repository
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:3000 in browser
5. Open browser DevTools console
6. Observe infinite error loop:

```
TypeError: _interop_require_wildcard._ is not a function
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/next-devtools/...)
[INFO] Download the React DevTools...
[LOG] [HMR] connected
(repeats infinitely ~3x per second)
```

## Current vs. Expected behavior

**Current behavior:**
- DevTools internal errors cause an infinite console error loop
- The loop happens even on pages WITHOUT application errors
- Console becomes unusable due to spam
- Significant performance overhead from infinite logging

**Expected behavior:**
- Console errors should only be logged once
- DevTools internal errors should not leak to user console
- No infinite loops in the console

## Environment

```
Operating System:
  Platform: linux
  Arch: x64

Binaries:
  Node: 20.x
  npm: 10.x

Relevant Packages:
  next: 16.1.1
  react: 19.1.0
  react-dom: 19.1.0
```

## Affected areas

- [x] Developer Experience
- [x] Runtime
- [x] DevTools

## Affected stages

- [x] next dev (local)

## Stack trace

The error originates in Next.js DevTools:

```
TypeError: _interop_require_wildcard._ is not a function
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/next-devtools/userspace/app/errors/intercept-console-error.js)
```

## Things that DON'T fix it

- `devIndicators: false` in next.config.mjs (only hides visual indicator)
- `NEXT_DEVTOOLS_DISABLED=true` env var (not recognized)

## Related closed issues

- #74321 - Same issue in 15.1.x, closed as invalid (missing repro)
- #74817 - Similar issue, closed as NOT_PLANNED (couldn't reproduce)

Both were closed without resolution. This issue persists in Next.js 16.1.1.
