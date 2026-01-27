import { pgTable, boolean, varchar, serial, pgEnum } from "drizzle-orm/pg-core";
import { organizationId } from "./auth.db";

export const stylesArray = ["modern", "minimalist", "friendly"] as const;
export const styles = pgEnum("styles", stylesArray);

export const contactOptionsArray = ["whatsapp", "email"] as const;
export const contactOptions = pgEnum("contactOptions", contactOptionsArray);

export const websites = pgTable("websites", {
  id: serial().primaryKey().notNull(),
  slug: varchar().notNull().unique(),
  active: boolean().notNull().default(false),
  description: varchar(),
  language: varchar().notNull(),
  organizationId: organizationId.unique(),
  color: varchar().notNull(),
  style: styles().notNull(),
  city: varchar(),
  instagram: varchar(),
  facebook: varchar(),
  youtube: varchar(),
  email: varchar(),
  website: varchar(),
  phone: varchar(),
  countryCode: varchar(),
  contactOption: contactOptions(),
});
