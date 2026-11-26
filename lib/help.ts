/**
 * Who to call: the Help page (/help), the emergency band at the top of the
 * New Students guide, and the guide's "When something goes wrong" list all
 * read their numbers and contacts from here, so each number is written once.
 *
 * Only add contact details that come from an official source. A wrong phone
 * number on this page is worse than none. Empty values ("") render nothing.
 */

/** Tap-to-call emergency numbers. Free from any phone in Taiwan. */
export const emergencyNumbers = [
  {
    number: "110",
    label: "Police",
    href: "tel:110",
    description:
      "Free from any phone. If you cannot explain in Mandarin, say your location clearly and stay on the line.",
  },
  {
    number: "119",
    label: "Fire and ambulance",
    href: "tel:119",
    description:
      "Free from any phone. Call for a fire, an injury, or anyone who needs an ambulance. Say your location first.",
  },
];

/** Information line shown under the emergency numbers. Not an emergency number. */
export const foreignerHelpLine = {
  number: "1990",
  label: "Foreigner help line",
  detail: "24h in English; Indonesian on weekdays 9–17, not for emergencies",
  href: "tel:1990",
  /** Longer name and description, used in the guide's help list. */
  title: "Foreigners in Taiwan hotline",
  description:
    "Government help line for visa, life, and legal questions. 24 hours in English; Indonesian on weekdays 9:00–17:00. Not for emergencies.",
  // Source: https://www.immigration.gov.tw/5475/5478/6928/6940/204896/204917/cp_news
};

/** Indonesia's representative office in Taiwan. */
export const kdei = {
  name: "Indonesian Economic and Trade Office (KDEI Taipei)",
  description:
    "Indonesia's representative office in Taiwan. Passport services, legal help, and citizen protection.",
  href: "https://kdei-taipei.org/", // verify
};

/**
 * The university's office for international students. Only the website is
 * known so far; the other fields stay hidden until they are filled in.
 */
export const universityContact: {
  name: string;
  description: string;
  href: string;
  phone: string;
  email: string;
  office: string;
  afterHours: string;
} = {
  name: "Tunghai Office of International Relations",
  description:
    "Your official contact at Tunghai for admission, arrival, and everything an international student needs from the university.",
  href: "https://oir.thu.edu.tw/",
  // TODO: OIR office phone number, copied from the university's own site
  phone: "",
  // TODO: OIR email address for international students
  email: "",
  // TODO: where the OIR office is on campus (building and room)
  office: "",
  // TODO: who to contact at the university outside office hours (e.g. a duty phone or the dorm office)
  afterHours: "",
};

/** THUISA's own entry on the Help page and in the guide's help list. */
export const thuisaHelp = {
  title: "Talk to THUISA",
  description:
    "Struggling with something and not sure who to ask? Start with us. We have almost certainly seen it before, and it stays private.",
  // TODO: confirm this reply time (same wording as the Contact page)
  replyTime: "We usually reply within a few days.",
};
