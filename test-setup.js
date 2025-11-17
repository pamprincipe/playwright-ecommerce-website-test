import { test as base } from '@playwright/test';

// Extend test with a login function
export const test = base.extend({
  login: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await use(page); // Pass the logged-in page to tests
  },
});

export { expect } from '@playwright/test';
