/**
 * Topics offered in the contact form. The form shows the labels, the server
 * only accepts these values, and the label ends up in the email subject.
 */
export const contactCategories = [
  { value: "general", label: "General question" },
  { value: "new-student", label: "New student help" },
  { value: "events", label: "Events" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
] as const;
