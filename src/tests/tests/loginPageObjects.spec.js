require("dotenv").config;
import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

test.describe("Login page", () => {
    test.beforeEach(async ({ page }) => {
       const loginPage = new LoginPage(page);
       await loginPage.open();
    });

    test("Check login form elements", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await expect(loginPage.emailField).toBeVisible();
        await expect(loginPage.emailField).toBeEnabled();
        await expect(loginPage.passwordField).toBeVisible();
        await expect(loginPage.passwordField).toBeEnabled();
    });

    test("valid login", { tag: ["@smoke", "@login"] }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);

        await expect(loginPage.usernameDropdown).toHaveText("Lišák Admin");
        await expect(loginPage.toastError).not.toBeVisible();
    });

    test("should logout", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);

        await loginPage.logout();
        await expect(loginPage.usernameDropdown).not.toBeVisible();
    });

    test.describe("Invalid logins", () => {
        ["12345", "abababa", "ab123"].forEach(
            password => {
                test(`login with invalid password ${password} - toast error`, async ({ page }) => {
                    const loginPage = new LoginPage(page);
                    await loginPage.login(ADMIN_USERNAME, password);
                    await expect(loginPage.toastError).toBeVisible();
                    await expect(loginPage.toastError).not.toBeVisible({ timeout: 10000 });
                });
            }
        );

        test("login with invalid credentials - field feedback", async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.login(ADMIN_USERNAME, "12345");
            await expect(loginPage.fieldError).toBeVisible();
            await expect(loginPage.fieldError).toHaveText("Tyto přihlašovací údaje neodpovídají žadnému záznamu.");
        });
    });
});