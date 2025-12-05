import { sexes, species, status } from "../../db/pets.db";
import { dateSchema } from "../../lib/schemas";
import { z } from "zod/v4";

export const selectPetsSchema = z.object({
  name: z.string().nullable(),
  page: z.coerce.number(),
});

export const createPetSchema = z.object({
  name: z.string().min(1),
  species: z.enum(species.enumValues),
  sex: z.enum(sexes.enumValues),
  status: z.enum(status.enumValues),
});

export const petGeneralInfoSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  species: z.enum(species.enumValues),
  sex: z.enum(sexes.enumValues),
  admissionDate: dateSchema,
});
