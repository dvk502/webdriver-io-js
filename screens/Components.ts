import Elem from '@utils/Elem';

class Components {
  //Locators
  private get burgerButton() {
    return new Elem('id=com.trackensure.orchard:id/kebabMenu');
  }

  private titleTopAppbar() {
    return new Elem('id=com.trackensure.orchard:id/title');
  }

  private title() {
    return $('id=com.trackensure.orchard:id/title');
  }

  //Steps
  public async burgerButtonClick(): Promise<void> {
    await this.burgerButton.click();
  }

  public async verifyTitleText(text: string): Promise<void> {
    await this.titleTopAppbar().verifyText(text);
  }
}
export default new Components();
