import { z } from "zod/v4";
import { speciesArray } from "../../db/pets.db";

export const publicWebsiteSchema = z.object({
  slug: z.string(),
});

export const publicPetSchema = z.object({
  id: z.string(),
  slug: z.string(),
});

export const publicPetsSchema = z.object({
  slug: z.string(),
  page: z.coerce.number(),
  species: z.enum(speciesArray).nullish(),
});
