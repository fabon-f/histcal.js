function daysFromUnixEpoch(isoYear: number, isoMonth: number, isoDay: number) {
  return new Date(0).setUTCFullYear(isoYear, isoMonth - 1, isoDay) / 8.64e7;
}

export function rataDieFromIso(
  isoYear: number,
  isoMonth: number,
  isoDay: number,
): number {
  return daysFromUnixEpoch(isoYear, isoMonth, isoDay) -
    daysFromUnixEpoch(1, 1, 1) + 1;
}

export function isoFromRataDie(
  rataDie: number,
): [isoYear: number, isoMonth: number, isoDay: number] {
  const dateInUtc = new Date(
    (rataDie + daysFromUnixEpoch(1, 1, 1) - 1) * 8.64e7,
  );
  return [
    dateInUtc.getUTCFullYear(),
    dateInUtc.getUTCMonth() + 1,
    dateInUtc.getUTCDate(),
  ];
}
