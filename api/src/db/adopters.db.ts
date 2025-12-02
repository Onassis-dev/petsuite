import { pgTable, varchar, serial } from "drizzle-orm/pg-core";
import { organizationId } from "./auth.db";
import { sql, SQL } from "drizzle-orm";

export const adopters = pgTable("adopters", {
  id: serial().primaryKey().notNull(),
  name: varchar().notNull(),
  email: varchar(),
  phone: varchar(),
  address: varchar(),
  notes: varchar(),
  fts: varchar().generatedAlwaysAs(
    (): SQL =>
      sql`concat_fts(${adopters.name}, ${adopters.email}, ${adopters.phone}, ${adopters.notes})`
  ),
  organizationId,
});
