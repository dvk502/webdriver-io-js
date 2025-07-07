import Elem from '@utils/Elem';

class LoginScreen {
  //Locators
  private get emailField() {
    return new Elem('id=com.trackensure.orchard:id/emailTextField');
  }
  private get passwordField() {
    return new Elem('id=com.trackensure.orchard:id/passwordField');
  }
  private get loginButton() {
    return new Elem('id=com.trackensure.orchard:id/loginButton');
  }

  //Steps
  public async inputEmailField(email: string): Promise<void> {
    await this.emailField.type(email);
  }

  public async inputPasswordField(login: string): Promise<void> {
    await this.passwordField.type(login);
  }

  public async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  public async loginAgent(email: string | number): Promise<void> {
    await this.inputEmailField(String(email));
    await this.inputPasswordField('test');
    await this.clickLoginButton();
  }
}

export default new LoginScreen();
