import { test } from '@playwright/test';

test(
  'should login with correct credentials',
  async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByPlaceholder('Email').fill('kuprins@outlook.com');
    await page.getByPlaceholder('Email').press('Tab');
    await page.getByPlaceholder('Password').fill('12345678');
  },
);
