// helpers.js
import { expect } from '@playwright/test';

/**
 * Logs in to the Sauce Labs website using the given username and password.
 * Defaults to standard_user and secret_sauce if not provided.
 *
 * @param {Page} page - The page object to use for the login.
 * @param {string} [username=standard_user] - The username to use for the login.
 * @param {string} [password=secret_sauce] - The password to use for the login.
 */
export async function login(page, username = 'standard_user', password = 'secret_sauce') {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);

  await page.getByRole('button', { name: 'Login' }).click();  
}
