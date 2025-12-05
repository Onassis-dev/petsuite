import {
  decimal,
  pgTable,
  varchar,
  serial,
  pgEnum,
  date,
} from "drizzle-orm/pg-core";
import { organizationId } from "./auth.db";

export const species = pgEnum("species", ["dog", "cat", "other"]);
export const sexes = pgEnum("sexes", ["male", "female", "unknown"]);
export const status = pgEnum("status", [
  "available",
  "adopted",
  "deceased",
  "intake",
]);
export const size = pgEnum("size", ["small", "medium", "large", "extraLarge"]);
export const measurements = pgEnum("size", ["Kgs", "Lbs"]);

export const pets = pgTable("pets", {
  id: serial().primaryKey().notNull(),
  species: species().notNull(),
  sex: sexes().notNull(),
  name: varchar().notNull(),
  status: status().notNull(),
  size: size(),
  weigth: decimal(),
  measurement: measurements(),
  comments: varchar(),
  publicDescription: varchar(),
  admissionDate: date(),
  bornDate: date(),
  organizationId,
});
