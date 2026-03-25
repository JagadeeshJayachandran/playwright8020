// =============================================================================
// THE SETUP SCRIPT: tests/auth.setup.ts
//
// This file runs ONCE before your entire test suite (not before each test).
// Think of it as the "global beforeAll" for authentication.
//
// What it does:
//   1. Opens a browser and navigates to the login page
//   2. Logs in with valid credentials
//   3. Waits until the app confirms we're on the dashboard (fully logged in)
//   4. Serializes the browser's session state — cookies, localStorage, etc. —
//      and saves it to `.auth/user.json`
//
// After this runs, every test in the 'chromium' project will load that file
// and start in an already-authenticated state. Zero login overhead.
// =============================================================================

import { test as setup, expect } from '@playwright/test';
import path from 'path';

// This path MUST match the `storageState` value in playwright.config.ts
const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate as Admin', async ({ page }) => {

  // Step 1: Navigate to the login page
  // Note: baseURL is set in the config, so we only need the path here
  await page.goto('/web/index.php/auth/login');

  // Step 2: Fill in the credentials
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');

  // Step 3: Submit the form
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 4: Wait for confirmation that login succeeded.
  // We MUST wait here before saving state — if we save too early,
  // we'll capture a pre-login session (with no auth cookies) by mistake.
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  // Step 5: Save the authenticated session to disk.
  // Playwright will save all cookies and localStorage for this domain.
  // The 'chromium' project in the config will load this file automatically.
  await page.context().storageState({ path: authFile });
});
