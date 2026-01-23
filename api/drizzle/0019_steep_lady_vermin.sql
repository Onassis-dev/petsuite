ALTER TABLE "websites" RENAME COLUMN "url" TO "slug";--> statement-breakpoint
ALTER TABLE "websites" DROP CONSTRAINT "websites_url_unique";--> statement-breakpoint
ALTER TABLE "websites" ADD CONSTRAINT "websites_slug_unique" UNIQUE("slug");