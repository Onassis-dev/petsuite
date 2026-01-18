import { z } from "zod/v4";

export const publicWebsiteSchema = z.object({
  url: z.string(),
});

export const publicPetSchema = z.object({
  id: z.string(),
  url: z.string(),
});
