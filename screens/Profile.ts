import Elem from '@utils/Elem';

class Profile {
  //Locators
  private get emailField() {
    return new Elem('id=com.trackensure.orchard:id/emailTextField');
  }

  //Steps
  public async inputEmailField(email: string): Promise<void> {
    await this.emailField.type(email);
  }
}

export default new Profile();
