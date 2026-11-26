import * as z from "zod";
import { contactCategories } from "@/lib/contact";

export const ContactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().min(2, "Invalid email"),
  message: z.string().min(3, "Please write a slightly longer message"),
  category: z.enum(contactCategories.map((category) => category.value)),
});
