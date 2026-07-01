/** Biweekly publish dates for premium letter series (Jul 3, 2026 start) */
export const PREMIUM_RANGE_START = new Date(2026, 6, 3);

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
  return biweeklyFridays(PREMIUM_RANGE_START, count);
}
