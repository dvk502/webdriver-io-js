import Elem from '@utils/Elem';

class Components {
  //Locators
  private get burgerButton() {
    return new Elem('id=com.trackensure.orchard:id/roundedMenu');
  }

  private titleTopAppbar() {
    return new Elem('id=com.trackensure.orchard:id/title');
  }

  private title() {
    return $('id=com.trackensure.orchard:id/title');
  }

  private plusButton() {
    return $('id=com.trackensure.orchard:id/ic_plus');
  }

  private backButton() {
    return $('id=com.trackensure.orchard:id/autoMirroredRoundedArrowBack');
  }

  private crossButton() {
    return $('id=com.trackensure.orchard:id/ic_close');
  }

  private applyButton() {
    return $('id=com.trackensure.orchard:id/ic_approve');
  }

  private calendarButton() {
    return $('//android.widget.Button[@content-desc="Calendar"]');
  }

  //Steps
  public async burgerButtonClick(): Promise<void> {
    await this.burgerButton.click();
  }

  public async verifyTitleText(text: string): Promise<void> {
    await this.titleTopAppbar().verifyText(text);
  }

  public async clickCalendarButton(): Promise<void> {
    await this.calendarButton().click();
  }

  public async clickAddButton(): Promise<void> {
    await this.plusButton().click();
  }

  public async clickSaveButton(): Promise<void> {
    await this.applyButton().click();
  }
  public async clickCrossButton(): Promise<void> {
    await this.crossButton().click();
  }
}
export default new Components();
