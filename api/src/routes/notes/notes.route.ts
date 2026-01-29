import { Hono } from "hono";
import { validator } from "../../middleware/validation.middleware";
import { checkPermission } from "../../middleware/auth.middleware";
import { db } from "../../lib/db";
import { and, desc, eq, sql } from "drizzle-orm";
import { type Variables } from "../..";
import {
  createNoteSchema,
  editNoteSchema,
  selectNotesSchema,
} from "./notes.schema";
import { pets } from "../../db/pets.db";
import { deleteSchema } from "../../lib/schemas";
import { notes } from "../../db/notes.db";

export const notesRoute = new Hono<{ Variables: Variables }>()
  .use(checkPermission("pets"))

  .get("/", validator("query", selectNotesSchema), async (c) => {
    const data = c.req.valid("query");

    const rows = await db
      .select({
        id: notes.id,
        content: notes.content,
        createdAt: notes.createdAt,
      })
      .from(notes)
      .leftJoin(pets, eq(notes.petId, pets.id))
      .where(
        and(
          eq(pets.organizationId, c.get("orgId")),
          eq(notes.petId, data.petId)
        )
      )
      .orderBy(desc(notes.id));

    return c.json(rows);
  })

  .post("/", validator("json", createNoteSchema), async (c) => {
    const data = c.req.valid("json");

    const [pet] = await db
      .select({ id: pets.id })
      .from(pets)
      .where(
        and(eq(pets.id, data.petId), eq(pets.organizationId, c.get("orgId")))
      );
    if (!pet) return c.json({ error: "Pet not found" }, 404);

    const [note] = await db
      .insert(notes)
      .values({
        ...data,
        creatorId: c.get("userId"),
        petId: data.petId,
        content: data.content || "",
      })
      .returning({
        id: notes.id,
        createdAt: notes.createdAt,
        content: notes.content,
      });

    return c.json(note);
  })

  .put("/", validator("json", editNoteSchema), async (c) => {
    const data = c.req.valid("json");

    await db
      .update(notes)
      .set({
        content: data.content || "",
      })
      .where(
        and(
          eq(notes.id, data.id),
          sql`(select "organizationId" = ${c.get("orgId")} from pets where id = (select "petId" from notes where id = ${data.id}))`
        )
      );

    return c.json({});
  })

  .delete("/", validator("json", deleteSchema), async (c) => {
    const data = c.req.valid("json");

    await db
      .delete(notes)
      .where(
        and(
          eq(notes.id, data.id),
          sql`(select "organizationId" = ${c.get("orgId")} from pets where id = (select "petId" from notes where id = ${data.id}))`
        )
      );

    return c.json({});
  });
