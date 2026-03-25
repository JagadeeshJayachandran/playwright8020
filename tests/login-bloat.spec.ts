// =============================================================================
// THE ANTI-PATTERN: tests/login-bloat.spec.ts
//
// PROBLEM: Every single test has to log in from scratch.
//   - Each test opens a fresh browser, navigates to the login page,
//     fills in credentials, and clicks the button — EVERY. SINGLE. TIME.
//   - With 2 tests this is annoying. With 20 tests, this is a disaster.
//   - If the login page URL ever changes, you have to update EVERY test.
//   - This is a maintenance nightmare and a massive time waster.
// =============================================================================

import { test, expect } from '@playwright/test';

// Because the 'chromium' project in playwright.config.ts injects a saved auth
// session into every test, we must explicitly clear it here so the browser
// starts unauthenticated and we can demonstrate the manual login flow.
// (This is yet another hidden cost of the anti-pattern — extra boilerplate
// just to prove the point that login is slow!)
test.use({ storageState: { cookies: [], origins: [] } });

// ---------------------------------------------------------------------------
// TEST 1: Verify PIM Module
// ---------------------------------------------------------------------------
test('Verify PIM Module', async ({ page }) => {

  // --- DUPLICATED LOGIN BLOCK (copy-pasted into every test) ---
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  // --- END DUPLICATED LOGIN BLOCK ---

  // Now we can finally do our actual test work
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.waitForURL('**/pim/**'); // wait for navigation before asserting
  await expect(page.getByRole('heading', { name: 'PIM' })).toBeVisible();
});

// ---------------------------------------------------------------------------
// TEST 2: Verify Leave Module
// ---------------------------------------------------------------------------
test('Verify Leave Module', async ({ page }) => {

  // --- DUPLICATED LOGIN BLOCK (exact same 4 lines, again) ---
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  // --- END DUPLICATED LOGIN BLOCK ---

  // Now we can finally do our actual test work
  await page.getByRole('link', { name: 'Leave' }).click();
  await page.waitForURL('**/leave/**'); // wait for navigation before asserting
  await expect(page.getByRole('heading', { name: 'Leave List' })).toBeVisible();
});
