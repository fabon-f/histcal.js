import { assertEquals } from "@std/assert/equals";
import { getDateFromRataDie, InternalYearEntry } from "./calendar_data.ts";
import { rataDieFromIso } from "./rata_die.ts";

const gregorianTable: InternalYearEntry[] = [
  [rataDieFromIso(2011, 1, 1), rataDieFromIso(2011, 12, 31), 2011, false, [
    ["M01", 31],
    ["M02", 28],
    ["M03", 31],
    ["M04", 30],
    ["M05", 31],
    ["M06", 30],
    ["M07", 31],
    ["M08", 31],
    ["M09", 30],
    ["M10", 31],
    ["M11", 30],
    ["M12", 31],
  ]],
  [rataDieFromIso(2012, 1, 1), rataDieFromIso(2012, 12, 31), 2012, true, [
    ["M01", 31],
    ["M02", 29],
    ["M03", 31],
    ["M04", 30],
    ["M05", 31],
    ["M06", 30],
    ["M07", 31],
    ["M08", 31],
    ["M09", 30],
    ["M10", 31],
    ["M11", 30],
    ["M12", 31],
  ]],
];

Deno.test("getDateFromRataDie", () => {
  const days = Temporal.PlainDate.from("2012-12-31").since("2011-01-01").total(
    "days",
  );
  for (let i = 0; i <= days; i++) {
    const inputDate = Temporal.PlainDate.from("2011-01-01").add({ days: i });
    const rataDie = rataDieFromIso(
      inputDate.year,
      inputDate.month,
      inputDate.day,
    );
    const {
      year,
      month,
      monthCode,
      day,
      dayOfYear,
      daysInMonth,
      daysInYear,
      monthsInYear,
      inLeapYear,
    } = inputDate;
    assertEquals(getDateFromRataDie(gregorianTable, rataDie), {
      year,
      month,
      monthCode,
      day,
      dayOfYear,
      daysInMonth,
      daysInYear,
      monthsInYear,
      inLeapYear,
    });
  }
});

Deno.test("getDateFromRataDie with out-of-range date", () => {
  assertEquals(
    getDateFromRataDie(gregorianTable, rataDieFromIso(2010, 12, 31)),
    undefined,
  );
  assertEquals(
    getDateFromRataDie(gregorianTable, rataDieFromIso(2013, 1, 1)),
    undefined,
  );
});
