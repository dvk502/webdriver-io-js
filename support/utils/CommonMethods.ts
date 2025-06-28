export enum DatePattern {
  DD_MM_YYYY = 'dd.MM.yyyy', // 22.05.2025
  DD_MM_YY = 'dd.MM.yy', // 22.05.25
  DD_MMM_YYYY = 'dd MMM yyyy', // 22 Jun 2025
  DDD = 'DDD', // WED
  DD = 'DD', // 22
  DD_MMMM_YYYY = 'dd - MMMM - yyyy', // 22 - June - 2025
  DD_MMMM_YYYY_DDD = 'dd - MMMM - yyyy(ddd)', //22 - June - 2025(Sun)
  MMMM_YYYY = 'MMMM YYYY' // June 2025
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

    const day = String(date.getDate()).padStart(2, '0');
    const dayShort = date.toLocaleDateString('en-US', { weekday: 'short' });
    const month = String(date.getMonth()).padStart(2, '0');
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
      default:
        throw new Error(`Unsupported pattern: ${pattern}`);
    }
  }
}

export default CommonMethods;
