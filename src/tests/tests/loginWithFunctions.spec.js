require("dotenv").config;
import { expect, test } from "@playwright/test";

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

async function getToastError(page) {
    return page.locator(".toast-error");
}

async function getUsernameTextbox(page) {
    return page.getByLabel("Email");
}

async function getPasswordTextbox(page) {
    return page.getByLabel("Heslo");
}

async function login(page, username, password) {
    await page.goto("/prihlaseni");
    const usernameTextbox = await getUsernameTextbox(page);
    await usernameTextbox.fill(username);
    const passwordTextbox = await getPasswordTextbox(page);
    await passwordTextbox.fill(password);
    await page.getByRole('button', { name: 'Přihlásit' }).click();
}

test.describe("Login page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/prihlaseni");
    });

    test("Check login form elements", async ({ page }) => {
        const usernameTextbox = await getUsernameTextbox(page);
        await expect(usernameTextbox).toBeVisible();
        await expect(usernameTextbox).toBeEnabled();

        const passwordTextbox = await getPasswordTextbox(page);
        await expect(passwordTextbox).toBeVisible();
        await expect(passwordTextbox).toBeEnabled();
    });

    test("valid login", { tag: ["@smoke", "@login"] }, async ({ page }) => {
        await login(page, ADMIN_USERNAME, ADMIN_PASSWORD);

        const user = page.locator(".navbar-right").locator("strong");
        await expect(user).toHaveText("Lišák Admin");
        await expect(await getToastError(page)).not.toBeVisible();
    });
    test.describe("Invalid logins", () => {
        ["12345", "abababa", "ab123"].forEach(
            password => {
                test(`login with invalid password ${password} - toast error`, async ({ page }) => {
                    await login(page, ADMIN_USERNAME, password);
                    await expect(await getToastError(page)).toBeVisible();
                    await expect(await getToastError(page)).not.toBeVisible({ timeout: 10000 });
                });
            }
        );

        test("login with invalid credentials - field feedback", async ({ page }) => {
            await login(page, ADMIN_USERNAME, "12345");
            const fieldError = page.locator(".invalid-feedback");
            await expect(fieldError).toBeVisible();
            await expect(fieldError).toHaveText("Tyto přihlašovací údaje neodpovídají žadnému záznamu.");
        });
    });
});