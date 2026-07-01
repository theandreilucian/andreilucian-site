/**
 * Jul 1 – Aug 8, 2026 · Mon / Wed / Fri schedule for 3-day email series.
 */
import { format3DayEmail } from "./substack-3day-format.mjs";
import { getTopicsByDay } from "./substack-3day-topics.mjs";
import { buildWoodcutEmailVisuals } from "./substack-woodcut-email-graphics.mjs";

export const RANGE_START = new Date(2026, 6, 1);
export const RANGE_END = new Date(2026, 7, 8);

const ROLE_LABEL = { mon: "Educate", wed: "Story", fri: "Product" };
const TOPICS_BY_DAY = getTopicsByDay();

function monWedFriInRange(start, end) {
  const days = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const wd = d.getDay();
    if (wd === 1 || wd === 3 || wd === 5) {
      days.push({
        date: new Date(d),
        dow: wd === 1 ? "mon" : wd === 3 ? "wed" : "fri",
      });
    }
  }
  return days;
}

const SCHEDULE = monWedFriInRange(RANGE_START, RANGE_END);

export function format3DayDateShort(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function format3DayDateLong(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function build3DaySchedule() {
  const topicIdx = { mon: 0, wed: 0, fri: 0 };
  let week = 1;

  return SCHEDULE.map((slot, i) => {
    if (i > 0 && slot.dow === "mon") week++;

    const topic = TOPICS_BY_DAY[slot.dow][topicIdx[slot.dow]++];
    if (!topic) {
      throw new Error(
        `Not enough ${slot.dow} topics for schedule (need ${topicIdx[slot.dow]}, have ${TOPICS_BY_DAY[slot.dow].length})`
      );
    }

    const num = i + 1;
    const role = topic.day === "mon" ? "educate" : topic.day === "wed" ? "story" : "sell";
    const formatted = format3DayEmail(topic, i);
    const visuals = buildWoodcutEmailVisuals(topic, num, role);
    const dateObj = slot.date;

    return {
      num,
      week,
      dow: topic.day,
      dateObj,
      dateLabel: format3DayDateLong(dateObj),
      dateShort: format3DayDateShort(dateObj),
      dateHeading: dateObj.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      role,
      roleLabel: ROLE_LABEL[topic.day],
      format: topic.label,
      subject: formatted.subject,
      preheader: formatted.preheader,
      pasteBlock: formatted.pasteBlock,
      substackBody: formatted.body,
      words: formatted.words,
      inRange: formatted.inRange,
      pageFile: `letter-${String(num).padStart(2, "0")}.html`,
      pageHref: `newsletters/jul-aug/letter-${String(num).padStart(2, "0")}.html`,
      heroRel: visuals.heroRel,
      diagramRel: visuals.diagramRel,
      heroPageRel: `../../${visuals.heroRel}`,
      diagramPageRel: `../../${visuals.diagramRel}`,
      captionA: visuals.captionA,
      captionB: visuals.captionB,
      visualA: visuals.visualA,
      visualB: visuals.visualB,
    };
  });
}
