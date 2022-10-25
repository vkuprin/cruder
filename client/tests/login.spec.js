import { test, expect } from '@playwright/test';

test('login page has Support in title and was able to submit a form', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page).toHaveTitle(/Cruder/);
  const getStarted = page.locator('text=Cruder');
  await expect(getStarted).toHaveAttribute('class', 'ant-typography mb-15');

  const email = page.locator('input[id="email"]');
  const password = page.locator('input[id="password"]');

  await email.type('kuprins@outlook.com');
  await password.type('12345678');
});
