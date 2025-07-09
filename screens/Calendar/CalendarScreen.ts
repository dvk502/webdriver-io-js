import CommonMethods, { DatePattern } from '@utils/CommonMethods';
import Elem from '@utils/Elem';
import { EventStatus, EventType } from '@utils/Enums';

class CalendarScreen {
  /**
   * Locators
   */

  private getDayElements(): Elem {
    return new Elem('//android.view.View[@resource-id="com.trackensure.orchard:id/day"]');
  }

  private getDateDescElem(index: number, date: string): Elem {
    return new Elem(
      `(//android.view.ViewGroup[@resource-id="com.trackensure.orchard:id/day"])[${index}]//*[@content-desc="${date}"]`
    );
  }

  private getStatusElem(index: number, status: string): Elem {
    return new Elem(
      `(//android.view.ViewGroup[@resource-id="com.trackensure.orchard:id/day"])[${index}]//*[@content-desc="${status}"]`
    );
  }

  private getTypeElem(index: number, type: string): Elem {
    return new Elem(
      `(//android.view.ViewGroup[@resource-id="com.trackensure.orchard:id/day"])[${index}]//*[@content-desc="${type}"]`
    );
  }

  /***********************
   * Steps
   **********************/

  public async verifyVisibleDayOffEventOnWeekView(
    eventStatus: EventStatus,
    eventType: EventType,
    date: Date
  ): Promise<void> {
    const formattedDate = CommonMethods.format(date, DatePattern.DD_MM_YYYY);

    const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
    const dayElements = this.getDayElements();
    const dayElement = await dayElements.getByIndex(dayIndex);

    await dayElement.childByContentDesc(formattedDate).checkIsDisplayed();
    await dayElement.childByContentDesc(eventStatus).checkIsDisplayed();
    await dayElement.childByContentDesc(eventType).checkIsDisplayed();
    console.log(`✅ Найден DayOff: ${formattedDate}, ${eventStatus}, ${eventType}`);
  }
}

export default new CalendarScreen();
