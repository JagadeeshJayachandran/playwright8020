import { test, expect } from '@playwright/test';

// This test is intentionally designed to fail **only on CI** so you can demo the
// full artifact + trace workflow without breaking local development.
//
// It is skipped locally (when `process.env.CI` is not set) and fails on CI.
// Remove or update it once you no longer need the demo.

test.skip(!process.env.CI, 'Only run this demo test on CI to produce a trace artifact');

test('demo failure to generate trace artifact', async () => {
  expect(1).toBe(2);
});
