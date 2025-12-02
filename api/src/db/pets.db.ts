import { pgTable, varchar, serial } from "drizzle-orm/pg-core";
import { organizationId } from "./auth.db";

export const pets = pgTable("pets", {
  id: serial().primaryKey().notNull(),
  name: varchar().notNull(),
  organizationId,
});
