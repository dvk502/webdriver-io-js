import Elem from '@utils/Elem';
import Gestures from '@utils/Gestures';
import { log } from 'console';

class ProfileScreen {
  //Locators
  private get boxProfile() {
    return '//android.widget.ScrollView';
  }

  private get fullName() {
    return new Elem('id=com.trackensure.orchard:id/agentName');
  }

  private get profileTabName() {
    return new Elem('id=com.trackensure.orchard:id/profileTabName');
  }

  private get status() {
    return new Elem('id=com.trackensure.orchard:id/status');
  }

  private get position() {
    return new Elem('id=com.trackensure.orchard:id/position');
  }

  private get department() {
    return new Elem('id=com.trackensure.orchard:id/agentDepartment');
  }

  private get departmentCard() {
    return new Elem('id=com.trackensure.orchard:id/department');
  }

  private get workEmail() {
    return new Elem('id=com.trackensure.orchard:id/workEmail');
  }

  private get discord() {
    return new Elem('id=com.trackensure.orchard:id/discord');
  }

  private get email() {
    return new Elem('id=com.trackensure.orchard:id/email');
  }

  private get facebook() {
    return new Elem('id=com.trackensure.orchard:id/facebook');
  }

  private get linkedin() {
    return new Elem('id=com.trackensure.orchard:id/linkedin');
  }

  private get other() {
    return new Elem('id=com.trackensure.orchard:id/other');
  }

  private get phone() {
    return new Elem('id=com.trackensure.orchard:id/phone');
  }

  private get skype() {
    return new Elem('id=com.trackensure.orchard:id/skype');
  }

  private get telegram() {
    return new Elem('id=com.trackensure.orchard:id/telegram');
  }

  private get languages() {
    return new Elem('id=com.trackensure.orchard:id/languages');
  }

  private get workDiscordID() {
    return new Elem('id=com.trackensure.orchard:id/workDiscordID');
  }

  private get birthday() {
    return new Elem('id=com.trackensure.orchard:id/birthday');
  }

  private get gender() {
    return new Elem('id=com.trackensure.orchard:id/gender');
  }

  private get address() {
    return new Elem('id=com.trackensure.orchard:id/address');
  }

  private get readytorelocate() {
    return new Elem('id=com.trackensure.orchard:id/readytorelocate');
  }

  private get onboard() {
    return new Elem('id=com.trackensure.orchard:id/onboard');
  }

  private get probationEnd() {
    return new Elem('id=com.trackensure.orchard:id/probationEnd');
  }

  private get internshipEnd() {
    return new Elem('id=com.trackensure.orchard:id/internshipEnd');
  }

  private get additionalInformation() {
    return new Elem('id=com.trackensure.orchard:id/additionalInformation');
  }

  /***********************
   * Steps
   **********************/

  private async checkField(
    element: Elem,
    expected: string | undefined,
    maxScrolls = 2
  ): Promise<void> {
    await Gestures.scroll(element, this.boxProfile, maxScrolls);

    if (expected !== undefined) {
      await expect(await element.getText()).toBe(expected);
      console.log(`PASSED. Actual result:${expected}`);
    } else {
      await element.checkIsDisappeared();
      console.log(`PASSED. Actual result:${expected}`);
    }
  }

  public async checkFullName(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.fullName, expectedValue);
  }

  public async checkProfileTabName(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.profileTabName, expectedValue);
  }

  public async checkStatus(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.status, expectedValue);
  }

  public async checkPosition(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.position, expectedValue);
  }

  public async checkDepartment(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.department, expectedValue);
  }

  public async checkDepartmentCard(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.departmentCard, expectedValue);
  }

  public async checkWorkEmail(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.workEmail, expectedValue);
  }

  public async checkDiscord(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.discord, expectedValue);
  }

  public async checkEmail(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.email, expectedValue);
  }

  public async checkFacebook(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.facebook, expectedValue);
  }

  public async checkLinkedin(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.linkedin, expectedValue);
  }

  public async checkOther(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.other, expectedValue);
  }

  public async checkPhone(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.phone, expectedValue);
  }

  public async checkSkype(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.skype, expectedValue);
  }

  public async checkTelegram(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.telegram, expectedValue);
  }

  public async checkLanguages(expected: string[] | undefined): Promise<void> {
    await Gestures.scroll(this.languages, this.boxProfile);

    if (!expected || expected.length === 0) {
      const elements = await $$('id=com.trackensure.orchard:id/languages');
      expect(elements.length).toBe(0);
      console.log(`✅ PASSED. No languages expected or found.`);
      return;
    }

    const elements = await $$('id=com.trackensure.orchard:id/languages');

    const actual: string[] = [];
    for (const el of elements) {
      const text = await el.getText();
      actual.push(text);
    }

    const expectedSorted = [...expected].sort();
    const actualSorted = [...actual].sort();

    expect(actualSorted).toEqual(expectedSorted);
    console.log(`✅ PASSED. Actual languages: ${actualSorted.join(', ')}`);
  }

  public async checkWorkDiscordID(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.workDiscordID, expectedValue);
  }

  public async checkBirthday(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.birthday, expectedValue);
  }

  public async checkGender(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.gender, expectedValue);
  }

  public async checkAddress(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.address, expectedValue);
  }

  public async checkReadyToRelocate(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.readytorelocate, expectedValue);
  }

  public async checkOnboard(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.onboard, expectedValue);
  }

  public async checkProbationEnd(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.probationEnd, expectedValue);
  }

  public async checkInternshipEnd(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.internshipEnd, expectedValue);
  }

  public async checkAdditionalInformation(expectedValue: string | undefined): Promise<void> {
    await this.checkField(this.additionalInformation, expectedValue);
  }
}

export default new ProfileScreen();
