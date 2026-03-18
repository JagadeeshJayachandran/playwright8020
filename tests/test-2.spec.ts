import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click({force: true});
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('john');
  await page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2).click();
  await page.getByRole('option', { name: 'Admin' }).click();
  await page.getByText('-- Select --').click();
  await page.getByRole('option', { name: 'Enabled' }).click();
  await page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().click();
  await page.getByRole('option', { name: 'ESS' }).click();
  await page.locator('body').press('Enter');
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).press('Enter');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByText('Job').click();
  await page.getByRole('menuitem', { name: 'Job Titles' }).click();
  await page.locator('.oxd-icon.bi-check').first().click();
  await page.locator('.oxd-icon.bi-check').first().click();
});