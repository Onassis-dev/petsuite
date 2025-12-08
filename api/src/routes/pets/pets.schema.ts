import {
  measurementsArray,
  sexesArray,
  sizeArray,
  speciesArray,
  statusArray,
} from "../../db/pets.db";
import { dateSchema } from "../../lib/schemas";
import { z } from "zod/v4";

export const selectPetsSchema = z.object({
  name: z.string().nullable(),
  page: z.coerce.number(),
});

export const createPetSchema = z.object({
  name: z.string().min(1),
  species: z.enum(speciesArray),
  sex: z.enum(sexesArray),
  status: z.enum(statusArray),
});

export const petGeneralInfoSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  species: z.enum(speciesArray),
  sex: z.enum(sexesArray),
  admissionDate: dateSchema,
  bornDate: dateSchema,
  size: z.enum(sizeArray),
  weight: z.string().nullable(),
  measurement: z.enum(measurementsArray),
  comments: z.string().nullable(),
  status: z.enum(statusArray),
});

export const publicPetSchema = z.object({
  id: z.number(),
});
