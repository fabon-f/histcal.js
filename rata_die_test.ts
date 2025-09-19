import { assertEquals } from "@std/assert";
import { isoFromRataDie, rataDieFromIso } from "./rata_die.ts";

Deno.test("rataDieFromIso", () => {
  assertEquals(rataDieFromIso(0, 12, 30), -1);
  assertEquals(rataDieFromIso(0, 12, 31), 0);
  assertEquals(rataDieFromIso(1, 1, 1), 1);
  assertEquals(rataDieFromIso(2025, 9, 19), 739513);
});

Deno.test("isoFromRataDie", () => {
  assertEquals(isoFromRataDie(-1), [0, 12, 30]);
  assertEquals(isoFromRataDie(0), [0, 12, 31]);
  assertEquals(isoFromRataDie(1), [1, 1, 1]);
  assertEquals(isoFromRataDie(739513), [2025, 9, 19]);
});
