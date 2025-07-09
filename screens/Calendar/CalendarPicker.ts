import CommonMethods, { DatePattern, DayOfWeek } from '@utils/CommonMethods';
import Elem from '@utils/Elem';
import Gestures from '@utils/Gestures';
import { log } from 'console';
import { parse, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

class CalendarPicker {
  /**
   * Locators
   */

  private dateCalendar(date: string) {
    return new Elem(`//android.widget.TextView[contains(@content-desc,"${date}")]`);
  }

  private get cancelButton() {
    return new Elem('id:com.trackensure.orchard:id/cancel_button');
  }
  private get okButton() {
    return new Elem('id:com.trackensure.orchard:id/confirm_button');
  }
  private get monthOfNavigator() {
    return new Elem('id:com.trackensure.orchard:id/month_navigation_fragment_toggle');
  }
  private get prevMonth() {
    return new Elem('id:com.trackensure.orchard:id/month_navigation_previous');
  }
  private get newMonth() {
    return new Elem('id:com.trackensure.orchard:id/month_navigation_next');
  }

  /***********************
   * Steps
   **********************/

  public async selectDate(date: Date): Promise<void> {
    const formatDate = CommonMethods.format(date, DatePattern.DDDD_D_MMMM);
    await this.dateCalendar(formatDate).click();
  }

  public async clickCancelDate(): Promise<void> {
    await this.cancelButton.click();
  }

  public async clickOkButton(): Promise<void> {
    await this.okButton.click();
  }

  private async getOppenedMonth(dateString: string): Promise<Date[]> {
    const formatted = dateString.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());

    const currentMonth = parse(formatted, 'MMMM yyyyy', new Date());
    const startMonth = startOfMonth(currentMonth);
    const endMonth = endOfMonth(currentMonth);

    return [startMonth, endMonth];
  }

  public async movedToMonth(): Promise<void> {}
}

export default new CalendarPicker();
