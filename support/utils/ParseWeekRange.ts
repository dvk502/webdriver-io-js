import CommonMethods, { DatePattern, DayOfWeek } from './CommonMethods';

export interface WeekRange {
  from: Date;
  to: Date;
  days: WeekDay[];
  numberWeek: number;
}

type WeekDay = {
  date: Date;
  day: string; // 'Monday', 'Tuesday'...
  dayShort: string; // 'Mon', 'Tue'...
  dayOfMonth: number; // 16, 17...
  formatted: string; // '16.06.25'
};

export class ParseWeekRange {
  public static parce(range: string): WeekRange {
    return {
      from: new Date(),
      to: new Date(),
      days: [],
      numberWeek: 25
    };
  }
}

function nameTest(date: string) {
  let date1 = date.slice(0, 8);
  let date2 = date.slice(11);

  console.log(date1);
  console.log(date2);
}

//nameTest('16.06.25 - 22.06.25');

function formatterToMilliseconds(data: string) {
  let [day, month, year] = data.split('.');

  const dateNew = new Date(2000 + +year, +month - 1, +day);
  // console.log(dateNew.toLocaleDateString());
  // console.log(+dateNew);

  return dateNew;
}

// formatter('16.06.25');

// const res = formatter('22.06.25') - formatter('16.06.25');

function dateToFormat(dateStr: string): WeekDay {
  const date = formatterToMilliseconds(dateStr);

  const dayNames = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];
  const dayShortNames = ['TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON'];

  const dayIndex = date.getDay();
  const day = dayNames[dayIndex];
  const dayShort = dayShortNames[dayIndex];
  const dayOfMonth = date.getDate();
  const formatted = dateStr;

  return {
    date,
    day,
    dayShort,
    dayOfMonth,
    // dayIso,
    formatted
  };
}

// const dateFormat = dateToFormat('23.06.25');

// console.log(dateFormat);

const dateTest = formatterToMilliseconds('22.06.25');

// console.log(CommonMethods.format(dateTest, DatePattern.DD_MMM_YYYY));
// console.log(CommonMethods.format(dateTest, DatePattern.DD_MM_YYYY));
// console.log(CommonMethods.format(dateTest, DatePattern.DDD));
// console.log(CommonMethods.format(dateTest, DatePattern.DD_MM_YY));
// console.log(CommonMethods.format(dateTest, DatePattern.DD));
// console.log(CommonMethods.format(dateTest, DatePattern.DD_MMMM_YYYY));
// console.log(CommonMethods.format(dateTest, DatePattern.DD_MMMM_YYYY_DDD));
// console.log(CommonMethods.format(dateTest, DatePattern.MMMM_YYYY));
// console.log(CommonMethods.format(dateTest, DatePattern.DDDD_DD_MMMM_YYYY));

console.log(CommonMethods.generateDate(0, DayOfWeek.Monday));
console.log(CommonMethods.generateDate(0, DayOfWeek.Sunday));

console.log(CommonMethods.generateDate(1, DayOfWeek.Monday));
console.log(CommonMethods.generateDate(1, DayOfWeek.Sunday));

const date = CommonMethods.generateDate(0, DayOfWeek.Monday);
const date2 = CommonMethods.format(date, DatePattern.DDDD_DD_MMMM);
console.log(date2);
