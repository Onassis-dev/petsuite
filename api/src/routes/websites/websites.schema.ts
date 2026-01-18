import { z } from "zod/v4";

export const websiteSchema = z.object({
  active: z.boolean(),
  description: z.string().nullable(),
  language: z.string().min(1),
});

export const changeUrlSchema = z.object({
  url: z
    .string()
    .min(2)
    .max(30)
    .regex(/^[a-z0-9ñ-]+$/)
    .toLowerCase(),
});
