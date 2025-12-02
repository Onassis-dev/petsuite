import { z } from "zod/v4";
import { emailSchema, idSchema } from "../../lib/schemas";

export const searchAdoptersSchema = z.object({
  text: z.string().nullable(),
  page: z.coerce.number(),
});

export const createAdopterSchema = z.object({
  name: z.string().min(1),
  email: emailSchema,
  phone: z.string().nullable(),
  address: z.string().nullable(),
  notes: z.string().nullable(),
});

export const updateAdopterSchema = createAdopterSchema.extend({
  id: idSchema,
});
