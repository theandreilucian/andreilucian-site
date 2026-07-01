/** Premium letters: Thu Jul 2, 2026 start · 2 per week (Thu + Mon) */
export const PREMIUM_RANGE_START = new Date(2026, 6, 2);

/** Legacy biweekly Fridays — kept for reference scripts */
export function biweeklyFridays(start, count) {
  const dates = [];
  const d = new Date(start);
  while (d.getDay() !== 5) d.setDate(d.getDate() + 1);
  for (let i = 0; i < count; i++) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 14);
  }
  return dates;
}

/** Thu → Mon → Thu … (2 letters per week) */
export function twiceWeeklyThuMon(start, count) {
  const dates = [];
  const d = new Date(start);
  for (let i = 0; i < count; i++) {
    dates.push(new Date(d));
    if (d.getDay() === 4) d.setDate(d.getDate() + 4);
    else if (d.getDay() === 1) d.setDate(d.getDate() + 3);
    else {
      const toThu = (4 - d.getDay() + 7) % 7 || 7;
      d.setDate(d.getDate() + toThu);
    }
  }
  return dates;
}

export function formatLetterDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatLetterDateShort(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getPremiumLetterDates(count) {
  return twiceWeeklyThuMon(PREMIUM_RANGE_START, count);
}
