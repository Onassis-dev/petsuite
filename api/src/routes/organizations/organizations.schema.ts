import { z } from "zod/v4";

export const createOrgSchema = z.object({
  name: z.string().min(3).max(40),
});
