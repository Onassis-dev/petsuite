CREATE TABLE "pets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"organizationId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "permissions" ADD COLUMN "pets" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "permissions" ADD COLUMN "adopters" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "permissions" ADD COLUMN "calendar" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "permissions" ADD COLUMN "website" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "permissions" ADD COLUMN "inventory" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "permissions" ADD COLUMN "finances" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "pets" ADD CONSTRAINT "pets_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;