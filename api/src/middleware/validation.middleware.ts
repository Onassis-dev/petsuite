import { zValidator } from "@hono/zod-validator";
import { z } from "zod/v4";
import { type ValidationTargets } from "hono";

function normalize(value: any): any {
  if (value === "") return null;
  if (Array.isArray(value)) return value.map(normalize);
  if (typeof value === "object" && value !== null) {
    if (value instanceof File) return value;
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, normalize(v)])
    );
  }
  return value;
}

export const validator = <
  Target extends keyof ValidationTargets,
  Schema extends z.ZodTypeAny
>(
  target: Target,
  schema: Schema
) =>
  zValidator(target, schema, undefined, {
    validationFunction: async (schema, value) => {
      return (await schema.safeParseAsync(normalize(value))) as any;
    },
  });
