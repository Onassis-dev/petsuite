CREATE TYPE "public"."styles" AS ENUM('modern', 'minimalist', 'friendly');--> statement-breakpoint
ALTER TABLE "websites" ADD COLUMN "color" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "websites" ADD COLUMN "style" "styles" NOT NULL;