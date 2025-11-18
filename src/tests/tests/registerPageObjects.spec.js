import { expect, test } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";

test.describe("Registration page", { tag: "@smoke" }, () => {
  test.beforeEach(async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.open();
  });

  test(
    "Should create a new registration",
    { tag: "@registration" },
    async ({ page }) => {
      const registerPage = new RegisterPage(page);

      await registerPage.register(
        "Rachel Green",
        registerPage.generateUniqueEmail(),
        "rachelGreen30",
        "rachelGreen30"
      );

      await expect(registerPage.page).toHaveURL(
        "https://team8-2022brno.herokuapp.com/zaci"
      );
    }
  );

  test(
    "Should not register with existing account",
    { tag: "@registration" },
    async ({ page }) => {
      const registerPage = new RegisterPage(page);

      await registerPage.register(
        "Lucie Sevcikova",
        "lucie.sevcikova108@gmail.com",
        "myAwesomePassword108",
        "myAwesomePassword108"
      );
      await expect(registerPage.errorMessage).toBeVisible(page);
      await expect(registerPage.errorMessage).toHaveText(
        "Účet s tímto emailem již existuje"
      );
      await expect(registerPage.page).not.toHaveURL(
        "https://team8-2022brno.herokuapp.com/zaci"
      );
    }
  );

  test(
    "Should not create new registration with invalid password",
    { tag: "@registration" },
    async ({ page }) => {
      const registerPage = new RegisterPage(page);

      await registerPage.register(
        "Monika Geller",
        registerPage.generateUniqueEmail(),
        "1234",
        "1234"
      );
      await expect(registerPage.errorMessage).toBeVisible();
      await expect(registerPage.errorMessage).toHaveText(
        "Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici"
      );
      await expect(registerPage.page).toHaveURL(/.*registrace/);
    }
  );
});
