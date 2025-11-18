import { test } from "@playwright/test";

test("should open login page", async ({ page }) => {
    await page.goto("/prihlaseni");
    await page.locator("input#email").screenshot({ path: "css_id_email.png" });
    await page.locator(".btn-primary").screenshot({ path: "submit_btn.png" });
    console.log(await page.title());
});