CREATE TABLE "adopters" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar,
	"phone" varchar,
	"address" varchar,
	"notes" varchar,
	"fts" varchar GENERATED ALWAYS AS (concat_fts("adopters"."name", "adopters"."email", "adopters"."phone", "adopters"."notes")) STORED,
	"organizationId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "adopters" ADD CONSTRAINT "adopters_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;