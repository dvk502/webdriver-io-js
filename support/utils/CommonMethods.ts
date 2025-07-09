import { addWeeks, addDays, startOfWeek, isMonday } from 'date-fns';

export enum DatePattern {
  DD_MM_YYYY = 'dd.MM.yyyy', // 22.05.2025
  DD_MM_YY = 'dd.MM.yy', // 22.05.25
  DD_MMM_YYYY = 'dd MMM yyyy', // 22 Jun 2025
  DDD = 'DDD', // WED
  DD = 'DD', // 22
  DD_MMMM_YYYY = 'dd - MMMM - yyyy', // 22 - June - 2025
  DD_MMMM_YYYY_DDD = 'dd - MMMM - yyyy(ddd)', //22 - June - 2025(Sun)
  MMMM_YYYY = 'MMMM YYYY', // June 2025
  DDDD_DD_MMMM = 'DDDD DD MMMM', // Tuesday 02 June
  DDDD_D_MMMM = 'DDDD D MMMM' // Tuesday 2 June
}

export enum DayOfWeek {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6
}

class CommonMethods {
  /**
   *
   * @param data example 22.06.25
   * @returns
   */
  static formatterToMilliseconds(data: string) {
    let [day, month, year] = data.split('.');

    const dateNew = new Date(2000 + +year, +month - 1, +day);
    console.log(dateNew.toLocaleDateString());
    console.log(+dateNew);

    return dateNew;
  }

  /**
   *
   * @param dateInput in milliseconds or Date
   * @param pattern
   * @returns
   */
  static format(dateInput: Date | number, pattern: DatePattern): string {
    const date = new Date(dateInput);

    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${dateInput}`);
    }

    const dayNumber = String(date.getDate()); // 1
    const day = String(date.getDate()).padStart(2, '0'); // 01
    const dayShort = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayLong = date.toLocaleDateString('en-US', { weekday: 'long' });
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const monthShort = date.toLocaleString('en-US', { month: 'short' });
    const monthLong = date.toLocaleString('en-US', { month: 'long' });
    const year = String(date.getFullYear());
    const yearShort = String(year.slice(-2));

    switch (pattern) {
      case DatePattern.DD_MMM_YYYY:
        return `${day} ${monthShort} ${year}`;
      case DatePattern.DD_MM_YYYY:
        return `${day}.${month}.${year}`;
      case DatePattern.DDD:
        return `${dayShort.toUpperCase()}`;
      case DatePattern.DD_MM_YY:
        return `${day}.${month}.${yearShort}`;
      case DatePattern.DD:
        return `${day}`;
      case DatePattern.DD_MMMM_YYYY:
        return `${day} - ${monthLong} - ${year}`;
      case DatePattern.DD_MMMM_YYYY_DDD:
        return `${day} - ${monthLong} - ${year}(${dayShort})`;
      case DatePattern.MMMM_YYYY:
        return `${monthLong} ${year}`;
      case DatePattern.DDDD_DD_MMMM:
        return `${dayLong} ${day} ${monthLong}`;
      case DatePattern.DDDD_D_MMMM:
        return `${dayLong} ${dayNumber} ${monthLong}`;
      default:
        throw new Error(`Unsupported pattern: ${pattern}`);
    }
  }

  /**
   *
   * @param numberWeek - смещение по неделям относительно текущей недели (0-текущая неделя, 1-следующая, -1 предыдущая)
   * @param day
   * @returns целевая дата с обнулённым временем (00:00:00)
   */
  static generateDate(numberWeek: number, day: DayOfWeek): Date {
    const today = new Date();
    const baseWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    const targetWeekStart = addWeeks(baseWeekStart, numberWeek);
    const targetDate = addDays(targetWeekStart, day);
    targetDate.setHours(0, 0, 0, 0);

    return targetDate;
  }
}

export default CommonMethods;
