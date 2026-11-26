# Information still needed for the THUISA website

Line numbers are correct as of 26 November 2026. If a file has changed since
then, search it for `TODO`.

## 1. Membership form link

- [ ] Real form URL: [lib/links.ts:9](lib/links.ts#L9)

While this is empty, the membership form buttons are hidden. These sentences
still mention the form, so check them if the link will take a while:

- [ ] "Fill in the membership form…": [app/contact/page.tsx:32](app/contact/page.tsx#L32)

## 2. LINE link

- [ ] Real LINE invite link: [lib/links.ts:11](lib/links.ts#L11)
- [ ] Confirm the LINE ID `thuisa`, which is still shown on the site: [lib/site.ts:29](lib/site.ts#L29)

While the link is empty, LINE buttons are hidden. The LINE cards on the home and
contact pages still show the ID and this text:

- [ ] [components/sections/stay-connected.tsx:24](components/sections/stay-connected.tsx#L24)
- [ ] [app/contact/page.tsx:69](app/contact/page.tsx#L69) and [app/contact/page.tsx:52](app/contact/page.tsx#L52)

## 3. Hosting and email

- [ ] Choose where the site is hosted. The contact form needs a server, so a
      static-only host such as GitHub Pages will not work.
- [ ] Set these environment variables on the host, and in `.env.local` for local
      testing. Never commit that file. Examples: [README.md:20](README.md#L20)

| Variable | Used at |
| --- | --- |
| `SMTP_HOST` | [actions/supportAction.ts:17](actions/supportAction.ts#L17) |
| `SMTP_PORT` | [actions/supportAction.ts:18](actions/supportAction.ts#L18) |
| `SMTP_SECURE` | [actions/supportAction.ts:19](actions/supportAction.ts#L19) |
| `SMTP_USER`, `SMTP_PASS` | [actions/supportAction.ts:20](actions/supportAction.ts#L20) |
| `MAIL_TO` (committee inbox) | [actions/supportAction.ts:60](actions/supportAction.ts#L60) |
| `MAIL_FROM` (sender) | [actions/supportAction.ts:70](actions/supportAction.ts#L70) |

- [ ] Send a test message from the live site and confirm it arrives.
- [ ] Confirm who reads the inbox, and that these promises are true:
      replies "within a few days" ([app/contact/page.tsx:166](app/contact/page.tsx#L166),
      [components/form.tsx:105](components/form.tsx#L105)) and channels checked
      "every day" ([app/contact/page.tsx:98](app/contact/page.tsx#L98)).

## 4. Real figures

### Member counts

- [ ] "400+": [lib/site.ts:67](lib/site.ts#L67)
- [ ] "400": [app/about/page.tsx:49](app/about/page.tsx#L49)
- [ ] "400": [app/page.tsx:57](app/page.tsx#L57)
- [ ] "42" active members: [lib/site.ts:68](lib/site.ts#L68)
- [ ] "42" committee and volunteers: [lib/reports.ts:84](lib/reports.ts#L84)

### Membership fee

- [ ] Main value: [lib/site.ts:30](lib/site.ts#L30)
- [ ] Typed separately, so change it too: [lib/resources.ts:199](lib/resources.ts#L199)

### Event dates

- [ ] Yingxin 1: [lib/events.ts:33](lib/events.ts#L33)
- [ ] Yingxin 2: [lib/events.ts:55](lib/events.ts#L55)
- [ ] Halloween: [lib/events.ts:77](lib/events.ts#L77)
- [ ] Christmas Dinner: [lib/events.ts:99](lib/events.ts#L99)
- [ ] Gala Dinner: [lib/events.ts:121](lib/events.ts#L121)
- [ ] THUISA Cup: [lib/events.ts:144](lib/events.ts#L144)
- [ ] International Week: [lib/events.ts:166](lib/events.ts#L166)
- [ ] Graduation: [lib/events.ts:189](lib/events.ts#L189)

### Financial report

- [ ] Financial summary PDF: put it in `public/reports/` and set `file` at
      [lib/reports.ts:37](lib/reports.ts#L37). **This makes the spending figures
      visible again**, so check them first:
  - [ ] "100% of fees spent on members": [lib/reports.ts:78](lib/reports.ts#L78)
  - [ ] Budget percentages: [lib/reports.ts:96](lib/reports.ts#L96). They include
        a 10% reserve, which seems to contradict "100% spent on members".
- [ ] Annual report PDF: [lib/reports.ts:28](lib/reports.ts#L28)
- [ ] THUISA Cup report PDF: [lib/reports.ts:46](lib/reports.ts#L46)
- [ ] 2024/2025 annual report PDF: [lib/reports.ts:55](lib/reports.ts#L55)
- [ ] Confirm the wording about published and audited reports:
      [app/report/page.tsx:34](app/report/page.tsx#L34),
      [app/report/page.tsx:76](app/report/page.tsx#L76),
      [app/report/page.tsx:118](app/report/page.tsx#L118)

## 5. Languages

- [ ] Decide which languages the site should use (English, Indonesian, Chinese,
      or a mix). The site is currently marked as English at
      [app/layout.tsx:60](app/layout.tsx#L60) and
      [app/layout.tsx:49](app/layout.tsx#L49). The page text itself is spread
      across `app/`, `components/` and `lib/`.

## 6. Photos, with consent

Get permission from the people shown before publishing any photo.

- [ ] Home page slides: [lib/site.ts:126](lib/site.ts#L126),
      [135](lib/site.ts#L135), [144](lib/site.ts#L144)
- [ ] About and welcome photos: [lib/site.ts:153](lib/site.ts#L153) to
      [155](lib/site.ts#L155)
- [ ] Gallery, six photos: [lib/site.ts:157](lib/site.ts#L157) to
      [162](lib/site.ts#L162)
- [ ] "What we do" cards: [lib/site.ts:81](lib/site.ts#L81),
      [88](lib/site.ts#L88), [95](lib/site.ts#L95), [102](lib/site.ts#L102)
- [ ] Event covers: [lib/events.ts:50](lib/events.ts#L50),
      [72](lib/events.ts#L72), [94](lib/events.ts#L94),
      [116](lib/events.ts#L116), [139](lib/events.ts#L139),
      [161](lib/events.ts#L161), [184](lib/events.ts#L184),
      [206](lib/events.ts#L206)
- [ ] Leadership portraits, and consent to show names:
      [lib/team.ts:20](lib/team.ts#L20), [25](lib/team.ts#L25),
      [30](lib/team.ts#L30), [35](lib/team.ts#L35)
- [ ] Tunghai University logo, with permission to use it:
      [lib/site.ts:111](lib/site.ts#L111)

## 7. Facts not yet checked

These are on the site but have not been verified against an official source.

- [ ] Resident visa offices in Jakarta or Surabaya: [lib/resources.ts:36](lib/resources.ts#L36)
- [ ] Health insurance after six months: [lib/resources.ts:82](lib/resources.ts#L82)
- [ ] Free bus distance in Taichung: [lib/resources.ts:100](lib/resources.ts#L100)
- [ ] Student work permit and hour limit: [lib/resources.ts:181](lib/resources.ts#L181)
- [ ] Hours for Indonesian-language support on 1990: [lib/resources.ts:220](lib/resources.ts#L220)
- [ ] ARC wording: the linked National Immigration Agency page confirms the
      30-day deadline. It does not cover a Resident Visa issued inside Taiwan or
      the FS visitor visa, so keep the source for those two points on file:
      [lib/resources.ts:75](lib/resources.ts#L75)
