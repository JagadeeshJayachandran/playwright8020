# Playwright Quickstart

This repo is a minimal Playwright test suite with a GitHub Actions workflow that:

- Runs Playwright tests on push / pull request
- Uploads the HTML report always (`playwright-report/`)
- Uploads trace artifacts (`test-results/`) only when tests fail so you can debug locally

## Running locally

```bash
npm ci
npx playwright test
```

### Running with the UI runner

```bash
npx playwright test --ui
```

## Viewing failure traces

When a test fails, Playwright generates `trace.zip` under `test-results/`.

To open it locally:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

## CI demo failure test

This repo includes a CI-only failing demo test at `tests/ci-trace-demo.spec.ts`.
It is skipped locally (so your dev runs stay green) but will fail on CI and produce a trace artifact you can download and inspect.
