import Elem from '@utils/Elem'

class Components {
  //Locators
  private get burgerButton() {
    return new Elem('id=com.trackensure.orchard:id/kebabMenu');
  }

  private titleTopAppbar(text: string) {
    return new Elem(`//android.widget.TextView[@text="${text}"]`);
  }


  //Steps
  public async burgerButtonClick(): Promise<void> {
    await this.burgerButton.click();
  }

  public async verifyTitleText(text: string): Promise<void> {
    await this.titleTopAppbar("My Profile").checkElementPresence("My Profile2")

  }

}
export default new Components();
