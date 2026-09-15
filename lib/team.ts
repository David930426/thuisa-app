/**
 * The people behind THUISA.
 *
 * `leadership` renders as a photo grid on the About page.
 * `divisions` renders as description cards. Each division has a `members`
 * array — leave it empty and the card shows what the division does; fill it in
 * and the names appear underneath automatically.
 */

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
};

export const leadership: TeamMember[] = [
  {
    name: "Abraham Rusli",
    role: "President",
    photo: "/images/team/member-1.svg",
  },
  {
    name: "Evelyn",
    role: "Vice President",
    photo: "/images/team/member-2.svg",
  },
  {
    name: "Leon",
    role: "Advisor",
    photo: "/images/team/member-3.svg",
  },
  {
    name: "David",
    role: "Advisor",
    photo: "/images/team/member-4.svg",
  },
];

export type Division = {
  name: string;
  summary: string;
  members: TeamMember[];
};

export const divisions: Division[] = [
  {
    name: "Event Director",
    summary:
      "Owns each event end to end — concept, run-down, venue, and the people on the day. If something is happening, this team made it happen.",
    members: [],
  },
  {
    name: "General Affairs",
    summary:
      "Logistics and equipment. Permits, bookings, transport, and every box that needs carrying before an event can start.",
    members: [],
  },
  {
    name: "Program",
    summary:
      "Shapes what actually happens on stage and on the field: the games, the performances, the competition format.",
    members: [],
  },
  {
    name: "Finance",
    summary:
      "Budgets, membership fees, and sponsorship. Keeps the books that become our accountability reports each year.",
    members: [],
  },
  {
    name: "Communications",
    summary:
      "Our voice. Announcements, social media, partnerships, and the bridge to OIR and to Indonesian associations across Taiwan.",
    members: [],
  },
  {
    name: "Design & Documentation",
    summary:
      "Posters, feeds, photos, and video. The reason you can still see what a THUISA event looked like three years later.",
    members: [],
  },
];
