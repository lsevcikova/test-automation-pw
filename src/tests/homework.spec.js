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
    const submitButton = await page.getByRole('button', {name: 'Zaregistrovat'});
    await submitButton.click();
});

test('lesson 3', async ({page}) => {
    await page.goto('/prihlaseni');
    const headingLocator = page.getByRole('heading', {level: 1});
    const headingText = await headingLocator.textContent();
    console.log(headingText);

    const emailField = await page.getByLabel('Email');
    console.log('Is email field visible?' + await emailField.isVisible());
    console.log('Is email field enabled?' + await emailField.isEnabled());

    const forgotPassword = page.getByText('Zapomněli jste své heslo?');
    console.log("Forgot password href:" + await forgotPassword.getAttribute("href"));

    const passwordField = await page.getByLabel('Heslo');
    console.log('Is password field visible?' + await passwordField.isVisible());
    console.log('Is password field enabled?' + await passwordField.isEnabled());

    const loginButton = await page.getByRole('button', { name: 'Přihlásit'})
    console.log('Text of the login button is' + await loginButton.textContent());

    await emailField.fill('da-app.admin@czechitas.cz');
    await passwordField.fill('Czechitas123');
    await loginButton.click()

    const userName = page.locator('.navbar-right').locator('strong')
    console.log('Logged user: ' + await userName.textContent());
})