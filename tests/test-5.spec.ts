import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://chatgpt.com/');
  await expect(page.getByRole('paragraph').filter({ hasText: /^$/ })).toBeVisible();
  // await expect(page.getByText('What can I help with?').first()).toBeVisible();
  // await expect(page.locator('#thread')).toContainText('What can I help with?');

  await page.getByRole('link', { name: 'Images' }).click();
  await expect(page).toHaveURL(/image[s]?/);
  await page.getByRole('button', { name: 'Try again' }).click();

  await expect(page.getByRole('heading', { name: 'Images' })).toBeVisible();
  await page.getByRole('link', { name: 'New chat Control Shift O' }).click();
  await page.getByRole('link', { name: 'New chat Control Shift O' }).click();
  await expect(page.getByRole('heading', { name: 'Images' })).not.toBeVisible();
  await page.getByRole('button', { name: 'Try again' }).click();
});