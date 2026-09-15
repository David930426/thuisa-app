/**
 * The THUISA event calendar.
 *
 * Dates are plain "YYYY-MM-DD" strings so they never shift with time zones.
 * Everything that shows an event — the homepage strip and the events page —
 * reads from this one list, so adding an event here adds it everywhere.
 */

export type ThuisaEvent = {
  /** URL-safe id, also used as the anchor on the events page. */
  id: string;
  title: string;
  /** "YYYY-MM-DD" */
  date: string;
  /** Short line under the title. */
  tagline: string;
  type: string;
  who: string;
  location: string;
  about: string;
  activities: string[];
  reasons: string[];
  note?: string;
  image: string;
  /** Set when there is nothing to register for (open to everyone, walk in). */
  noTicket?: boolean;
};

export const events: ThuisaEvent[] = [
  {
    id: "yingxin-1",
    title: "Yingxin 1",
    date: "2026-09-26",
    tagline: "Welcome Night for New Students",
    type: "Welcoming Event",
    who: "All Indonesian students at Tunghai, especially freshmen",
    location: "Tunghai University Campus",
    about:
      "The first THUISA event of the academic year. Yingxin 1 is an evening on campus where new Indonesian students meet each other and the students already studying here.",
    activities: [
      "Introductions and ice-breaker games",
      "Meet your seniors and the THUISA committee",
      "Dinner together",
    ],
    reasons: [
      "Meet the other Indonesian students in your year",
      "Ask seniors the questions you have not found answers to",
      "Get added to the student group chat",
    ],
    image: "/images/events/yingxin-1.svg",
  },
  {
    id: "yingxin-2",
    title: "Yingxin 2",
    date: "2026-10-13",
    tagline: "Trip & Bonding Adventure",
    type: "Student Trip / Bonding",
    who: "All Indonesian students at Tunghai",
    location: "Off campus, destination announced closer to the date",
    about:
      "Yingxin 2 takes you outside the classroom. This trip is all about bonding with fellow Indonesian students through fun activities in an exciting location.",
    activities: [
      "Group games and bonding sessions",
      "Exploring the destination (theme park, sightseeing)",
      "Team-building activities",
    ],
    reasons: [
      "Strengthen friendships with fellow Indonesians",
      "Experience fun outside campus",
      "Create unforgettable memories together",
    ],
    image: "/images/events/yingxin-2.svg",
  },
  {
    id: "halloween",
    title: "Halloween",
    date: "2026-10-31",
    tagline: "Costume & Spooky Fun",
    type: "Holiday Celebration",
    who: "All Indonesian students at Tunghai",
    location: "Tunghai University Campus",
    about:
      "Celebrate the spooky season with THUISA. A night of costumes, games, and themed activities that let students be creative and enjoy a festive atmosphere together.",
    activities: [
      "Costume showcase",
      "Halloween-themed games",
      "Spooky snacks and fun",
    ],
    reasons: [
      "Enjoy a seasonal celebration",
      "Express your creativity",
      "Relax and have fun mid-semester",
    ],
    image: "/images/events/halloween.svg",
  },
  {
    id: "christmas-dinner",
    title: "Christmas Dinner",
    date: "2026-12-24",
    tagline: "Warm & Joyful Gathering",
    type: "Holiday Dinner",
    who: "All Indonesian students at Tunghai",
    location: "Tunghai University",
    about:
      "A Christmas celebration where Indonesian students gather over food, games, and a gift exchange. One of the bigger events for students staying in Taiwan over the holidays.",
    activities: [
      "Christmas dinner together",
      "Games and gift exchange",
      "Holiday celebration",
    ],
    reasons: [
      "Celebrate Christmas together",
      "Feel at home with your peers",
      "Build warm memories",
    ],
    image: "/images/events/christmas-dinner.svg",
  },
  {
    id: "gala-dinner",
    title: "Gala Dinner",
    date: "2027-02-15",
    tagline: "Cultural Exchange & Formal Celebration",
    type: "Formal Dinner / Cultural Showcase",
    who: "Indonesian and international students, OIR, and invited guests",
    location: "Tunghai University (Formal Hall)",
    about:
      "A formal evening co-hosted with Tunghai's Office of International Relations and other international student associations. Performances, cultural showcases, and networking — and a chance to represent Indonesia with pride.",
    activities: [
      "Formal dinner",
      "Cultural performances",
      "Networking with international students",
    ],
    reasons: [
      "Represent Indonesia in a formal setting",
      "Connect with OIR and other associations",
      "Celebrate diversity and culture",
    ],
    note: "Formal attire required.",
    image: "/images/events/gala-dinner.svg",
  },
  {
    id: "thuisa-cup",
    title: "THUISA Cup",
    date: "2027-03-15",
    tagline: "Sports & Unity Challenge",
    type: "Sports Competition",
    who: "Indonesian students from universities across Taiwan",
    location: "Tunghai University",
    about:
      "Our flagship event. A large-scale sports tournament that brings Indonesian students from across Taiwan onto one campus to compete, build sportsmanship, and make connections far beyond Tunghai.",
    activities: [
      "Sports tournaments",
      "Team competitions",
      "Bonding with Indonesian students across Taiwan",
    ],
    reasons: [
      "Show your skills in sports",
      "Strengthen unity among Indonesians in Taiwan",
      "Connect beyond your own university",
    ],
    image: "/images/events/thuisa-cup.svg",
  },
  {
    id: "international-week",
    title: "International Week",
    date: "2027-04-20",
    tagline: "Culture & Flavors Festival",
    type: "Cultural Event",
    who: "Open to all Tunghai students and faculty",
    location: "Tunghai University",
    about:
      "A week-long cultural festival hosted by OIR where THUISA represents Indonesia. We run booths with Indonesian food and traditions, sharing our culture with the wider Tunghai community.",
    activities: [
      "Indonesian food booth",
      "Cultural display and traditional dress",
      "Cross-cultural exchange",
    ],
    reasons: [
      "Promote Indonesian culture",
      "Be part of a campus-wide event",
      "Celebrate diversity together",
    ],
    noTicket: true,
    image: "/images/events/international-week.svg",
  },
  {
    id: "graduation",
    title: "Graduation",
    date: "2027-06-15",
    tagline: "Honoring Our Seniors",
    type: "Graduation Ceremony",
    who: "Graduating Indonesian students, families, and friends",
    location: "Tunghai University (organized by OIR)",
    about:
      "The closing chapter of the academic journey. THUISA contributes to OIR's official ceremony to celebrate our graduating seniors and everything they built here.",
    activities: [
      "Graduation ceremony",
      "Celebration with peers and families",
      "Farewell to seniors",
    ],
    reasons: [
      "Celebrate the achievements of our seniors",
      "Support fellow Indonesians",
      "Mark a new beginning",
    ],
    image: "/images/events/graduation.svg",
  },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Splits "YYYY-MM-DD" without going through Date, so time zones cannot shift it. */
export function eventDateParts(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return {
    year,
    day,
    month: MONTHS[month - 1] ?? "",
    monthShort: (MONTHS[month - 1] ?? "").slice(0, 3).toUpperCase(),
  };
}

/** "13 October 2026" */
export function formatEventDate(date: string) {
  const { day, month, year } = eventDateParts(date);
  return `${day} ${month} ${year}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function isUpcoming(event: ThuisaEvent) {
  return event.date >= today();
}

/**
 * Events still ahead of us, soonest first. If the calendar has rolled over and
 * every date is in the past, fall back to the start of the list so the site
 * never renders an empty "what's next" section.
 */
export function getUpcomingEvents(limit?: number) {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.filter(isUpcoming);
  const list = upcoming.length > 0 ? upcoming : sorted;
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Events that have already happened, most recent first. */
export function getPastEvents() {
  return [...events]
    .filter((event) => !isUpcoming(event))
    .sort((a, b) => b.date.localeCompare(a.date));
}
