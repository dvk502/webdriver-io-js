import Elem from '@utils/Elem';

class Profile {
  //Locators
  private get fullName() {
    return new Elem('~agentName');
  }

  private get status() {
    return new Elem('~status');
  }
  private get position() {
    return new Elem('~position');
  }
  private get department() {
    return new Elem('~department');
  }
  private get workEmail() {
    return new Elem('~workEmail');
  }
  private get discord() {
    return new Elem('~discord');
  }
  private get email() {
    return new Elem('~email');
  }
  private get facebook() {
    return new Elem('~facebook');
  }
  private get linkedin() {
    return new Elem('~linkedin');
  }
  private get phone() {
    return new Elem('~phone');
  }
  private get skype() {
    return new Elem('~skype');
  }
  private get telegram() {
    return new Elem('~telegram');
  }
  private get languages() {
    // Коллекция
    return new Elem('~languages');
  }
  private get workDiscordID() {
    return new Elem('~workDiscordID');
  }
  private get birthday() {
    return new Elem('~birthday');
  }
  private get gender() {
    return new Elem('~gender');
  }
  private get address() {
    return new Elem('~address');
  }
  private get readytorelocate() {
    return new Elem('~readytorelocate');
  }
  private get onboard() {
    return new Elem('~onboard');
  }
  private get probationEnd() {
    return new Elem('~probationEnd');
  }
  private get additionalInformation() {
    return new Elem('~additionalInformation');
  }

  //Steps
  public async getFullName(): Promise<void> {
    await this.fullName.getText();
  }
}

export default new Profile();
