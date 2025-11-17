import { test, expect } from '@playwright/test';
import { login } from '../helpers.js'; 

// Valid test data
const baseURL = 'https://www.saucedemo.com/';
const users = {
    valid: [
        { username: 'standard_user', password: 'secret_sauce' },
        { username: 'locked_out_user', password: 'secret_sauce' },
        { username: 'problem_user', password: 'secret_sauce' },
        { username: 'performance_glitch_user', password: 'secret_sauce' },
        { username: 'error_user', password: 'secret_sauce' },
        { username: 'visual_user', password: 'secret_sauce' }
    ]
};

test('link can be opened', async ({ page }) => {
  await page.goto(baseURL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

users.valid.forEach(({ username, password }) => {
    test(`login with valid credentials: ${username}`, async ({ page }) => {
        await login(page, username, password);
        console.log(`Logged in with user: ${username}`);

        if (username === 'locked_out_user') {
            // Expect error message for locked out user
            await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
        } else {
            // Expect to be on inventory page
            await expect(page.locator('.inventory_list')).toBeVisible();
        }
    });
});
test ('login with invalid credentials', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('invalid_user');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();
    // Expect error message for invalid credentials
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('login with empty fields', async ({ page }) => {
    await page.goto(baseURL);
    // Expect username and password fields to be empty by default
    await expect(page.getByPlaceholder('Username')).toHaveValue('');
    await expect(page.getByPlaceholder('Password')).toHaveValue('');
    await page.getByRole('button', { name: 'Login' }).click();
    // Expect error message for empty username or password
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});

test('add an item to cart and checkout', async ({ page }) => {
    await login(page);
    // Add item to cart
    await page.getByText('Sauce Labs Backpack').click();
    // Click 'Add to cart' button
    await page.getByRole('button', { name: 'Add to cart' }).click();
    // Expect one item in cart
    await expect(page.locator('.shopping_cart_link')).toHaveCount(1);
    console.log('One item added to cart');
    // Go to cart
    await page.click('.shopping_cart_link');
    // Proceed to checkout
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Zip/Postal Code').click();
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();
    // Go back to inventory
    await page.getByRole('button', { name: 'Back Home' }).click();
    // Expect to be back on inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('add multiple items to cart and checkout', async ({ page }) => {
    await login(page);
    // Add first item to cart
    await page.getByText('Sauce Labs Backpack').click();
    // Click 'Add to cart' button
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.goBack();
    // Add second item to cart
    await page.getByText('Sauce Labs Bike Light').click();
    // Click 'Add to cart' button
    await page.getByRole('button', { name: 'Add to cart' }).click();
    // Go to cart
    await page.click('.shopping_cart_link');
    // Expect to see both items in cart
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('Jane');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('Smith');
    await page.getByPlaceholder('Zip/Postal Code').click();
    await page.getByPlaceholder('Zip/Postal Code').fill('54321');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();
    // Expect to see a message confirming the order
    await expect(page.locator('.complete-text')).toBeVisible();
});

test('logout functionality', async ({ page }) => {
    await login(page);
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    await page.getByRole('link', { name: 'Logout' }).click();
    // Expect to be back on login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});