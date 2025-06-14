class CommonMethods {
  static formatDate(dateInput: number | Date, locale = 'en-GB'): string {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${dateInput}`);
    }

    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }
}

export default CommonMethods;
