/**
 * New-student resources.
 *
 * IMPORTANT: every external link below should be checked before you publish.
 * Government and university URLs move around, and a dead link on this page is
 * worse than no link at all. Ones marked `// verify` are the most likely to
 * have changed.
 */

export type Resource = {
  title: string;
  description: string;
  href: string;
};

export type ResourceGroup = {
  id: string;
  title: string;
  summary: string;
  /** Lucide icon name, mapped in components/icon.tsx */
  icon: string;
  items: Resource[];
};

export const resourceGroups: ResourceGroup[] = [
  {
    id: "before-you-arrive",
    title: "Before you arrive",
    summary:
      "Paperwork you should start weeks before your flight. Nothing here is urgent once you land — it is urgent now.",
    icon: "plane",
    items: [
      {
        title: "Resident visa for study",
        description:
          "Apply at the Taipei Economic and Trade Office in Jakarta or Surabaya once you have your admission letter. Start early; processing takes time.",
        href: "https://www.boca.gov.tw/np-137-2.html", // verify
      },
      {
        title: "Tunghai Office of International Relations",
        description:
          "Your official contact at Tunghai for admission, arrival, and everything an international student needs from the university.",
        href: "https://oir.thu.edu.tw/",
      },
      {
        title: "Tunghai University (English site)",
        description:
          "Programs, academic calendar, campus information, and the admissions pathway for international applicants.",
        href: "https://eng.thu.edu.tw/",
      },
      {
        title: "Dormitory application",
        description:
          "On-campus housing is the simplest first year. Apply through OIR as soon as your admission is confirmed — places fill up.",
        href: "https://oir.thu.edu.tw/", // verify: link to the dorm page directly
      },
      {
        title: "Say hello to THUISA first",
        description:
          "Message us on Instagram before you fly. We will add you to the student group chat and answer the questions the official pages do not cover.",
        href: "https://www.instagram.com/thuisa_official",
      },
    ],
  },
  {
    id: "first-weeks",
    title: "Your first two weeks",
    summary:
      "The admin sprint. Get these done early and the rest of your semester is far calmer.",
    icon: "clipboard",
    items: [
      {
        title: "ARC (Alien Resident Certificate)",
        description:
          "Apply within 15 days of arrival at the National Immigration Agency office in Taichung. You need this before almost anything else — bank account, phone contract, insurance.",
        href: "https://www.immigration.gov.tw/",
      },
      {
        title: "National Health Insurance",
        description:
          "International students join NHI after six months of residence. It makes doctor visits cheap. OIR handles enrolment — ask them how.",
        href: "https://www.nhi.gov.tw/en/",
      },
      {
        title: "Open a bank account",
        description:
          "Bring your ARC, passport, and student ID. A local account makes tuition, rent, and reimbursements much easier.",
        href: "https://oir.thu.edu.tw/", // verify: OIR usually lists the nearest branches
      },
      {
        title: "Phone number and SIM card",
        description:
          "Chunghwa Telecom, Taiwan Mobile, and FarEasTone all have student plans. You need your ARC or passport to register.",
        href: "https://www.cht.com.tw/en/home/cht", // verify
      },
      {
        title: "EasyCard / iPass",
        description:
          "One card for buses, the MRT, and convenience stores. Taichung city buses are free for the first ten kilometres with a registered card.",
        href: "https://www.i-pass.com.tw/", // verify
      },
    ],
  },
  {
    id: "campus-life",
    title: "Campus life at Tunghai",
    summary:
      "Finding your way around one of the most beautiful campuses in Taiwan.",
    icon: "school",
    items: [
      {
        title: "Course registration and academic calendar",
        description:
          "Add/drop periods are short and unforgiving. Check the calendar the week you arrive and put the deadlines in your phone.",
        href: "https://eng.thu.edu.tw/",
      },
      {
        title: "Chinese Language Center",
        description:
          "Mandarin classes for international students. Even one semester changes how much of Taichung is open to you.",
        href: "https://clc.thu.edu.tw/", // verify
      },
      {
        title: "Clubs and student activities",
        description:
          "Beyond THUISA there are dozens of Tunghai clubs — sports, music, volunteering. Joining one is the fastest way to practise Mandarin.",
        href: "https://eng.thu.edu.tw/",
      },
      {
        title: "Library and study spaces",
        description:
          "Opening hours, borrowing rules, and the quiet floors worth knowing about during exam season.",
        href: "https://www.thu.edu.tw/", // verify: link to the library site
      },
    ],
  },
  {
    id: "living-in-taichung",
    title: "Living in Taichung",
    summary:
      "Food, prayer, transport, and the practical side of daily life off campus.",
    icon: "home",
    items: [
      {
        title: "Halal food and Indonesian groceries",
        description:
          "There are Indonesian shops near campus and around Taichung Railway Station. Ask in the THUISA group chat — the map changes faster than any website.",
        href: "https://www.instagram.com/thuisa_official",
      },
      {
        title: "Taichung Mosque",
        description:
          "The main mosque in Taichung, with Friday prayers and a community that includes many Indonesians.",
        href: "https://www.taichungmosque.org.tw/", // verify
      },
      {
        title: "Getting around Taichung",
        description:
          "City buses, the Green Line MRT, YouBike, and the scooter question. Most students manage the first year without a scooter.",
        href: "https://www.taichung.gov.tw/", // verify
      },
      {
        title: "Housing off campus",
        description:
          "If you move out of the dorms, never sign a lease you cannot read. Bring a senior who speaks Mandarin — we can introduce you to one.",
        href: "/contact",
      },
    ],
  },
  {
    id: "money-and-work",
    title: "Money, work, and scholarships",
    summary:
      "What you are allowed to do, and what help is available to pay for it.",
    icon: "wallet",
    items: [
      {
        title: "Work permit for students",
        description:
          "You must hold a work permit before taking any part-time job, and there is a weekly hour limit during term. Working without one risks your visa.",
        href: "https://www.wda.gov.tw/", // verify
      },
      {
        title: "Taiwan scholarships",
        description:
          "MOE Taiwan Scholarship, Huayu Enrichment Scholarship, and university-level awards for international students.",
        href: "https://www.studyintaiwan.org/scholarship",
      },
      {
        title: "Tunghai financial aid",
        description:
          "Tunghai offers its own tuition waivers and assistantships for international students. OIR knows the current list and deadlines.",
        href: "https://oir.thu.edu.tw/",
      },
      {
        title: "THUISA membership",
        description:
          "Open to Indonesian students at Tunghai. NT$200 a year, and the only thing it changes is that you pay less at our events.",
        href: "/contact",
      },
    ],
  },
  {
    id: "help",
    title: "When something goes wrong",
    summary:
      "Save these numbers in your phone now, not when you need them.",
    icon: "lifebuoy",
    items: [
      {
        title: "Emergency: 110 (police) / 119 (fire and ambulance)",
        description:
          "Free from any phone. If you cannot explain in Mandarin, say your location clearly and stay on the line.",
        href: "tel:110",
      },
      {
        title: "Foreigners in Taiwan hotline: 0800-024-111",
        description:
          "Government helpline with English and Indonesian support for visa, life, and legal questions.",
        href: "tel:0800024111",
      },
      {
        title: "Indonesian Economic and Trade Office (KDEI Taipei)",
        description:
          "Indonesia's representative office in Taiwan. Passport services, legal help, and citizen protection.",
        href: "https://kdei-taipei.org/", // verify
      },
      {
        title: "Talk to THUISA",
        description:
          "Struggling with something and not sure who to ask? Start with us. We have almost certainly seen it before, and it stays private.",
        href: "/contact",
      },
    ],
  },
];

/** Shown as the highlighted checklist at the top of the Resources page. */
export const arrivalChecklist = [
  "Apply for your resident visa before you fly",
  "Confirm your dorm place with OIR",
  "Apply for your ARC within 15 days of landing",
  "Open a bank account and get a local SIM",
  "Register for an EasyCard or iPass",
  "Join the THUISA group chat and come to Yingxin",
];
