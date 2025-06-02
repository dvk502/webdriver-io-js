import Elem from '@utils/Elem'

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
}
export default new LoginScreen();
