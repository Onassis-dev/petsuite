import { pgTable, boolean, varchar, serial, pgEnum } from "drizzle-orm/pg-core";
import { organizationId } from "./auth.db";

export const stylesArray = ["modern", "minimalist", "friendly"] as const;

export const styles = pgEnum("styles", stylesArray);

export const websites = pgTable("websites", {
  id: serial().primaryKey().notNull(),
  slug: varchar().notNull().unique(),
  active: boolean().notNull().default(false),
  description: varchar(),
  language: varchar().notNull(),
  organizationId: organizationId.unique(),
  color: varchar().notNull(),
  style: styles().notNull(),
});
