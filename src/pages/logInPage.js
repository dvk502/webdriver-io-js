global.BasePage = require('#pages/basePage');

class LogInPage extends BasePage {
  get username() {
    return driver.$('id=nameET');
  }
  get password() {
    return driver.$('id=passwordET');
  }
  get loginButton() {
    return driver.$('id=loginBtn');
  }
  get logOutModal() {
    return driver.$('id=parentPanel');
  }

  get logInButton() {
    return driver.$('//*[@text="Log In"]');
  }

  get logOutButton() {
    return driver.$('//*[@text="Log Out"]');
  }

  // Исправлен селектор - некорректный формат id:
  get logOutModalButton() {
    return driver.$('id=android:id/button1');
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

  async logOut() {
    await step('Log out', async () => {
      await this.clickElement(this.logOutButton);
      await this.confirmLogOutModal();
    });
  }

  async checkLoginUsernameErrorHasText(text) {
    await step('Check login with invalid username has error notification', async () => {
      await this.expectElementAttributeToEqual(this.loginUsernameError, 'text', text);
    });
  }

  async checkLoginPasswordErrorHasText(text) {
    await step('Check login with invalid password has error notification', async () => {
      await this.expectElementAttributeToEqual(this.loginPasswordError, 'text', text);
    });
  }

  async fillUsernameInput(text) {
    await step('Fill username input', async () => {
      await this.setInputValue(this.username, text);
    });
  }

  async clickLoginButton() {
    await step('Click login button', async () => {
      await this.clickElement(this.loginButton);
    });
  }

  async confirmLogOutModal() {
    await this.isElementDisplayed(this.logOutModal);
    await this.clickElement(this.logOutModalButton);
  }

  async login() {
    await step('Login with a valid username/password', async () => {
      const username = await this.getFirstUsername().getText();
      const password = await this.getFirstPassword().getText();

      await this.setInputValue(this.username, username);
      await this.setInputValue(this.password, password);
      await this.clickElement(this.loginButton);
    });
  }
}

module.exports = new LogInPage();
