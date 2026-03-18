import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://chatgpt.com/');
  await expect(page.getByTestId('composer-speech-button')).toBeVisible();
  await expect(page.locator('#thread')).toContainText('What can I help with?');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByText('Get responses tailored to you')).toBeVisible();
  await page.getByTestId('close-sidebar-button').click();
  // await expect(page.getByText('Get responses tailored to you')).not.toBeVisible();

  await expect(page.getByRole('paragraph').filter({ hasText: /^$/ })).toBeVisible();
  await page.locator('#stage-sidebar-tiny-bar').getByTestId('sidebar-item-library').click();
  await page.getByTestId('signup-button').click();
  await expect(page.getByRole('paragraph').filter({ hasText: /^$/ })).not.toBeVisible();
  
});