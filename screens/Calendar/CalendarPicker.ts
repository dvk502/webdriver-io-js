import CommonMethods, { DatePattern, DayOfWeek } from '@utils/CommonMethods';
import Elem from '@utils/Elem';
import Gestures from '@utils/Gestures';
import { log } from 'console';

class CalendarPicker {
  /**
   * Locators
   */

  private dateCalendar(date: string) {
    return new Elem(`//android.widget.TextView[@content-desc="${date}"]`);
  }

  private get cancelButton() {
    return new Elem('id:com.trackensure.orchard:id/cancel_button');
  }
  private get okButton() {
    return new Elem('id:com.trackensure.orchard:id/confirm_button');
  }

  /***********************
   * Steps
   **********************/

  public async selectDate(date : Date): Promise<void> {
    const formatDate = CommonMethods.format(date, DatePattern.DDDD_DD_MMMM);
    await this.dateCalendar(formatDate).click();
  }

  public async clickCancelDate(): Promise<void> {
    await this.cancelButton.click();
  }

  public async clickOkButton(): Promise<void> {
    await this.okButton.click();
  }
}

export default new CalendarPicker();
