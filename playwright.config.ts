// =============================================================================
// THE COMMAND CENTER: playwright.config.ts
//
// This is the single source of truth for your entire test suite.
// Key concepts for this video:
//   1. baseURL  — set once here, used everywhere with page.goto('/path')
//   2. 'setup' project  — runs auth.setup.ts ONCE to log in and save the session
//   3. 'chromium' project — depends on 'setup', and reuses the saved session
//      via storageState so every test starts already authenticated.
// =============================================================================

import { defineConfig, devices } from '@playwright/test';

// The path where the authenticated session (cookies + localStorage) is saved.
// Defined here so both the setup script and the chromium project share it.
const authFile = '.auth/user.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Throttle to 1 worker: the OrangeHRM free demo site returns 429 Too Many
  // Requests when tests run in parallel. A real app under your control would
  // not have this constraint — remove this line and enjoy full parallelism.
  workers: 1,
  reporter: 'html',

  use: {
    // --- THE KEY CHANGE ---
    // Set the base URL once here. Now every page.goto('/some/path') in every
    // test will automatically prepend this, eliminating hardcoded URLs.
    baseURL: 'https://opensource-demo.orangehrmlive.com',

    trace: 'retain-on-failure',
    headless: process.env.HEADLESS !== 'false',
  },

  outputDir: 'test-results/',

  projects: [
    // --- PROJECT 1: THE SETUP ---
    // This project runs first. Its only job is to log in once and save
    // the browser's session state (cookies, localStorage) to a file.
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },

    // --- PROJECT 2: THE REAL TESTS ---
    // This project runs after 'setup' finishes (via dependencies).
    // It loads the saved session from disk, so every test starts
    // already logged in — without touching the login page at all.
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Load the saved auth session before each test
        storageState: authFile,
      },
      // Don't start until the 'setup' project has completed
      dependencies: ['setup'],
    },
  ],
});

