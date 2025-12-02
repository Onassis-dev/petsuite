import { z } from "zod/v4";

export const selectPetsSchema = z.object({
  name: z.string().nullable(),
  page: z.coerce.number(),
});
