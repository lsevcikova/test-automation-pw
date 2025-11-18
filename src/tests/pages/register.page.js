export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.inputName = this.page.getByLabel("Jméno a příjmení");
    this.inputEmail = this.page.getByLabel("Email");
    this.inputPassword = this.page.getByLabel("Heslo");
    this.inputConfirmPassword = this.page.getByLabel("Kontrola hesla");
    this.errorMessage = this.page
      .locator(".invalid-feedback")
      .locator("strong");
    this.submitButton = this.page.getByRole("button", {
      name: "Zaregistrovat",
    });
  }

  async open() {
    await this.page.goto("/registrace");
  }

  async register(name, email, password, confirmPassword) {
    await this.inputName.fill(name);
    await this.inputEmail.fill(email);
    await this.inputPassword.fill(password);
    await this.inputConfirmPassword.fill(confirmPassword);
    await this.submitButton.click();
  }

   generateUniqueEmail(baseName) {
    const timestamp = Date.now();
    return `${baseName}${timestamp}@gmail.com`;
  }
}
