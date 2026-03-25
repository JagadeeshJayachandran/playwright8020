// =============================================================================
// THE PAYOFF: tests/clean-tests.spec.ts
//
// Compare this file to login-bloat.spec.ts — same two tests, but:
//   - Zero login steps. Not a single line of auth code.
//   - No credentials. No hardcoded URLs. No repeated boilerplate.
//   - Each test does ONLY what it's supposed to test.
//
// How does it work? The 'chromium' project in playwright.config.ts loads
// .auth/user.json (created by auth.setup.ts) before this file even runs.
// Playwright injects those saved cookies into the browser context, so from
// the very first line of each test, the browser is already logged in.
// =============================================================================

import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// TEST 1: Verify PIM Module
// ---------------------------------------------------------------------------
test('Verify PIM Module', async ({ page }) => {

  // Jump straight to the authenticated dashboard — no login needed
  await page.goto('/web/index.php/dashboard/index');

  // Now do the actual work of this test
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.waitForURL('**/pim/**');
  await expect(page.getByRole('heading', { name: 'PIM' })).toBeVisible();
});

// ---------------------------------------------------------------------------
// TEST 2: Verify Leave Module
// ---------------------------------------------------------------------------
test('Verify Leave Module', async ({ page }) => {

  // Same — land directly on the dashboard, fully authenticated
  await page.goto('/web/index.php/dashboard/index');

  // Now do the actual work of this test
  await page.getByRole('link', { name: 'Leave' }).click();
  await page.waitForURL('**/leave/**');
  await expect(page.getByRole('heading', { name: 'Leave List' })).toBeVisible();
});
