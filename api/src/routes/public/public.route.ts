import { Hono } from "hono";
import { validator } from "../../middleware/validation.middleware";
import { db } from "../../lib/db";
import { and, eq, sql } from "drizzle-orm";
import {
  publicPetSchema,
  publicPetsSchema,
  publicWebsiteSchema,
} from "./public.schema";
import { websites } from "../../db/websites.db";
import { organizations } from "../../db/auth.db";
import { pets } from "../../db/pets.db";
import { s3 } from "bun";

export const publicRoute = new Hono()
  .get("/website", validator("query", publicWebsiteSchema), async (c) => {
    const data = c.req.valid("query");

    const [website] = await db
      .select({
        title: organizations.name,
        lang: websites.language,
        description: websites.description,
        image: organizations.logo,
        style: websites.style,
        color: websites.color,
      })
      .from(websites)
      .innerJoin(organizations, eq(websites.organizationId, organizations.id))
      .where(and(eq(websites.slug, data.slug), eq(websites.active, true)));

    if (!website) return c.json({}, 404);

    if (website?.image) website.image = s3.presign(website.image);

    if (!website) return c.json({}, 404);
    return c.json(website);
  })

  .get("/pets", validator("query", publicPetsSchema), async (c) => {
    const data = c.req.valid("query");

    const petsArray = await db
      .select({
        count: sql<number>`count(*) OVER()::integer as count`,
        id: pets.id,
        name: pets.name,
        image: pets.image,
        sex: pets.sex,
      })
      .from(pets)
      .where(
        and(
          eq(
            pets.organizationId,
            sql`(select "organizationId" from websites where slug = ${data.slug})`
          ),
          eq(pets.public, true),
          eq(pets.status, "available"),
          data.species ? eq(pets.species, data.species) : undefined
        )
      )
      .limit(18)
      .offset((data.page - 1) * 18);

    return c.json(
      petsArray.map((pet) => ({
        ...pet,
        image: pet.image ? s3.presign(pet.image) : null,
      }))
    );
  })

  .get("/pet", validator("query", publicPetSchema), async (c) => {
    const data = c.req.valid("query");

    const [website] = await db
      .select({
        title: organizations.name,
        lang: websites.language,
        image: organizations.logo,
        pet: sql<typeof pets.$inferSelect>`(select json_build_object(
        'id', ${pets.id},
        'name', ${pets.name},
        'description', ${pets.publicDescription},
        'species', ${pets.species},
        'image', ${pets.image})
        FROM ${pets} 
        WHERE ${pets.organizationId} = ${websites.organizationId} 
        AND ${pets.id} = ${data.id}
        AND ${pets.public} = true
        AND ${pets.status} = 'available'
        )`,
      })
      .from(websites)
      .innerJoin(organizations, eq(websites.organizationId, organizations.id))
      .where(and(eq(websites.slug, data.slug), eq(websites.active, true)));

    if (!website) return c.json({}, 404);

    if (website.image) website.image = s3.presign(website.image);
    if (website.pet?.image) website.pet.image = s3.presign(website.pet.image);

    return c.json(website);
  });
