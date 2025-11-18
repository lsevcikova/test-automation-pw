export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailField = this.page.getByLabel("Email");
        this.passwordField = this.page.getByLabel("Heslo");
        this.loginButton = this.page.getByRole('button', { name: 'Přihlásit' });
        this.toastError = this.page.locator(".toast-error");
        this.fieldError = this.page.locator(".invalid-feedback");
        this.usernameDropdown = this.page.locator(".navbar-right").locator("strong");
        this.logoutLink = this.page.locator("#logout-link");
    }

    async open() {
        await this.page.goto("/prihlaseni");
    }

    async login(username, password) {
        await this.emailField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.usernameDropdown.click();
        await this.logoutLink.click();
    }
}