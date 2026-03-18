import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.goto('https://chatgpt.com/');
  await expect(page.getByText('What can I help with?').first()).toBeVisible();
});