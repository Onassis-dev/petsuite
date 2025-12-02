import { z } from "zod/v4";

export const idSchema = z.number().or(z.string());

export const emailSchema = z.string().length(0).nullable().or(z.email());

export const deleteSchema = z.object({
  id: idSchema,
});
