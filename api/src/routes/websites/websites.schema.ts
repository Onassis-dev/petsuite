import { z } from "zod/v4";
import { stylesArray } from "../../db/websites.db";

export const websiteSchema = z.object({
  active: z.boolean(),
  description: z.string().nullable(),
  language: z.string().min(1),
  color: z.string().max(15),
  style: z.enum(stylesArray),
});

export const changeUrlSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(30)
    .regex(/^[a-z0-9ñ-]+$/)
    .toLowerCase(),
});
