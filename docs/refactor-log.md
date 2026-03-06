# Refactor / CI Stabilization Log

## Scope

- Keep `.github/workflows/ci.yml` as canonical auto-running CI/CD.
- Retain `.github/workflows/ci-cd.yml` and `.github/workflows/ci-minimal.yml` as manual-only (`workflow_dispatch`) to avoid duplicate automatic pipelines while preserving fallback playbooks.
- Apply high-confidence, behavior-preserving improvements only.
- Audit `"use client"` usage and only refactor where safety is unambiguous.

## Changes Applied

### CI/CD

1. Canonical workflow: `.github/workflows/ci.yml` (auto trigger on push/PR).
2. Added workflow concurrency with `cancel-in-progress`.
3. Expanded PR trigger to include `develop` for parity with push trigger.
4. Added deterministic pnpm cache keying via `cache-dependency-path: pnpm-lock.yaml` on lint/test/build/deploy setup-node steps.
5. Added PostgreSQL service container for test job.
6. Updated test command to non-watch execution: `pnpm run test -- --run`.
7. Fixed Docker Hub login to support both GitHub `secrets` and `vars` fallbacks.
8. Reworked Vercel deploy gating in `ci.yml` to runtime secret check step (`Check Vercel secret availability`) + conditional deploy step.
9. Converted `.github/workflows/ci-cd.yml` to `workflow_dispatch` only and replaced unresolved `vercel/action@v4` with CLI deploy (`pnpm dlx vercel ...`) guarded by runtime secret check.
10. Converted `.github/workflows/ci-minimal.yml` to `workflow_dispatch` only to prevent duplicate automatic pipeline execution.

### `use client` audit & refactor

1. Added inventory at `docs/use-client-inventory.md`.
2. High-confidence accidental client component removed:
   - Deleted `src/components/i18n/language-toggle.tsx` (no imports/usages found; duplicate of active `src/components/LanguageToggle.tsx`).

## Validation Log

Environment limitation in this workspace shell:

- `node` exists (`v20.19.2`)
- `pnpm` missing (`/bin/sh: pnpm: not found`)
- `corepack` missing (`/bin/sh: corepack: not found`)
- `npm`/`npx` missing (`/bin/sh: npm: not found`, `/bin/sh: npx: not found`)

Because the package manager toolchain is unavailable in this terminal environment, local script validation could not be executed here.

- [ ] `pnpm run lint`
- [ ] `pnpm run type-check`
- [ ] `pnpm run test -- --run`
- [ ] `pnpm run build`

## Notes

- No runtime feature behavior was intentionally changed.
- Any additional code refactor must preserve existing behavior and pass all validations.
