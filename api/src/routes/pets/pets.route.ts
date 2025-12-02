import { Hono } from "hono";
import { validator } from "../../middleware/validation.middleware";
import { checkPermission } from "../../middleware/auth.middleware";
import { db } from "../../lib/db";
import { and, eq, ilike, sql } from "drizzle-orm";
import { type Variables } from "../..";
import { getTableColumns } from "drizzle-orm";
import { selectPetsSchema } from "./pets.schema";
import { pets } from "../../db/pets.db";

export const petsRoute = new Hono<{ Variables: Variables }>()
  .use(checkPermission("pets"))

  .get("/", validator("query", selectPetsSchema), async (c) => {
    const data = c.req.valid("query");

    const rows = await db
      .select({
        ...getTableColumns(pets),
        count: sql<number>`count(*) OVER()::integer as count`,
      })
      .from(pets)
      .where(
        and(
          eq(pets.organizationId, c.get("orgId")),
          data.name ? ilike(pets.name, `%${data.name}%`) : undefined
        )
      )
      .limit(10)
      .offset((data.page - 1) * 10)
      .orderBy(pets.id);

    return c.json({
      rows,
      count: rows[0]?.count || 0,
    });
  });
