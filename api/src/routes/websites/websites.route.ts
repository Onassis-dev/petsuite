import { Hono } from "hono";
import { validator } from "../../middleware/validation.middleware";
import { checkPermission } from "../../middleware/auth.middleware";
import { db } from "../../lib/db";
import { eq } from "drizzle-orm";
import { type Variables } from "../..";
import { changeUrlSchema, websiteSchema } from "./websites.schema";
import { websites } from "../../db/websites.db";

export const websitesRoute = new Hono<{ Variables: Variables }>()
  .use(checkPermission("website"))

  .get("/", async (c) => {
    const [website] = await db
      .select()
      .from(websites)
      .where(eq(websites.organizationId, c.get("orgId")));

    return c.json(website || null);
  })

  .post("/url", validator("json", changeUrlSchema), async (c) => {
    const data = c.req.valid("json");

    const [website] = await db
      .insert(websites)
      .values({
        url: data.url,
        active: true,
        organizationId: c.get("orgId"),
        language: c.get("lang"),
      })
      .returning();

    return c.json(website);
  })

  .put("/", validator("json", websiteSchema), async (c) => {
    const data = c.req.valid("json");

    await db
      .update(websites)
      .set({
        ...data,
      })
      .where(eq(websites.organizationId, c.get("orgId")));

    return c.json({});
  })

  .put("/url", validator("json", changeUrlSchema), async (c) => {
    const data = c.req.valid("json");

    await db
      .update(websites)
      .set({
        url: data.url,
      })
      .where(eq(websites.organizationId, c.get("orgId")));

    return c.json({});
  });
