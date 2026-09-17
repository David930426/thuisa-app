/**
 * Site-wide content for THUISA.
 *
 * Almost everything you will want to edit day to day lives in this folder:
 *   lib/site.ts       - org details, navigation, socials, stats, partners, images
 *   lib/events.ts     - the event calendar
 *   lib/team.ts       - the people on the team
 *   lib/resources.ts  - the new-student resource links
 *   lib/reports.ts    - accountability / transparency reports
 *
 * To swap a placeholder picture for a real photo: drop your file into
 * `public/images/...` and point the path below at it. Any extension works
 * (.jpg, .png, .webp, .svg).
 */

export const site = {
  name: "THUISA",
  fullName: "Tunghai University Indonesian Student Association",
  shortDescription:
    "The Indonesian student community at Tunghai University, Taichung, Taiwan.",
  foundedYear: 2017,
  university: "Tunghai University",
  city: "Taichung, Taiwan",
  email: "thuisa2025@gmail.com",
  lineId: "thuisa",
  membershipFee: "NT$200 / year",
  joinFormUrl: "https://www.google.com/", // TODO: replace with the real membership form
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.693668951489!2d120.59997247606017!3d24.182473772050418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693e1c3a406707%3A0xd43d01bc4fb2806a!2sUniversitas%20Tunghai!5e0!3m2!1sid!2sid!4v1755167301397!5m2!1sid!2sid",
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Report", href: "/report" },
  { label: "Contact Us", href: "/contact" },
];

export const socials = [
  {
    label: "Instagram",
    handle: "@thuisa_official",
    href: "https://www.instagram.com/thuisa_official",
    icon: "/instagram.png",
  },
  {
    label: "TikTok",
    handle: "@thuisa_official",
    href: "https://www.tiktok.com/@thuisa_official",
    icon: "/tiktok.png",
  },
  {
    label: "LINE",
    handle: `ID: ${site.lineId}`,
    href: "https://line.me/", // TODO: replace with the real LINE invite link
    icon: "/line.png",
  },
];

export const stats = [
  { value: "2017", label: "Founded in", detail: "The year THUISA started at Tunghai" },
  { value: "400+", label: "Community", detail: "Indonesians across Tunghai" },
  { value: "42", label: "Active members", detail: "Committee and volunteers" },
  { value: "7", label: "Annual events", detail: "From Yingxin to Graduation" },
];

/**
 * What THUISA runs. Shown as a sideways-scrolling shelf on the homepage and
 * the About page. Each card links somewhere and has its own photo.
 */
export const pillars = [
  {
    eyebrow: "Every September",
    title: "Welcoming new students",
    body: "Two Yingxin events at the start of the year — one on campus, one a trip. New students meet the people already here before the semester gets busy.",
    image: "/images/what-we-do/welcoming.svg",
    href: "/events#yingxin-1",
  },
  {
    eyebrow: "All year",
    title: "Events across both semesters",
    body: "Halloween, Christmas dinner, the Gala Dinner with OIR, and the THUISA Cup in spring. Seven in a year, roughly one every six weeks.",
    image: "/images/what-we-do/events.svg",
    href: "/events",
  },
  {
    eyebrow: "Every spring",
    title: "Indonesian culture on campus",
    body: "We run the Indonesia booth at International Week and perform at the Gala Dinner. Food, music, and traditional dress, in front of the whole university.",
    image: "/images/what-we-do/culture.svg",
    href: "/events#international-week",
  },
  {
    eyebrow: "Whenever you need it",
    title: "The practical stuff",
    body: "ARC paperwork, dorm forms, health insurance, where to buy Indonesian groceries in Taichung. Ask in the group chat — someone has usually done it already.",
    image: "/images/what-we-do/practical.svg",
    href: "/resources",
  },
];

export const partners = [
  {
    name: "Tunghai University",
    href: "https://eng.thu.edu.tw/",
    logo: "/oirLogo.png", // TODO: replace with a Tunghai University logo
  },
  {
    name: "Office of International Relations",
    href: "https://oir.thu.edu.tw/",
    logo: "/oirLogo.png",
  },
];

/** Central image map. Rename or repoint these to swap in real photos. */
export const images = {
  logo: "/logoThuisa.jpeg",
  logoSquare: "/android-chrome-192x192.png",
  hero: [
    {
      src: "/images/hero/hero-community.svg",
      alt: "THUISA members gathered together on campus",
      eyebrow: "Tunghai University Indonesian Student Association",
      title: "Your home away from home in Taichung",
      body: "The Indonesian student association at Tunghai University, run by students since 2017.",
      cta: { label: "Get to know us", href: "/about" },
      secondaryCta: { label: "See our events", href: "/events" },
    },
    {
      src: "/images/hero/hero-events.svg",
      alt: "Students at a THUISA evening event",
      eyebrow: "Seven events a year",
      title: "There is always something happening",
      body: "Yingxin welcomes, Halloween, Christmas dinner, the Gala, THUISA Cup, International Week, and Graduation.",
      cta: { label: "View the calendar", href: "/events" },
      secondaryCta: { label: "Who we are", href: "/about" },
    },
    {
      src: "/images/hero/hero-culture.svg",
      alt: "Indonesian cultural booth at International Week",
      eyebrow: "Representing Indonesia at Tunghai",
      title: "Our culture, in front of the whole campus",
      body: "Each spring we run the Indonesia booth at International Week and perform at the Gala Dinner with the Office of International Relations.",
      cta: { label: "What we do", href: "/about" },
      secondaryCta: { label: "Guide for new students", href: "/resources" },
    },
  ],
  aboutStory: "/images/about/about-story.svg",
  aboutCampus: "/images/about/about-campus.svg",
  homeWelcome: "/images/about/about-welcome.svg",
  gallery: [
    { src: "/images/gallery/gallery-1.svg", alt: "THUISA members at a gathering" },
    { src: "/images/gallery/gallery-2.svg", alt: "Group photo from a THUISA trip" },
    { src: "/images/gallery/gallery-3.svg", alt: "Indonesian food booth" },
    { src: "/images/gallery/gallery-4.svg", alt: "Cultural performance on stage" },
    { src: "/images/gallery/gallery-5.svg", alt: "Sports match at THUISA Cup" },
    { src: "/images/gallery/gallery-6.svg", alt: "Graduating seniors celebrating" },
  ],
};
