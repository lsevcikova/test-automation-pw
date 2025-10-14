import { test, expect } from '@playwright/test';
 
test('homework', async ({ page }) => {
    await page.goto('https://team8-2022brno.herokuapp.com/registrace');
    // Input with name and surname 
    await page.getByLabel('Jméno a příjmení').fill('John Doe');
    // Input with email
    await page.locator('body .card input#email').fill('john.doe@example.com');
    // Input with password
    await page.locator('body .card input#password').fill('awesomePassword');
     // Input with password
    await page.locator('body .card input#password-confirm').fill('awesomePassword');
    // Submit button
    await page.getByRole('button', {name: 'Zaregistrovat'}).screenshot({ path: "submit_btn.png" });
});