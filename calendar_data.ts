export type InternalMonthEntry = readonly [
  monthCode: string,
  daysInMonth: number,
];

export type InternalYearEntry = readonly [
  startRataDie: number,
  endRataDie: number,
  year: number,
  isLeapYear: boolean,
  months: InternalMonthEntry[],
];

export interface DateInfo {
  year: number;
  month: number;
  monthCode: string;
  day: number;
  dayOfYear: number;
  daysInMonth: number;
  daysInYear: number;
  monthsInYear: number;
  inLeapYear: boolean;
}

export interface DateFields {
  year: number;
  month?: number | undefined;
  monthCode?: string;
  day: number;
}

/**
 * return lowest element where `fn(element)` is `true` (return `undefined` if such index doesn't exist)
 */
function lowerBound<T>(
  array: readonly T[],
  fn: (element: T) => boolean,
): T | undefined {
  if (array.length === 0 || !fn(array.at(-1)!)) {
    return undefined;
  }
  if (fn(array[0]!)) {
    return array[0];
  }
  let ng = 0;
  let ok = array.length - 1;
  while (ok - ng > 1) {
    const mid = Math.floor((ok + ng) / 2);
    if (fn(array[mid]!)) {
      ok = mid;
    } else {
      ng = mid;
    }
  }
  return array[ok];
}

export function getDateFromRataDie(
  table: readonly InternalYearEntry[],
  rataDie: number,
): DateInfo | undefined {
  const yearInfo = lowerBound(table, (yearData) => yearData[1] >= rataDie);
  if (!yearInfo || yearInfo[0] > rataDie) {
    return undefined;
  }
  const [startRataDie, endRataDie, year, isLeapYear, months] = yearInfo;
  const dayOfYear = rataDie - startRataDie + 1;

  let currentDayOfYear = 0;
  for (const [monthIndex, month] of months.entries()) {
    const [monthCode, daysInMonth] = month;
    if (dayOfYear <= currentDayOfYear + daysInMonth) {
      return {
        year,
        month: monthIndex + 1,
        monthCode: monthCode,
        day: dayOfYear - currentDayOfYear,
        dayOfYear,
        daysInMonth,
        daysInYear: endRataDie - startRataDie + 1,
        monthsInYear: months.length,
        inLeapYear: isLeapYear,
      };
    }
    currentDayOfYear += daysInMonth;
  }
}
