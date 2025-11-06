require('dotenv').config;
import { expect, test } from "@playwright/test";

const{ADMIN_USERNAME, ADMIN_PASSWORD} = process.env;

async function getToastError(page) {
    return page.locator(".toast-error");
}

async function getUserNameTextBox(page) {
    return page.getByLabel('Email');
}

async function login(page, username, password) {
    await page.goto('/prihlaseni');
    const getUserNameTextBox = await getUserNameTextBox(page);
    await getUserNameTextBox.fill(username);
    await page.getByLabel('Heslo').fill(password);
    await page.getByRole('button', { name: 'Přihlásit'}).click();
}

test.describe("Login page", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("/prihlaseni");
    })

    test ('Check login form elements', async ({page}) => {
        const userNameTextBox = await getUserNameTextBox(page);
        await expect(userNameTextBox).toBeVisible();
        await expect(userNameTextBox).toBeEnabled();
    })

    test("valid login", {tag: ['@smoke', '@login']}, async ({ page }) => {
        await login(page, ADMIN_USERNAME, ADMIN_PASSWORD);

        const user = page.locator(".navbar-right").locator("strong");
        await expect(user).toHaveText("Lišák Admin");
    });
    test.describe("Invalid logins", () => {
        test.beforeEach(async ({page}) => {
            await login(page, ADMIN_USERNAME, '12345')
        }) 

        test("login with invalid credentials - toast error", async ({ page }) => {
            await expect(await getToastError(page)).toBeVisible();
            await expect(await getToastError(page)).not.toBeVisible({ timeout: 10000 });
        });

        test("login with invalid credentials - field feedback", async ({ page }) => {
            const fieldError = page.locator(".invalid-feedback");
            await expect(fieldError).toBeVisible();
            await expect(fieldError).toHaveText("Tyto přihlašovací údaje neodpovídají žadnému záznamu.");
        });
    });
    })