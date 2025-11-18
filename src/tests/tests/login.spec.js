import { expect, test } from "@playwright/test";

test.describe("Login page", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("/prihlaseni");   
    });

    test("valid login", {tag: ["@smoke", "@login"] }, async ({ page }) => {
        const emailField = page.getByLabel("Email");
        const passwordField = page.getByLabel("Heslo");
        const loginButton = page.getByRole('button', { name: 'Přihlásit' });

        await emailField.fill("da-app.admin@czechitas.cz");
        await passwordField.fill("Czechitas123");
        await loginButton.click();

        const user = page.locator(".navbar-right").locator("strong");
        await expect(user).toHaveText("Lišák Admin");
    });
    test.describe("Invalid logins", () => {
        test.beforeEach(async ({page}) => {
            const emailField = page.getByLabel("Email");
            const passwordField = page.getByLabel("Heslo");
            const loginButton = page.getByRole('button', { name: 'Přihlásit' });

            await emailField.fill("da-app.admin@czechitas.cz");
            await passwordField.fill("12345");
            await loginButton.click();
        });

        test("login with invalid credentials - toast error", async ({ page }) => {
            const toastError = page.locator(".toast-error");
            await expect(toastError).toBeVisible();
            await expect(toastError).not.toBeVisible();
        });

        test("login with invalid credentials - field feedback", async ({ page }) => {
            const fieldError = page.locator(".invalid-feedback");
            await expect(fieldError).toBeVisible();
            await expect(fieldError).toHaveText("Tyto přihlašovací údaje neodpovídají žadnému záznamu.");
        });
    });
});