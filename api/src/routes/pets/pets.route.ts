import { Hono } from "hono";
import { validator } from "../../middleware/validation.middleware";
import { checkPermission } from "../../middleware/auth.middleware";
import { db } from "../../lib/db";
import { and, eq, ilike, sql } from "drizzle-orm";
import { type Variables } from "../..";
import { getTableColumns } from "drizzle-orm";
import {
  createPetSchema,
  petGeneralInfoSchema,
  selectPetsSchema,
} from "./pets.schema";
import { pets } from "../../db/pets.db";
import { deleteSchema, idSchema } from "../../lib/schemas";

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
  })

  .post("/", validator("json", createPetSchema), async (c) => {
    const data = c.req.valid("json");

    await db.insert(pets).values({
      ...data,
      organizationId: c.get("orgId"),
    });

    return c.json({});
  })

  .get("/general", validator("query", deleteSchema), async (c) => {
    const data = c.req.valid("query");

    const [pet] = await db
      .select()
      .from(pets)
      .where(
        and(eq(pets.id, data.id), eq(pets.organizationId, c.get("orgId")))
      );

    return c.json(pet || null);
  })
  .put("/general", validator("json", petGeneralInfoSchema), async (c) => {
    const data = c.req.valid("json");
    await db
      .update(pets)
      .set({
        ...data,
      })
      .where(
        and(eq(pets.id, data.id), eq(pets.organizationId, c.get("orgId")))
      );
    return c.json({});
  })

  .delete("/", validator("json", deleteSchema), async (c) => {
    const data = c.req.valid("json");

    await db
      .delete(pets)
      .where(
        and(eq(pets.id, data.id), eq(pets.organizationId, c.get("orgId")))
      );

    return c.json({});
  });
