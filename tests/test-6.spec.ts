import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.goto('https://chatgpt.com/');
  await expect(page.getByText('What can I help with?').first()).toBeVisible();

  await expect(page.getByLabel('Chat history')).toContainText('Get responses tailored to you');

  await page.getByRole('link', { name: 'Images' }).click();
  await expect(page).toHaveURL("https://chatgpt.com/images");

  await expect(page.getByRole('heading', { name: 'Images' })).toBeVisible();
  await page.getByRole('link', { name: 'New chat Control Shift O' }).click();
  await page.getByRole('link', { name: 'New chat Control Shift O' }).click();
  await expect(page.getByRole('heading', { name: 'Images' })).not.toBeVisible();
});