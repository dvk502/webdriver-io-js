class LogInPage {
  get username() {
    return driver.$('id=nameET');
  }
  get password() {
    return driver.$('id=passwordET');
  }
  get loginButton() {
    return driver.$('id=loginBtn');
  }

  getFirstUsername() {
    return driver.$('id=username1TV');
  }
  getFirstPassword() {
    return driver.$('id=password1TV');
  }
  get loginUsernameError() {
    return driver.$('id=nameErrorTV');
  }
  get loginPasswordError() {
    return driver.$('id=passwordErrorTV');
  }

  async checkLoginUsernameErrorHasText(text) {
    await expect(this.loginUsernameError).toHaveAttribute('text', text);
  }

  async checkLoginPasswordErrorHasText(text) {
    await expect(this.loginPasswordError).toHaveAttribute('text', text);
  }

  async fillUsernameInput(text) {
    await this.username.setValue(text);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login() {
    const username = await this.getFirstUsername().getText();
    const password = await this.getFirstPassword().getText();

    await this.username.setValue(username);
    await this.password.setValue(password);
    await this.loginButton.click();
  }
}

module.exports = new LogInPage();
