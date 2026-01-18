import { Hono } from "hono";
import { validator } from "../../middleware/validation.middleware";
import { db } from "../../lib/db";
import { and, eq, sql } from "drizzle-orm";
import { publicPetSchema, publicWebsiteSchema } from "./public.schema";
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
        pets: sql<
          (typeof pets.$inferSelect)[]
        >`(select COALESCE(json_agg(${pets}), '[]'::json) from ${pets} 
        WHERE ${pets.organizationId} = ${websites.organizationId} 
        AND ${pets.public} = true
        AND ${pets.status} = 'available'
        )`.as("pets"),
      })
      .from(websites)
      .innerJoin(organizations, eq(websites.organizationId, organizations.id))
      .where(and(eq(websites.url, data.url), eq(websites.active, true)));

    if (!website) return c.json({}, 404);

    website.pets = website.pets.map((pet) => ({
      ...pet,
      image: pet.image ? s3.presign(pet.image) : null,
    }));

    if (website?.image) website.image = s3.presign(website.image);

    if (!website) return c.json({}, 404);
    return c.json(website);
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
      .where(and(eq(websites.url, data.url), eq(websites.active, true)));

    if (!website) return c.json({}, 404);

    if (website.image) website.image = s3.presign(website.image);
    if (website.pet?.image) website.pet.image = s3.presign(website.pet.image);

    return c.json(website);
  });
