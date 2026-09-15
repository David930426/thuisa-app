/**
 * Accountability and transparency reports (LPJ).
 *
 * Membership fees and sponsorship money come from our community, so what we
 * did with it is published here. Drop the PDF into `public/reports/` and point
 * `file` at it. Leave `file` undefined and the entry renders as "in preparation".
 */

export type Report = {
  id: string;
  title: string;
  period: string;
  kind: "Annual report" | "Financial summary" | "Event report";
  summary: string;
  /** Path to the PDF in /public/reports, or undefined if not published yet. */
  file?: string;
  published?: string;
};

export const reports: Report[] = [
  {
    id: "annual-2025-2026",
    title: "Annual Accountability Report",
    period: "2025 / 2026",
    kind: "Annual report",
    summary:
      "A full account of the 2025/2026 committee year: every event we ran, what worked, what did not, attendance figures, and the handover notes for the next committee.",
    file: undefined, // TODO: add /public/reports/thuisa-annual-2025-2026.pdf
  },
  {
    id: "finance-2025-2026",
    title: "Financial Summary",
    period: "2025 / 2026",
    kind: "Financial summary",
    summary:
      "Where membership fees and sponsorship went, broken down by event and by category, with the closing balance carried into this year.",
    file: undefined, // TODO: add the finance PDF
  },
  {
    id: "thuisa-cup-2026",
    title: "THUISA Cup Event Report",
    period: "March 2026",
    kind: "Event report",
    summary:
      "Participation across universities, match results, budget against actual spend, and recommendations for next year's tournament.",
    file: undefined,
  },
  {
    id: "annual-2024-2025",
    title: "Annual Accountability Report",
    period: "2024 / 2025",
    kind: "Annual report",
    summary:
      "The previous committee year, archived for reference and for members who want to see how the organisation has changed.",
    file: undefined,
  },
];

/** Headline numbers shown above the report list. Update once a year. */
export const transparencyHighlights = [
  {
    value: "7",
    label: "Events delivered",
    detail: "Across the 2025/2026 committee year",
  },
  {
    value: "100%",
    label: "Of fees spent on members",
    detail: "Committee roles are unpaid and voluntary",
  },
  {
    value: "42",
    label: "Committee and volunteers",
    detail: "Across six working divisions",
  },
];

/**
 * A plain-language breakdown so members can see the shape of the budget even
 * before a PDF is published. Percentages should add up to 100.
 */
export const budgetBreakdown = [
  { label: "Events and programming", percent: 62 },
  { label: "Equipment and logistics", percent: 16 },
  { label: "Design, printing, and documentation", percent: 12 },
  { label: "Reserve for next committee", percent: 10 },
];
