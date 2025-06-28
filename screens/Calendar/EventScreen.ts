import Elem from '@utils/Elem';
import Gestures from '@utils/Gestures';
import { log } from 'console';

class EventScreen {
  /**
   * Locators
   */

  private get dropdownEventType() {
    return new Elem('id=com.trackensure.orchard:id/dropdownEventType');
  }

  private selectType(eventType: string) {
    return new Elem(`//android.widget.TextView[@text="${eventType}"]`);
  }

  private get rangeDay() {
    return new Elem('id=com.trackensure.orchard:id/rangeDate');
  }

  private get confirmButton() {
    return new Elem('id=com.trackensure.orchard:id/confirm_button');
  }

  private get cancelButton() {
    return new Elem('id=com.trackensure.orchard:id/cancel_button');
  }

  private dateCalendar(date: string) {
    return new Elem(`//android.widget.TextView[@content-desc="${date}"]`);
  }

  /***********************
   * Steps
   **********************/

  public async clickDropdownEventType(): Promise<void> {
    await this.dropdownEventType.click();
  }

  public async selectEvenType(eventType: string): Promise<void> {
    await this.selectType(eventType).click();
  }

  public async clickDateRange(): Promise<void> {
    await this.rangeDay.click();
  }

  public async selectDate(date: string): Promise<void> {
    await this.dateCalendar(date).click();
  }

  public async clickConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

export default new EventScreen();
