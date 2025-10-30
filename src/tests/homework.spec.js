import { test, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';
 
test('homework', async ({ page }) => {
    await page.goto('https://team8-2022brno.herokuapp.com/registrace');
    // Input with name and surname 
    await page.getByLabel('Jméno a příjmení').fill('Lucie Sevcikova');
    // Input with email
    await page.locator('body .card input#email').fill('lucie.sevcikova108@gmail.com');
    // Input with password
    await page.locator('body .card input#password').fill('myAwesomePassword108');
     // Input with password
    await page.locator('body .card input#password-confirm').fill('myAwesomePassword108');
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

test('lesson 4', async ({page}) => {
    await page.goto('/prihlaseni');
    await expect(page).toHaveScreenshot();

    const emailField = page.getByLabel('Email');
    await expect(emailField).toBeVisible();
    await expect(emailField).toBeEnabled();

    const passwordField = page.getByLabel('Heslo');
    await expect(passwordField, 'Password field shoud be visible').toBeVisible();
    await expect(passwordField).toBeEnabled();

    const loginButton = await page.getByRole('button', { name: 'Přihlásit'})
    await expect(loginButton).toHaveText('Přihlásit');

    await emailField.fill('da-app.admin@czechitas.cz');
    await passwordField.fill('Czechitas123');
    await loginButton.click()

    const userName = page.locator('.navbar-right').locator('strong')
    await expect(userName).toHaveText('Lišák Admin');
}) 

test('lesson 4.2', async ({page}) => {
    await page.goto('/')
    const moreInfoButton = page.getByText('Více informací')
    await expect(moreInfoButton).toBeVisible();
    await moreInfoButton.click();
    await expect(moreInfoButton).not.toBeAttached();

    await page.getByRole('link', { name: 'Vytvořit přihlášku'}).click();

    const loginButton = await page.getByRole('button', { name: 'Přihlásit'})
    const emailField = page.getByLabel('Email');
    const passwordField = page.getByLabel('Heslo');
    await emailField.fill('da-app.admin@czechitas.cz');
    await passwordField.fill('Czechitas123');
    await loginButton.click();

    const checkkbox = page.locator('#restrictions_yes');
    await expect(checkkbox).not.toBeChecked();
    await checkkbox.check({ force: true });
    await expect(checkkbox).toBeChecked();
})

// Homework 3
// Test který provede validní registraci uživatele - kontroluj, že registrace proběhla úspěšně (pro unikátnost můžete do adresy mailu přidat aktuální čas v ms pomocí Date.now() )

test('homework - new registration', async ({ page }) => {
    await page.goto('/registrace');

    const inputName = page.getByLabel('Jméno a příjmení');
    const inputEmail = page.getByLabel('Email');
    const inputPassword = page.getByLabel('Heslo');
    const inputConfirmPassword = page.getByLabel('Kontrola hesla');
    const submitButton = page.getByRole('button', {name: 'Zaregistrovat'});
    const now = Date.now();

    await inputName.fill('Rachel Green');
    await inputEmail.fill('rachel.green' + now + '@gmail.com');
    await inputPassword.fill('rachelGreen30');
    await inputConfirmPassword.fill('rachelGreen30');
    await submitButton.click();

    await expect(page).toHaveURL('https://team8-2022brno.herokuapp.com/zaci');
})

// Test, který provede registraci uživatele s již existujícím emailem - zkontroluj, že registrace neproběhla a ověř chyby 

test('homework - invalid registration', async ({ page }) => {
    await page.goto('/registrace');

    const inputName = page.getByLabel('Jméno a příjmení');
    const inputEmail = page.getByLabel('Email');
    const inputPassword = page.getByLabel('Heslo');
    const inputConfirmPassword = page.getByLabel('Kontrola hesla');
    const submitButton = page.getByRole('button', {name: 'Zaregistrovat'});
    const errorMessage = page.locator('.invalid-feedback').locator('strong')

    await inputName.fill('Lucie Sevcikova');
    await inputEmail.fill('lucie.sevcikova108@gmail.com');
    await inputPassword.fill('myAwesomePassword108');
    await inputConfirmPassword.fill('myAwesomePassword108');
    await submitButton.click();
    await expect(errorMessage).toBeVisible(); 
    await expect(errorMessage).toHaveText('Účet s tímto emailem již existuje');
    await expect(page).not.toHaveURL('https://team8-2022brno.herokuapp.com/zaci');

})

// Test, který provede registraci uživatele s nevalidním heslem (obsahující pouze čísla) - zkontroluj, že registrace neproběhla a ověř chyby

test('homework - invalid password', async ({ page }) => {
    await page.goto('/registrace');

    const inputName = page.getByLabel('Jméno a příjmení');
    const inputEmail = page.getByLabel('Email');
    const inputPassword = page.getByLabel('Heslo');
    const inputConfirmPassword = page.getByLabel('Kontrola hesla');
    const submitButton = page.getByRole('button', {name: 'Zaregistrovat'});
    const errorMessage = page.locator('.invalid-feedback').locator('strong');
    const now = Date.now();

    await inputName.fill('Monika Geller');
    await inputEmail.fill('monika.geller' + now + '@gmail.com');
    await inputPassword.fill('1234');
    await inputConfirmPassword.fill('1234');
    await submitButton.click();
    await expect(errorMessage).toBeVisible(); 
    await expect(errorMessage).toHaveText('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici');
    await expect(page).toHaveURL(/.*registrace/); 

})

test('lesson 5', async ({page}) => {
    await page.goto('/prihlaseni');
    await expect(page).toHaveScreenshot();

    const emailField = page.getByLabel('Email');
    await expect(emailField).toBeVisible();
    await expect(emailField).toBeEnabled();

    const passwordField = page.getByLabel('Heslo');
    await expect(passwordField, 'Password field shoud be visible').toBeVisible();
    await expect(passwordField).toBeEnabled();

    const loginButton = await page.getByRole('button', { name: 'Přihlásit'})
    await expect(loginButton).toHaveText('Přihlásit');

    await emailField.fill('da-app.admin@czechitas.cz');
    await passwordField.fill('Czechitas123');
    await loginButton.click()

    const userName = page.locator('.navbar-right').locator('strong')
    await expect(userName).toHaveText('Lišák Admin');

    await page.getByRole('link', { name: ' Přihlášky' }).click();
    await page.waitForLoadState();

    await page.locator('tbody').locator('tr').first().waitFor();

}) 

//Homework 4, Lesson 5

test.describe('Registration page', { tag: "@smoke" }, () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/registrace');
        const inputName = page.getByLabel('Jméno a příjmení');
        const inputEmail = page.getByLabel('Email');
        const inputPassword = page.getByLabel('Heslo');
        const inputConfirmPassword = page.getByLabel('Kontrola hesla');
        const submitButton = page.getByRole('button', {name: 'Zaregistrovat'});
        const errorMessage = page.locator('.invalid-feedback').locator('strong')
        const now = Date.now();
    })

    test('Should create a new registration', { tag: "@registration" }, async ({ page }) => {

        await inputName.fill('Rachel Green');
        await inputEmail.fill('rachel.green' + now + '@gmail.com');
        await inputPassword.fill('rachelGreen30');
        await inputConfirmPassword.fill('rachelGreen30');
        await submitButton.click();

        await expect(page).toHaveURL('https://team8-2022brno.herokuapp.com/zaci');
    })

    test('Should not register with existing account', { tag: "@registration" }, async ({ page }) => {

        await inputName.fill('Lucie Sevcikova');
        await inputEmail.fill('lucie.sevcikova108@gmail.com');
        await inputPassword.fill('myAwesomePassword108');
        await inputConfirmPassword.fill('myAwesomePassword108');
        await submitButton.click();
        await expect(errorMessage).toBeVisible(); 
        await expect(errorMessage).toHaveText('Účet s tímto emailem již existuje');
        await expect(page).not.toHaveURL('https://team8-2022brno.herokuapp.com/zaci');

    })

    test('Should not create new registration with invalid password', { tag: "@registration" }, async ({ page }) => {

        await inputName.fill('Monika Geller');
        await inputEmail.fill('monika.geller' + now + '@gmail.com');
        await inputPassword.fill('1234');
        await inputConfirmPassword.fill('1234');
        await submitButton.click();
        await expect(errorMessage).toBeVisible(); 
        await expect(errorMessage).toHaveText('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici');
        await expect(page).toHaveURL(/.*registrace/); 

    })
    
})